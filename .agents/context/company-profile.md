# DTM Company Profile (PUBLIC-safe source of truth for landing-page content)

This file is the **single source of truth** for the company profile the
landing page should picture. It is the public-facing view of DTM, not
the internal operational view. Section copy in
`src/content/{id,en}.ts` must be grounded in the facts below and
**must not leak** anything in the "Do not expose" section.

## Identity (public-safe)

- **Name:** Duta Teknologi Mandiri (DTM)
- **Type:** Indonesia-based procurement and operations company
- **Headline (EN):** Industrial parts procurement, end to end.
- **Headline (ID):** Pengadaan suku cadang industri, dari hulu ke hilir.
- **What we do (one sentence):** We source industrial parts from
  international manufacturers and deliver them to clients in Indonesia,
  handling the full chain from supplier to fulfillment.

## Capabilities the landing page MAY claim (capability-level, not specific)

The page may speak in capability terms without naming specific
numbers, clients, vendors, or internal processes. The CMS team can
fill in specifics later via the dashboard CMS; the v1 page should
not commit to any of them.

- **International sourcing** — we work with suppliers across multiple
  countries and currencies.
- **Multi-currency purchasing** — exchange rates, VAT, fees, and
  shipping costs are all managed in one system.
- **Quality-controlled catalog** — every part is tracked by part
  number with full audit history.
- **Logistics coordination** — we coordinate with shippers for
  international freight and local delivery.
- **Real-time stock visibility** — clients see current stock levels
  before they order.
- **Margin transparency** — sell prices are derived from real cost
  data plus a published markup tier, not guessed.
- **Order tracking** — every order has a clear status from advance
  payment through delivery to fulfillment.
- **Audit trail** — every financial and status change is logged.

## Tone guidance (for `src/content/{id,en}.ts`)

- Speak as a confident B2B operations partner, not a consumer brand.
- Use complete sentences, weight 400, no marketing hyperbole.
- Use "we" and "our", not "Duta Teknologi Mandiri" in every sentence.
- Avoid superlatives without proof ("the best", "the fastest"). If a
  claim cannot be backed by the dashboard data, phrase it as a
  capability, not a result.
- Keep the body weight 400. Buttons may be 500.
- Indonesian and English copy must say the same thing in the same
  tone, not be a literal translation.

## What the landing page MUST NOT expose (do not write into the page)

This list is **sensitive**. Treat it as a hard constraint. The page
must not surface any of these even if the CMS has the data.

- **Specific client names** — never list, name, or imply a specific
  client. Speak in terms of "industries served" or "clients across
  Indonesia" without naming anyone.
- **Specific vendor or supplier names** — never name a foreign
  manufacturer, OEM, or distributor.
- **Specific country lists** — do not enumerate the countries DTM
  sources from. "Multiple countries" is fine; "12 countries" is not.
- **Specific product catalogs, part numbers, or descriptions** —
  speak in generic categories ("industrial spare parts", "electrical
  components") rather than naming actual SKUs.
- **Financial figures** — no revenue, transaction counts, COGM
  numbers, margin percentages, or pricing. Even the markup tiers
  (10 / 15 / 20%) are internal and must not appear on the page.
- **Internal process details** — do not describe the dashboard's
  schema, the calculation formulas, the kurs table, the payment
  status enum, the stock movement triggers, or any module names
  from the dashboard. The page can speak in outcomes; the
  mechanism is internal.
- **Team size, headcount, hiring claims, or org structure** —
  generic "team" is fine; "50+ employees" is not.
- **Year founded, years in business, or growth claims** — generic
  "established" is fine; "since 2010" is not.
- **Internal document or report names** — never reference audit
  docs, internal spreadsheets, or the previous Excel workflow.
- **Internal pricing formulas, fee structures, or VAT percentages** —
  even example percentages are sensitive.
- **Anything that could embarrass a client, vendor, or partner** if
  it appeared on a public site.
- **Anything that is not already public, or that has not been
  approved by DTM's leadership for public disclosure.**

## When a section needs a fact not in this file

- Phrase it as a capability ("we source parts globally") rather than
  a specific claim ("we serve 50+ countries").
- If the CMS already has the data, the v1 page still leaves the
  section body empty and lets the CMS content fill it in later.
- If a fact is essential and not public-safe, escalate to the
  product-owner (or the leader) before writing it.

## Sources of truth for content authors

- `../duta-teknologi-mandiri-web-app/PRD.md` — full product spec
  (for context, not for direct copy)
- `../duta-teknologi-mandiri-web-app/TRD.md` — technical reference
  (internal only, do not surface)
- `../duta-teknologi-mandiri-web-app/CLAUDE.md` — project overview
  (for context, not for direct copy)
- This file — the only file the content authors may quote from

## Acceptance check before shipping

Before TASK-002 is approved, the leader runs a content review that
verifies:

- [ ] No specific client names anywhere in `src/content/`.
- [ ] No specific vendor names anywhere in `src/content/`.
- [ ] No financial figures, percentages, or pricing in `src/content/`.
- [ ] No internal process, schema, or module names in section copy.
- [ ] Every claim is phrased as a capability, not a specific result.
- [ ] Indonesian and English copy say the same thing in the same tone.
