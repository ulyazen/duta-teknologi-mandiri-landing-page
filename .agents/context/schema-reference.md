# Schema Reference (landing-page project)

The landing page has no database. There is no Prisma schema.

The only schema is the **CMS API Zod schema** in `src/lib/cms-schema.ts`:
- `PublicSection` — section envelope (12 documented keys, all optional
  except `sectionKey`, `title`, `sortOrder`).
- `PublicSectionItem` — items inside a section (`SERVICE`,
  `TESTIMONIAL`, `FAQ`, `GALLERY_IMAGE`).
- Unknown keys are tolerated with a console warning so the page does
  not break when the admin adds new fields.
- The Zod schema is the single source of truth for the wire shape. The
  `PublicSection` / `PublicSectionItem` interfaces in
  `src/lib/cms-types.ts` are inferred via `z.infer<>`.
