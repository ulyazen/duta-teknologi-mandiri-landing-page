# DEPLOY

The `dist/` folder produced by `npm run build` is the entire deployable artifact — fully self-contained, no `npm install` needed at runtime. This document covers three hosting patterns, in order of how much control you have over the server.

## TL;DR

```bash
# build
CMS_API_BASE_URL=<your-dashboard-url> npm run build

# upload dist/ to your host
# that's it
```

The output is plain HTML + CSS + JS + fonts. No server-side runtime required for serving. The optional `serve.mjs` is for hosts where you control the start command (Biznet Application Manager, Render, Railway, Fly, a VPS, etc.).

---

## 1. Pure static host (FTP, cPanel File Manager, Cloudflare Pages, Netlify, Vercel, S3)

Upload the **entire contents of `dist/`** to the host's web root. The directory contents:

```
dist/
├── index.html                 # Indonesian home (/)
├── en/index.html              # English home (/en)
├── contact/index.html         # Indonesian contact (/contact)
├── en/contact/index.html      # English contact (/en/contact)
├── cms-data.json              # Cached CMS data (used by client revalidation)
├── sitemap.xml                # SEO
├── robots.txt                 # SEO
├── favicon.svg
├── dtm-logo-mark.svg
├── icons.svg
└── assets/
    ├── index-…css             # Stylesheet (7 KB gzipped)
    ├── index-…js              # Bundle (108 KB gzipped)
    └── files/                 # 8 self-hosted woff/woff2 (Inter + Space Grotesk)
```

After upload, `https://dutateknologimandiri.com/` serves the page.

### SPA fallback (important for routes like `/en/contact/`)

The site is fully prerendered — all 4 routes are static HTML files, so a default static host works without any config. But if you ever add client-routed pages, you'll need an SPA fallback that rewrites unknown paths to `/index.html`:

- **Netlify / Cloudflare Pages**: add a `_redirects` file with `/*  /index.html  200`
- **Vercel**: add a `vercel.json` with rewrites
- **S3 + CloudFront**: error response → `/index.html` with 200
- **Apache / cPanel / Biznet**: see `.htaccess` below
- **Nginx**: `try_files $uri $uri/ /index.html;`

For this site the fallback is purely defensive — every public route is prerendered.

### Apache (Biznet, cPanel, shared hosts)

A `.htaccess` is shipped in `dist/` (alongside this doc) with:
- SPA fallback to `/index.html`
- `Cache-Control: max-age=31536000, immutable` for `/assets/`
- `Cache-Control: max-age=300` for HTML
- HTTPS-friendly defaults (uncomment the redirect if your host runs plain HTTP)

---

## 2. Node.js host with control over the start command (Biznet Application Manager, Render, Railway, Fly, VPS)

The `start` script runs `node scripts/serve.mjs` — a pure-Node static server. Upload these three things:

| Path | Required? | Purpose |
|---|---|---|
| `dist/` | yes | the site |
| `scripts/serve.mjs` | yes | the server (15 KB, zero dependencies) |
| `package.json` | yes | so `npm start` resolves to `node scripts/serve.mjs` |

**No `node_modules` and no `npm install` needed at runtime** — `serve.mjs` uses only `node:http` and `node:fs` (standard library). Verified memory: ~5 MB RSS.

### Biznet Application Manager (cPanel → Setup Node.js App)

1. cPanel → **Setup Node.js App** → Create Application
2. **Node.js version**: 20.x or 22.x or 24.x
3. **Application mode**: Production
4. **Application root**: the folder where you uploaded `package.json` (e.g., `duta-teknologi-mandiri-landing-page`)
5. **Application URL**: `dutateknologimandiri.com` (or a sub-path)
6. **Application startup file**: `scripts/serve.mjs` (or leave blank to use `npm start`)
7. **Environment variables**:
   - `PORT` = `3000` (cPanel usually assigns this; pass-through to `serve.mjs`)
   - `HOST` = `0.0.0.0`
8. Upload `dist/`, `scripts/serve.mjs`, `package.json` to the application root
9. **Restart** the app

### Render / Railway / Fly

Set the start command to:
```
node scripts/serve.mjs
```

Health check: `GET /` returns 200.

### VPS / bare server

```bash
# build (one-time, on your dev machine)
CMS_API_BASE_URL=https://admin.dutateknologimandiri.com npm run build

# upload (example: rsync)
rsync -avz --delete \
  dist/ scripts/serve.mjs package.json \
  user@server:/srv/dtm-landing/

# on the server, under a process manager (systemd / pm2)
cd /srv/dtm-landing
PORT=3000 HOST=0.0.0.0 node scripts/serve.mjs
```

The serve.mjs reads `PORT` and `HOST` from env. Defaults are `3000` and `0.0.0.0`.

For a long-running process, wrap it with `pm2`:
```bash
pm2 start scripts/serve.mjs --name dtm-landing --time
pm2 save
pm2 startup
```

---

## 3. Build env vars

The `build` command needs `CMS_API_BASE_URL` to fetch the prerender data:

| Env var | Required | Default | Notes |
|---|---|---|---|
| `CMS_API_BASE_URL` | for live build | (uses `src/lib/stub-cms.ts`) | e.g. `https://admin.dutateknologimandiri.com` |
| `NODE_OPTIONS` | always | — | `--max-old-space-size=512` on the build VM (Biznet 4 GB LVE is too small for the build — build on a different machine) |

If you don't pass `CMS_API_BASE_URL`, the build falls back to the local stub CMS data. Useful for offline / preview builds but not what you want in production.

### Production build command

```bash
CMS_API_BASE_URL=https://admin.dutateknologimandiri.com npm run build
```

### Rebuild after CMS edit

The landing page is fully prerendered. When admins change content in the dashboard CMS (`/landing-page` workspace), they must trigger a rebuild and redeploy for the changes to appear on the public site. Automate this with a webhook or a scheduled job, or add a "Rebuild & deploy" button to the dashboard.

---

## 4. Local serve (for verification)

```bash
# after npm run build
npm start
# → [serve] listening on http://0.0.0.0:3000  (root: <repo>/dist)
```

`PORT=8080 npm start` to override the port. Visit `http://localhost:3000/`.

---

## 5. Cache strategy (already in serve.mjs and the bundled HTML)

| Path | `Cache-Control` |
|---|---|
| `/assets/*` and `/files/*` (hashed filenames) | `public, max-age=31536000, immutable` |
| HTML, sitemap.xml, robots.txt, cms-data.json | `public, max-age=300` |

The hashed filenames in `/assets/` mean a content hash is in the URL — caching them forever is safe because the URL changes whenever the content does.

---

## 6. Domain & DNS

Point `dutateknologimandiri.com` (and `www.`) to your host. The site works on the apex domain. No CORS / cross-origin issues since the dashboard lives on a different subdomain.

---

## 7. CSP and security headers (recommended)

Static hosts usually let you set response headers. Add these to make the site CSP-clean:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self' https://admin.dutateknologimandiri.com
```

The site uses Google Fonts fallback removed (self-hosted only) and Unsplash for the hero / gallery images, so `img-src https:` is needed. `connect-src` allows the client to revalidate against the live dashboard API (if you wire that in later).

---

## 8. Health check

The server returns `200` for any path that resolves to a real file. Use `GET /` (or `GET /healthz` if you add one) as a health probe. The included `serve.mjs` is safe to expose to load balancers.

---

## 9. File summary

| File | Size | Notes |
|---|---|---|
| `dist/index.html` | 12 KB | Indonesian home, full prerender with embedded CMS data |
| `dist/en/index.html` | 12 KB | English home |
| `dist/contact/index.html` | 12 KB | Indonesian contact form |
| `dist/en/contact/index.html` | 12 KB | English contact form |
| `dist/assets/index-….css` | 36 KB (7 KB gzip) | All styles |
| `dist/assets/index-….js` | 360 KB (108 KB gzip) | React + client router |
| `dist/assets/files/*.{woff,woff2}` | 167 KB | 4 fonts × 2 formats |
| `dist/cms-data.json` | 16 KB | Latest CMS snapshot for client revalidation |
| `dist/sitemap.xml` | <1 KB | 4 routes × 2 locales |
| `dist/robots.txt` | <1 KB | Allows everything; sitemap reference |
| `dist/.htaccess` | <1 KB | Apache SPA fallback + cache hints |
| `scripts/serve.mjs` | 5 KB | The optional Node server |
| **Total dist/** | **~712 KB** | (gzipped wire weight: ~135 KB for the first page) |

The first paint weighs ~135 KB compressed (HTML 4 KB + CSS 7 KB + JS 108 KB + a few KB of fonts/hero image). Subsequent page navigations are <1 KB because the route is fully prerendered.
