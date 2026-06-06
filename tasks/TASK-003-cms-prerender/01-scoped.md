# TASK-003 Scope

## Goal
Wire the real CMS API client (Zod-validated), the static prerender
script, and the home page rendering for both Indonesian and English
locales. The page should be a fully static, SEO-friendly site that
fetches CMS content at build time and embeds it in the HTML.

## Success Criteria
- [ ] `src/lib/cms-schema.ts` is a Zod schema mirroring the dashboard's
      `PublicSection` / `PublicSectionItem` types.
- [ ] `src/lib/cms.ts` is a server-only client that calls
      `getLandingPage()` and returns typed `PublicSection[]`.
- [ ] `src/lib/cms.ts` returns a typed `CmsError` on failure
      (network / http / parse).
- [ ] `scripts/prerender.ts` reads CMS data at build time and writes
      `dist/index.html` and `dist/en/index.html` with embedded
      `<script id="__CMS_DATA__">`.
- [ ] `dist/cms-data.json` is written for client-side revalidation.
- [ ] When `CMS_API_BASE_URL` is unset, the prerender falls back to
      the local stub so the build always succeeds in demo mode.
- [ ] The build is memory-capped at 512MB and idempotent.
- [ ] `npm run lint` passes (max-warnings=0).
- [ ] `npm run build` succeeds end-to-end (vite + prerender).

## MVP vs Post-MVP
- **In scope (v1):** Zod schema, CMS client, prerender script,
  embedded data, fallback to local stub.
- **Post-MVP:** TanStack Router file-based routes (the page is a
  single-route app in v1), on-page search, ISR (the prerender is
  full-static in v1), client-side TanStack Query revalidation
  (the data is already embedded; revalidation ships in v1.1).

## Module
cms

## Affected Entities
- `src/lib/cms-schema.ts` (new, Zod)
- `src/lib/cms.ts` (new, server-only client)
- `scripts/prerender.ts` (new)
- `src/App.tsx` (read from `__CMS_DATA__` at runtime, fall back to stub)
- `package.json` (build script chain)
- `tsconfig.app.json` (add `node` to types)

## Out of Scope
- File-based routes (the page is a single-route app in v1).
- Contact page (TASK-004).
- SEO / sitemap / robots (TASK-004).
- Tests (TASK-005).
- Deploy doc (TASK-005).

## Estimated Complexity
L

## Open Questions
- **Q1 (for architect):** Should the prerender use Zod's `safeParse`
  to log validation errors without crashing, or hard-fail? Default:
  hard-fail — a malformed CMS response should never ship.
- **Q2 (for design-engineer):** When the CMS data is embedded, should
  the App.tsx render the data on first paint, or wait for hydration?
  Default: render on first paint (the data is in the DOM before JS
  runs).
