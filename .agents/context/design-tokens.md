# Design Tokens (1:1 with duta-teknologi-mandiri-web-app/DESIGN.md)

These are the only colors and tokens the landing page may use. They are
declared in `src/index.css` under `@theme`. Never introduce new tokens;
never use banned color literals (`black`, `white`, `#000`, `#fff`, warm
colors) anywhere outside `src/index.css`.

## Color tokens
- Cohere Black → `text-primary` / `bg-primary` (`#000000`)
- Near Black → `text-secondary` (`#212121`)
- Deep Dark → `text-deep-dark` / `bg-deep-dark` (`#17171c`)
- Interaction Blue → `text-accent` / `bg-accent` (`#1863dc`) — hover/focus only
- Focus Purple → `border-focus-purple` (`#9b60aa`) — input focus only
- Pure White → `bg-surface` (`#ffffff`)
- Snow → `bg-snow` (`#fafafa`)
- Lightest Gray → `border-lightest-gray` (`#f2f2f2`)
- Border Cool → `border-border` (`#d9d9dd`)
- Border Light → `border-border-light` (`#e5e7eb`)
- Muted Slate → `text-muted` (`#93939f`)
- Error Red → `text-error` (`#dc2626`) — error text only

## Radius tokens
- `--radius-card` (`22px`) — primary cards, images, main containers
- `--radius-dialog` (`8px`) — dialogs, secondary containers
- `--radius-pill` (`9999px`) — buttons, tags

## Typography
- Display: `font-display` — Space Grotesk (fallback: Inter, system)
- Body: `font-body` — Inter (fallback: Arial, system)
- Mono: `font-mono` — ui-monospace, SFMono-Regular
- Display sizes: 72 / 60 / 48 / 32 / 24 px
- Body: 16px weight 400
- Buttons small: 14px weight 500 (the only place weight 500 is allowed)
- Uppercase labels: 14px weight 400, letter-spacing 0.28px

## Component classes (reused from dashboard globals.css)
- `.card-primary` — 22px radius, white surface, lightest-gray border
- `.card-bordered` — 22px radius, white surface, cool border
- `.btn-ghost` — transparent, black text, blue on hover
- `.btn-solid` — black background, white text, pill radius
- `.label-uppercase` — mono 14px uppercase muted

## Layout
- 8px spacing base
- Section vertical spacing 56-60px
- Container max-width adapts to viewport (full bleed on hero)
- 5 breakpoints: <425, 425-640, 640-768, 768-1024, 1024-1440, 1440-2560


## Content authorship

All section copy must reflect the DTM company profile defined in
`company-profile.md`. Read the "Do not expose" section there before
writing any copy. Never invent company facts; never expose sensitive
operational data. If a fact is not public-safe, the section returns
`null` and the content team fills it in via the CMS later.
