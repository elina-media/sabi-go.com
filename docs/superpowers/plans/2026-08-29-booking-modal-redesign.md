# Booking Modal Redesign (Seats + Price) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the group-tour booking popup (`BookingModal`) to match a
provided mockup — light theme, a tour summary card with a seat-count
stepper and a price that scales with seat count — and carry the seat
count + total price through to Telegram/Sheets.

**Architecture:** `useBookingModal().open()` changes from taking a bare
tour-title string to taking the whole `Tour` object (image + price already
needed for the redesign). The shared `LeadPayload` type gains `seats` and
`totalPrice` fields, threaded through the API route, both integrations, and
both forms (`BookingModal` computes real values; `PrivateTourForm` sends
fixed `seats: 1, totalPrice: ""` since it has no specific tour/price).

**Tech Stack:** Same as the existing lead-backend feature — Next.js 16 App
Router, `next/image` for the new thumbnail (existing `unoptimized` pattern
from `TourGallery.tsx`).

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-29-booking-modal-redesign.md`.
- This redesign touches **only `BookingModal`** — `PrivateTourForm`'s
  markup is unchanged, only its submit payload gains two fixed fields.
- Price parsing: `Tour.price` is always `"$<digits>"` (e.g. `"$60"`); strip
  non-digits, parse as integer, multiply by `seats`, re-prefix with `$`.
- Seat count: starts at `1` on every open (including reopen for a
  different/same tour), stepper range `1`–`10` (hard-coded constants, no
  Sanity field), no seat count above `10`.
- `totalPrice` is the already-formatted string (e.g. `"$120"`), computed
  client-side once and sent as-is — the API route does not recompute it.
- No test framework exists in this repo (`package.json` only has `next
  lint`) — verification is manual: `tsc`, `lint`, `build`, `curl` against
  the dev server, and a live browser check performed by the controller (not
  the implementer) at the end, matching the previous lead-backend plan's
  approach.
- Colors: reuse existing tokens only (`bg-white`, `bg-muted`, `text-ink`,
  `bg-accent`) — no new colors introduced. Error text on the new light
  background uses `text-red-500` (not the old `text-red-300`, which was
  chosen for a dark background and would be too low-contrast on white).

---

### Task 1: Extend the lead payload contract with seats + total price

**Files:**
- Modify: `src/lib/useLeadSubmit.ts`
- Modify: `src/app/api/lead/route.ts`
- Modify: `src/lib/telegram.ts`
- Modify: `src/lib/leadSheet.ts`
- Modify: `src/components/PrivateTourForm.tsx`
- Modify: `src/components/BookingModal.tsx` (minimal patch only — see
  Step 6; the full redesign is Task 2)

**Interfaces:**
- Consumes: nothing new from outside this task.
- Produces: `LeadPayload` (from `src/lib/useLeadSubmit.ts`) becomes
  `{ tour: string; seats: number; totalPrice: string; fullName: string;
  whatsapp: string; email: string; company: string }`. Task 2's
  `BookingModal` rewrite relies on this exact shape.

This task is fully self-contained and independently testable via `curl` —
it doesn't touch the modal's visuals or the `Tour`-object context change
(that's Task 2). To keep the app buildable after this task, `BookingModal.tsx`
gets a one-line patch to its existing `submit()` call (adding the two new
required fields with placeholder values matching its current data) — Task 2
replaces that placeholder with the real computed values.

- [ ] **Step 1: Update `LeadPayload` in `src/lib/useLeadSubmit.ts`**

Read the current file, then change the type (rest of the file — the
`useLeadSubmit` function body — is unchanged):

```ts
export type LeadPayload = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};
```

- [ ] **Step 2: Update `src/app/api/lead/route.ts`**

Read the current file first. Replace the type and validation:

```ts
import { NextRequest, NextResponse } from "next/server";
import { sendLeadToTelegram } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/leadSheet";

export const runtime = "nodejs";

type LeadRequestBody = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isPositiveInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export async function POST(request: NextRequest) {
  let body: Partial<LeadRequestBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { tour, seats, totalPrice, fullName, whatsapp, email, company } =
    body;

  if (
    !isNonEmptyString(tour) ||
    !isPositiveInteger(seats) ||
    typeof totalPrice !== "string" ||
    !isNonEmptyString(fullName) ||
    !isNonEmptyString(whatsapp) ||
    !isNonEmptyString(email) ||
    !email.includes("@")
  ) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  if (typeof company === "string" && company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const lead = { tour, seats, totalPrice, fullName, whatsapp, email };

  const results = await Promise.allSettled([
    sendLeadToTelegram(lead),
    appendLeadToSheet(lead),
  ]);

  const failures = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (failures.length > 0) {
    for (const failure of failures) {
      console.error("Lead delivery failed:", failure.reason);
    }
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

(`totalPrice` is intentionally allowed to be an empty string — that's the
valid `PrivateTourForm` case — so it's checked with `typeof totalPrice !==
"string"`, not `isNonEmptyString`.)

- [ ] **Step 3: Update `src/lib/telegram.ts`**

Read the current file first. Replace with:

```ts
type TelegramLead = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
};

export async function sendLeadToTelegram(lead: TelegramLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram env vars are not configured");
  }

  const lines = ["New lead from sabigo.travel", `Tour: ${lead.tour}`];

  if (lead.totalPrice) {
    lines.push(`Seats: ${lead.seats}`, `Total: ${lead.totalPrice}`);
  }

  lines.push(
    `Name: ${lead.fullName}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
  );

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: lines.join("\n") }),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram API responded with ${response.status}`);
  }
}
```

- [ ] **Step 4: Update `src/lib/leadSheet.ts`**

Read the current file first. Replace with:

```ts
import { google } from "googleapis";

type SheetLead = {
  tour: string;
  seats: number;
  totalPrice: string;
  fullName: string;
  whatsapp: string;
  email: string;
};

export async function appendLeadToSheet(lead: SheetLead): Promise<void> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error("Google Sheets env vars are not configured");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Leads!A:G",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          lead.tour,
          lead.seats,
          lead.totalPrice,
          lead.fullName,
          lead.whatsapp,
          lead.email,
        ],
      ],
    },
  });
}
```

Note in your task report (doesn't require a code change): if/when the real
Google Sheet is created (still pending real credentials per the previous
lead-backend plan), its header row must be `Timestamp | Tour | Seats |
Total price | Full name | WhatsApp | Email` (7 columns, `A:G`) — if a sheet
already exists with the old 5-column header from before this task, it needs
its header row updated to match.

- [ ] **Step 5: Update `src/components/PrivateTourForm.tsx`**

Read the current file first. In the `handleSubmit` function, add the two
new fields to the `submit()` call (everything else in the file is
unchanged):

```ts
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.currentTarget;
  await submit({
    tour: "Private tour",
    seats: 1,
    totalPrice: "",
    fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
      .value,
    whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
      .value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    company: (form.elements.namedItem("company") as HTMLInputElement)
      .value,
  });
}
```

- [ ] **Step 6: Minimal patch to `src/components/BookingModal.tsx` (keep the app buildable — Task 2 replaces this)**

Read the current file first. In its `handleSubmit` function, add the two
new fields with placeholder values (using the existing `tourName` string
that this file still has at this point in the plan — Task 2 will replace
this whole file):

```ts
async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (!tourName) return;

  const form = event.currentTarget;
  await submit({
    tour: tourName,
    seats: 1,
    totalPrice: "",
    fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
      .value,
    whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
      .value,
    email: (form.elements.namedItem("email") as HTMLInputElement).value,
    company: (form.elements.namedItem("company") as HTMLInputElement)
      .value,
  });
}
```

Do not change anything else in this file in this task — no visual changes,
no context-shape changes. That's all Task 2.

- [ ] **Step 7: Type-check, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three pass with no errors.

- [ ] **Step 8: Start the dev server and verify with curl**

```bash
npm run dev
```

In a second terminal:

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","seats":2,"totalPrice":"$120","fullName":"Test User","whatsapp":"+77001234567","email":"test@example.com","company":""}'
```

Expected: HTTP `502` (credentials are still placeholders from the previous
plan — this confirms validation passed and the route attempted both
integrations, same as the original lead-backend plan's Step 5).

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","seats":0,"totalPrice":"$0","fullName":"Test User","whatsapp":"+77001234567","email":"test@example.com","company":""}'
```

Expected: HTTP `400` (`seats: 0` fails `isPositiveInteger`).

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","seats":1,"totalPrice":"","fullName":"Test User","whatsapp":"+77001234567","email":"test@example.com","company":""}'
```

Expected: HTTP `502` (this is the `PrivateTourForm` shape — empty
`totalPrice` is valid, so this should pass validation and reach the same
placeholder-credential failure as the first `curl`, not a `400`).

Stop the dev server using its exact PID (`lsof -i :3000`, then `kill
<pid>`) — do not use a broad `pkill` pattern.

- [ ] **Step 9: Commit**

```bash
git add src/lib/useLeadSubmit.ts src/app/api/lead/route.ts src/lib/telegram.ts src/lib/leadSheet.ts src/components/PrivateTourForm.tsx src/components/BookingModal.tsx
git commit -m "Extend lead payload with seats and total price"
```

---

### Task 2: Redesign BookingModal (light theme, tour card, seat stepper)

**Files:**
- Modify: `src/components/BookingModalProvider.tsx`
- Modify: `src/components/BookingModal.tsx` (full rewrite)
- Modify: `src/components/TourCard.tsx`

**Interfaces:**
- Consumes: `LeadPayload` from `src/lib/useLeadSubmit.ts` (Task 1) —
  `{ tour, seats, totalPrice, fullName, whatsapp, email, company }`. `Tour`
  type from `src/data/tours.ts` (`id, title, price, images: {src, alt}[],
  badge?, bookHref, moreHref`).
- Produces: `useBookingModal()` now returns `{ tour: Tour | null, open:
  (tour: Tour) => void, close: () => void }` (was `{ tourName: string |
  null, open: (tourName: string) => void, close: () => void }`). No other
  file besides `TourCard.tsx` calls `open()` at this point in the codebase.

- [ ] **Step 1: Update `src/components/BookingModalProvider.tsx`**

Read the current file first. Replace with:

```tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Tour } from "@/data/tours";

type BookingModalContextValue = {
  tour: Tour | null;
  open: (tour: Tour) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [tour, setTour] = useState<Tour | null>(null);

  return (
    <BookingModalContext.Provider
      value={{
        tour,
        open: (nextTour: Tour) => setTour(nextTour),
        close: () => setTour(null),
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider",
    );
  }
  return context;
}
```

- [ ] **Step 2: Update `src/components/TourCard.tsx`**

Read the current file first. Change only the "Book a tour" button's
`onClick` (everything else in the file — the gallery, price pill, "More"
link — is unchanged):

```tsx
<button
  type="button"
  onClick={() => open(tour)}
  className="flex h-[40px] w-full items-center justify-center rounded-full bg-accent text-sm tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
>
  Book a tour
</button>
```

(Only the `onClick` value changes, from `() => open(tour.title)` to
`() => open(tour)` — the className and everything else stays identical to
the current file.)

- [ ] **Step 3: Rewrite `src/components/BookingModal.tsx`**

Read the current file first (to see the exact starting point after Task 1's
minimal patch), then replace the entire file with:

```tsx
"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useBookingModal } from "./BookingModalProvider";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-muted px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

const MIN_SEATS = 1;
const MAX_SEATS = 10;

function subscribeNoop() {
  return () => {};
}

function priceForSeats(price: string, seats: number): string {
  const perSeat = parseInt(price.replace(/[^0-9]/g, ""), 10);
  if (Number.isNaN(perSeat)) return price;
  return `$${perSeat * seats}`;
}

export default function BookingModal() {
  const { tour, close } = useBookingModal();
  const { status, submit, reset } = useLeadSubmit();
  const [seats, setSeats] = useState(MIN_SEATS);
  const isOpen = tour !== null;

  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (tour !== null) {
      reset();
      setSeats(MIN_SEATS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  function handleClose() {
    close();
    reset();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tour) return;

    const form = event.currentTarget;
    await submit({
      tour: tour.title,
      seats,
      totalPrice: priceForSeats(tour.price, seats),
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
    });
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div
        onClick={handleClose}
        aria-hidden
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div className="relative flex w-full max-w-[518px] flex-col gap-4 rounded-[30px] bg-white p-6">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl leading-none text-ink/70 transition-colors hover:text-ink"
          >
            &times;
          </button>

          <h3 className="pr-8 font-sans text-2xl font-medium text-ink">
            Booking a tour
          </h3>

          <div className="flex items-center gap-3 rounded-[20px] bg-muted p-3">
            <div className="relative size-[52px] shrink-0 overflow-hidden rounded-[12px]">
              <Image
                src={tour.images[0].src}
                alt={tour.images[0].alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <p className="flex-1 font-sans text-sm text-ink">{tour.title}</p>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setSeats((s) => Math.max(MIN_SEATS, s - 1))}
                disabled={seats <= MIN_SEATS}
                aria-label="Decrease seats"
                className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-40"
              >
                −
              </button>
              <span className="font-sans text-sm text-ink">{seats}x</span>
              <button
                type="button"
                onClick={() => setSeats((s) => Math.min(MAX_SEATS, s + 1))}
                disabled={seats >= MAX_SEATS}
                aria-label="Increase seats"
                className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-40"
              >
                +
              </button>
            </div>

            <span className="shrink-0 font-sans text-lg text-ink">
              {priceForSeats(tour.price, seats)}
            </span>
          </div>

          <p className="font-sans text-sm text-ink/60">
            After booking, our manager will contact you via WhatsApp to
            confirm the details of your tour.
          </p>

          {status === "success" ? (
            <div className="flex flex-col gap-2 text-ink">
              <p className="font-sans text-2xl font-medium">Thank you!</p>
              <p className="font-sans text-lg">
                We&rsquo;ve received your request and will contact you
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
              />
              <input
                type="text"
                name="fullName"
                required
                placeholder="Full name"
                autoComplete="name"
                className={inputClassName}
              />
              <input
                type="tel"
                name="whatsapp"
                required
                placeholder="WhatsApp number"
                autoComplete="tel"
                className={inputClassName}
              />
              <input
                type="email"
                name="email"
                required
                placeholder="E-mail"
                autoComplete="email"
                className={inputClassName}
              />

              {status === "error" && (
                <p className="mt-2 font-sans text-sm text-red-500">
                  Couldn&rsquo;t send your request — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit a request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
```

Design decision baked into this code (not explicitly spelled out in the
spec, noted here for the reviewer): the tour summary card and the WhatsApp
explanatory copy stay visible even after a successful submission — only the
form-vs-thank-you-message block below them toggles. This avoids the success
state losing context of which tour was booked, and was simpler than hiding
the card on success (which the spec didn't ask for either way).

- [ ] **Step 4: Type-check, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three pass with no errors.

- [ ] **Step 5: Start the dev server and verify with curl (SSR smoke test)**

```bash
npm run dev
```

In a second terminal:

```bash
curl -s http://localhost:3000/ | grep -o 'Booking a tour'
curl -s http://localhost:3000/ | grep -o 'Book a tour'
```

Expected: the homepage doesn't crash (still returns the page); "Booking a
tour" won't actually appear in the initial HTML since the modal only
renders when opened client-side (`if (!mounted || !isOpen) return null`) —
this curl is just confirming the page still renders without a 500 after
the `TourCard`/`BookingModalProvider` changes. Confirm "Book a tour" (the
trigger button, which IS server-rendered as part of the initial HTML)
still appears 3 times (once per tour card).

Stop the dev server using its exact PID — do not use a broad `pkill`.

- [ ] **Step 6: Manual code-path trace (no live browser available to you)**

Read through your own diff once and confirm in your report:
- `TourCard`'s `open(tour)` passes the whole tour object, so `BookingModal`
  has `tour.images[0]`, `tour.title`, `tour.price` available immediately on
  open — no separate fetch or lookup needed.
- Reopening the modal for a different tour resets `seats` back to `1` (the
  `useEffect` keyed on `[tour]` calls both `reset()` and `setSeats(MIN_SEATS)`).
  Reopening for the *same* tour also resets `seats` to `1` — clicking "Book
  a tour" always creates a new object reference in `TourCard`'s `tour` prop
  (it's the same underlying data but the `Tour` object passed to `open`
  triggers the effect via referential inequality on the `tour` state
  itself, since `setTour(nextTour)` in the provider always sets a new
  value even if its fields are identical — confirm this reasoning holds by
  reading `BookingModalProvider.tsx`'s `open` function).
- The stepper buttons are `disabled` (not just clamped) at `MIN_SEATS`/`MAX_SEATS`,
  so `Math.max`/`Math.min` in the click handlers are defense-in-depth, not
  the only guard.
- `priceForSeats` is called both for the live display (as `seats` changes)
  and for the submitted `totalPrice` — same function, so the number shown
  to the user always matches what's sent to the backend.

This is a live-browser-verification item explicitly deferred to the
controller, matching the previous lead-backend plan's pattern — note this
in your report rather than claiming you clicked through it.

- [ ] **Step 7: Commit**

```bash
git add src/components/BookingModalProvider.tsx src/components/BookingModal.tsx src/components/TourCard.tsx
git commit -m "Redesign BookingModal with tour summary card and seat stepper"
```

---

## Self-Review Notes

- **Spec coverage:** Light theme + tour card + stepper + price scaling +
  copy → Task 2. Payload/Telegram/Sheets seats+totalPrice → Task 1. `open()`
  taking the whole `Tour` → Task 2 Step 1. `PrivateTourForm` payload-only
  change (no markup change) → Task 1 Step 5. Seat range 1–10, reset on
  open → Task 2 Step 3. Sheet header-row note for the still-pending real
  spreadsheet → Task 1 Step 4.
- **Type consistency:** `LeadPayload` (Task 1 Step 1) = `{ tour, seats,
  totalPrice, fullName, whatsapp, email, company }`, matched exactly by
  `LeadRequestBody` (Task 1 Step 2), `TelegramLead`/`SheetLead` (Task 1
  Steps 3–4, minus `company`, consistent with how the original plan already
  stripped `company` before calling the integrations), and both call
  sites' `submit()` payloads (Task 1 Steps 5–6, Task 2 Step 3).
  `useBookingModal()`'s `{ tour: Tour | null, open(tour: Tour), close() }`
  (Task 2 Step 1) matches its only call site, `TourCard.tsx` (Task 2 Step 2:
  `open(tour)`), and its consumer in `BookingModal.tsx` (Task 2 Step 3:
  destructures `tour`, reads `tour.images[0]`/`tour.title`/`tour.price`).
- **Task ordering:** Task 1's Step 6 (minimal `BookingModal.tsx` patch)
  exists solely to keep the app buildable between Task 1 and Task 2 — Task
  2 Step 3 fully replaces that file, so the placeholder `seats: 1,
  totalPrice: ""` in Task 1 never reaches a real user (it's overwritten
  before Task 2's commit, both within the same plan execution).
