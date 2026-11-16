# Changelog

Architectural and structural changes. Content-only edits (new publications, gallery items, etc.) are not listed.

## [1.1.0] - 2026-11-16

### Agent discoverability
- **`robots.txt` AI policy.** Explicit allow groups added for `Claude-SearchBot`, `Claude-User` and `Perplexity-User`, so training, search and user-triggered crawlers from OpenAI, Anthropic, Perplexity and Google are each named. Every group (54) now carries `Content-Signal: ai-train=yes, search=yes, ai-input=yes` ([contentsignals.org](https://contentsignals.org/)), matching `ai.txt`. The signal repeats per group because a crawler reads only the most specific group matching its user agent.
- **`llms.txt`** follows the llmstxt.org layout more closely: the summary is one sentence, "Site Pages" is now "Important pages" and "Full Content" is now "Optional" (the section agents may skip when context is short).
- **`sitemap.md`.** `scripts/generate-sitemap.mjs` also writes `public/sitemap.md`, a markdown list of every route with its description and last-updated date, plus the site's machine-readable files. Same routes and git-based dates as `sitemap.xml`; titles and descriptions live in the script's `overrides` map. Generated on every build, do not edit by hand.
- **`/AGENTS.md`** (`public/AGENTS.md`): guidance for AI agents reading the site. Covers what the site is, which plain-text files to fetch, access policy, how to cite (DOIs, canonical URL) and contact. Not a coding-agent file.
- `AGENTS.md` and `sitemap.md` are linked from the `<head>` of `index.html` (`rel="describedby"`), the `.well-known/api-catalog` linkset and the `Optional` section of `llms.txt`.
- Not added: `agents.json` (describes API flows; the site has no API), OAuth discovery (no protected API), and `Accept: text/markdown` negotiation (GitHub Pages cannot vary responses by request header; `functions/_middleware.js` does this on Cloudflare Pages only).

## [1.0.0] - 2026-11-16

First release of the temporary GitHub Pages mirror at `isratijk.github.io`, hosted here while `isratjahankhan.com` is in redemption. Built from the main site's source, with the hosting, design and SEO changes below.

### Hosting (GitHub Pages)
- Repository now holds the full site source instead of a redirect to `isratjahankhan.com`.
- All media from `cdn.isratjahankhan.com` (27 images, 4 publication PDFs) lives in `public/images/` and `public/pdfs/`. `VITE_CDN_BASE_URL` is set in `.env.production` (`https://isratijk.github.io`) and `.env.development` (empty, served from `public/`), so data files are unchanged.
- Every site URL (canonical, Open Graph, JSON-LD, sitemap, `llms.txt`, `llms-full.txt`, `ai.txt`, `auth.md`, `.well-known/*`) points to `https://isratijk.github.io`.
- `.github/workflows/deploy.yml` builds on every push to `main` and deploys with GitHub Pages Actions. Requires Settings → Pages → Source: "GitHub Actions".
- Removed Vercel Analytics, Speed Insights and the Umami script; they depend on Vercel rewrites. `vercel.json`, `functions/` and `public/_headers` are kept for the move back but are unused here.
- Removed the unused `cvPdf` field from `src/data/profile.ts`; the file never existed on the CDN and no page linked to it.

### SEO and AI accessibility
- **Prerendered routes.** New `scripts/prerender.mjs` (runs as `postbuild`) loads every route from `src/App.tsx` in headless Chrome and writes `dist/<route>.html`. Crawlers and AI agents that don't run JavaScript now get full page content (~1,100 words per page) instead of an empty `#root`.
- Each prerendered page carries its own title, description, canonical and Open Graph tags; the homepage copies of those tags are removed. Previously every route's raw HTML pointed its canonical at `/`.
- `/about` (and every other route) is served from `about.html` with a 200. The old folder layout answered `/about` with a 301 to `/about/`.
- `dist/404.html` is the unrendered app shell, so unknown paths show the NotFound page.
- CI sets `PRERENDER_REQUIRED=1`, so the build fails rather than shipping empty pages if Chrome is missing. Adds dev dependency `playwright-core`; replaces `scripts/spa-fallback.mjs`.
- `llms.txt` and `llms-full.txt` no longer mention a CV PDF.

### Design
- **Typography.** Replaced Playfair Display, Inter and Space Mono with Source Serif 4 (headings), Source Sans 3 (body) and Source Code Pro (labels, dates, tags). Headings use slightly tighter tracking and balanced wrapping; optical sizing is on. Removed the IBM Plex digits-only font and its `@font-face`, no longer needed with Source's lining figures.
- **Dark mode.** Neutral, low-saturation surfaces instead of an all-navy palette. Cards use `bg-card`, a step lighter than the page, with a faint top edge; brighter borders and secondary text (contrast on cards 5.6 → 8.2); brighter accent blue. New `gold-foreground` token (white in light mode, dark navy in dark mode) for text on blue buttons, which keeps them readable. Footer text brightened. Light mode is unchanged.
- **Page hero illustrations.** New `src/components/HeroGraphic.tsx` with a themed line-art scene for each inner page (About, Education, Experience, Research, Publications, Projects, Gallery, CV, Contact), shown on the right of `PageHero` at `lg` and up via a new `graphic` prop. On Projects and Publications the hero buttons move under the subtitle at that width. Hidden on smaller screens.
- **Experience sidebar.** `/experience` is two columns on desktop: the timeline plus a sticky sidebar with counts (positions, institutions, start year), a research/teaching split bar, an institutions list with logos, and a link card to `/cv`. All values are derived from `src/data/experience.ts`. `CompanyLogo` accepts size overrides through `cn()`.
- Removed the Active / Archived / In Progress status badges from `/projects` cards and the project dialog. The `status` field stays in the data.

### Motion and interaction
- `transition-all` replaced with property-specific transitions across the site; default easing is now a stronger ease-out (`cubic-bezier(0.23, 1, 0.32, 1)`), exposed as `--ease-out` / `--ease-in-out` and Tailwind `ease-out` / `ease-in-out`.
- Press feedback (`active:scale-[0.97]`) on buttons, pills and icon buttons.
- Shorter hover durations (cards 300 → 200ms); image hover zoom reduced to `scale(1.03)` over 300ms.
- Home hero entrance is staggered again with short, non-uniform delays (0–215ms), over 12px instead of 24px. Content is visible within about half a second.
- Mobile menu enters in 200ms and exits in 150ms with ease-out (was `ease-in` on exit). Dialogs use the same ease-out.
- `prefers-reduced-motion`: entrances become plain fades and smooth scrolling is turned off.
- No grey tap highlight on mobile (`-webkit-tap-highlight-color: transparent`).

## Earlier changes (from the main site repository)

### Added
- `/experience` page (`src/pages/ExperiencePage.tsx`) showing the professional experience timeline from `src/data/experience.ts`. Lazy-loaded route in `src/App.tsx`, "Experience" link in the header (desktop and mobile) with hover preload. Sitemap picks the route up automatically.
- Company/org logos and links on experience entries. `Experience` gets `logo` (CDN, `/images/logos/`) and optional `companyUrl`. New shared `CompanyLogo` component falls back to the company initial if the image fails to load. Rendered on `/experience` and the home-page Experience section.
- `/education` page (`src/pages/EducationPage.tsx`) with its own route and header link. `Education` data gets optional `institutionUrl` and `logo`; institution name links out and the logo shows on `/education` and the home-page Education section.

### Changed
- Header nav collapses to the hamburger menu below the `xl` breakpoint (was `lg`) to fit the extra Experience and Education links.
- **Single source of truth for experience, education and awards.** Pages read from `src/data/experience.ts`, `education.ts` and `awards.ts`; no page or component keeps its own copy of that content. Editing a data file updates every page that shows it.
- `/cv` experience and education sections replaced with link cards pointing to `/experience` and `/education`. Awards and skills remain on `/cv`.
- Home-page profile photo hover effect (`src/pages/Home.tsx`): photo zooms, card lifts with a gold border and deeper shadow, offset frames drift outward, gradient overlay fades. Tailwind `group-hover` only, no new CSS or JS; disabled under `prefers-reduced-motion`.
- About page education cards show the institution logo and link, and the section link now points to `/education`.
- Tailwind `future.hoverOnlyWhenSupported` enabled in `tailwind.config.ts`: all `hover:` and `group-hover:` styles now apply only on devices with real hover (`@media (hover: hover) and (pointer: fine)`). Fixes hover effects sticking after a tap on touch screens.
- **Touch feedback, site-wide.** `src/lib/touch-press.ts` (initialised in `src/main.tsx`) sets `data-touched="true"` on the touched element and its ancestors, and clears it 450ms after release, mirroring `:hover`. Every `hover:` / `group-hover:` class in live pages and shared components (Header, Footer, PageHero, ThemeToggle) has a matching `data-[touched=true]:` / `group-data-[touched=true]:` class, so cards, buttons and links react to taps on touch devices and then revert. Includes the home profile photo (now a `ProfilePhoto` component) and the `/projects` cards. `src/components/ui/` is untouched.
- Gallery: on devices without hover (`@media (hover: none)`) image captions are always visible, since the hover-only reveal was unreachable on touch.
- **Dead code removed:** unrouted `src/pages/Index.tsx` and the section components only it used (`Hero`, `About`, `Research`, `Publications`, `Experience`, `Education`, `Projects`, `Awards`, `Contact`), the unused `NavLink`, unused shadcn primitives (`button`, `input`, `label`, `separator`, `sheet`, `skeleton`, `toggle`) and the `use-mobile` hook. `/` is served by `src/pages/Home.tsx`.
- **Dependencies pruned** (41 direct packages, ~1,800 lockfile lines): removed unused Radix primitives, `recharts`, `react-hook-form`, `zod`, `@hookform/resolvers`, `date-fns`, `cmdk`, `vaul`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `class-variance-authority`, `sonner`, `@tanstack/react-query` and `@tailwindcss/typography`. Removed the never-used `QueryClientProvider`, `TooltipProvider`, toast/sonner providers from `App.tsx` and their `ui/` files plus `use-toast`. Remaining direct dependencies: `@radix-ui/react-dialog`, Vercel analytics/speed-insights, `clsx`, `lucide-react`, `next-themes`, React, `react-helmet-async`, `react-router-dom`, `tailwind-merge`, `tailwindcss-animate`.
- `tailwind.config.ts` imports `tailwindcss-animate` instead of `require()` (fixes the ESLint `no-require-imports` error).
- Route-loading fallback in `App.tsx` no longer renders the footer. In light mode the dark navy footer was flashing at the bottom of the viewport while a lazy page chunk loaded, then jumping away when the page rendered.
- Theme flash on reload: `next-themes` sets the `dark` class with an inline script, which the CSP (`script-src 'self'`) blocks, so dark-mode users saw a light first paint that flipped to dark after React mounted. New `public/theme-init.js`, loaded synchronously from `<head>` in `index.html`, applies the stored/system theme before first paint (same `theme` storage key and `class` strategy as `next-themes`). CSP unchanged.
- Inline `<style>` in `index.html` gives `<html>` the same background as the app (`--background`, light and dark) so the canvas never shows the browser's default colour before the stylesheet applies (visible as a grey/dark flash on reload, mostly in dev where CSS is injected by JS). Keep in sync with `--background` in `src/index.css`.
- Removed the staggered entrance animation from `PageHero` (label, title, subtitle, actions) and the animation delays on the home hero. The page chrome painted instantly while hero text started at `opacity: 0` and faded in over ~0.6s, so the top of every page looked like an empty dark band flashing on reload and navigation (confirmed with frame-by-frame screencast captures in dark mode). Home hero elements now fade in together.

### SEO and LLM content
- Sitemap: `/education` and `/experience` discovered automatically; priority `0.8` set in the script `overrides`; organization logos added as `<image:image>` entries (deduplicated) for both routes.
- `index.html` JSON-LD: `WebSite.hasPart` lists all site pages; `Person.affiliation` adds ELITE Research Lab; description mentions the Student Researcher role.
- `public/llms.txt` and `public/llms-full.txt`: new "Site Pages" section covering every route; experience and education entries link to the organization websites and to `/experience` and `/education`.
- Each new page has its own title, description, canonical and Open Graph tags via `react-helmet-async`.
- `README.md` and `AI-AGENT-ACCESSIBILITY.md` updated for the new pages and the manual-sync note.

### Known gaps
- When adding a `hover:` or `group-hover:` class, also add the `data-[touched=true]:` / `group-data-[touched=true]:` twin so it works on touch.
- `public/llms.txt`, `public/llms-full.txt` and the JSON-LD in `index.html` are still maintained by hand and can drift from `src/data/`.
