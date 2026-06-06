# TASK-002 Scope

## Goal
Picture the public company profile of **Duta Teknologi Mandiri (DTM)**
on the public site without exposing sensitive operational data. Ship
the design tokens, bilingual static copy, the 12 CMS section
components, the `Nav`/`Footer` shell, and the `LocaleSwitcher`, all
grounded in `.agents/context/company-profile.md` (the public-safe
source of truth).

## Success Criteria
- [ ] `src/styles.css` mirrors the dashboard's `globals.css` `@theme`
      block 1:1 (same color, radius, and font tokens; same component
      classes: `.card-primary`, `.card-bordered`, `.btn-ghost`,
      `.btn-solid`, `.label-uppercase`).
- [ ] Tailwind v4 is wired in (`@import "tailwindcss";` plus the
      `@theme` block; no other CSS framework).
- [ ] `src/content/id.ts` and `src/content/en.ts` are populated with
      DTM-specific copy in capability terms (no invented facts, no
      sensitive data per `company-profile.md`).
- [ ] All 12 section components are present in
      `src/components/sections/` (one file per CMS key): `hero`,
      `about`, `services`, `why-us`, `process`, `stats`,
      `testimonials`, `clients`, `partners`, `gallery`, `faq`,
      `cta-banner`. Each accepts `{ section, locale }` and returns
      `null` when the section is missing.
- [ ] `Nav`, `Footer`, and `LocaleSwitcher` are in
      `src/components/layout/`. Nav and Footer are server-rendered;
      LocaleSwitcher is the only client component in this TASK.
- [ ] `Button` and `Card` primitives in `src/components/ui/` are
      minimal wrappers around `.btn-*` and `.card-*` classes (no
      shadcn).
- [ ] Indonesian and English copy say the same thing in the same tone.
- [ ] `npm run lint` passes (max-warnings=0).
- [ ] `npm run build` succeeds and is memory-capped at 512MB.
- [ ] **Content safety:** every section's copy passes the acceptance
      check in `company-profile.md` (no client names, no vendor
      names, no financial figures, no internal process details, no
      internal module names, no headcount, no year founded, no
      pricing formulas).

## MVP vs Post-MVP
- **In scope (v1):** design tokens, Tailwind v4 wiring, id/en copy,
  12 section components, Nav, Footer, LocaleSwitcher, Button, Card.
- **Post-MVP:** per-section page routes (e.g., `/about`, `/services`),
  on-page search, animations beyond the static layout, A/B testing
  infrastructure, analytics integration, cookie banner (only if a
  third-party script is added).

## Module
ui

## Affected Entities
- `src/styles.css` — Tailwind v4 import + `@theme` block.
- `src/lib/fonts.ts` — self-hosted Inter + Space Grotesk via
  `@fontsource` (or equivalent) so we don't depend on Google Fonts
  from Indonesia.
- `src/content/types.ts` — `Content` interface (nav, footer, meta,
  legal, form, a11y).
- `src/content/id.ts`, `src/content/en.ts` — populated copy.
- `src/content/site.ts` — site config (name, contact email, social
  links).
- `src/lib/utils.ts` — `cn(...)` helper (clsx + tailwind-merge).
- `src/components/layout/Nav.tsx` — server-rendered nav.
- `src/components/layout/Footer.tsx` — server-rendered footer.
- `src/components/layout/LocaleSwitcher.tsx` — client component.
- `src/components/sections/{hero,about,services,why-us,process,stats,testimonials,clients,partners,gallery,faq,cta-banner}.tsx`
  — 12 section components.
- `src/components/ui/Button.tsx` — minimal `.btn-*` wrapper.
- `src/components/ui/Card.tsx` — minimal `.card-*` wrapper.
- `src/App.tsx` — replace the bootstrap placeholder with the
  real shell (Nav + sections + Footer).
- `index.html` — update `<title>` to the localized site name.

## Out of Scope
- CMS client (`src/lib/cms.ts`) — TASK-003.
- Static prerender script (`scripts/prerender.ts`) — TASK-003.
- File-based router (`src/routes/...`) and TanStack Router setup —
  TASK-003. For TASK-002, sections render from a stubbed CMS payload
  in `App.tsx`.
- SEO helpers, sitemap, robots — TASK-004.
- Contact page, mailto form — TASK-004.
- Tests — TASK-005.
- Deploy doc, README updates — TASK-005.
- Adding new design tokens (no new colors, no new radii, no new
  fonts). The dashboard's `DESIGN.md` is the only source of truth.
- Animations beyond the static layout. No scroll-reveal, no carousel,
  no count-up. (TASK-002 ships a quiet, content-first page.)
- Dark mode (the dashboard doesn't ship one; the landing page mirrors
  that).
- Image sourcing. The components use `imageUrl` placeholders from
  the stubbed CMS payload. The CMS team will fill real images in
  via the dashboard.

## Estimated Complexity
L

## Open Questions
- **Q1 (for design-engineer):** Which sections, if any, should be
  capability claims only (no specific data even when the CMS has
  it)? Default answer: `STATS`, `TESTIMONIALS`, `CLIENTS`, `PARTNERS`,
  and `IMAGE_GALLERY` ship with capability copy or stay empty when
  the CMS has no data; the rest are populated from the CMS as it
  becomes available.
- **Q2 (for design-engineer):** When the CMS section's `body` or
  `subtitle` is empty, does the section render an empty card, hide
  itself entirely, or fall back to a local `src/content/{id,en}.ts`
  default? Default answer: hide itself (`return null`) so the page
  is honest about what is and isn't live.
- **Q3 (for system-architect):** Should the 12 section components
  live in `src/components/sections/<key>.tsx` (one file each), or
  in a single `src/components/sections/index.ts` with named exports?
  Default answer: one file each, for grep-ability and the
  per-component test in TASK-005.
