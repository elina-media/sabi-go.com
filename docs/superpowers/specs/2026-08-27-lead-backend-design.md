# Lead backend: Telegram + Google Sheets

Date: 2026-08-27
Status: approved, not yet implemented

## Context

`PrivateTourForm.tsx` collects `fullName` / `whatsapp` / `email`, but the
submit handler only `console.log`s the payload (see the `TODO` at
`src/components/PrivateTourForm.tsx:27`). No requests reach the team. This is
the first of two independent sub-projects the user asked for:

1. **This spec** — wire form submissions to Telegram + Google Sheets.
2. **Next (separate spec, not covered here)** — internal tour pages. Order
   agreed with the user: backend first (small, standalone, stops losing real
   leads immediately) → one tour page built as a template with its own
   request form hitting the same backend → template replicated to the rest
   of the tours once approved → multi-language pass once all page content
   exists in English. The internal-pages spec will be written separately
   when that sub-project starts.

## Goals

- Every form submission on the site reaches both a Telegram chat and a
  Google Sheet.
- The endpoint is reusable by future forms (tour detail pages) without
  changes — only the `source` value differs per caller.
- Basic spam protection without hurting UX for real users.
- Success is only reported to the user when both channels actually recorded
  the lead — no silent partial failures.

## Architecture

One Next.js Route Handler, `src/app/api/lead/route.ts`, `POST`, Node.js
runtime (default App Router runtime — needs to stay off Edge because the
Google Sheets client signs a JWT with a service-account private key, which
requires Node crypto).

```
PrivateTourForm.tsx (and future forms)
  → POST /api/lead { fullName, whatsapp, email, source, company }
  → route handler:
      - validates payload
      - honeypot check (see below)
      - Promise.allSettled([sendToTelegram(...), appendToSheet(...)])
      - both fulfilled → 200 { ok: true }
      - either rejected → 502 { ok: false }
```

`source` is a required string identifying which form/page sent the lead
(e.g. `"private-tour"`). Future tour-page forms pass their own value (e.g.
`"tour:almaty-city-tour"`). This is the only thing that changes per caller —
the route itself stays generic.

## Request contract

```ts
type LeadRequest = {
  fullName: string;
  whatsapp: string;
  email: string;
  source: string;
  company: string; // honeypot — must be empty
};
```

Server-side validation: `fullName`, `whatsapp`, `email`, `source` must be
non-empty strings, `email` must contain `@`. Missing/invalid → `400`, before
any honeypot or integration logic runs.

## Spam protection

`company` is a hidden form field (CSS: visually hidden, but present in the
DOM and tab order excluded) that real users never see or fill, but simple
bots that auto-fill every field do. If `company` is non-empty:

- Respond `200 { ok: true }` immediately.
- Do not call Telegram or Sheets.
- Do not log the attempt anywhere persistent (console is fine for local
  debugging).

Responding with a fake success (not a 4xx) is deliberate — it doesn't tip
the bot off that it was caught, so it won't iterate on bypassing the field.

No rate limiting beyond the honeypot for this first version — the site is
new with no bot traffic yet. Revisit if spam actually shows up.

## Integrations

**Telegram** — plain `fetch` to
`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage` with
`chat_id: TELEGRAM_CHAT_ID` and a formatted text message (name, WhatsApp,
email, source, timestamp). No SDK — it's a single REST call.

**Google Sheets** — `googleapis` package (official Google client),
`google.auth.JWT` with `GOOGLE_SERVICE_ACCOUNT_EMAIL` +
`GOOGLE_PRIVATE_KEY`, scope
`https://www.googleapis.com/auth/spreadsheets`. Appends one row via
`spreadsheets.values.append` on `GOOGLE_SHEET_ID`, sheet tab `Leads`,
columns:

| Timestamp (ISO) | Source | Full name | WhatsApp | Email |
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

`PrivateTourForm.tsx` gains an `"error"` state alongside
`idle | submitting | success`:

- On `502`/`400`/network failure: state → `"error"`, form fields keep their
  values (no reset), a message renders near the submit button ("Не
  получилось отправить, попробуйте ещё раз" / English equivalent per current
  page language), and the submit button re-enables.
- Known accepted tradeoff: if Telegram succeeds but Sheets fails, the
  "both must succeed" contract means the user retries, and Telegram receives
  a duplicate message on retry. This is fine — a manager sees one extra
  duplicate notification, not a lost lead. Building cross-service
  transactionality to avoid this is not worth the complexity for two
  external APIs.

## Out of scope for this spec

- Any UI/routing for tour detail pages (separate spec, next sub-project).
- Rate limiting beyond the honeypot.
- Retry queues / background jobs if Telegram or Sheets are down for an
  extended period — a failed submission just asks the user to retry.
- i18n of the error/success copy (site is English-only for now, per project
  status).

## Files touched

- `src/app/api/lead/route.ts` — new, the route handler.
- `src/components/PrivateTourForm.tsx` — add `source: "private-tour"` and
  honeypot field to the submit payload, add `"error"` state and its UI,
  replace the `console.log` TODO with a real `fetch("/api/lead")` call.
- `.env.example` — document the five new keys (no values).
- `package.json` — add `googleapis` dependency.
- `CLAUDE.md` — update file map / progress once implemented (per the
  project's "update CLAUDE.md as you go" rule).
