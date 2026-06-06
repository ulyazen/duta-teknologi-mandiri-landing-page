# TASK-005 Design

## Test plan
- Vitest: `cms.test.ts` (5 cases), `seo.test.ts` (3 cases)
- Playwright: `home.spec.ts` (3 cases), `contact.spec.ts` (3 cases)
- Total: 14 test cases

## Files
- `vitest.config.ts` — node env for cms, jsdom env for seo
- `playwright.config.ts` — `npm run start` on port 5000
- `src/lib/cms.test.ts` — Zod parse + network/http error simulation
- `src/lib/seo.test.ts` — JSON-LD validity
- `e2e/home.spec.ts` — page loads, hero visible, locale switch
- `e2e/contact.spec.ts` — form renders, validation, mailto URL

## Deploy doc
- Local laptop: `npm install && npm run build`, then upload `dist/`
  via hPanel File Manager or FTP
- Biznet hPanel: clone the repo, hPanel runs `npm install` and
  `npm run build` automatically, then serves `dist/` as static

## README
- Project intro
- Dev workflow (npm run dev)
- Build (npm run build)
- Tests (npm run test, test:e2e)
- Deploy (laptop + Biznet)
- Agent pipeline reference (link to runbook)
