# TASK-004 Implementation Summary

## What was built
- `src/lib/seo.ts` — `buildOrganizationJsonLd`, `buildWebSiteJsonLd`,
  `buildContactPageJsonLd` (typed JSON-LD builders)
- `src/components/contact/ContactForm.tsx` — RHF + Zod + mailto
  with honeypot
- `src/components/pages/ContactPage.tsx` — page shell for /contact
- `src/App.tsx` — routes to ContactPage when pathname is /contact or
  /en/contact
- `scripts/prerender.ts` — extended to:
  - generate 4 pages: /, /en/, /contact/, /en/contact/
  - write sitemap.xml and robots.txt
  - inject JSON-LD and CMS data into every page
  - inject route metadata so App.tsx can read it at runtime

## Key decisions
- **No third-party form service.** `mailto:` is the v1 contract.
- **Honeypot only.** No CAPTCHA in v1; the honeypot catches the
  simple bots.
- **JSON-LD per page type.** Organization on /, WebSite on /en/,
  ContactPage on both /contact/ and /en/contact/.

## Verification
- [x] Lint clean
- [x] Build succeeds and is idempotent
- [x] 4 HTML pages + sitemap + robots + cms-data.json
- [x] Public-safety: form copy is DTM-specific, capability-level
