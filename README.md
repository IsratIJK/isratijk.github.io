# isratijk.github.io

This repository only redirects. Every request to [isratijk.github.io](https://isratijk.github.io) is sent to **[isratjahankhan.com](https://isratjahankhan.com)**.

## How it works

GitHub Pages can't send real server redirects (HTTP 301), so the redirect happens in the browser:

- `index.html` redirects the root page.
- `404.html` is an identical copy. GitHub Pages serves it for any other path, so deep links redirect too. The path, query and hash are kept (`isratijk.github.io/blog/x` → `isratjahankhan.com/blog/x`).
- If JavaScript is off, a `<meta http-equiv="refresh">` sends the visitor to the root of the site.
- A `rel="canonical"` link and `noindex` tell search engines that isratjahankhan.com is the real site.
- `.nojekyll` turns off Jekyll processing.

## Editing

Keep `index.html` and `404.html` identical. After changing one, copy it over the other:

```sh
cp index.html 404.html
```

Do not add a `CNAME` file. It would serve this repo at the custom domain instead of redirecting to it.

## License

See [LICENSE](LICENSE).
