# Lead backend: Telegram + Google Sheets

Date: 2026-08-27
Status: approved, not yet implemented

## Context

`PrivateTourForm.tsx` collects `fullName` / `whatsapp` / `email`, but the
submit handler only `console.log`s the payload (see the `TODO` at
`src/components/PrivateTourForm.tsx:27`). No requests reach the team. This is
the first of two independent sub-projects the user asked for:

1. **This spec** — wire form submissions to Telegram + Google Sheets, and add
   a booking popup for group tours.
2. **Next (separate spec, not covered here)** — internal tour pages. Order
   agreed with the user: backend first (small, standalone, stops losing real
   leads immediately) → one tour page built as a template with its own
   "Book a tour" trigger reusing the same popup and backend → template
   replicated to the rest of the tours once approved → multi-language pass
   once all page content exists in English. The internal-pages spec will be
   written separately when that sub-project starts.

## Two entry points, one backend

The user's requirement (verbatim intent): a visitor either (a) scrolls to the
"Want a private tour?" section and fills it in directly, or (b) clicks
"Book a tour" on a specific group tour — in the Tours block on the homepage,
or later on that tour's own detail page — which opens a **popup** with the
same three inputs. Both paths send exactly the same four pieces of data to
the team:

1. **Tour** — `"Private tour"` for path (a), or the specific tour's title for
   path (b).
2. **Full name**
3. **WhatsApp number**
4. **Email**

No separate `source` field — `tour` always carries this meaning by itself,
since it's always populated (either the literal `"Private tour"` or a real
tour title). No tour picker is ever shown inside the form — which value goes
into `tour` is determined entirely by which entry point the user came
through.

## Architecture

### API

One Next.js Route Handler, `src/app/api/lead/route.ts`, `POST`, Node.js
runtime (needs to stay off Edge — the Google Sheets client signs a JWT with a
service-account private key, which requires Node crypto).

```
LeadForm (shared hook, used by both entry points)
  → POST /api/lead { tour, fullName, whatsapp, email, company }
  → route handler:
      - validates payload
      - honeypot check (see below)
      - Promise.allSettled([sendToTelegram(...), appendToSheet(...)])
      - both fulfilled → 200 { ok: true }
      - either rejected → 502 { ok: false }
```

### Booking popup

New client components, following the same pattern already used for the
mobile menu (`MobileMenuProvider` + `MobileMenu.tsx`: context for open/close
state, single portal-rendered instance so it doesn't matter which part of
the tree triggers it):

- `src/components/BookingModalProvider.tsx` — context holding
  `{ tourName: string | null, open(tourName: string): void, close(): void }`.
  Mounted in `src/app/layout.tsx` alongside `MobileMenuProvider`.
- `src/components/BookingModal.tsx` — the actual dialog: backdrop, close
  button, the three inputs, submit button, idle/submitting/success/error
  states. Rendered once in `src/app/page.tsx` (next to `<MobileMenu />`) via
  `createPortal` into `document.body`. Locks body scroll while open, same as
  `MobileMenu.tsx`. Reads `tourName` from context to know what to send as
  `tour` and to show in its heading ("Book: {tourName}").
- `src/components/TourCard.tsx` — "Book a tour" changes from a `<Link
  href={tour.bookHref}>` to a `<button onClick={() => open(tour.title)}>`
  using `useBookingModal()`. `bookHref` becomes unused for this button (still
  fine to leave in the Sanity schema/type for now — not touching that in this
  spec).
- Later (next sub-project, not now): the tour detail page's own "Book a
  tour" button calls the same `open(tour.title)`.

### Shared submit logic

Both `PrivateTourForm.tsx` and `BookingModal.tsx` need identical
validation/fetch/state-machine behavior, only the `tour` value and the
container markup differ. Extract a shared hook,
`src/components/useLeadSubmit.ts` (or colocated in a small shared module),
that owns `status: "idle" | "submitting" | "success" | "error"` and exposes a
`submit({ tour, fullName, whatsapp, email })` function doing the
`fetch("/api/lead")` call. Each component keeps its own form markup/inputs
and calls the shared hook on submit.

## Request contract

```ts
type LeadRequest = {
  tour: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string; // honeypot — must be empty
};
```

Server-side validation: `tour`, `fullName`, `whatsapp`, `email` must all be
non-empty strings, `email` must contain `@`. Missing/invalid → `400`, before
any honeypot or integration logic runs.

## Spam protection

`company` is a hidden form field (CSS: visually hidden, but present in the
DOM and tab order excluded) that real users never see or fill, but simple
bots that auto-fill every field do. Present in both the inline form and the
popup. If `company` is non-empty:

- Respond `200 { ok: true }` immediately.
- Do not call Telegram or Sheets.
- Do not log the attempt anywhere persistent (console is fine for local
  debugging).

Responding with a fake success (not a 4xx) is deliberate — it doesn't tip the
bot off that it was caught, so it won't iterate on bypassing the field.

No rate limiting beyond the honeypot for this first version — the site is
new with no bot traffic yet. Revisit if spam actually shows up.

## Integrations

**Telegram** — plain `fetch` to
`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage` with
`chat_id: TELEGRAM_CHAT_ID` and a formatted text message (tour, name,
WhatsApp, email, timestamp). No SDK — it's a single REST call.

**Google Sheets** — `googleapis` package (official Google client),
`google.auth.JWT` with `GOOGLE_SERVICE_ACCOUNT_EMAIL` +
`GOOGLE_PRIVATE_KEY`, scope `https://www.googleapis.com/auth/spreadsheets`.
Appends one row via `spreadsheets.values.append` on `GOOGLE_SHEET_ID`, sheet
tab `Leads`, columns:

| Timestamp (ISO) | Tour | Full name | WhatsApp | Email |
|---|---|---|---|---|

New environment variables (added to `.env.local` locally, keys documented in
`.env.example`, values set in Vercel project settings for deploy):

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

Setup (dedicated new resources, not reused from other projects):

- **Telegram**: new bot created via @BotFather specifically for this site;
  target a group chat (not a personal DM) so it's easy to add more people
  later; the chat's numeric `chat_id` goes in `TELEGRAM_CHAT_ID`.
- **Google Sheets**: new spreadsheet dedicated to this site's leads; new
  service account in Google Cloud Console; the sheet is shared with the
  service account's email as Editor.

Exact click-by-click steps for both are handled during implementation, not
part of this design.

## Error handling & form UX

Both the inline form and the popup share the `"error"` state (via the shared
hook) alongside `idle | submitting | success`:

- On `502`/`400`/network failure: status → `"error"`, inputs keep their
  values (no reset), a message renders near the submit button ("Не
  получилось отправить, попробуйте ещё раз" / English equivalent per current
  page language), submit button re-enables.
- On success: inputs are replaced with a thank-you message, same as the
  current `PrivateTourForm` behavior. In the popup, the user closes it
  manually (X button or backdrop click) — no auto-close timer, so they have
  time to read the confirmation.
- Known accepted tradeoff: if Telegram succeeds but Sheets fails, the "both
  must succeed" contract means the user retries, and Telegram receives a
  duplicate message on retry. This is fine — a manager sees one extra
  duplicate notification, not a lost lead. Building cross-service
  transactionality to avoid this is not worth the complexity for two
  external APIs.

## Out of scope for this spec

- Any routing/content for tour detail pages themselves (separate spec, next
  sub-project) — only the popup's reusability for that future trigger is
  accounted for here.
- Rate limiting beyond the honeypot.
- Retry queues / background jobs if Telegram or Sheets are down for an
  extended period — a failed submission just asks the user to retry.
- i18n of the error/success copy (site is English-only for now, per project
  status).

## Files touched

- `src/app/api/lead/route.ts` — new, the route handler.
- `src/components/useLeadSubmit.ts` — new, shared submit hook (validation +
  `fetch` + status state machine) used by both forms.
- `src/components/BookingModalProvider.tsx` — new, context for popup
  open/close + which tour.
- `src/components/BookingModal.tsx` — new, the popup itself (portal-rendered,
  same pattern as `MobileMenu.tsx`).
- `src/app/layout.tsx` — mount `BookingModalProvider` alongside
  `MobileMenuProvider`.
- `src/app/page.tsx` — mount `<BookingModal />` once, next to `<MobileMenu />`.
- `src/components/TourCard.tsx` — "Book a tour" becomes a button that opens
  the popup with `tour.title`, instead of a `<Link href={tour.bookHref}>`.
- `src/components/PrivateTourForm.tsx` — switch to the shared submit hook,
  hardcode `tour: "Private tour"`, add honeypot field, add `"error"` state UI,
  replace the `console.log` TODO with the real submit call.
- `.env.example` — document the five new keys (no values).
- `package.json` — add `googleapis` dependency.
- `CLAUDE.md` — update file map / progress once implemented (per the
  project's "update CLAUDE.md as you go" rule).
