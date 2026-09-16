# Tour content rewrite (client Word docs) — design

## Context

The client sent Word docs with real tour info (itinerary, pricing, marketing copy, photos) that will replace the placeholder content in `src/data/tours.ts`. Docs arrive one at a time; this spec covers the conversion pipeline for all of them plus the first tour (`City tour + Green Bazaar.docx`) as a worked example. The full list of tours on the site is expected to change in composition/count as more docs arrive — not a 1:1 swap of the current 6.

The `Tour` type and the tour detail page components (`TourDetails.tsx`, `TourCard.tsx`, `TourGallery.tsx`, `BookingModal.tsx`) are **not restructured** for this work — new content is fit into the existing fields.

## Mapping rules (applies to every future doc)

| `Tour` field | Source in doc | Notes |
|---|---|---|
| `id` | generated from the tour title | kebab-case, stable slug |
| `title` | doc title | localized (en authored from doc, ru written naturally, kz/ar machine-translated) |
| `price` | `"from $X"` | X = lowest per-person price among group-size tiers **capped at 20 people** (larger tiers in the doc, e.g. 25/30/40/50 PAX, are dropped) |
| `badge` | doc frequency, if stated | if the doc doesn't state frequency, default to "every day" and flag it as an assumption for the user to correct |
| `description` | doc's marketing paragraphs | condensed to 1-2 sentences, matching the existing short-subtitle style (this field is the hero teaser, not a place for the full long-form copy — the block itself doesn't change) |
| `timing` | doc's "Program Itinerary" table | transcribed line by line as `"HH:MM–HH:MM — Activity"`, matching current format |
| `inclusive` | doc's "Price Include" line | split on `/` into bullets; drop non-concrete filler phrases (e.g. "good spirits and unforgettable experiences") that aren't actual inclusions |
| `exclusive` | doc's "what's not included", if present | if the doc has no such list, use `[]` — see component guard below |
| `additionalInfo` | doc's price table, capped at 20 people | one bullet per tier: `"$X per person for a group of N"`, plus a frequency bullet (e.g. "Tours run every day") |
| Payment terms / Cancellation Policy / Meal (per-day) | doc sections with no home in the current schema | **not carried over** — no site block exists for these; revisit only if this becomes a recurring, filled-in need across docs |
| Photos | doc's embedded images | only real location/activity photos are used; any operator/partner logo images embedded in the doc are discarded. Converted to WebP into `/public/tours/`, filenames and alt text describing the specific photo |

## Known limitation: `priceForSeats` and non-linear pricing

`BookingModal.tsx`'s `priceForSeats()` extracts the first number in `tour.price` and multiplies it flatly by seat count (1-10 stepper) for both the on-screen total and the `totalPrice` sent to Telegram/Google Sheets. With `price` now expressed as `"from $X"` (the cheapest, largest-group rate), this produces an under-estimated total for small groups — e.g. a tour priced "from $29" would show ~$58 for 2 seats in the modal, when the doc's real 2-person rate is $96/person ($192 total).

**Decision: leave as-is.** This is a pre-existing simplification (the modal already assumed a flat per-seat rate before real tiered pricing existed) and is out of scope for this content pass. A follow-up would need to add a real per-tier price table to `Tour` and rewrite `priceForSeats` — not done here.

## Component change: hide empty accordion categories

`TourDetails.tsx` currently renders all four categories (`timing`/`inclusive`/`exclusive`/`additionalInfo`) unconditionally, including the heading, even when the array is empty. Since new docs may not always provide all four lists (e.g. this doc has no "what's not included"), add a guard so a category with an empty array renders nothing (no heading, no empty list). This is a presentational fix only — the `Tour` type and existing 6 tours (all fully populated) are unaffected.

## Worked example: `city-tour-green-bazaar`

Source: `City tour + Green Bazaar.docx` (single-day city tour: Panfilov Street, Ascension Cathedral, Republic Square, Green Bazaar, Rakhat chocolate shop).

- **id**: `city-tour-green-bazaar`
- **price**: `from $29` (best rate at 15–20 PAX, capped per the rule above)
- **badge**: `every day` (assumption — doc doesn't state frequency)
- **description (en)**: "Discover Almaty's blend of history and modern life — Panfilov Street, the Ascension Cathedral, Republic Square and the vibrant Green Bazaar with a stop at the Rakhat chocolate shop. A relaxed introduction to the city through its landmarks, flavors and atmosphere."
- **timing**: 10:00 Meeting at the hotel → 10:30–13:30 Panoramic city tour → 13:30–15:00 Green Bazaar & Rakhat Chocolate shop → 15:00–16:00 Transfer to the hotel
- **inclusive** (5 items): Comfortable tourist transport / Professional guide services / Guided tour throughout the trip / Assistance and recommendations for photo spots and leisure areas / Drinking water for the journey
- **exclusive**: `[]`
- **additionalInfo** (12 tiers, 1–20 PAX, from the doc's price table): $147 (1) / $96 (2) / $76 (3) / $78 (4 — doc's own anomaly, kept as given) / $65 (5) / $57 (6) / $48 (7) / $46 (8) / $38 (9) / $35 (10) / $29 (15) / $29 (20), plus "Tours run every day"
- **images**: 4 photos from the doc (city skyline, Republic Square, Ascension Cathedral, Green Bazaar interior), converted to WebP; the 5th embedded image (a third-party operator's logo) is discarded
- ru/kz/ar: ru authored naturally (not a literal translation of en), kz/ar machine-translated — matching the existing convention for all other tour content

## Process for subsequent docs

Each new doc from the client goes through the same steps: read/convert (textutil or equivalent), extract itinerary/pricing/inclusions/photos, apply the mapping rules above, draft en copy for review, then ru/kz/ar, then implement as a new (or replacing) entry in `tours.ts` plus photo assets. This spec's mapping rules are the standing reference — no new design round needed per tour unless a doc introduces a structural wrinkle the rules don't cover (e.g. a genuinely new section type that recurs across docs).
