# WhatsApp phone input: country mask + selector

Date: 2026-08-30
Status: approved, not yet implemented

## Context

The "WhatsApp number" field in both lead-capture forms
(`PrivateTourForm.tsx`'s inline form and `BookingModal.tsx`'s popup) is
currently a plain `<input type="tel">` with no formatting or country
awareness — the user types digits freely. The user provided a reference
screenshot showing a phone input with a country flag dropdown and a
formatted mask (e.g. `+7 (000) 000-00-00` for Kazakhstan) and asked for the
same behavior, with the country defaulting to Kazakhstan but selectable
(the business is Kazakhstan-based, but tours are also booked by foreign
tourists who need their own country code).

## Goals

- Country flag + dropdown selector, default Kazakhstan, any country
  selectable.
- Input formats/masks itself to the selected country's national number
  format as the user types.
- Submit is blocked (button disabled, same mechanism as the existing
  `submitting`-state disable) when the phone number is incomplete/invalid
  for the selected country — not just during network submission.
- Same behavior in both forms — one shared component, not two
  implementations.

## Library

`react-phone-number-input` (bundles `libphonenumber-js` for parsing,
formatting, and validation; ships its own flag icon set — no separate asset
work). This is the first non-Tailwind CSS dependency in the project: the
library needs its own stylesheet (`react-phone-number-input/style.css`) for
the flag/dropdown-arrow/input flex layout, which cannot be fully replicated
with utility classes alone. This is a deliberate, documented exception to
the "Tailwind-only" styling convention — everything else about the input's
appearance (height, radius, background, text size) is still restyled via
Tailwind classes passed into the library's `className`/`numberInputProps`.

## Component

New `src/components/PhoneInput.tsx`, `"use client"`:

- Props: `value: string`, `onChange: (value: string) => void` — a
  controlled component, matching the library's own controlled API
  (`value`/`onChange` on `<PhoneInput>` from `react-phone-number-input`).
- `defaultCountry="KZ"`.
- Restyled via the library's style-injection props to match the existing
  pill inputs (`h-[50px] rounded-[70px]`, background/text colors matching
  whichever theme the consuming form uses — see "Theming" below).
- Does not itself expose a validity flag — each consuming form calls
  `isValidPhoneNumber` (imported from `react-phone-number-input`) directly
  on the `whatsapp` state value it already holds, to gate its own submit
  button. Keeps `PhoneInput` a plain controlled input with no extra
  contract beyond `value`/`onChange`.

## Theming

`PrivateTourForm` uses white pill inputs (`bg-white`) on a dark video
background; `BookingModal` uses light-gray pill inputs (`bg-muted`) on a
white popup (from the recent redesign). `PhoneInput` needs to support both
— it takes a `background: "white" | "muted"` prop (or equivalent) so each
form passes its own existing input background instead of `PhoneInput`
hardcoding one.

## Data flow change

Both forms currently read `whatsapp` via
`form.elements.namedItem("whatsapp")` from an uncontrolled native `<input>`
— consistent with `fullName`/`email` staying uncontrolled. Since
`react-phone-number-input`'s `PhoneInput` is a controlled component (no
clean way to read a fully-masked, country-aware value back out of raw
`FormData`/`form.elements`), `whatsapp` becomes the one controlled field in
each form: local `useState<string>("")`, updated via `PhoneInput`'s
`onChange`, and passed directly into the `submit({..., whatsapp: phoneValue})`
call instead of being read from the DOM at submit time. `fullName` and
`email` are unaffected — still uncontrolled, still read via
`form.elements.namedItem`.

This also affects the existing "don't clear inputs on error" behavior
(a global constraint from the original lead-backend spec): since `whatsapp`
becomes controlled local state instead of DOM state, it naturally survives
an error re-render the same way `fullName`/`email` already do via
uncontrolled DOM persistence — no special-casing needed, just confirm this
holds once implemented.

## Submit gating

Both forms' submit `<button disabled={...}>` currently only checks
`status === "submitting"`. This becomes
`status === "submitting" || !isValidPhoneNumber(whatsapp)` (import
`isValidPhoneNumber` from `react-phone-number-input`). An empty/incomplete
number keeps the button disabled without any separate error message — the
existing `required` semantics on the other two inputs already communicate
"fill in the form" implicitly; no new UI copy needed for this.

## Backend

No change. `route.ts`'s `whatsapp` validation stays `isNonEmptyString` — the
client now guarantees a complete, valid, country-formatted number before
submission is even possible, so no new server-side format validation is
being requested or needed.

## Out of scope

- Storing/parsing the phone number in any format other than what the
  library produces by default (E.164, e.g. `+77001234567`) — that's what
  gets sent to Telegram/Sheets, same as today's raw string, just now
  guaranteed well-formed.
- Any change to `fullName`/`email` inputs — they stay uncontrolled.
- Server-side phone validation — deliberately left to the client per
  "Backend" above.

## Files touched

- `package.json` — add `react-phone-number-input`.
- `src/components/PhoneInput.tsx` — new shared component.
- `src/app/globals.css` — one `@import` for the library's base stylesheet.
- `src/components/PrivateTourForm.tsx` — swap the WhatsApp `<input>` for
  `<PhoneInput>`, add local `whatsapp` state, update submit payload and
  button-disabled condition.
- `src/components/BookingModal.tsx` — same changes as `PrivateTourForm.tsx`.
- `design-system.md` — document the one non-Tailwind-CSS exception and why.
