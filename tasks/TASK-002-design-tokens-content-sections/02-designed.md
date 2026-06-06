# TASK-002 Design

## Architecture (System Architect)

### Data Flow

```
build-time (npm run build)
  |
  v
scripts/prerender.ts (TASK-003)
  |
  v
src/lib/cms.ts: getLandingPage()
  |
  v
CMS API: https://admin.dutateknologimandiri.com/api/landing-page
  |
  v
Zod schema (src/lib/cms-schema.ts) validates response
  |
  v
Resolved JSON embedded as <script id="__CMS_DATA__">
  |
  v
Static HTML rendered to dist/index.html (and /en/index.html)
  |
  v
Client hydrates; TanStack Query revalidates in background
```

For TASK-002, the sections render from a **stubbed payload** in
`src/lib/stub-cms.ts` (a typed object that mirrors the Zod schema).
TASK-003 replaces this stub with the real `getLandingPage()` call.

### API Contracts

```ts
// src/lib/cms-schema.ts (TASK-003)
export const PublicSectionSchema = z.object({
  sectionKey: z.enum([
    "HERO", "ABOUT", "SERVICES", "WHY_US", "PROCESS", "STATS",
    "TESTIMONIALS", "CLIENTS", "PARTNERS", "IMAGE_GALLERY",
    "FAQ", "CTA_BANNER",
  ]),
  title: z.string(),
  subtitle: z.string().nullable(),
  body: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  imageAlt: z.string().nullable(),
  ctaText: z.string().nullable(),
  ctaLink: z.string().nullable(),
  sortOrder: z.number(),
  items: z.array(PublicSectionItemSchema),
});

export type PublicSection = z.infer<typeof PublicSectionSchema>;
```

```ts
// src/lib/cms.ts (TASK-003)
export type CmsError =
  | { kind: "network"; message: string }
  | { kind: "http"; status: number; message: string }
  | { kind: "parse"; message: string };

export async function getLandingPage(
  opts?: { signal?: AbortSignal }
): Promise<{ sections: PublicSection[]; fetchedAt: string }>;
```

### Env vars

```
CMS_API_BASE_URL=https://admin.dutateknologimandiri.com
SITE_ORIGIN=https://dutateknologimandiri.com
```

### File Layout (new in this TASK)

- `src/styles.css` — replace raw CSS variables with Tailwind v4
  `@import "tailwindcss";` + `@theme` block. Re-add `.card-primary`,
  `.card-bordered`, `.btn-ghost`, `.btn-solid`, `.label-uppercase`.
- `src/lib/fonts.ts` — `@fontsource/inter` and
  `@fontsource/space-grotesk` exposed as CSS variables.
- `src/lib/utils.ts` — `cn(...inputs)` via `clsx` + `tailwind-merge`.
- `src/lib/stub-cms.ts` — typed stub of a 12-section payload for
  TASK-002. Replaced in TASK-003.
- `src/lib/parse-stats-subtitle.ts` — parses `STATS.subtitle` as
  `[{ label, value }]` JSON; falls back to raw prose.
- `src/content/types.ts` — `Content` interface.
- `src/content/id.ts` — Indonesian copy.
- `src/content/en.ts` — English copy.
- `src/content/site.ts` — site config.
- `src/components/ui/Button.tsx` — minimal primitive.
- `src/components/ui/Card.tsx` — minimal primitive.
- `src/components/layout/Nav.tsx` — server-rendered.
- `src/components/layout/Footer.tsx` — server-rendered.
- `src/components/layout/LocaleSwitcher.tsx` — client component.
- `src/components/sections/{hero,about,services,why-us,process,stats,testimonials,clients,partners,gallery,faq,cta-banner}.tsx`
  — 12 section components.
- `src/App.tsx` — replace placeholder with the real shell.

### Build Constraints
- Memory cap: 512MB (`NODE_OPTIONS=--max-old-space-size=512`).
- Time target: < 30s on a laptop; < 60s on Biznet hPanel.
- Network: not required for TASK-002 (stub payload). TASK-003 adds
  the network call.

### TypeScript Contracts

```ts
// src/lib/cms-types.ts (TASK-003, but the shape is needed in TASK-002)
export type SectionKey =
  | "HERO" | "ABOUT" | "SERVICES" | "WHY_US" | "PROCESS" | "STATS"
  | "TESTIMONIALS" | "CLIENTS" | "PARTNERS" | "IMAGE_GALLERY"
  | "FAQ" | "CTA_BANNER";

export interface PublicSectionItem {
  type: "SERVICE" | "TESTIMONIAL" | "FAQ" | "GALLERY_IMAGE";
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  authorName: string | null;
  authorTitle: string | null;
  authorCompany: string | null;
  sortOrder: number;
}

export interface PublicSection {
  sectionKey: SectionKey;
  title: string;
  subtitle: string | null;
  body: string | null;
  imageUrl: string | null;
  imageAlt: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  sortOrder: number;
  items: PublicSectionItem[];
}

export type Locale = "id" | "en";
```

## UI Specs (Design Engineer)

### Component Inventory

- `Nav` — top navigation with brand mark, locale switcher, anchor
  links, contact CTA.
- `Footer` — bottom bar with brand, contact email, locale, copyright.
- `LocaleSwitcher` — client component that swaps between `/` and
  `/en` while preserving the current anchor.
- `Hero` — full-bleed hero with display heading, subtitle, CTA, hero
  image (eager).
- `About` — text + image card, two-column on desktop, stacked on
  mobile.
- `Services` — 3-up grid of capability cards.
- `WhyUs` — bullet/checklist list.
- `Process` — numbered steps (items, ordered by `sortOrder`).
- `Stats` — numeric callouts (parsed from `subtitle`).
- `Testimonials` — quote cards (filtered by `type === "TESTIMONIAL"`).
- `Clients` — logo grid (filtered by `type === "SERVICE"` ... wait,
  this is a category confusion; clients use the section's items
  with `imageUrl` as logos).
- `Partners` — logo grid.
- `Gallery` — masonry-style image grid.
- `FAQ` — `<details><summary>` accordions.
- `CtaBanner` — full-width deep-purple band with white text and a
  CTA.

### Per-component Spec

For all components:
- **Layout:** section element with `id` for in-page anchor,
  `aria-labelledby` pointing at the heading.
- **Tokens:** only CSS variables from `@theme` (no inline hex).
- **Responsive:** mobile-first; `md:` and `lg:` breakpoints.
- **States:** hover and focus (Interaction Blue); disabled N/A;
  loading N/A (static); error: return `null`.

| Component | Layout | Tokens | Responsive | States |
|-----------|--------|--------|------------|--------|
| `Nav` | flex row, brand left, links right | `--color-surface`, `--color-primary`, `--color-accent` | mobile: hamburger (TASK-005 adds); desktop: full nav | hover: text-accent; focus: 2px solid accent |
| `Footer` | flex column on mobile, row on desktop | `--color-snow`, `--color-muted` | stacks on mobile | none |
| `Hero` | full-bleed background, centered text | `--color-surface` bg, `--color-deep-dark` text in band, `--color-accent` cta | 72px → 48px → 32px heading | hover: btn-ghost hover |
| `About` | 2-col grid | `--color-surface` card, `--color-lightest-gray` border | 1 col < 768px | none |
| `Services` | 3-col grid | `--color-surface`, `--radius-card` | 3 → 2 → 1 | hover: card lift (border emphasis) |
| `WhyUs` | 2-col list | `--color-muted` text, `--color-primary` heading | 1 col mobile | none |
| `Process` | numbered list | `--color-muted` numbers, `--color-primary` text | stacks | none |
| `Stats` | 4-col grid | `--color-deep-dark` number, `--color-muted` label | 4 → 2 → 1 | none |
| `Testimonials` | 2-col grid | `--color-surface` card, `--radius-card` | 2 → 1 | none |
| `Clients` | 6-col logo grid | `--color-muted` logo | 6 → 3 → 2 | hover: opacity 1 |
| `Partners` | 6-col logo grid | same as Clients | same | same |
| `Gallery` | 3-col grid | `--radius-card` images | 3 → 2 → 1 | lazy-load |
| `FAQ` | single column | `--color-border` divider | 1 col | native `<details>` open/close |
| `CtaBanner` | full-width purple band | `--color-deep-dark` bg, white text | stacks | hover: btn-solid |

### Token Audit

Every surface uses one of:

- `bg-surface` (white) — page bg, primary cards
- `bg-snow` (lightest gray) — alternating sections
- `bg-deep-dark` (purple-black) — CTA banner, hero band
- `border-lightest-gray` (cards)
- `border-border` (emphasized cards)
- `text-primary` (headings, body)
- `text-muted` (secondary text)
- `text-accent` (interactive, on hover/focus only)

### Responsive Strategy

- `< 425px` (small mobile): single column, smaller type, full-width
  cards.
- `425-640px` (mobile): single column, medium type.
- `640-768px` (large mobile): minor spacing adjustments.
- `768-1024px` (tablet): 2-column grids begin.
- `1024-1440px` (desktop): full multi-column.
- `1440px+` (large desktop): max container width, hero full-bleed.

### Accessibility Notes

- Skip-to-content link as the first focusable child of `<main>`.
- All interactive elements are `<button>` or `<a>`.
- FAQ uses native `<details>`/`<summary>` (keyboard-accessible).
- Color contrast: black on white (AAA); `text-muted` (#93939f) on
  white (AA for body); white on `bg-deep-dark` (AAA).
- `prefers-reduced-motion` respected (no animations in v1).
- Form labels (TASK-004) via `<label htmlFor>`.
- Locale switcher is a real `<a>` with `hreflang` set.
