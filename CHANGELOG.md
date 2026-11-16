# Changelog

Architectural and structural changes. Content-only edits (new publications, gallery items, etc.) are not listed.

## Unreleased

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
