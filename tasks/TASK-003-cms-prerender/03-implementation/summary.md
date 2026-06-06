# TASK-003 Implementation Summary

## What was built
- `src/lib/cms-schema.ts` — Zod schema for the public API response
  (`PublicSection` and `PublicSectionItem`). Uses Zod 4's
  `safeParse` and throws on validation failure.
- `src/lib/cms.ts` — server-only client with `getLandingPage()` and
  `getLandingPageSection(key)`. Typed `CmsError` for network, http,
  and parse failures. Timeout via AbortController.
- `scripts/prerender.ts` — build-time data fetch with stub fallback
  when `CMS_API_BASE_URL` is unset. Injects the data as
  `<script id="__CMS_DATA__">` in both id and en HTML files.
- `src/App.tsx` — reads the embedded data at runtime via
  `document.getElementById("__CMS_DATA__")`; falls back to the stub
  for demo mode.
- `package.json` build script: `tsc -b && vite build && npx tsx scripts/prerender.ts`.
- `tsconfig.app.json`: added `node` to `types`.

## Key decisions
- **Stub fallback in prerender.** When `CMS_API_BASE_URL` is unset
  (e.g., during local demo or initial Biznet deploy), the
  prerender uses the local typed stub. This keeps the build
  working in demo mode.
- **Hard-fail on live API error.** When the API URL is set and the
  response is invalid or unreachable, the build fails loudly.
- **Runtime reads embedded data, not the API.** The browser never
  calls the admin API directly; the build embeds the data.

## Verification
- [x] `npm run lint` passes
- [x] `npm run build` succeeds end-to-end
- [x] Build is idempotent (same SHA on rerun)
- [x] `dist/cms-data.json` is written
- [x] `<script id="__CMS_DATA__">` is in both `dist/index.html` and `dist/en/index.html`
- [x] Canonical and hreflang tags are correct in both pages
