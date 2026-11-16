/**
 * Cloudflare Pages Middleware — Markdown for Agents
 *
 * Requests with Accept: text/markdown receive llms-full.txt content
 * with Content-Type: text/markdown instead of the SPA HTML.
 * Only intercepts HTML page routes (paths without a file extension).
 *
 * Docs: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/
 */
export async function onRequest(context) {
  const { request, next, env } = context;
  const accept = request.headers.get("Accept") ?? "";
  const url = new URL(request.url);

  // Only intercept SPA page routes — skip static assets (.txt, .json, .xml, etc.)
  const isPageRoute = !url.pathname.match(/\.\w+$/);

  if (accept.includes("text/markdown") && isPageRoute) {
    try {
      const assetUrl = new URL("/llms-full.txt", url.origin);

      // env.ASSETS is the Cloudflare Pages static asset binding — prefer it over fetch()
      const response = env.ASSETS
        ? await env.ASSETS.fetch(new Request(assetUrl.toString()))
        : await fetch(assetUrl.toString());

      if (response.ok) {
        const text = await response.text();
        return new Response(text, {
          status: 200,
          headers: {
            "Content-Type": "text/markdown; charset=utf-8",
            "Vary": "Accept",
            "Cache-Control": "public, max-age=3600",
            "X-Content-Source": "llms-full.txt",
            // Approximate token count (1 token ≈ 4 chars)
            "X-Markdown-Tokens": String(Math.ceil(text.length / 4)),
          },
        });
      }
    } catch {
      // Fall through to normal HTML response
    }
  }

  return next();
}
