// Post-build prerender for GitHub Pages.
//
// GitHub Pages only serves static files, and most AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, ...) do not run JavaScript. So after `vite build` we load every route
// from src/App.tsx in headless Chrome and save the rendered HTML:
//
//   /          -> dist/index.html
//   /about     -> dist/about.html   (GitHub Pages serves /about from about.html with a 200)
//   unknown    -> dist/404.html     (untouched app shell; the React router shows NotFound)
//
// Each page keeps the per-route <title>, description, canonical and Open Graph tags set
// by react-helmet-async, and the static homepage duplicates of those tags are removed.
//
// Needs Chrome/Chromium. Set CHROME_PATH to override detection. If no browser is found
// the build still succeeds with plain SPA fallbacks, unless PRERENDER_REQUIRED=1 (CI).
import { createServer } from "http";
import { existsSync, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "fs";
import { dirname, extname, join, normalize, resolve } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const DIST = join(ROOT, "dist");
const shellPath = join(DIST, "index.html");
const shell = readFileSync(shellPath, "utf8");

const app = readFileSync(join(ROOT, "src/App.tsx"), "utf8");
const routes = ["/", ...[...app.matchAll(/<Route\s+path="(\/[^"*:]+)"/g)].map((m) => m[1])];

const outFile = (route) => join(DIST, route === "/" ? "index.html" : `${route.slice(1)}.html`);

// The untouched shell serves every unknown path.
writeFileSync(join(DIST, "404.html"), shell);

const chromeCandidates = [
  process.env.CHROME_PATH,
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);
const executablePath = chromeCandidates.find((p) => existsSync(p));

if (!executablePath) {
  const msg = "prerender: no Chrome/Chromium found (set CHROME_PATH)";
  if (process.env.PRERENDER_REQUIRED === "1") {
    console.error(msg);
    process.exit(1);
  }
  for (const route of routes.slice(1)) copyFileSync(shellPath, outFile(route));
  console.warn(`${msg}; wrote ${routes.length - 1} unrendered SPA fallbacks instead`);
  process.exit(0);
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".pdf": "application/pdf",
};

// Minimal static server over dist/, falling back to the shell like GitHub Pages' 404.
const server = createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const file = normalize(join(DIST, path));
  if (file.startsWith(DIST) && existsSync(file) && extname(file)) {
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  } else {
    res.writeHead(200, { "Content-Type": types[".html"] });
    res.end(shell);
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = await import("playwright-core");
const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const rendered = [];

try {
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.querySelector("#root main h1"), null, { timeout: 15000 });
    await page.waitForTimeout(300);

    const html = await page.evaluate(() => {
      const key = (el) =>
        el.tagName === "LINK"
          ? `link:${el.getAttribute("rel")}`
          : `meta:${el.getAttribute("name") ?? el.getAttribute("property")}`;
      // Helmet tags (data-rh) are the per-route truth; drop the static homepage copies.
      const managed = new Set([...document.head.querySelectorAll("[data-rh]")].map(key));
      for (const el of document.head.querySelectorAll("meta:not([data-rh]), link:not([data-rh])")) {
        if (managed.has(key(el))) el.remove();
      }
      // Leave theme selection to theme-init.js at view time. next-themes renders its own
      // inline copy of that script, which the CSP (script-src 'self') blocks anyway.
      for (const s of document.querySelectorAll("#root script:not([src]):not([type])")) s.remove();
      document.documentElement.removeAttribute("class");
      document.documentElement.removeAttribute("style");
      return "<!doctype html>\n" + document.documentElement.outerHTML;
    });

    const file = outFile(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    rendered.push(route);
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`prerender: ${rendered.length} routes (${rendered.join(", ")}) + 404.html`);
