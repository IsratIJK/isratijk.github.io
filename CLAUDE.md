# CLAUDE.md — Project Knowledge Base

This file is read automatically by Claude Code on every session. It contains everything needed to understand, navigate, and modify this codebase without asking the user.

---

## What This Project Is

Personal academic portfolio website for **Israt Jahan Khan** — prospective PhD student, M.Sc. student at BRAC University, former Lecturer at United International University, Dhaka, Bangladesh. Researcher in Machine Learning, Computer Vision, and AI.

**Live:** [isratjahankhan.com](https://isratjahankhan.com)  
**Repo:** [github.com/IsratIJK/v3](https://github.com/IsratIJK/v3)  
**Deployed on:** Vercel (free tier)  
**CDN:** Cloudflare R2 via `cdn.isratjahankhan.com`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 3 + shadcn/ui + Radix UI |
| Routing | React Router v6 (lazy-loaded pages) |
| SEO | react-helmet-async + JSON-LD in index.html |
| Theming | next-themes (light/dark/system, `class` attribute) |
| Analytics | Vercel Analytics + Umami (both proxied — see below) |
| Performance | Vercel Speed Insights (proxied) |
| Deployment | Vercel |

---

## Environment Variables

Only one env var used:

```
VITE_CDN_BASE_URL=https://cdn.isratjahankhan.com
```

Set in `.env` locally and in Vercel dashboard for production. Referenced in every data file as:

```ts
const CDN = import.meta.env.VITE_CDN_BASE_URL;
```

In `index.html`, Vite replaces `%VITE_CDN_BASE_URL%` at build time (OG image, JSON-LD image).

---

## Routes

All routes defined in `src/App.tsx` with `React.lazy` + `<Suspense>`:

| Path | Component | Data sources |
|---|---|---|
| `/` | `src/pages/Home.tsx` | `profile.ts` |
| `/about` | `src/pages/AboutPage.tsx` | `profile.ts`, `education.ts`, `experience.ts`, `awards.ts` |
| `/research` | `src/pages/ResearchPage.tsx` | `research.ts` |
| `/publications` | `src/pages/PublicationsPage.tsx` | `publications.ts` |
| `/projects` | `src/pages/ProjectsPage.tsx` | `projects.ts` |
| `/education` | `src/pages/EducationPage.tsx` | `education.ts` |
| `/experience` | `src/pages/ExperiencePage.tsx` | `experience.ts` |
| `/cv` | `src/pages/CVPage.tsx` | `education.ts`, `experience.ts`, `awards.ts` |
| `/gallery` | `src/pages/GalleryPage.tsx` | `gallery.ts` |
| `/contact` | `src/pages/ContactPage.tsx` | `profile.ts` |
| `*` | `src/pages/NotFound.tsx` | — |

SPA — Vercel rewrite `"/(.*)" → "/index.html"` catches all routes.

---

## Data Layer

All content lives in `src/data/`. Never hardcode content in components — always go through the data files.

### `src/data/profile.ts`
Single `profile` object (const). Contains name, title, role, institution, location, email, photo URL, CV PDF URL, bio paragraphs array, stats array, social links object.

### `src/data/publications.ts`
`Publication` interface + `publications` array. IDs: `p1`–`p4`. Fields:
- `id`, `slug`, `year`, `title`, `authors`, `venue`, `venueShort`
- `type`: `"Journal"` | `"Conference"`
- `paperLink?` (ResearchGate), `publisherLink` (IEEE/Elsevier)
- `abstract`, `keywords[]`, `doi?`, `citations?`
- `quartile?`: `"Q1"` | `"Q2"` | `"Q3"` | `"Q4"`
- `coverImage` (CDN), `pdfUrl?` (CDN), `featured?`

### `src/data/research.ts`
Research interest cards.

### `src/data/projects.ts`
`Project` interface + `projects` array. IDs: `proj1`–`proj6`. Fields:
- `id`, `slug`, `title`, `category`, `tags[]`, `description`, `longDescription?`
- `tech[]`, `github?`, `demo?`, `docs?`, `coverImage` (CDN)
- `screenshots?[]`, `featured?`
- `status`: `"active"` | `"archived"` | `"in-progress"`

### `src/data/experience.ts`
Work/research experience timeline. Fields include `logo` (CDN, required) and `companyUrl?` (external link). Consumed by `/experience`, `/cv` (link card), and the home-page `Experience` section.

### `src/data/education.ts`
Education timeline + `skills`. Fields include optional `logo` and `institutionUrl`. Consumed by `/education`, `/about`, `/cv` (link card), and the home-page `Education` section.

### `src/data/awards.ts`
Awards and honors. Consumed by `/cv` and the home-page `Awards` section.

Pages must import from these files — never hardcode a copy. `llms.txt`, `llms-full.txt` and the JSON-LD in `index.html` are the only manual copies; update them when these data files change.

### `src/data/gallery.ts`
`GalleryItem` interface + `gallery` array + `galleryCategories` tuple.

**Categories:** `"All"`, `"Conference"`, `"Lab"`, `"Personal"`, `"Moment"`

**Item fields:**
- `id`: sequential, format `g<n>` (current max: `g21`)
- `type`: `"image"` | `"video"` (video needs `poster?` field)
- `src`: `` `${CDN}/images/gallery/<filename>` ``
- `title`, `description?`, `category`, `date` (ISO `"YYYY-MM-DD"`)

**Category guidance:**
- `Conference` — presenting at or attending academic conferences
- `Lab` — lab sessions, project shows, academic work
- `Personal` — convocation, judging, individual milestones
- `Moment` — memorable group/team moments, prize receiving, etc.

**To add a gallery image:** append to `gallery` array with next `g<n>` ID. Image must already be uploaded to `cdn.isratjahankhan.com/images/gallery/`.

---

## CDN Asset Paths

All media served from `cdn.isratjahankhan.com` (Cloudflare R2):

```
/images/profile/          — profile photo, OG image
/images/gallery/          — gallery images
/images/publications/     — publication cover images
/images/projects/         — project cover images
/images/logos/            — company/org logos (experience.ts)
/pdfs/publications/       — publication PDFs
/documents/               — CV PDF
```

CDN is protected by Cloudflare WAF hotlink protection — only requests from `isratjahankhan.com` and `localhost` are allowed (see `docs/cloudflare.md`).

---

## Build Process

### Prebuild: Sitemap Auto-generation

`scripts/generate-sitemap.mjs` runs automatically before every build via npm lifecycle:

```json
"prebuild": "node scripts/generate-sitemap.mjs"
```

The script is fully automatic — no route list to maintain:
1. Discovers routes from `<Route path=...>` in `src/App.tsx` (skips `*` and `:param` routes)
2. Follows each page's static imports to find its source files (page + data files + page-specific components; shell components shared by every route like `Layout`, `Header` are ignored)
3. `lastmod` = last commit date touching those files (`git log -1`); uncommitted changes → today
4. Vercel shallow-clones the repo, so the script runs `git fetch --unshallow` first; if that fails, dates landing on the shallow boundary fall back to the previously committed `sitemap.xml` value
5. Adds `<image:image>` entries from CDN URLs in data files (profile photo, publication/project covers, gallery images/video posters)
6. Writes `public/sitemap.xml` and `public/sitemap.md` (markdown sitemap for agents; page titles/descriptions come from the `overrides` map)

**Never manually edit `public/sitemap.xml` or `public/sitemap.md`** — both are overwritten on every build.

Optional priority/changefreq tweaks live in the `overrides` map at the top of the script (default `0.7`/`monthly`). Debug the route → file mapping with `SITEMAP_DEBUG=1 node scripts/generate-sitemap.mjs`.

### Build commands

```bash
npm run dev          # dev server at localhost:8080
npm run build        # runs prebuild then vite build
npm run build:dev    # dev-mode build
npm run preview      # preview production build locally
npm run lint         # ESLint
```

---

## Analytics Proxy (Critical)

All analytics traffic is proxied through the site's own domain to bypass ad blockers. **Do not change these paths — ad blockers target keyword patterns in URLs.**

### Proxy map (`vercel.json` rewrites)

| Browser-visible path | Proxies to | Service |
|---|---|---|
| `GET /p/s` | `https://cloud.umami.is/script.js` | Umami script |
| `POST /p/api/send` | `https://cloud.umami.is/api/send` | Umami events |
| `GET /a/s.js` | `/_vercel/insights/script.js` | Vercel Analytics script |
| `POST /a/ev` | `/_vercel/insights` | Vercel Analytics events |
| `GET /si/s.js` | `/_vercel/speed-insights/script.js` | Speed Insights script |
| `POST /si/ev` | `/_vercel/speed-insights/vitals` | Speed Insights Web Vitals |

### index.html — Umami
```html
<script defer src="/p/s"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1"
  data-host-url="/p">
</script>
```
`data-host-url` **must be a relative path** (`/p` not `https://isratjahankhan.com/p`). Absolute URL breaks CSP on `www.` variant. See `docs/umami-adblocker-fix.md`.

### src/App.tsx — Vercel Analytics + Speed Insights
```tsx
<Analytics scriptSrc="/a/s.js" endpoint="/a/ev" />
<SpeedInsights scriptSrc="/si/s.js" endpoint="/si/ev" />
```

---

## Content Security Policy

Defined in two places (must stay in sync):

1. **`vercel.json`** — `Content-Security-Policy` response header (enforced)
2. **`index.html`** — `<meta http-equiv="Content-Security-Policy">` (fallback)

Current effective policy:
```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob: https://cdn.isratjahankhan.com;
media-src https://cdn.isratjahankhan.com;
connect-src 'self';
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests
```

`connect-src 'self'` covers all analytics because they all POST to `/p/api/send`, `/a/ev`, `/si/ev` — same origin. Never add third-party domains back.

---

## vercel.json Structure

```
headers  →  cache rules, CSP, security headers, Link headers (RFC 8288)
rewrites →  analytics proxies (must come before SPA catch-all)
           SPA catch-all: "/(.*)" → "/index.html" (always last)
```

Rewrite order matters: Vercel evaluates top-to-bottom. If the SPA catch-all is first, proxy rewrites never fire.

---

## SEO & AI Accessibility

### index.html head
- Full OG + Twitter Card meta tags
- Canonical URL
- JSON-LD `@graph`: `WebSite`, `ProfilePage`, `Person`, `ItemList` of `ScholarlyArticle`
- RFC 8288 `<link>` tags for `api-catalog`, `agent-skills`, `llms.txt`, `llms-full.txt`, `auth.md`

### public/ static files
- `robots.txt` — 40+ bot allow rules + catch-all
- `sitemap.xml` / `sitemap.md` — auto-generated at build (see above)
- `AGENTS.md` — guidance for AI agents reading the site (served at `/AGENTS.md`; not a coding-agent file)
- `ai.txt` — Spawning-compatible AI training consent
- `llms.txt` — LLM-readable summary (llmstxt.org spec)
- `llms-full.txt` — full portfolio content for LLMs
- `auth.md` — agent auth metadata (site is fully public, no auth)
- `.well-known/api-catalog` — RFC 9727 API catalog
- `.well-known/agent-skills/index.json` — Agent Skills Discovery v0.2.0
- `.well-known/mcp/server-card.json` — SEP-1649 MCP server card

Full documentation: `AI-AGENT-ACCESSIBILITY.md`

### Cloudflare infrastructure
Full WAF, rate limiting, cache rules: `docs/cloudflare.md`

### Analytics ad-blocker bypass history
Root cause analysis + all three incidents: `docs/umami-adblocker-fix.md`

---

## Person: Israt Jahan Khan

| Field | Value |
|---|---|
| Email | isratjahankhanijk@gmail.com |
| Institution | BRAC University (M.Sc.) |
| Alma mater | United International University (B.Sc., Summa Cum Laude, CGPA 3.97/4.00) |
| Location | Dhaka, Bangladesh |
| Research | Machine Learning, Computer Vision, Deep Learning, Interdisciplinary AI |
| LinkedIn | linkedin.com/in/isratijk |
| GitHub | github.com/IsratIJK |
| Google Scholar | scholar.google.com/citations?user=n4mCE9QAAAAJ |
| ORCID | 0000-0003-2757-3776 |
| ResearchGate | researchgate.net/profile/Israt-Khan-5 |
| Twitter/X | @IsratIJK |

### Publications (4 total)

| ID | Year | Title | Venue | DOI | Citations |
|---|---|---|---|---|---|
| p1 | 2025 | Enhanced ROI guided deep learning model for Alzheimer's detection using 3D MRI images | Elsevier IMU | 10.1016/j.imu.2025.101650 | 12 |
| p2 | 2024 | SafeTrax: Smart Collision Prediction and Alert System Using IoT | IEEE Access | 10.1109/ACCESS.2024.3524676 | 6 |
| p3 | 2024 | Synergetic KDRF Classifier: Random Forest-Based Hybrid Approach | IEEE ICCIT 2024 | 10.1109/ICCIT64611.2024.11021799 | — |
| p4 | 2024 | Vehicle Number Plate Detection and Encryption Using YOLOv8 | IEEE ICEEICT 2024 | 10.1109/ICEEICT62016.2024.10534375 | 12 |

Co-author on all publications: **Md Fahim Bin Amin** (also the developer of this website).

### Awards
- Summa Cum Laude (UIU, 2025)
- Scholarship for Outstanding Result — 11 times (UIU)
- BDT 200,000 Research Grant, IAR-UIU (2024)

---

## Coding Conventions

- No comments unless the WHY is non-obvious
- No docstrings
- All content in `src/data/` — never hardcode in components
- CDN pattern: `` const CDN = import.meta.env.VITE_CDN_BASE_URL `` at top of every data file, then `` `${CDN}/path/to/asset` ``
- IDs are sequential within their domain (`g21` for gallery, `p4` for publications, `proj6` for projects)
- Dates in ISO `"YYYY-MM-DD"` format throughout
- TypeScript strict — all data types defined as interfaces/types in the same file as the data
- shadcn/ui components live in `src/components/ui/` — do not modify them directly; extend via wrapper components

---

## How to Add Common Content

### New gallery image
1. Upload image to `cdn.isratjahankhan.com/images/gallery/<filename>`
2. Append to `gallery` array in `src/data/gallery.ts` with next `g<n>` ID
3. Commit — next build regenerates sitemap with updated `/gallery` lastmod

### New publication
1. Upload cover image to CDN, optionally PDF
2. Append to `publications` array in `src/data/publications.ts` with next `p<n>` ID
3. Update citation counts in existing entries if needed

### New project
1. Upload cover image to CDN
2. Append to `projects` array in `src/data/projects.ts` with next `proj<n>` ID

### New page/route
1. Create `src/pages/NewPage.tsx`
2. Add lazy import + `<Route>` in `src/App.tsx`
3. Sitemap picks the route up automatically; optionally set priority/changefreq in `overrides` in `scripts/generate-sitemap.mjs`
4. Add to site nav in `src/components/Header.tsx`
5. Update `public/llms.txt` and `public/llms-full.txt` if content-bearing
