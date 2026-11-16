// GitHub Pages has no SPA rewrites. After `vite build`, copy dist/index.html to
// dist/<route>/index.html for every route in src/App.tsx (so deep links return 200)
// and to dist/404.html (so unknown paths still boot the app and show NotFound).
import { copyFileSync, mkdirSync, readFileSync } from "fs";
import { dirname, join, resolve } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..");
const DIST = join(ROOT, "dist");
const index = join(DIST, "index.html");

const app = readFileSync(join(ROOT, "src/App.tsx"), "utf8");
const routes = [...app.matchAll(/<Route\s+path="(\/[^"*:]+)"/g)].map((m) => m[1]);

for (const route of routes) {
  const dir = join(DIST, route);
  mkdirSync(dir, { recursive: true });
  copyFileSync(index, join(dir, "index.html"));
}
copyFileSync(index, join(DIST, "404.html"));

console.log(`spa-fallback: ${routes.length} routes + 404.html`);
