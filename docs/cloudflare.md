# Cloudflare Configuration

All rules apply to the `cdn.isratjahankhan.com` zone unless noted.

---

## 1. WAF Custom Rule — Hotlink Protection

**Location:** Security → WAF → Custom rules

Blocks image hotlinking from unknown referrers. Allows the production domain and localhost dev.

**Expression:**
```
(not http.referer contains "isratjahankhan.com" and not http.referer contains "localhost" and http.referer ne "" and http.host eq "cdn.isratjahankhan.com")
```

**Action:** Block  
**Order:** 1 (run before rate limiting)

---

## 2. Rate Limiting Rule — CDN

**Location:** Security → WAF → Rate limiting rules

Prevents abuse/scraping of CDN assets.

| Field | Value |
|-------|-------|
| Expression | `http.host eq "cdn.isratjahankhan.com"` |
| Requests | 100 per 10 seconds per IP |
| Action | Managed Challenge |
| Mitigation duration | 1 minute |

Tighter rule for image paths (add as second rule, lower priority):

| Field | Value |
|-------|-------|
| Expression | `http.host eq "cdn.isratjahankhan.com" and http.request.uri.path matches "^/public/images/"` |
| Requests | 50 per 10 seconds per IP |
| Action | Block |
| Mitigation duration | 1 minute |

---

## 3. Cache Rule — CDN Assets

**Location:** Caching → Cache Rules

Forces Cloudflare to cache all CDN responses (R2 assets are immutable — versioned by filename).

| Field | Value |
|-------|-------|
| Expression | `http.host eq "cdn.isratjahankhan.com"` |
| Cache status | Cache everything |
| Edge TTL | 1 year (override origin) |
| Browser TTL | 1 year |

---

## 4. Scrape Shield

**Location:** Security → Scrape Shield

| Setting | Value |
|---------|-------|
| Hotlink Protection | **Off** |

Disabled because the WAF custom rule (rule 1 above) handles hotlink blocking with proper localhost/production exceptions. Scrape Shield Hotlink Protection has no exception mechanism and independently blocks cross-origin loads — including localhost dev.

---

## 5. Security Headers

Set via `vercel.json` on the main `isratjahankhan.com` domain (Vercel handles these, not Cloudflare):

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()`
- `Content-Security-Policy` — see `vercel.json` for full directive
