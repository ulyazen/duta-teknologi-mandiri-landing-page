# TASK-002 Implementation Notes

## Deviations from design
- **Image URLs are absent in the stub.** The stub CMS payload has all
  `imageUrl` fields as `null`. The components handle the null case
  gracefully (logos render as text fallback; gallery renders nothing
  if no images). When the CMS has data, the components will render
  images without code changes.
- **`Button` exposes only `solid` variant for now.** The design
  mentions `ghost` for inline anchor styling; in practice, the
  inline anchor links (nav links, footer links) use the `.btn-ghost`
  class directly without going through the `Button` component. This
  keeps the API surface small.
- **`<details>` FAQ has a `+` indicator that rotates to `x` when
  open.** This is a tiny visual flair that uses pure CSS
  (`group-open:rotate-45`). It is the only animation in v1, and it
  is non-essential — `<details>` is keyboard-accessible without it.

## Known issues
- **No tests yet.** Vitest and Playwright tests ship in TASK-005.
  The build is verified by lint + build, but no runtime assertions
  on the section components exist.
- **Locale switching is route-based but TASK-003 is where the
  routing lives.** The LocaleSwitcher currently produces correct
  hrefs (`/en/...`), but the router that handles them ships in
  TASK-003. For TASK-002, the page is single-route; the switcher
  is a navigation link only.

## Follow-ups
- TASK-003: TanStack Router + CMS client + static prerender
- TASK-004: SEO + sitemap + robots + contact page
- TASK-005: Vitest + Playwright tests + deploy doc
