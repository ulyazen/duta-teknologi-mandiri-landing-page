# TASK-004 Scope

## Goal
Ship locale-aware SEO, JSON-LD structured data, sitemap.xml,
robots.txt, and a `mailto:`-backed contact form in both Indonesian
and English. The contact form is purely client-side: react-hook-form
+ Zod + a `mailto:` link (no third-party form service, no server).

## Success Criteria
- [ ] `src/lib/seo.ts` exports `buildOrganizationJsonLd`,
      `buildWebSiteJsonLd`, and `buildContactPageJsonLd`.
- [ ] The prerender script produces a `dist/sitemap.xml` and a
      `dist/robots.txt`.
- [ ] The prerender injects the JSON-LD as a `<script
      type="application/ld+json">` block in each page.
- [ ] `dist/contact/index.html` (id) and `dist/en/contact/index.html`
      (en) are produced.
- [ ] `src/components/contact/ContactForm.tsx` uses
      `react-hook-form` + `@hookform/resolvers/zod`.
- [ ] The form has a honeypot field (`website`) that silently noops
      if filled (bot protection).
- [ ] On valid submit, the form builds a `mailto:` URL with subject
      and body and assigns it to `window.location`.
- [ ] `npm run lint` passes (max-warnings=0).
- [ ] `npm run build` succeeds end-to-end.
- [ ] Public-safety: the form's intro copy doesn't claim features
      that the dashboard doesn't have.

## MVP vs Post-MVP
- **In scope (v1):** SEO helpers, sitemap, robots, contact form
  (mailto), contact page route.
- **Post-MVP:** SMTP/Resend integration (replace mailto with a real
  mail handler), per-page metadata (currently the home and contact
  pages only), structured data for individual services or items.

## Module
seo

## Affected Entities
- `src/lib/seo.ts` (new)
- `src/components/contact/ContactForm.tsx` (new)
- `src/components/pages/ContactPage.tsx` (new)
- `src/App.tsx` (route to ContactPage when on /contact or /en/contact)
- `scripts/prerender.ts` (extended to write contact pages, sitemap,
  robots, and inject JSON-LD)
- `index.html` (title/description will be replaced by the prerender)

## Out of Scope
- Tests (TASK-005)
- Deploy doc (TASK-005)
- Real SMTP / Resend integration (post-MVP)
- CAPTCHA / reCAPTCHA (post-MVP; honeypot is sufficient for v1)

## Estimated Complexity
M

## Open Questions
- **Q1 (for design-engineer):** Should the contact page be a single
  column (form) or two columns (form + address card)? Default:
  single column, with the address/email below the form for v1
  simplicity.
- **Q2 (for design-engineer):** Should the JSON-LD be Organization
  on every page, or WebSite on home and ContactPage on contact?
  Default: Organization on /, WebSite on /en/ (because the dashboard
  was id-first), ContactPage on both /contact/ and /en/contact/.
