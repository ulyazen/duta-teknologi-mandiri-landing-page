# TASK-002: Design tokens + bilingual content + 12 section components + Nav + Footer

**Module:** ui
**Complexity:** L

## Request
Ship the visual and content surface of the public landing page. The
TASK-001 bootstrap (commit `0dfa4bc`) gave us a runnable Vite scaffold,
a 1:1 design-token CSS file at `src/index.css`, and a static
`tracker.html`. The page is currently a one-line placeholder; we need
the real thing.

## Background
- The dashboard's `DESIGN.md` is the design authority. Mirror it 1:1.
- The dashboard's `RULES.md` is the development authority. Mirror it 1:1.
- The CMS API (`docs/api/landing-page.md`) returns 12 section keys:
  HERO, ABOUT, SERVICES, WHY_US, PROCESS, STATS, TESTIMONIALS,
  CLIENTS, PARTNERS, IMAGE_GALLERY, FAQ, CTA_BANNER.
- The site is bilingual: Indonesian (default `/`) + English (`/en`).
- The contact page is local (mailto:), not part of this TASK (TASK-004).

## Goal (re-stated for the product-owner)
Write `01-scoped.md` with the standard scope structure (goal, success
criteria, MVP vs post-MVP, module, affected entities, out of scope,
estimated complexity, open questions). The scope must be tight enough
that the architect and fullstack can fire without re-deriving anything.

## Notes for the next role
- The 12 section components are: `hero`, `about`, `services`,
  `why-us`, `process`, `stats`, `testimonials`, `clients`, `partners`,
  `gallery`, `faq`, `cta-banner`. One file per component in
  `src/components/sections/`.
- `src/content/{id,en}.ts` are the static copy sources.
- `src/components/layout/Nav.tsx` and `Footer.tsx` are server-rendered.
  `LocaleSwitcher.tsx` is the only client component in this TASK.
- `src/components/ui/Button.tsx` and `Card.tsx` are minimal primitive
  wrappers around `.btn-*` and `.card-*` classes (no shadcn).
- Wire Tailwind v4 in `src/index.css` (replace the placeholder CSS
  variables with `@import "tailwindcss";` + `@theme` block).
- Run `npm run lint` and `npm run build` before finishing.
- Implementation commits (one per logical change):
  - `feat(design): add tailwind tokens and font setup`
  - `feat(i18n): add id/en content and locale config`
  - `feat(ui): add nav, footer, and 12 section components`
  - `chore(agent): add frontend worktree instructions to AGENTS.md`


## Company profile anchor (new in this revision)

The landing page must picture the company profile of **Duta Teknologi
Mandiri (DTM)**. Read `.agents/context/company-profile.md` in the
landing-page repo for the source of truth. The 12 section components
must be filled with DTM-specific copy, not generic placeholders.

Concrete implications for `01-scoped.md`:
- The "Affected Entities" list must include `src/content/{id,en}.ts`
  and the per-section copy files if any.
- Add a new affected entity: `.agents/context/company-profile.md`
  (the source of truth for company facts).
- Add an open question if the architect needs to know whether any
  section should be a pure capability claim vs. a specific fact claim.
- Add a new success criterion: "every section's copy is DTM-specific
  and grounded in `company-profile.md`; no invented facts."
