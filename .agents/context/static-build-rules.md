# Static Build Rules (landing-page project only)

This file replaces the dashboard's `calculation-rules.md` because the
landing page has no financial calculations.

## Build memory cap
- `NODE_OPTIONS=--max-old-space-size=512` is mandatory on every `npm run build`.
- Biznet Neo Web Hosting has a low-RAM shared plan (~512MB-1GB).

## Build idempotency
- Running `npm run build` twice produces a byte-identical `dist/`.
- No timestamps in the output. CI builds are reproducible.

## Prerender
- `scripts/prerender.ts` renders all known routes to static HTML
  (Indonesian + English home, contact pages, sitemap.xml, robots.txt).
- The route loader calls `getLandingPage()` at build time. The resolved
  JSON is embedded in a `<script type="application/json" id="__CMS_DATA__">`
  block so the client can revalidate via TanStack Query.
- If the API is unreachable, the build fails loudly (non-zero exit).
  We do not silently ship a half-empty site.

## Output structure
```
dist/
  index.html                  # Indonesian home
  en/index.html               # English home
  contact/index.html          # Indonesian contact
  en/contact/index.html       # English contact
  sitemap.xml
  robots.txt
  assets/                     # Hashed JS/CSS
  dtm-logo-mark.svg
```

## Image loading
- Non-hero images: `loading="lazy" decoding="async" width={W} height={H}`
- Hero image: `loading="eager" fetchpriority="high"`, server-emitted
  `<link rel="preload" as="image">`.

## LCP target
- LCP < 2.5s on 4G. Preload the hero image; lazy-load the rest.
