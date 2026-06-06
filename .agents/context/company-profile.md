# DTM Company Profile (PUBLIC-safe source of truth for landing-page content)

This file is the **single source of truth** for the company profile the
landing page should picture. The public identity of Duta Teknologi
Mandiri is: **a supplier that sells industrial parts to clients in
Indonesia**. The site speaks to the **buyer** (the prospective PO
sell client), not to DTM's internal operations.

## Identity (public-safe)

- **Name:** Duta Teknologi Mandiri (DTM)
- **What we are:** A supplier of industrial parts in Indonesia.
- **Who we sell to:** Industrial buyers in Indonesia who need
  reliable, traceable parts procurement.
- **Tagline (EN):** Industrial parts, sourced and delivered.
- **Tagline (ID):** Suku cadang industri, dari sumber terpercaya.

## What the buyer should take away (in 5 seconds)

- DTM supplies industrial parts.
- DTM handles the full chain from source to delivery.
- DTM keeps stock visible in real time.
- DTM provides order tracking and a full audit trail.
- DTM replies within one business day.

## Capabilities the landing page MAY claim (capability-level, not specific)

The page may speak in capability terms without naming specific
numbers, clients, vendors, or internal processes. The CMS team can
fill in specifics later via the dashboard CMS; the v1 page should
not commit to any of them.

- **Industrial parts supply** — we supply the parts your operation
  needs.
- **Sourcing from international manufacturers** — we find the right
  parts from the right suppliers.
- **Multi-currency purchasing handled for you** — exchange rates,
  VAT, fees, and shipping costs are managed in one system.
- **Real-time stock visibility** — you see current stock before you
  order.
- **Order tracking** — every order has a clear status from
  confirmation to delivery.
- **Audit trail** — every financial and status change is logged
  so the buyer has a single source of truth.
- **Logistics coordination** — we coordinate freight from the
  supplier to your door.
- **Margin transparency** — prices are derived from real cost
  data, not guessed.

## Tone guidance (for `src/content/{id,en}.ts`)

- Speak as a confident B2B supplier, not a consumer brand.
- Use complete sentences, weight 400, no marketing hyperbole.
- Use "we" and "our" to mean DTM.
- Avoid superlatives without proof ("the best", "the fastest"). If a
  claim cannot be backed by the dashboard data, phrase it as a
  capability, not a result.
- Keep the body weight 400. Buttons may be 500.
- Indonesian and English copy must say the same thing in the same
  tone, not be a literal translation.
- Frame every section around **the buyer's experience**, not DTM's
  internal operations. The buyer does not need to know how DTM
  manages its imports, vendors, or stock internally; they need to
  know what they get when they order from DTM.

## What the landing page MUST NOT expose (do not write into the page)

This list is **sensitive**. Treat it as a hard constraint. The page
must not surface any of these even if the CMS has the data.

### Internal operations (admin-only)
- **PO Import mechanics** — the page never describes how DTM
  imports parts. Internal terms like "PO Import", "vendor
  onboarding", "import procurement", "delivery order", "advance
  payment", "kurs table", "VAT percentage" must not appear on the
  page.
- **PO Sell mechanics** — the page never describes DTM's sell-side
  workflow as a process. It can say "we sell" and "we deliver",
  but it must not enumerate the internal sell-procurement steps.
- **Stock mutations** — the page can say "real-time stock" but
  must not describe how stock increments (delivery) or decrements
  (sell fulfillment).
- **Internal module names** — never reference the dashboard's
  modules (PO Import, PO Sell, Stock, Settings, Landing Page CMS,
  Kurs) by name. The page can speak in outcomes; the mechanism is
  internal.
- **Calculation formulas** — Price IDR, Total IDR, COGM, VAT
  percentage, fee structures, markup tiers are all internal.
- **Internal data model** — no mention of parts, part numbers,
  vendors, shippers, clients, payments, or any Prisma model.

### Identity (capability-level only)
- **Specific client names** — never list, name, or imply a specific
  client. Speak in terms of "industrial buyers" or "clients across
  Indonesia" without naming anyone.
- **Specific vendor or supplier names** — never name a foreign
  manufacturer, OEM, or distributor.
- **Specific country lists** — do not enumerate the countries DTM
  sources from. "International" is fine; "12 countries" is not.
- **Specific product catalogs, part numbers, or descriptions** —
  speak in generic categories ("industrial spare parts", "electrical
  components") rather than naming actual SKUs.
- **Financial figures** — no revenue, transaction counts, COGM
  numbers, margin percentages, or pricing.
- **Team size, headcount, hiring claims, or org structure** —
  generic "team" is fine; "50+ employees" is not.
- **Year founded, years in business, or growth claims** — generic
  "established" is fine; "since 2010" is not.
- **Internal document or report names** — never reference audit
  docs, internal spreadsheets, or the previous Excel workflow.

### Trust and safety
- **Anything that could embarrass a client, vendor, or partner** if
  it appeared on a public site.
- **Anything that is not already public, or that has not been
  approved by DTM's leadership for public disclosure.**

## When a section needs a fact not in this file

- Phrase it as a capability ("we supply industrial parts") rather
  than a specific claim ("we serve 50+ countries").
- If the CMS already has the data, the v1 page still leaves the
  section body empty and lets the CMS content fill it in later.
- If a fact is essential and not public-safe, escalate to the
  product-owner (or the leader) before writing it.

## Sources of truth for content authors

- `../duta-teknologi-mandiri-web-app/PRD.md` — full product spec
  (for context, not for direct copy; the PRD describes internal
  modules which must not appear on the public site)
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
- [ ] Every claim is framed around the buyer's experience, not
      DTM's internal operations.
- [ ] Every claim is phrased as a capability, not a specific result.
- [ ] Indonesian and English copy say the same thing in the same tone.
