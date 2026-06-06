# TASK-003 Implementation Notes

## Deviations from design
- **Zod 4 vs Zod 3.** The dashboard uses Zod 3. The landing page
  pulls Zod 4 (latest). The `safeParse` API is the same; only the
  type-level API differs. The schemas here are written to Zod 4.
- **`@types/node` was needed** for `process.env` access in
  `cms.ts`. Added `node` to the tsconfig types.
- **No TanStack Router in v1.** The original spec mentioned TanStack
  Router for file-based routes. v1 ships a single-route app, so
  TanStack Router was deferred to v1.1. The CMS client is
  framework-agnostic and will plug into TanStack Router loaders in
  v1.1.

## Known issues
- **No live API test.** The live `getLandingPage()` path is
  implemented and code-reviewed, but not exercised in the build
  because the admin API is not yet reachable from this environment.
  The stub fallback masks the issue. Manual verification with a
  live API URL is required before deploy.

## Follow-ups
- TASK-004: SEO + sitemap + robots + contact page
- TASK-005: Vitest + Playwright tests + deploy doc
