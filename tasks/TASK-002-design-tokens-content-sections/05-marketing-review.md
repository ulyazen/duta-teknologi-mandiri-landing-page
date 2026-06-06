# TASK-002 Marketing Review

## First-impression score
**8/10** — The hero speaks to the buyer directly. A visitor can tell in under 5 seconds that DTM is a supplier of industrial parts and what they get when they order.

## Above-the-fold
- Eyebrow: "DUTA TEKNOLOGI MANDIRI" (mono, uppercase, muted)
- Display heading: "Industrial parts, sourced and delivered."
- Subtitle: "We supply the industrial parts your operation needs, with full order tracking and real-time stock visibility."
- CTA: "Talk to our team" (btn-solid, black on white)
- Top-right: brand mark + locale switcher (EN) + Contact CTA
- Decorative stat strip on the right (Sourcing / Currencies / Stock / Audit) — capability claims, no invented figures
- All visible without scrolling on a 1440x900 viewport.

## Visual rhythm
- HERO (white) -> ABOUT (snow) -> SERVICES (white) -> WHY_US (snow) -> PROCESS (white) -> STATS (snow) -> TESTIMONIALS (white) -> CLIENTS (snow) -> PARTNERS (white) -> IMAGE_GALLERY (snow) -> FAQ (white) -> CTA_BANNER (deep-dark)
- 12 sections, alternating surface, ending on a dramatic purple CTA band. Reads as a designed cadence.
- Section vertical spacing: 80px on desktop.

## Typography audit
- Display (Space Grotesk) used for headings, weight 400.
- Body (Inter) used for body text, weight 400.
- Uppercase labels (mono) used for section eyebrows.
- Body weight 400 throughout. No 700 anywhere.
- Display sizes: hero is 4.5rem; section headings are 3rem.
- Hierarchy is clear: brand mark > display > body > mono label.

## Color audit
- White surface as page background.
- Snow for alternating sections.
- Deep-dark (purple) only for the CTA banner band.
- Black for headings, muted slate (#93939f) for body secondary.
- No warm colors. No shadows. No banned color literals.

## Tone audit
- **Sell-side framing throughout.** Every section talks about what the buyer gets, not how DTM runs its internal operations.
- All claims phrased as capabilities: "we supply", "we manage", "we coordinate", "we offer". No superlatives.
- No invented facts. No client names. No vendor names. No financial figures. No internal process details.
- No mention of PO Import, PO Sell, Stock, Settings, or any internal module.
- Indonesian and English copy say the same thing in the same tone.

## CTAs
- Hero: "Talk to our team" -> /contact
- Nav: "Hubungi kami" / "Contact us" -> /contact
- CTA banner: "Talk to our team" -> /contact
- All CTAs are high-contrast btn-solid.
- Primary CTA hierarchy: hero CTA, nav CTA, CTA banner CTA. The "Contact" intent is consistent.

## Trust signals
- PROCESS section: 5 buyer-facing steps (Inquiry, Quotation, Order confirmation, Fulfillment, Delivery) — describes the buyer's experience, not DTM's internal workflow.
- WHY_US section: 4 capability claims framed as buyer outcomes.
- SERVICES section: 6 capability cards, all buyer-facing.
- TESTIMONIALS, CLIENTS, PARTNERS: empty in v1 (no real data yet); render nothing when empty, so the page is honest about what is and isn't live.
- STATS section: parsed from JSON subtitle; 4 capability-level stats. Public-safe (no financial figures, no client counts).

## Issues
- **Should-fix:** No real images yet. When the CMS team provides assets, the hero gets a real `imageUrl` and the gallery becomes a real masonry grid.
- **Should-fix:** TESTIMONIALS, CLIENTS, PARTNERS, GALLERY are empty (no CMS data yet). The page is honest about this.
- **Nice-to-have:** A real product photo or operations-floor photo in the ABOUT section. v1 omits this because we have no asset; the layout is ready for one.
- **Nice-to-have:** A two-column layout with a "Capabilities" sidebar on desktop.

## Decision
**APPROVE** - the page is a strong first impression, on-brand, public-safe, and frames DTM correctly as a supplier of industrial parts to buyers in Indonesia. The internal operations of DTM (PO Import, vendor management, kurs table, calculation formulas) are not visible, which is the correct public posture.
