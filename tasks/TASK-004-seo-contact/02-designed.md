# TASK-004 Design

## Architecture

### URL map
```
/                  -> id home (12 sections)
/en/               -> en home (12 sections)
/contact/          -> id contact (mailto form)
/en/contact/       -> en contact (mailto form)
/sitemap.xml       -> sitemap
/robots.txt        -> robots
```

### Files
- `src/lib/seo.ts` — JSON-LD builders
- `src/components/contact/ContactForm.tsx` — RHF + Zod + mailto
- `src/components/pages/ContactPage.tsx` — page shell for /contact
- `src/App.tsx` — route by pathname (no router lib in v1)
- `scripts/prerender.ts` — extended

### Contact form contract
- Fields: name, email, company (optional), subject, message,
  website (honeypot)
- Validation: name/email/subject/message required; email format
  validated; max lengths enforced
- Submit: build mailto URL and `window.location.assign(href)`
- Bot protection: hidden honeypot field

### JSON-LD
- /  -> Organization
- /en/  -> WebSite (with publisher)
- /contact/ and /en/contact/  -> ContactPage

## UI Specs
- Contact page: single column, max-w-3xl, large title, intro
  paragraph, form, address/email block at the bottom
- Form: inputs use `rounded-card border border-border`, focus
  border is `accent`
- Submit button: `btn-solid`
- Error messages: `text-error` (the only place red is allowed)

## Acceptance
- Build produces 4 HTML pages + sitemap + robots + cms-data.json
- Lint clean
- Public-safety: form copy is DTM-specific and capability-level
