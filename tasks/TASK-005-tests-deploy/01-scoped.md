# TASK-005 Scope

## Goal
Add Vitest unit tests for the CMS client and SEO helpers, Playwright
smoke tests for the home and contact pages, and write a `deploy.md`
plus a final `README.md` so the user can ship the site to Biznet.

## Success Criteria
- [ ] `src/lib/cms.test.ts` covers: valid payload, unknown key
      tolerated, network error, http error, parse error.
- [ ] `src/lib/seo.test.ts` covers: organization JSON-LD, web site
      JSON-LD, contact page JSON-LD (all valid JSON).
- [ ] `e2e/home.spec.ts` covers: home renders hero, locale switch,
      contact link in nav.
- [ ] `e2e/contact.spec.ts` covers: form renders, empty submit
      shows errors, valid submit builds a `mailto:` URL.
- [ ] `deploy.md` documents both the laptop build path and the
      Biznet hPanel build path.
- [ ] `README.md` covers dev workflow, build, deploy, and the
      agent pipeline reference.
- [ ] `npm run lint && npm run test && npm run test:e2e && npm run build`
      all pass.

## MVP vs Post-MVP
- **In scope (v1):** Unit tests, e2e smoke tests, deploy doc,
  README updates.
- **Post-MVP:** Visual regression tests, axe-core accessibility
  tests, performance budgets in CI, Lighthouse CI.

## Module
qa

## Affected Entities
- `src/lib/cms.test.ts` (new)
- `src/lib/seo.test.ts` (new)
- `e2e/home.spec.ts` (new)
- `e2e/contact.spec.ts` (new)
- `vitest.config.ts` (new)
- `playwright.config.ts` (new)
- `deploy.md` (new)
- `README.md` (updated)

## Out of Scope
- Visual regression tests
- Lighthouse CI
- Coverage thresholds in CI

## Estimated Complexity
M

## Open Questions
- **Q1 (for design-engineer):** Should the e2e tests run against the
  production build (`npm run build && npm run start`) or the dev
  server (`npm run dev`)? Default: production build, because
  prerender + static is the actual ship.
