# DTM Company Profile (source of truth for landing-page content)

This file is the **single source of truth** for the company profile the
landing page should picture. Every section's copy in
`src/content/{id,en}.ts` must be DTM-specific and grounded in the facts
below. **Never invent company facts** (clients, parts, countries, years
in business, team size). If a fact is not in this file or in the
dashboard's PRD, the corresponding section returns `null` and the
content team fills it in via the CMS later.

## Identity

- **Name:** Duta Teknologi Mandiri (DTM)
- **Type:** Indonesia-based procurement and operations company
- **Tagline (EN):** Industrial parts procurement, end to end.
- **Tagline (ID):** Pengadaan suku cadang industri, dari hulu ke hilir.

## What DTM does

1. **International import procurement.** Sources industrial parts and
   spare parts from foreign vendors (manufacturers and OEM suppliers)
   across multiple countries and currencies.
2. **Multi-currency purchasing.** Manages real-time exchange rates
   (Kurs), variable VAT per shipment, per-unit fees, and shipping
   costs in IDR.
3. **Local sales and fulfillment.** Sells imported parts to local
   clients in Indonesia, with full sell-side procurement and
   invoicing.
4. **Unified stock management.** Every import that reaches "Delivered"
   status increments central stock. Every fulfilled sell decrements
   it. The landing page can mention "real-time stock tracking" as a
   DTM capability.

## Why DTM exists (the problem the dashboard solves)

Before the dashboard, DTM managed all of this in heavily-modified Excel
spreadsheets. Procurement officers manually calculated Price IDR, VAT,
Fees, Total IDR, and COGM for every import transaction. There was no
centralized audit trail, no automated margin calculation, and no
unified stock view. The new command center (the dashboard) replaces
that manual work and the landing page advertises the outcome: faster
PO creation, 100% calculation accuracy, real-time stock, and zero
engineering involvement in marketing updates.

## How DTM works (the process the landing page can picture)

1. **Vendor onboarding** — international suppliers are onboarded with
   country, contact, and currency details.
2. **Part catalog** — every part has a unique part number and
   description.
3. **Procurement** — for each order, DTM records: vendor, shipper,
   currency, exchange rate, VAT, fee, qty, shipping cost. The system
   auto-computes COGM and total IDR per item.
4. **Payment tracking** — advance, partial, and final payments are
   tracked per PO.
5. **Delivery** — when the import is delivered, stock increments.
6. **Sell** — local clients order from the same catalog; stock
   decrements on fulfillment.
7. **Margin** — sell price is set at COGM plus a markup tier (10 / 15
   / 20 percent).

## What the landing page must NOT claim

- Specific client names (no client list in the PRD).
- Specific country counts or vendor counts.
- Specific year founded or years in business.
- Specific team size.
- Any feature that the dashboard does not actually have.

When the marketing copy needs a fact not in this file, the section
should be phrased as a capability ("we source parts globally") rather
than a specific claim ("we serve 50+ countries").

## Sources of truth

- `../duta-teknologi-mandiri-web-app/PRD.md` — full product spec
- `../duta-teknologi-mandiri-web-app/TRD.md` — technical reference
- `../duta-teknologi-mandiri-web-app/CLAUDE.md` — project overview
- `../duta-teknologi-mandiri-web-app/audit.md` — implementation audit
