# Booking modal redesign: seats + price

Date: 2026-08-29
Status: approved, not yet implemented

## Context

`BookingModal` (built in the previous lead-backend sub-project, see
`docs/superpowers/specs/2026-08-27-lead-backend-design.md`) currently shows
a dark card with just a heading ("Book: {tourName}") and the three contact
inputs. The user provided a Figma-exported mockup
(`/Users/tamerlansharifov/Desktop/form.png`, no Figma link available — this
spec is built from the PNG plus existing design tokens, not
`get_design_context`) showing a light-themed popup with a tour summary card
(thumbnail, title, a seat-count stepper, and a price that scales with the
seat count) above the same three inputs.

This spec covers **only `BookingModal`** (the group-tour popup triggered by
"Book a tour" on `TourCard`). The inline "Want a private tour?" section
(`PrivateTourForm`) is unchanged — it has no specific tour or price to
attach a seat count to.

## Goals

- Match the provided mockup: light popup, tour summary card with
  thumbnail/title/price, a +/− seat-count stepper, explanatory copy about
  WhatsApp follow-up, light input pills, orange submit button.
- Price displayed scales with the selected seat count (tour's listed price
  is per person).
- The selected seat count and the resulting total price are included in
  what's sent to Telegram/Sheets — the manager needs to know group size,
  not just that a booking happened.

## Data flow change

`useBookingModal().open()` currently takes just `tourName: string`. It needs
the tour's thumbnail image and price too, so it changes to take the whole
`Tour` object (already available at every call site — `TourCard` already has
the full `tour` prop):

```ts
// BookingModalProvider.tsx
type BookingModalContextValue = {
  tour: Tour | null; // was: tourName: string | null
  open: (tour: Tour) => void; // was: (tourName: string) => void
  close: () => void;
};
```

`TourCard.tsx`'s "Book a tour" button changes from `open(tour.title)` to
`open(tour)`.

## Price calculation

`Tour.price` is a free-text string from Sanity, always formatted like
`"$60"` (a `$` followed by digits, no decimals, no thousands separator —
true for every tour in the current dataset). Price-per-seat is derived by
stripping non-digit characters and parsing as an integer:

```ts
const perSeat = parseInt(tour.price.replace(/[^0-9]/g, ""), 10);
const total = perSeat * seats;
const totalPriceLabel = `$${total}`;
```

This assumes the `$<digits>` format holds for every tour — true today, and
the existing `Tour.price` field's own doc comment already says "Display
price, formatted exactly as it should appear (e.g. '$60')", so this isn't a
new constraint on content editors, just code reading an existing one.

## Seat count

- Local state in `BookingModal`, `seats: number`, starts at `1` every time
  the modal opens for a tour (reset alongside the existing status reset —
  see "State reset" below).
- Stepper: `−` button decrements (floor 1, disabled/no-op below that), `+`
  button increments (ceiling 10 — a reasonable cap for a group tour; there's
  no stated business rule for a higher limit, and Sanity has no per-tour
  capacity field to check against instead).
- `seats` is included in the lead payload alongside the computed
  `totalPriceLabel`.

## Payload contract change

Extends the contract from `docs/superpowers/specs/2026-08-27-lead-backend-design.md`
(`LeadPayload`/`LeadRequestBody`/`SheetLead`/`TelegramLead`, all currently
`{ tour, fullName, whatsapp, email, company }`) with two new fields:

```ts
type LeadPayload = {
  tour: string;
  seats: number;
  totalPrice: string; // e.g. "$120" — the already-computed, already-formatted total
  fullName: string;
  whatsapp: string;
  email: string;
  company: string; // honeypot
};
```

- `PrivateTourForm` (unchanged UI) sends `seats: 1` and `totalPrice: ""`
  (empty — private-tour requests don't have a per-seat price to report).
  This keeps one shared payload shape across both forms rather than making
  the API route handle two different request shapes.
- `route.ts` validation: `seats` must be a positive integer; `totalPrice`
  may be an empty string (private-tour case) or a non-empty string
  (booking-modal case) — not validated further beyond "is a string".
- Google Sheet columns become: `Timestamp | Tour | Seats | Total price |
  Full name | WhatsApp | Email` (inserted after `Tour`, before the contact
  fields, matching the mockup's visual order of tour-info-then-contact-info).
- Telegram message gains `Seats: {seats}` and `Total: {totalPrice}` lines
  (omitted from the message text when `totalPrice` is empty, i.e. for
  private-tour requests, to avoid a confusing blank "Total: " line).

## Visual redesign (BookingModal only)

Replacing the current dark (`bg-ink`, white text) popup with a light one,
using tokens already established in `design-system.md`/`globals.css`
(`--color-ink: #262626`, `--color-muted: #f2f2f2`, `--color-accent:
#ff4411`) — no new colors introduced:

- Popup container: `bg-white` (was `bg-ink`), same `rounded-[30px]`.
- Heading: static text "Booking a tour" (was the dynamic "Book:
  {tourName}"), `text-ink` (was `text-white`).
- New tour summary card: `bg-muted rounded-[20px]` container holding:
  - Thumbnail: `tour.images[0]` (the same image data `TourCard`/`TourGallery`
    already use), small square, rounded, `object-cover`.
  - `tour.title`, `text-ink`, smaller than the popup heading.
  - Seat stepper: two small round `bg-white` (or `bg-muted`-on-white, per
    the mockup's subtle circular buttons) `−`/`+` buttons flanking the
    current `seats` number.
  - `totalPriceLabel`, `text-ink`, right-aligned per the mockup.
- New explanatory copy between the summary card and the inputs: "After
  booking, our manager will contact you via WhatsApp to confirm the details
  of your tour." — `text-ink/60` (muted body text), matching the mockup's
  gray tone.
- Inputs: `bg-muted` (was `bg-white`), text/placeholder colors unchanged
  otherwise (`text-ink`, `placeholder:text-ink/50`).
- Close button (×): `text-ink/70` hover `text-ink` (was `text-white/70`
  hover `text-white`), since it now sits on a light background.
- Submit button, honeypot field, error/success states: unchanged
  (`bg-accent` button already reads fine on a light background; success/error
  text becomes `text-ink`/kept red respectively instead of white).

## State reset

The existing `useEffect` that calls `reset()` when `tourName` (now `tour`)
transitions to non-null on open also resets `seats` back to `1` in the same
effect, so reopening the modal for a different tour — or the same tour again
— always starts at 1 seat, matching the existing "fresh state on reopen"
behavior already built and reviewed in the prior sub-project.

## Out of scope

- `PrivateTourForm` visual changes — none, it's untouched by the mockup.
  Only its submit payload gains the two new fixed fields (`seats: 1`,
  `totalPrice: ""`), not its markup.
- A per-tour capacity/max-seats field in Sanity — the seat cap is a fixed
  code constant (10), not editable content, since there's no stated need for
  per-tour limits yet.
- Currency formats other than `$<digits>` — not present in current data, not
  handled.

## Files touched

- `src/components/BookingModalProvider.tsx` — `tourName: string | null` →
  `tour: Tour | null`; `open(tourName)` → `open(tour)`.
- `src/components/BookingModal.tsx` — visual redesign (light theme), new
  `seats` state + stepper, price calculation, new copy, updated payload.
- `src/components/TourCard.tsx` — `open(tour.title)` → `open(tour)`.
- `src/components/PrivateTourForm.tsx` — submit payload gains
  `seats: 1, totalPrice: ""`.
- `src/lib/useLeadSubmit.ts` — `LeadPayload` type gains `seats`/`totalPrice`.
- `src/app/api/lead/route.ts` — `LeadRequestBody` gains `seats`/`totalPrice`,
  validation extended, both fields passed through to the two integrations.
- `src/lib/telegram.ts` — message template gains conditional
  Seats/Total lines.
- `src/lib/leadSheet.ts` — appended row gains Seats/Total columns.
