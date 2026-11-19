# AI Agent Accessibility

This document describes all measures taken to ensure AI agents, LLMs, and automated crawlers can discover, access, and understand the content of [isratjahankhan.com](https://isratjahankhan.com/).

---

## Summary

| Layer | What | File/Endpoint | Status |
|-------|------|---------------|--------|
| Crawler permissions | `robots.txt` with 40+ explicit bot entries | `/robots.txt` | ✅ |
| AI training consent | `ai.txt` (Spawning-compatible) | `/ai.txt` | ✅ |
| LLM content index | `llms.txt` (llmstxt.org spec) | `/llms.txt` | ✅ |
| LLM full content | `llms-full.txt` | `/llms-full.txt` | ✅ |
| Agent discovery | RFC 9727 API catalog | `/.well-known/api-catalog` | ✅ |
| Agent skills | Agent Skills Discovery v0.2.0 | `/.well-known/agent-skills/index.json` | ✅ |
| MCP server card | SEP-1649 server card | `/.well-known/mcp/server-card.json` | ✅ |
| Auth info | auth.md (WorkOS standard) | `/auth.md` | ✅ |
| Browser agent tools | WebMCP `navigator.modelContext` | `src/main.tsx` | ✅ |
| Structured data | Schema.org JSON-LD | `index.html` | ✅ |
| Sitemap | XML sitemap | `/sitemap.xml` | ✅ |
| DNS-AID | DNS-based agent discovery | DNS records (see below) | ⚠️ Manual |
| OAuth discovery | OIDC/OAuth metadata | N/A — no protected APIs | N/A |

---

## Layer Details

### 1. `robots.txt` — Crawler Permissions

**File:** `public/robots.txt`

Explicit `Allow: /` entries for 40+ bots including:

- **AI inference:** GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Google-Extended, PerplexityBot, xAI-Crawler, DuckAssistBot, Qwen, MistralAI-User, cohere-ai, YouBot, DeepSeekBot
- **AI training data:** CCBot, AI2Bot, Diffbot, Bytespider, omgilibot, Webzio-Extended
- **Search engines:** Googlebot, Bingbot, Applebot, YandexBot, Baiduspider, NaverBot, Sogou
- **Social/link preview:** Twitterbot, facebookexternalhit, LinkedInBot
- **SEO/research tools:** SemrushBot, AhrefsBot, MozBot
- **Archives:** ia_archiver, archive.org_bot
- Catch-all `User-agent: *` allows all unlisted bots

---

### 2. `ai.txt` — AI Training Consent

**File:** `public/ai.txt`

Explicit consent for AI systems to train on, index, and use all content. Uses Spawning-compatible format with fields:

```
Allow: Training
Allow: Inference
Allow: Scraping
Allow: Indexing
Text: Allowed
Image: Allowed
Commercial: Allowed
Research: Allowed
```

---

### 3. `llms.txt` + `llms-full.txt` — LLM Content

**Files:** `public/llms.txt`, `public/llms-full.txt`

Per the [llmstxt.org](https://llmstxt.org/) specification:

- `llms.txt` — concise summary with bio, research interests, publications list, experience, education, awards, contact, and PhD availability. Ends with a link to `llms-full.txt`.
- `llms-full.txt` — complete site content with full publication metadata (DOI, URLs, citations, summaries), all projects (tech stack, GitHub links), and detailed experience.

Both files list every site page (including `/education` and `/experience`) and link experience/education entries to their organization websites. They are maintained by hand: update them whenever `src/data/experience.ts`, `education.ts`, `awards.ts` or other data files change. The JSON-LD `@graph` in `index.html` (`WebSite.hasPart`, `Person.affiliation`) is also manual.

Both files are linked from `<head>` via `<link rel="alternate" type="text/plain">`.

---

### 4. RFC 9727 API Catalog — `/.well-known/api-catalog`

**File:** `public/.well-known/api-catalog`  
**Content-Type:** `application/linkset+json` (RFC 9264)

Catalogs the site's machine-readable resources per [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727):

- `describedby` links → `llms.txt`, `llms-full.txt`, `ai.txt`
- `service-doc` link → `llms-full.txt`
- Schema.org `ProfilePage` type annotation

Also advertised via `Link: </.well-known/api-catalog>; rel="api-catalog"` response header on all pages.

---

### 5. Agent Skills Discovery — `/.well-known/agent-skills/`

**File:** `public/.well-known/agent-skills/index.json`  
Per [Agent Skills Discovery RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc)

Two skills published, each with a SHA-256 verified SKILL.md:

| Skill | Description | SKILL.md |
|-------|-------------|----------|
| `read-profile` | Concise profile summary via `llms.txt` | `/.well-known/agent-skills/read-profile/SKILL.md` |
| `read-full-content` | Full portfolio content via `llms-full.txt` | `/.well-known/agent-skills/read-full-content/SKILL.md` |

Also advertised via `Link: </.well-known/agent-skills/index.json>; rel="agent-skills"` header.

---

### 6. MCP Server Card — `/.well-known/mcp/server-card.json`

**File:** `public/.well-known/mcp/server-card.json`  
Per [SEP-1649](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127)

Describes the site as a read-only MCP resource server. Declares two resources:
- `llms.txt` — profile summary
- `llms-full.txt` — full content

> **Note:** This is a static-resource MCP card. No active MCP server/transport is running. To implement a live MCP server, deploy a Cloudflare Worker with the `@cloudflare/mcp-server-cloudflare` SDK and update `transport.endpoint`.

---

### 7. `auth.md` — Agent Authentication Metadata

**File:** `public/auth.md`  
Per [WorkOS auth.md](https://workos.com/auth-md) standard

Documents that this is a fully public site requiring no authentication. Lists all public endpoints with content types and access instructions for agent implementors.

---

### 8. WebMCP — Browser Agent Tools

**File:** `src/main.tsx`

Registers tools with `navigator.modelContext.provideContext()` for AI agents operating inside the browser:

| Tool | Description |
|------|-------------|
| `get-profile` | Fetches and returns `llms.txt` content |
| `get-full-content` | Fetches and returns `llms-full.txt` content |

Per [WebMCP spec](https://webmachinelearning.github.io/webmcp/) and [Chrome WebMCP EPP](https://developer.chrome.com/blog/webmcp-epp).

---

### 9. JSON-LD Structured Data

**File:** `index.html`

Schema.org `@graph` in `<head>` includes:

- `WebSite` — site metadata
- `["WebPage", "ProfilePage"]` — profile page type with `mainEntity` pointer
- `Person` — full academic profile (name, affiliation, knowsAbout, award, credential, sameAs links to Google Scholar, ORCID, ResearchGate, LinkedIn, GitHub)
- `ItemList` of `ScholarlyArticle` — all 4 publications with DOI, publisher, author, keywords

---

### 10. DNS-AID Records ⚠️ Manual Configuration Required

**Standard:** [DNS for AI Discovery (DNS-AID)](https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/)  
**RFC:** [RFC 9460](https://www.rfc-editor.org/rfc/rfc9460) (SVCB/HTTPS records)

### Cloudflare Dashboard Steps

**Dashboard → isratjahankhan.com → DNS → Records → Add record**

#### Record 1 — Agent Skills Index

| Field | Value |
|-------|-------|
| **Type** | `HTTPS` |
| **Name** | `_index._agents` |
| **Priority** | `1` |
| **Target** | `isratjahankhan.com` |
| **Value** | `alpn="h2,h3"` |
| **TTL** | `Auto` |
| **Proxy** | Off (grey cloud — must NOT be proxied) |

#### Record 2 — A2A / API Catalog

| Field | Value |
|-------|-------|
| **Type** | `HTTPS` |
| **Name** | `_a2a._agents` |
| **Priority** | `1` |
| **Target** | `isratjahankhan.com` |
| **Value** | `alpn="h2,h3"` |
| **TTL** | `Auto` |
| **Proxy** | Off (grey cloud — must NOT be proxied) |

> **If Cloudflare combines Priority + Target + Value into one box**, paste the full line instead:
> ```
> 1 isratjahankhan.com. alpn="h2,h3"
> ```

#### Zone file equivalent (for Import DNS)

```zone
_index._agents.isratjahankhan.com. 3600 IN HTTPS 1 isratjahankhan.com. alpn="h2,h3"
_a2a._agents.isratjahankhan.com.   3600 IN HTTPS 1 isratjahankhan.com. alpn="h2,h3"
```

### Enable DNSSEC

1. **Dashboard → isratjahankhan.com → DNS → Settings**
2. Scroll to **DNSSEC** → click **Enable DNSSEC**
3. If domain is registered at Cloudflare: DS record is added to `.com` automatically
4. If registered elsewhere: copy the DS record values Cloudflare shows and paste into your registrar's DNSSEC settings

### Verify After ~5 Minutes

```powershell
Resolve-DnsName -Name "_index._agents.isratjahankhan.com" -Type HTTPS
Resolve-DnsName -Name "_a2a._agents.isratjahankhan.com" -Type HTTPS
```

Or check at `https://dnschecker.org/` — query type `HTTPS`.

> **Note:** DNS-AID is a draft spec (`draft-mozleywilliams-dnsop-dnsaid`). Few resolvers check it today. Records are forward-compatible and do nothing harmful while the spec matures.

---

### 11. OAuth / OIDC Discovery — N/A

This is a fully static public portfolio with no protected APIs, user accounts, or authentication layer. There is nothing to protect with OAuth/OIDC. Implementing `/.well-known/openid-configuration` or `/.well-known/oauth-protected-resource` for a site with no auth would be misleading to agents.

If a backend or API is added in future, publish:
- `/.well-known/openid-configuration` (OIDC discovery per [OpenID Connect Discovery 1.0](http://openid.net/specs/openid-connect-discovery-1_0.html))
- `/.well-known/oauth-authorization-server` (OAuth 2.0 per [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414))
- `/.well-known/oauth-protected-resource` (per [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728))

---

## File Tree

```
public/
├── robots.txt                          # 40+ explicit bot permissions + catch-all
├── ai.txt                              # AI training/inference consent
├── auth.md                             # Agent authentication metadata
├── llms.txt                            # LLM summary (llmstxt.org spec)
├── llms-full.txt                       # LLM full content
├── sitemap.xml                         # XML sitemap for all routes
└── .well-known/
    ├── api-catalog                     # RFC 9727 API catalog (application/linkset+json)
    ├── mcp/
    │   └── server-card.json            # SEP-1649 MCP server card
    └── agent-skills/
        ├── index.json                  # Agent Skills Discovery v0.2.0 index
        ├── read-profile/
        │   └── SKILL.md               # Skill: get llms.txt
        └── read-full-content/
            └── SKILL.md               # Skill: get llms-full.txt

src/
└── main.tsx                            # WebMCP navigator.modelContext tools

index.html                              # JSON-LD, OG, Twitter Card, meta robots
```

---

## References

| Standard | Link |
|----------|------|
| RFC 8288 — Web Linking | https://www.rfc-editor.org/rfc/rfc8288 |
| RFC 9264 — Linkset | https://www.rfc-editor.org/rfc/rfc9264 |
| RFC 9460 — SVCB/HTTPS DNS records | https://www.rfc-editor.org/rfc/rfc9460 |
| RFC 9727 — API Catalog | https://www.rfc-editor.org/rfc/rfc9727 |
| RFC 9728 — OAuth Protected Resource | https://www.rfc-editor.org/rfc/rfc9728 |
| DNS-AID draft | https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/ |
| llmstxt.org | https://llmstxt.org/ |
| Agent Skills Discovery RFC | https://github.com/cloudflare/agent-skills-discovery-rfc |
| MCP SEP-1649 | https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2127 |
| WebMCP spec | https://webmachinelearning.github.io/webmcp/ |
| WebMCP Chrome EPP | https://developer.chrome.com/blog/webmcp-epp |
| Cloudflare Markdown for Agents | https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/ |
| WorkOS auth.md | https://workos.com/auth-md |
| Spawning ai.txt | https://spawning.ai/ai-txt |
