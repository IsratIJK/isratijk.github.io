import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";

const BASE_URL = "https://isratijk.github.io";
const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const OUT = join(ROOT, "public/sitemap.xml");

// Optional per-route tuning. Routes in App.tsx not listed here still get included with defaults.
const overrides = {
  "/": { priority: "1.0" },
  "/about": { priority: "0.9" },
  "/research": { priority: "0.9" },
  "/publications": { priority: "0.9" },
  "/projects": { priority: "0.8" },
  "/education": { priority: "0.8" },
  "/experience": { priority: "0.8" },
  "/cv": { priority: "0.8" },
  "/gallery": { priority: "0.6" },
  "/contact": { priority: "0.7", changefreq: "yearly" },
};
const DEFAULTS = { priority: "0.7", changefreq: "monthly" };

const today = new Date().toISOString().slice(0, 10);
const rel = (p) => p.slice(ROOT.length + 1).replace(/\\/g, "/");
const read = (p) => readFileSync(p, "utf8");
const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

function readEnv(key) {
  if (process.env[key]) return process.env[key];
  for (const f of [".env.production", ".env"]) {
    const p = join(ROOT, f);
    if (!existsSync(p)) continue;
    const m = read(p).match(new RegExp(`^${key}=(.*)$`, "m"));
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
}

const CDN = readEnv("VITE_CDN_BASE_URL") ?? "https://isratijk.github.io";

function git(cmd) {
  try {
    return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch {
    return null;
  }
}

function resolveModule(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = join(ROOT, "src", spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null;
  for (const ext of ["", ".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    const p = base + ext;
    if (existsSync(p) && /\.tsx?$/.test(p)) return p;
  }
  return null;
}

function localImports(file) {
  // Static imports only: Header prefetches every page via dynamic import(), which would link all routes together.
  const specs = [...read(file).matchAll(/(?:from|^import)\s+["']([^"']+)["']/gm)].map((m) => m[1]);
  return specs.map((s) => resolveModule(s, file)).filter(Boolean);
}

// Every local source file a page depends on (skipping shadcn/ui primitives).
function dependencies(entry, skip = new Set()) {
  const seen = new Set();
  const stack = [entry];
  while (stack.length) {
    const f = stack.pop();
    if (seen.has(f)) continue;
    seen.add(f);
    for (const dep of localImports(f)) {
      if (!rel(dep).startsWith("src/components/ui/") && !skip.has(dep)) stack.push(dep);
    }
  }
  return seen;
}

function discoverRoutes() {
  const appFile = join(ROOT, "src/App.tsx");
  const app = read(appFile);
  const components = new Map();
  for (const m of app.matchAll(/const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)\s*\)/g)) {
    components.set(m[1], resolveModule(m[2], appFile));
  }
  for (const m of app.matchAll(/import\s+(\w+)\s+from\s+["']([^"']+)["']/g)) {
    if (!components.has(m[1])) components.set(m[1], resolveModule(m[2], appFile));
  }
  const routes = [];
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
    const [, path, name] = m;
    if (path.includes("*") || path.includes(":")) continue;
    const file = components.get(name);
    if (!file) throw new Error(`Sitemap: cannot resolve component ${name} for route ${path}`);
    routes.push({ path, entry: file, deps: dependencies(file) });
  }
  if (!routes.length) throw new Error("Sitemap: no routes found in src/App.tsx");

  // Shell components shared by every route (Layout, Header, Footer…) would make every page's lastmod
  // jump on any layout tweak, so neither they nor anything only they import count toward a page.
  const shell = new Set(
    [...routes[0].deps].filter((f) => !rel(f).startsWith("src/data/") && routes.every((r) => r.deps.has(f))),
  );
  for (const r of routes) {
    shell.delete(r.entry);
    r.files = [...dependencies(r.entry, shell)].map(rel).sort();
  }
  return routes;
}

// Vercel clones with limited depth. In a shallow clone the oldest commit looks like it touched every
// file, so unchanged pages would all get that commit's date. Fetch full history, or detect the boundary.
function prepareHistory() {
  if (git("rev-parse --is-inside-work-tree") !== "true") return { ok: false, boundary: new Set() };
  if (git("rev-parse --is-shallow-repository") === "true") {
    git("fetch --unshallow --filter=blob:none --quiet") ?? git("fetch --unshallow --quiet");
  }
  const shallowFile = git("rev-parse --git-path shallow");
  const boundary =
    shallowFile && existsSync(join(ROOT, shallowFile))
      ? new Set(read(join(ROOT, shallowFile)).split(/\s+/).filter(Boolean))
      : new Set();
  return { ok: true, boundary };
}

function previousLastmods() {
  if (!existsSync(OUT)) return {};
  const map = {};
  for (const m of read(OUT).matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) map[m[1]] = m[2];
  return map;
}

function lastModified(files, loc, history, previous) {
  if (!history.ok) return previous[loc] ?? today;
  const quoted = files.map((f) => `"${f}"`).join(" ");
  if (git(`status --porcelain -- ${quoted}`)) return today;
  const out = git(`log -1 --format=%H%x20%cs -- ${quoted}`);
  if (!out) return previous[loc] ?? today;
  const [hash, date] = out.split(" ");
  if (history.boundary.has(hash)) return previous[loc] ?? date;
  return date;
}

function dataImages(file, field) {
  const p = join(ROOT, "src/data", file);
  if (!existsSync(p)) return [];
  const entries = read(p).split(/\n\s{2}\{\s*\n/).slice(1);
  return entries
    .map((block) => {
      const url = block.match(new RegExp(`${field}:\\s*\`\\$\\{CDN\\}([^\`]+)\``))?.[1];
      const isVideo = /type:\s*"video"/.test(block);
      const poster = block.match(/poster:\s*`\$\{CDN\}([^`]+)`/)?.[1];
      const path = isVideo ? poster : url;
      return path && CDN + path;
    })
    .filter(Boolean);
}

function profilePhoto() {
  const p = join(ROOT, "src/data/profile.ts");
  const path = existsSync(p) && read(p).match(/photo:\s*`\$\{CDN\}([^`]+)`/)?.[1];
  return path ? [CDN + path] : [];
}

const uniq = (list) => [...new Set(list)];

const imagesFor = {
  "/": profilePhoto(),
  "/about": profilePhoto(),
  "/publications": dataImages("publications.ts", "coverImage"),
  "/projects": dataImages("projects.ts", "coverImage"),
  "/gallery": dataImages("gallery.ts", "src"),
  "/education": uniq(dataImages("education.ts", "logo")),
  "/experience": uniq(dataImages("experience.ts", "logo")),
};

const routes = discoverRoutes();
if (process.env.SITEMAP_DEBUG) for (const r of routes) console.log(r.path, r.files);
const history = prepareHistory();
const previous = previousLastmods();

const urls = routes
  .map(({ path, files }) => {
    const loc = `${BASE_URL}${path}`;
    const { priority, changefreq } = { ...DEFAULTS, ...overrides[path] };
    const images = (imagesFor[path] ?? [])
      .map((img) => `
    <image:image>
      <image:loc>${escapeXml(img)}</image:loc>
    </image:image>`)
      .join("");
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastModified(files, loc, history, previous)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>${images}
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`Sitemap generated: ${routes.length} routes (${routes.map((r) => r.path).join(", ")}).`);
