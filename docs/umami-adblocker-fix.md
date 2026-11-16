# Analytics: Ad Blocker Bypass via Self-Proxy

Covers three separate incidents, all resolved by proxying analytics traffic through the site's own domain and keeping event endpoints origin-relative.

---

## Incident 1 — Umami Reporting Zero Visitors

### Problem

Umami was reporting zero visitors despite confirmed real traffic to `isratjahankhan.com`.

### Root Cause

The site loaded Umami's tracking script directly from `cloud.umami.is`:

```html
<script defer src="https://cloud.umami.is/script.js"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1">
</script>
```

All event data was also sent directly to `https://cloud.umami.is/api/send`.

The domain `cloud.umami.is` is present in virtually every major ad blocker filter list (uBlock Origin, AdBlock Plus, Brave Shields, etc.). When a visitor has an ad blocker active:

1. Browser checks the script URL against its filter list.
2. `cloud.umami.is` matches a blocked domain entry.
3. Script never downloads — no tracking occurs at all.

Since ad blockers are extremely common among developers, researchers, and academic audiences (the exact demographic this portfolio targets), the block rate was high enough to make Umami report near-zero traffic despite real visitors.

### What Was Blocked

| Request | Blocked by |
|---|---|
| `GET https://cloud.umami.is/script.js` | Domain block (`cloud.umami.is`) |
| `POST https://cloud.umami.is/api/send` | Domain block (`cloud.umami.is`) |

### How Umami's Script Works

Umami's `script.js` reads two data attributes on its `<script>` tag:

- `data-website-id` — identifies which Umami site to record events for
- `data-host-url` — base URL to send events to; Umami appends `/api/send` to this value

By setting `data-host-url` to a path on the site's own domain and adding a Vercel rewrite that forwards that path to `cloud.umami.is/api/send`, events flow through the site's own domain without ever exposing `cloud.umami.is` to the browser.

### Changes Made

#### `vercel.json` — Proxy Rewrites

Two rewrites added before the SPA catch-all rule:

```json
{ "source": "/p/s",        "destination": "https://cloud.umami.is/script.js" },
{ "source": "/p/api/send", "destination": "https://cloud.umami.is/api/send"  }
```

**Why order matters:** Vercel evaluates rewrites top-to-bottom. Proxy rewrites must appear before `{ "source": "/(.*)", "destination": "/index.html" }`, otherwise the SPA rewrite intercepts them first and serves `index.html`.

**Path choice (`/p/`):** Must not contain words like `analytics`, `track`, `collect`, `beacon`, or `umami` — advanced filter lists target URL patterns in addition to domains.

#### `index.html` — Script Tag

**Before:**
```html
<!-- Umami analytics -->
<script defer src="https://cloud.umami.is/script.js"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1">
</script>
```

**After (final state — see Incident 3 for why `data-host-url` is a relative path):**
```html
<!-- Analytics -->
<script defer src="/p/s"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1"
  data-host-url="/p">
</script>
```

- `src="/p/s"` — loads script from proxy path, never exposing `cloud.umami.is`
- `data-host-url="/p"` — tells Umami to POST events to `/p/api/send` (relative, always current origin)
- Comment changed from "Umami analytics" to "Analytics" — some aggressive blockers scan HTML comments for known tracker names

#### `index.html` — Removed Preconnect Hints

**Before:**
```html
<link rel="preconnect" href="https://cloud.umami.is" crossorigin />
<link rel="dns-prefetch" href="https://cloud.umami.is" />
```

**After:** Both lines removed.

These hints told the browser to pre-resolve `cloud.umami.is` before the script loaded. Ad blockers intercept DNS prefetch hints too, and the hints leak the tracker origin to the browser's network layer even if the script was blocked. With the proxy in place, the browser never needs to know about `cloud.umami.is`.

### Request Flow After Fix

```
Browser
  │
  ├── GET /p/s
  │     └── Vercel rewrite ──► https://cloud.umami.is/script.js
  │           └── script executes, reads data-host-url="/p"
  │
  └── POST /p/api/send  (event data, relative to current origin)
        └── Vercel rewrite ──► https://cloud.umami.is/api/send
              └── Umami records the pageview / event
```

`cloud.umami.is` never appears in any browser-visible URL.

---

## Incident 2 — Vercel Analytics & Speed Insights Blocked

### Problem

After fixing Umami, browser DevTools showed two more blocked requests from a real visitor (iPhone, Chrome 148):

```
GET https://www.isratjahankhan.com/_vercel/insights/script.js      — blocked
GET https://www.isratjahankhan.com/_vercel/speed-insights/script.js — blocked
```

### Root Cause

The site used the official `@vercel/analytics` and `@vercel/speed-insights` React components with default configuration:

```tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// in JSX:
<Analytics />
<SpeedInsights />
```

By default these components load scripts from `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` and POST events to `/_vercel/insights` and `/_vercel/speed-insights/vitals` respectively.

The `/_vercel/` path prefix is present in major ad blocker filter lists as a known Vercel analytics namespace. The scripts load from the same domain as the site — no external domain to block — but ad blockers match on path pattern, not just domain.

### What Was Blocked

| Request | Blocked by |
|---|---|
| `GET /_vercel/insights/script.js` | Path pattern block (`/_vercel/insights/`) |
| `GET /_vercel/speed-insights/script.js` | Path pattern block (`/_vercel/speed-insights/`) |
| `POST /_vercel/insights` | Path pattern block |
| `POST /_vercel/speed-insights/vitals` | Path pattern block |

### How the Fix Was Identified

Both `@vercel/analytics` and `@vercel/speed-insights` expose `scriptSrc` and `endpoint` props specifically for this use case. Inspecting the installed package source confirmed the defaults and how to override them:

```js
// @vercel/analytics/dist/react/index.js
return "/_vercel/insights/script.js";           // default scriptSrc
script.dataset.endpoint = `${basePath}/insights`; // default endpoint

// @vercel/speed-insights/dist/react/index.js
return "/_vercel/speed-insights/script.js";              // default scriptSrc
script.dataset.endpoint = `${basePath}/speed-insights/vitals`; // default endpoint
```

Same proxy technique as Incident 1: add Vercel rewrites for neutral paths, point the components at those paths.

### Changes Made

#### `vercel.json` — Four Additional Proxy Rewrites

```json
{ "source": "/a/s.js",  "destination": "/_vercel/insights/script.js"       },
{ "source": "/a/ev",    "destination": "/_vercel/insights"                  },
{ "source": "/si/s.js", "destination": "/_vercel/speed-insights/script.js" },
{ "source": "/si/ev",   "destination": "/_vercel/speed-insights/vitals"     }
```

#### `src/App.tsx` — Custom scriptSrc and endpoint Props

**Before:**
```tsx
<Analytics />
<SpeedInsights />
```

**After:**
```tsx
<Analytics scriptSrc="/a/s.js" endpoint="/a/ev" />
<SpeedInsights scriptSrc="/si/s.js" endpoint="/si/ev" />
```

The components inject `<script>` tags pointing to the proxy paths. The scripts read `data-endpoint` and POST events to the proxy paths. Vercel forwards both to the real internal endpoints. The `/_vercel/` namespace never appears in any browser-visible URL.

#### `vercel.json` + `index.html` — CSP Cleanup

`https://vitals.vercel-analytics.com` and `https://vitals.vercel-insights.com` were in `script-src` and `connect-src`. These are Vercel's server-side data collection endpoints — they are called by Vercel's infrastructure, never by the browser. They were removed from both the header CSP and the meta CSP tag, tightening the policy:

**Before:**
```
script-src 'self' https://cloud.umami.is https://vitals.vercel-analytics.com;
connect-src 'self' https://cloud.umami.is https://vitals.vercel-analytics.com https://vitals.vercel-insights.com;
```

**After:**
```
script-src 'self';
connect-src 'self';
```

All analytics traffic now originates from `'self'`. No third-party domains needed in CSP.

### Request Flow After Fix

```
Browser
  │
  ├── GET /a/s.js
  │     └── Vercel rewrite ──► /_vercel/insights/script.js
  │           └── script executes, reads data-endpoint="/a/ev"
  │
  ├── POST /a/ev  (pageview / event data)
  │     └── Vercel rewrite ──► /_vercel/insights
  │
  ├── GET /si/s.js
  │     └── Vercel rewrite ──► /_vercel/speed-insights/script.js
  │           └── script executes, reads data-endpoint="/si/ev"
  │
  └── POST /si/ev  (web vitals data)
        └── Vercel rewrite ──► /_vercel/speed-insights/vitals
```

`/_vercel/` never appears in any browser-visible URL.

---

## Incident 3 — Umami Events Silently Blocked by CSP (www vs non-www)

### Problem

After deploying the Incident 1 and 2 fixes, Umami still reported zero visitors. The proxy rewrites were confirmed deployed. DevTools showed `GET /p/s` returning 200 (script loaded). But no `POST /p/api/send` appeared in the Network tab at all.

### Diagnosis

`window.umami` returned an object — the script had initialized. `navigator.doNotTrack` was null — DNT not set. No ad blocker was blocking the script. But events were never sent.

Running `window.umami.track()` manually in the Console produced:

```
s:1 Connecting to 'https://isratjahankhan.com/p/api/send' violates the
following Content Security Policy directive: "connect-src 'self'".
The action has been blocked.

Fetch API cannot load https://isratjahankhan.com/p/api/send. Refused to
connect because it violates the document's Content Security Policy.
```

### Root Cause

The initial `data-host-url` was set to an absolute URL:

```html
data-host-url="https://isratjahankhan.com/p"
```

Umami constructs the event endpoint by appending `/api/send`:

```
https://isratjahankhan.com/p/api/send
```

This is always an absolute URL pointing to the bare domain (no `www`).

The CSP directive is `connect-src 'self'`. The value of `'self'` is the **current page origin** — which includes the scheme, hostname, and port. When a visitor accesses the site via `https://www.isratjahankhan.com`, `'self'` resolves to `https://www.isratjahankhan.com`. The hardcoded absolute URL `https://isratjahankhan.com/p/api/send` is a **different origin** (no `www`) — so the browser blocks the fetch as a CSP violation. The block happens silently at the network layer; the request never appears in the Network tab.

### Fix

Change `data-host-url` from an absolute URL to a relative path:

**Before:**
```html
data-host-url="https://isratjahankhan.com/p"
```

**After:**
```html
data-host-url="/p"
```

Umami appends `/api/send` to whatever value is in `data-host-url`. With a relative path, the resulting fetch URL is `/p/api/send` — relative to the current page origin. Whether the visitor is on `isratjahankhan.com` or `www.isratjahankhan.com`, the fetch stays on the current origin and always satisfies `connect-src 'self'`. Vercel's rewrite rule `{ "source": "/p/api/send", "destination": "https://cloud.umami.is/api/send" }` still matches and proxies the request server-side.

### Change Made

#### `index.html`

```html
<!-- Before -->
<script defer src="/p/s"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1"
  data-host-url="https://isratjahankhan.com/p">
</script>

<!-- After -->
<script defer src="/p/s"
  data-website-id="27d54e9f-5d1f-42ad-a428-4940406c73c1"
  data-host-url="/p">
</script>
```

No changes to `vercel.json` — the rewrite `/p/api/send` → `https://cloud.umami.is/api/send` already covers this path regardless of how the URL was constructed.

### Why This Was Subtle

- The script loaded successfully — `GET /p/s` returned 200.
- Umami initialized — `window.umami` was a populated object.
- `document.querySelector('script[data-website-id]')?.dataset` returned the correct attributes.
- The fetch itself was blocked before it could appear in the Network tab — making it invisible to normal debugging.
- The CSP violation only surfaced by manually calling `window.umami.track()` in the Console, which printed the error.

---

## Complete Proxy Map

| Browser-visible path | Proxies to | Service |
|---|---|---|
| `GET /p/s` | `https://cloud.umami.is/script.js` | Umami script |
| `POST /p/api/send` | `https://cloud.umami.is/api/send` | Umami events |
| `GET /a/s.js` | `/_vercel/insights/script.js` | Vercel Analytics script |
| `POST /a/ev` | `/_vercel/insights` | Vercel Analytics events |
| `GET /si/s.js` | `/_vercel/speed-insights/script.js` | Speed Insights script |
| `POST /si/ev` | `/_vercel/speed-insights/vitals` | Speed Insights Web Vitals |

---

## What This Does Not Fix

- **JavaScript-disabled browsers** — no script runs, no tracking. Expected and unfixable without server-side instrumentation.
- **Network-level blockers** (Pi-hole, DNS sinkholes targeting `isratjahankhan.com` itself) — extremely rare, not worth engineering around.
- **Umami's cookie-free design** — Umami does not use cookies or fingerprinting by design. It will undercount users who visit multiple times in the same session window.

---

## Verification

After deploying, open DevTools → Network tab with an ad blocker active:

1. Visit `isratjahankhan.com` — confirm `GET /p/s`, `GET /a/s.js`, `GET /si/s.js` all return `200` with JavaScript content.
2. Navigate to another page — confirm `POST /p/api/send`, `POST /a/ev`, `POST /si/ev` all return `200`.
3. In Console, run `window.umami.track()` — confirm no CSP errors appear.
4. Check Umami dashboard — visitor counts should now reflect real traffic.
5. Check Vercel Analytics dashboard — same.
6. Repeat steps 1–3 from `www.isratjahankhan.com` to verify www variant works identically.
