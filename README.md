# Israt Jahan Khan - Personal Academic Website

> **Temporary GitHub Pages mirror.** `isratjahankhan.com` lapsed into redemption, so this repo hosts a copy of the site at [isratijk.github.io](https://isratijk.github.io) until the domain is recovered. Differences from the main repo:
>
> - All media formerly on `cdn.isratjahankhan.com` lives in `public/images/` and `public/pdfs/` (`VITE_CDN_BASE_URL` is set in `.env.production` / `.env.development`).
> - Site URLs point to `https://isratijk.github.io`.
> - Vercel Analytics, Speed Insights and the Umami proxy are removed (they need Vercel rewrites).
> - `.github/workflows/deploy.yml` builds and deploys to Pages; `scripts/spa-fallback.mjs` writes `dist/<route>/index.html` and `dist/404.html` for client-side routing.
> - `vercel.json`, `functions/` and `public/_headers` are kept but unused on GitHub Pages.

Personal academic portfolio website for **Israt Jahan Khan**, a prospective PhD student and researcher in Machine Learning, Computer Vision, and Artificial Intelligence. M.Sc. student at BRAC University and former Lecturer at United International University, Dhaka, Bangladesh. 

**Live site:** [isratijk.github.io](https://isratijk.github.io) (temporary; normally [isratjahankhan.com](https://isratjahankhan.com)) 
 
--- 
     
## About 
   
Multi-page academic portfolio showcasing: 

- **Research interests** - Machine Learning, Computer Vision, Deep Learning, Interdisciplinary AI
- **Publications** - 4 peer-reviewed papers in IEEE and Elsevier with 17+ citations
- **Experience** - Research intern at ELITE Research Lab (promoted from student researcher), research assistant roles and former lectureship at United International University
- **Projects** - Open source and research projects on GitHub
- **Awards** - Summa Cum Laude, 11 merit scholarships, BDT 200,000 research grant
- **Education** - M.Sc. at BRAC University; B.Sc. (Summa Cum Laude, CGPA 3.97/4.00) from United International University
- **Gallery** - Photo gallery from conferences, lab events, and personal milestones
  
---    
       
## Tech Stack 
 
| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build tool | [Vite 8](https://vitejs.dev/) |
| Styling | [Tailwind CSS 3](https://tailwindcss.com/) |
| UI components | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| SEO | [react-helmet-async](https://github.com/staylor/react-helmet-async) + JSON-LD structured data |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) (light / dark / system) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) + [Umami](https://umami.is/) |
| Performance | [Vercel Speed Insights](https://vercel.com/docs/speed-insights) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Project Structure 

```
├── public/
│   ├── favicon.ico
│   ├── robots.txt          # Crawl rules for search engines and AI bots
│   └── sitemap.xml         # Auto-generated at build time (see scripts/)
├── scripts/
│   └── generate-sitemap.mjs  # Prebuild: generates sitemap.xml from git log dates
├── src/
│   ├── assets/             # Images (profile photo, publication thumbnails)
│   ├── components/
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── Header.tsx      # Fixed navigation header with mobile menu
│   │   ├── Layout.tsx      # Page shell (header, footer)
│   │   ├── PageHero.tsx    # Shared page title banner with breadcrumbs
│   │   ├── CompanyLogo.tsx # Organization logo with initial fallback
│   │   ├── ThemeToggle.tsx # Light/dark/system switch
│   │   └── Footer.tsx      # Footer with site navigation
│   ├── lib/                # utils, touch-press (tap feedback)
│   ├── data/
│   │   ├── profile.ts      # Bio, social links, stats
│   │   ├── publications.ts # Publication entries
│   │   ├── research.ts     # Research interest cards
│   │   ├── projects.ts     # Project entries
│   │   ├── experience.ts   # Work/research experience
│   │   ├── education.ts    # Education timeline
│   │   ├── awards.ts       # Awards and honors
│   │   └── gallery.ts      # Gallery image/video entries
│   ├── pages/
│   │   ├── Home.tsx        # / (landing)
│   │   ├── AboutPage.tsx   # /about
│   │   ├── EducationPage.tsx   # /education
│   │   ├── ExperiencePage.tsx  # /experience
│   │   ├── ResearchPage.tsx    # /research
│   │   ├── PublicationsPage.tsx# /publications
│   │   ├── ProjectsPage.tsx    # /projects
│   │   ├── CVPage.tsx          # /cv
│   │   ├── GalleryPage.tsx     # /gallery
│   │   ├── ContactPage.tsx     # /contact
│   │   └── NotFound.tsx    # 404 page
│   ├── App.tsx
│   └── main.tsx
├── index.html              # HTML shell with full SEO meta tags and JSON-LD
└── package.json
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm (or [bun](https://bun.sh/))

```bash
# Clone the repository
git clone https://github.com/IsratIJK/v3.git
cd v3

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The site will be available at `http://localhost:8080`.

### Available scripts

```bash
npm run dev        # Start development server
npm run prebuild   # Generate public/sitemap.xml from git log dates (runs automatically before build)
npm run build      # Production build (runs prebuild first)
npm run build:dev  # Development build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
```

---

## SEO

The site is fully optimised for search engines and AI crawlers:

- **Structured data** - JSON-LD `Person`, `WebSite`, `WebPage`, and `ScholarlyArticle` schemas in `index.html`
- **Open Graph** - full `og:title`, `og:description`, `og:image`, `og:locale`, `og:site_name`
- **Twitter Card** - `summary_large_image` with `twitter:creator`
- **Canonical URL** - `https://isratjahankhan.com/`
- **Sitemap** - auto-generated at build time by `scripts/generate-sitemap.mjs`; routes are discovered from `src/App.tsx`, each route's `lastmod` reflects the last git commit touching its page and data files, and CDN images are included via the image sitemap extension
- **robots.txt** - explicit `Allow` for Googlebot, Bingbot, GPTBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot, anthropic-ai, LinkedInBot, and more
- **Semantic HTML** - `<main>`, `<header>`, `<footer>`, `<nav>`, `<section>` with `aria-label` on every section
- **404 page** - marked `noindex, nofollow`

See [`AI-AGENT-ACCESSIBILITY.md`](./AI-AGENT-ACCESSIBILITY.md) for the full AI/agent discoverability stack (`llms.txt`, `llms-full.txt`, `ai.txt`, RFC 9727, Agent Skills, MCP server card, WebMCP, and more).

---

## Publications

| Year | Title | Venue | DOI |
|---|---|---|---|
| 2025 | Enhanced ROI guided deep learning model for Alzheimer's detection using 3D MRI images | Elsevier - Informatics in Medicine Unlocked | [10.1016/j.imu.2025.101650](https://doi.org/10.1016/j.imu.2025.101650) |
| 2024 | SafeTrax: Smart Collision Prediction and Alert System Using IoT | IEEE Access | [10.1109/ACCESS.2024.3524676](https://doi.org/10.1109/ACCESS.2024.3524676) |
| 2024 | Synergetic KDRF Classifier: A Random Forest-Based Hybrid Approach | IEEE ICCIT 2024 | [10.1109/ICCIT64611.2024.11021799](https://doi.org/10.1109/ICCIT64611.2024.11021799) |
| 2024 | Vehicle Number Plate Detection and Encryption Using YOLOv8 | IEEE ICEEICT 2024 | [10.1109/ICEEICT62016.2024.10534375](https://doi.org/10.1109/ICEEICT62016.2024.10534375) |

---

## Links

- Website: [isratjahankhan.com](https://isratjahankhan.com)
- Google Scholar: [scholar.google.com/citations?user=n4mCE9QAAAAJ](https://scholar.google.com/citations?user=n4mCE9QAAAAJ)
- ORCID: [0000-0003-2757-3776](https://orcid.org/0000-0003-2757-3776)
- ResearchGate: [researchgate.net/profile/Israt-Khan-5](https://www.researchgate.net/profile/Israt-Khan-5)
- LinkedIn: [linkedin.com/in/isratijk](https://www.linkedin.com/in/isratijk/)
- GitHub: [github.com/IsratIJK](https://github.com/IsratIJK)

--- 

## License

This project is the personal portfolio of Israt Jahan Khan. The source code structure may be referenced for learning purposes, but the content (bio, publications, images, and personal information) belongs to Israt Jahan Khan and may not be reproduced without permission.
