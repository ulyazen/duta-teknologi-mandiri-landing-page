# TASK-002 Implementation Summary

## What was built
The full visual and content surface of the public landing page. The
12 CMS section components are wired in `App.tsx` and render from a
typed stub payload. The design system is mirrored 1:1 from the
dashboard.

## File paths
- `src/styles.css` — Tailwind v4 + `@theme` tokens + component classes
- `src/lib/{utils,cms-types,stub-cms,parse-stats-subtitle}.ts` — utils,
  types, stub payload, stats subtitle parser
- `src/content/{site,id,en}.ts` — bilingual content
- `src/components/ui/{Button,Card}.tsx` — primitive wrappers
- `src/components/layout/{Nav,Footer,LocaleSwitcher}.tsx` — shell
- `src/components/sections/*.tsx` — 12 section components
- `src/App.tsx` — real shell with skip-to-content, Nav, 12 sections, Footer
- `index.html` — localized title, canonical, hreflang

## Key decisions
- **Stub payload over live fetch in TASK-002.** The real CMS client
  ships in TASK-003. The stub is typed against the same Zod schema
  shape, so the swap is mechanical.
- **Component class wrappers over Tailwind utilities.** Each
  `src/components/ui/Button.tsx` and `Card.tsx` is a thin wrapper
  around `.btn-*` and `.card-*` to keep the design tokens enforced
  in one place.
- **No shadcn.** The page is too lean to need it; the primitives
  are 30 lines each.
- **Stats section is parsed from JSON subtitle.** Per the
  `parseStatsSubtitle` helper, the section's `subtitle` is parsed as
  `[{ label, value }]`. Fallback: render raw prose.
- **All non-hero images lazy-load.** The hero (none in v1) would
  use `loading="eager" fetchpriority="high"`.
- **DTM copy is capability-level only.** No client names, no vendor
  names, no financial figures, no internal process details. Every
  claim is phrased as a capability, not a specific result.

## Verification
- [x] `npm run lint` passes (max-warnings=0)
- [x] `npm run build` succeeds and is idempotent (same SHA on rerun)
- [x] All files in design's file layout are present
- [x] No `any` types introduced
- [x] No banned color literals outside `src/styles.css`
- [x] Conventional Commits used
- [x] Public-safe content per `company-profile.md` acceptance check

## Bundle size
- `dist/index.html` 0.92 kB (gzip 0.46 kB)
- `dist/assets/index-*.css` 22.84 kB (gzip 4.99 kB)
- `dist/assets/index-*.js` 243.42 kB (gzip 73.67 kB)
