# PRD Summary (adapted for landing-page project)

The original PRD covers the full Procurement & Operations Command Center
(five modules: Landing Page & CMS, PO Import, PO Sell, Stock, Settings).
The **Landing Page & CMS** module is the only one in scope for this
project (duta-teknologi-mandiri-landing-page).

For the landing-page project:
- Scope: a **public, read-only** marketing site that consumes the
  dashboard's CMS API.
- Out of scope: authentication, mutations, financial calculations,
  database access. The landing page has no DB; it is a static-exported
  TanStack Router + Vite + React + Tailwind v4 site.
- Hosting: Biznet Neo Web Hosting (low RAM ~512MB-1GB, no SSH).
- Build: `npm run build` produces `dist/`, uploaded via FTP/hPanel.
