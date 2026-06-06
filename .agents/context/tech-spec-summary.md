# Tech Spec Summary (landing-page project)

- **Framework:** TanStack Router (file-based) + Vite + React 19
- **Styling:** Tailwind CSS v4 (`@theme` in `src/index.css` mirrors the
  dashboard's `globals.css` token table 1:1)
- **State (client):** TanStack Query for build-time-embedded data
  revalidation only
- **Validation:** Zod (CMS schema, form schemas, env parsing)
- **Forms:** react-hook-form + @hookform/resolvers/zod
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Linting:** ESLint with `--max-warnings=0`
- **Build:** `NODE_OPTIONS=--max-old-space-size=512` to fit Biznet's
  low-RAM shared plan
- **Output:** Static `dist/` (no Node process at runtime)
- **Languages:** Indonesian (default `/`) + English (`/en`)
- **CMS:** Read-only consumer of
  `https://admin.dutateknologimandiri.com/api/landing-page`
  (12 documented section keys: HERO, ABOUT, SERVICES, WHY_US, PROCESS,
  STATS, TESTIMONIALS, CLIENTS, PARTNERS, IMAGE_GALLERY, FAQ, CTA_BANNER)
- **Images:** Absolute URLs from the admin CDN, lazy-loaded
- **Contact:** Pure `mailto:` form, no server

## Architecture
- File-based routes in `src/routes/` (TanStack Router)
- Server-only CMS client in `src/lib/cms.ts`
- Build-time data fetch in `scripts/prerender.ts`
- Pre-rendered HTML + JSON-embedded data for client hydration
- Section components in `src/components/sections/` (one per CMS key)
