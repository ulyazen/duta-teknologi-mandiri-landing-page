# TASK-003 Design

## Architecture

### Data Flow
```
build (npm run build)
  |
  v
scripts/prerender.ts
  | 1. If CMS_API_BASE_URL set: call getLandingPage() -> Zod validate -> PublicSection[]
  | 2. Else: use STUB_SECTIONS (typed stub)
  |
  v
dist/cms-data.json
  |
  v
vite build reads index.html template
  |
  v
prerender injects <script id="__CMS_DATA__">...</script> + canonical URL
  |
  v
dist/index.html (lang=id) and dist/en/index.html (lang=en)
  |
  v
Browser loads HTML -> script tag carries data -> App reads at runtime
```

### API Contracts
- `getLandingPage(opts?: { signal?, timeoutMs? }) -> Promise<{ sections: PublicSection[], fetchedAt: string }>`
- `getLandingPageSection(key, opts?) -> Promise<PublicSection>`
- `CmsError = { kind: 'network' | 'http' | 'parse', message: string, status? }`
- Env: `CMS_API_BASE_URL` (build-time only).

### File Layout
- `src/lib/cms-schema.ts` — Zod schemas
- `src/lib/cms.ts` — server-only client (guarded against client bundling)
- `scripts/prerender.ts` — build-time data fetch + HTML injection
- `src/App.tsx` — reads `__CMS_DATA__` at runtime, falls back to stub
- `package.json` — chained build script
- `tsconfig.app.json` — types: ["vite/client", "node"]

### Build Constraints
- Memory cap: 512MB
- Time: < 30s on a laptop, < 60s on Biznet hPanel
- Idempotency: same SHA on rerun (no timestamps in output filenames)

### TypeScript Contracts
- `PublicSection` / `PublicSectionItem` from `cms-types.ts`
- `parsePublicSections(input: unknown) -> PublicSection[]`
- `parsePublicSection(input: unknown) -> PublicSection`

## UI Specs
- `App.tsx` reads `__CMS_DATA__` first; falls back to stub for demo.
- Section renderers are mapped by `SectionKey`; unknown keys are skipped.
- `SECTION_ORDER` is the canonical render order; `sortOrder` from CMS
  is used for per-section data ordering inside the renderer, not
  for the order of sections on the page.

## Acceptance
- Build produces `dist/index.html`, `dist/en/index.html`,
  `dist/cms-data.json`, `dist/assets/*`.
- Lint clean. Build idempotent.
- Public-safety: stub payload respects the "Do not expose" list.
