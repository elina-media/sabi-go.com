# Lead Backend (Telegram + Google Sheets + Booking Popup) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Every lead-capture form on the site (the existing "Want a private tour?" section, and a new "Book a tour" popup for group tours) sends `{ tour, fullName, whatsapp, email }` to both a Telegram chat and a Google Sheet, instead of just `console.log`-ing it.

**Architecture:** One shared `POST /api/lead` Route Handler calls two independent integration functions (Telegram, Google Sheets) via `Promise.allSettled` and only reports success if both succeed. Two client entry points — the existing inline `PrivateTourForm` and a new portal-rendered `BookingModal` (same context+portal pattern as the existing `MobileMenu`) — share one `useLeadSubmit` hook for validation-free client submit/status handling (validation is server-side).

**Tech Stack:** Next.js 16 App Router Route Handlers (Node runtime), `googleapis` (official Google API client), plain `fetch` for the Telegram Bot API, React Context + `createPortal` for the popup.

## Global Constraints

- Payload sent to the backend is exactly `{ tour, fullName, whatsapp, email, company }` — `company` is the honeypot, never shown to the user as a real field. No separate `source` field (per approved spec, `docs/superpowers/specs/2026-08-27-lead-backend-design.md`).
- Success is reported to the user only when **both** Telegram and Sheets succeed (`Promise.allSettled`, fail if either rejected).
- Honeypot (`company` non-empty) → respond `200 { ok: true }` without calling either integration.
- Styling: Tailwind utility classes only, no inline `style`, no CSS modules (project convention).
- `"use client"` only on files that need interactivity (project convention) — `route.ts` and the two `src/lib/*.ts` integration files are server-only, no directive.
- No test framework exists in this repo (`package.json` has no `jest`/`vitest`/`playwright`, only `next lint`). This plan uses manual verification (dev server + `curl` + browser) instead of automated tests at every step — this is a deliberate deviation from TDD, matching the project's existing verification style (CLAUDE.md: "После каждого блока — стоп, жду проверку").
- New env vars (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`) go in `.env.local` (gitignored) with keys-only documented in `.env.example`.

---

### Task 1: External resources + env vars + dependency

**Files:**
- Create: `.env.local` (gitignored, not committed)
- Modify: `.env.example`
- Modify: `package.json` (via `npm install`)

**Interfaces:**
- Produces: five env vars available to `process.env` at runtime — `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`. Task 2 reads these.
- Produces: `googleapis` package installed and importable as `import { google } from "googleapis"`.

This task is mostly manual account setup, done once by whoever has access to Telegram/Google accounts for this business (the user, not necessarily the engineer). Every sub-step is required — the two integration functions in Task 2 cannot be verified without real credentials.

- [ ] **Step 1: Create a dedicated Telegram bot**

In Telegram, message `@BotFather` → `/newbot` → choose a display name (e.g. "Sabi Go Leads") and a unique username ending in `bot` (e.g. `sabigo_leads_bot`). BotFather replies with an API token like `123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`. Save it — this is `TELEGRAM_BOT_TOKEN`.

- [ ] **Step 2: Create a group chat and get its chat_id**

Create a new Telegram group (e.g. "Sabi Go — Leads"), add the bot to it as a member, and send any message in the group (e.g. "test"). Then, in a browser, visit:

```
https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getUpdates
```

(replace `<TELEGRAM_BOT_TOKEN>` with the real token). The JSON response contains a `"chat":{"id":-1001234567890, ...}` block — that negative number is `TELEGRAM_CHAT_ID`. If the response is empty (`"result":[]`), send another message in the group and refresh — Telegram only shows updates the bot hasn't been queried for yet.

- [ ] **Step 3: Create the Google Sheet**

Create a new Google Sheet (e.g. "Sabi Go — Leads"). Rename the first tab to `Leads`. In row 1, add header cells: `Timestamp`, `Tour`, `Full name`, `WhatsApp`, `Email`. Copy the spreadsheet ID from the URL — `https://docs.google.com/spreadsheets/d/<SPREADSHEET_ID>/edit` — this is `GOOGLE_SHEET_ID`.

- [ ] **Step 4: Create a Google Cloud service account**

In [Google Cloud Console](https://console.cloud.google.com/): create a new project (or reuse one dedicated to this site), enable the **Google Sheets API** for it (APIs & Services → Enable APIs → search "Google Sheets API" → Enable), then go to IAM & Admin → Service Accounts → Create Service Account (any name, e.g. `sabigo-leads-sheet`). Open the created service account → Keys tab → Add Key → Create new key → JSON. This downloads a JSON file containing `client_email` and `private_key`.

- [ ] **Step 5: Share the Sheet with the service account**

Open the Google Sheet from Step 3 → Share → paste the `client_email` value from the downloaded JSON (looks like `sabigo-leads-sheet@<project>.iam.gserviceaccount.com`) → give it **Editor** access.

- [ ] **Step 6: Write `.env.local`**

Create `/Users/tamerlansharifov/projects/sabi-go_website/.env.local` (or append if it already has the Sanity keys) with:

```
TELEGRAM_BOT_TOKEN=<token from Step 1>
TELEGRAM_CHAT_ID=<chat id from Step 2>
GOOGLE_SERVICE_ACCOUNT_EMAIL=<client_email from the JSON key>
GOOGLE_PRIVATE_KEY=<private_key from the JSON key, as one line with literal \n sequences kept intact>
GOOGLE_SHEET_ID=<spreadsheet id from Step 3>
```

The `private_key` value in the downloaded JSON already contains `\n` as two-character escape sequences inside a JSON string — when copying it into `.env.local` keep it as a single line with those `\n` sequences literally present (don't convert them to real line breaks). Task 2's code un-escapes them at runtime.

- [ ] **Step 7: Document the keys in `.env.example`**

Read the current file first:

```bash
cat /Users/tamerlansharifov/projects/sabi-go_website/.env.example
```

Append (keys only, no real values):

```
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

- [ ] **Step 8: Install the Google API client**

```bash
cd /Users/tamerlansharifov/projects/sabi-go_website && npm install googleapis
```

Expected: `package.json` gains `"googleapis": "^<version>"` under `dependencies`, `package-lock.json` updates, install finishes with no errors.

- [ ] **Step 9: Verify the app still builds**

```bash
npm run build
```

Expected: build succeeds (no code changes yet in this task, this just confirms the new dependency didn't break anything).

- [ ] **Step 10: Commit**

```bash
git add .env.example package.json package-lock.json
git commit -m "Add googleapis dependency and document lead-backend env vars"
```

(`.env.local` is gitignored and must NOT be committed — verify with `git status` that it doesn't show as staged.)

---

### Task 2: Telegram + Sheets integration libs and the `/api/lead` route

**Files:**
- Create: `src/lib/telegram.ts`
- Create: `src/lib/leadSheet.ts`
- Create: `src/app/api/lead/route.ts`

**Interfaces:**
- Consumes: env vars from Task 1 (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`), `googleapis` package.
- Produces: `sendLeadToTelegram(lead: { tour: string; fullName: string; whatsapp: string; email: string }): Promise<void>` (throws on failure) from `src/lib/telegram.ts`.
- Produces: `appendLeadToSheet(lead: { tour: string; fullName: string; whatsapp: string; email: string }): Promise<void>` (throws on failure) from `src/lib/leadSheet.ts`.
- Produces: `POST /api/lead` endpoint accepting `{ tour, fullName, whatsapp, email, company }` JSON, returning `{ ok: true }` (200) or `{ ok: false, error?: string }` (400/502). Task 3's `useLeadSubmit` hook is the consumer.

- [ ] **Step 1: Create `src/lib/telegram.ts`**

```ts
type TelegramLead = {
  tour: string;
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

  const text = [
    "New lead from sabigo.travel",
    `Tour: ${lead.tour}`,
    `Name: ${lead.fullName}`,
    `WhatsApp: ${lead.whatsapp}`,
    `Email: ${lead.email}`,
  ].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram API responded with ${response.status}`);
  }
}
```

- [ ] **Step 2: Create `src/lib/leadSheet.ts`**

```ts
import { google } from "googleapis";

type SheetLead = {
  tour: string;
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
    range: "Leads!A:E",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          lead.tour,
          lead.fullName,
          lead.whatsapp,
          lead.email,
        ],
      ],
    },
  });
}
```

- [ ] **Step 3: Create `src/app/api/lead/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { sendLeadToTelegram } from "@/lib/telegram";
import { appendLeadToSheet } from "@/lib/leadSheet";

type LeadRequestBody = {
  tour: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
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

  const { tour, fullName, whatsapp, email, company } = body;

  if (
    !isNonEmptyString(tour) ||
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

  const lead = { tour, fullName, whatsapp, email };

  const results = await Promise.allSettled([
    sendLeadToTelegram(lead),
    appendLeadToSheet(lead),
  ]);

  const failure = results.find(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (failure) {
    console.error("Lead delivery failed:", failure.reason);
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Start the dev server**

```bash
cd /Users/tamerlansharifov/projects/sabi-go_website && npm run dev
```

Leave it running in this terminal; run the `curl` commands below from a second terminal.

- [ ] **Step 5: Verify the happy path**

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","fullName":"Test User","whatsapp":"+77001234567","email":"test@example.com","company":""}'
```

Expected: HTTP `200`, body `{"ok":true}`. Then confirm manually:
- The Telegram group from Task 1 has a new message starting "New lead from sabigo.travel" with `Tour: Test Tour`.
- The Google Sheet's `Leads` tab has a new row with today's timestamp and the same test data.

- [ ] **Step 6: Verify validation (400)**

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","fullName":"","whatsapp":"+77001234567","email":"test@example.com","company":""}'
```

Expected: HTTP `400`, body `{"ok":false,"error":"Missing or invalid fields"}`. Confirm no new Telegram message or Sheet row was added for this request.

- [ ] **Step 7: Verify the honeypot**

```bash
curl -i -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{"tour":"Test Tour","fullName":"Bot","whatsapp":"000","email":"bot@example.com","company":"I am a bot"}'
```

Expected: HTTP `200`, body `{"ok":true}` — but confirm no new Telegram message and no new Sheet row appeared (the fake-success path must not call either integration).

- [ ] **Step 8: Verify integration failure handling**

Temporarily edit `.env.local`, set `TELEGRAM_BOT_TOKEN=invalid-token`, restart `npm run dev`, then re-run the Step 5 `curl` command. Expected: HTTP `502`, body `{"ok":false}`, and the dev server terminal logs `Lead delivery failed: Error: Telegram API responded with 401` (or similar).

Also confirm a new Sheet row **was** added despite the `502` — `Promise.allSettled` runs both calls concurrently and independently, so Sheets succeeding doesn't get rolled back just because Telegram failed. This is the documented tradeoff from the spec: a partial failure still surfaces as an error to the user (who then retries), which can produce a duplicate Sheets row or duplicate Telegram message on retry — accepted as low-harm. Restore the correct `TELEGRAM_BOT_TOKEN` in `.env.local` and restart `npm run dev` before continuing.

- [ ] **Step 9: Commit**

```bash
git add src/lib/telegram.ts src/lib/leadSheet.ts src/app/api/lead/route.ts
git commit -m "Add /api/lead route with Telegram and Google Sheets integrations"
```

---

### Task 3: Shared client submit hook

**Files:**
- Create: `src/lib/useLeadSubmit.ts`

**Interfaces:**
- Consumes: `POST /api/lead` from Task 2.
- Produces: `useLeadSubmit()` hook returning `{ status: "idle" | "submitting" | "success" | "error", submit: (payload: LeadPayload) => Promise<void>, reset: () => void }`, and the exported type `LeadPayload = { tour: string; fullName: string; whatsapp: string; email: string; company: string }`. Tasks 4 and 5 both import and call this.

This hook has no visual output — it's verified indirectly once Task 4 wires it into `PrivateTourForm`. No standalone verification step here beyond a type-check, since there's no test runner in this repo to exercise a bare hook.

- [ ] **Step 1: Create `src/lib/useLeadSubmit.ts`**

```ts
"use client";

import { useState } from "react";

export type LeadStatus = "idle" | "submitting" | "success" | "error";

export type LeadPayload = {
  tour: string;
  fullName: string;
  whatsapp: string;
  email: string;
  company: string;
};

export function useLeadSubmit() {
  const [status, setStatus] = useState<LeadStatus>("idle");

  async function submit(payload: LeadPayload) {
    setStatus("submitting");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { ok: boolean };

      if (!response.ok || !data.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
  }

  return { status, submit, reset };
}
```

- [ ] **Step 2: Type-check**

```bash
cd /Users/tamerlansharifov/projects/sabi-go_website && npx tsc --noEmit
```

Expected: no errors (this file isn't imported anywhere yet, so this just confirms it's syntactically/typewise valid on its own).

- [ ] **Step 3: Commit**

```bash
git add src/lib/useLeadSubmit.ts
git commit -m "Add shared useLeadSubmit hook for lead form submission"
```

---

### Task 4: Wire `PrivateTourForm` to the real backend

**Files:**
- Modify: `src/components/PrivateTourForm.tsx` (full rewrite of the file — it's short)

**Interfaces:**
- Consumes: `useLeadSubmit` from `src/lib/useLeadSubmit.ts` (Task 3).
- Produces: no new exports — this is a leaf component, `PrivateTour.tsx` already imports it unchanged.

- [ ] **Step 1: Replace `src/components/PrivateTourForm.tsx`**

```tsx
"use client";

import { type FormEvent } from "react";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

export default function PrivateTourForm() {
  const { status, submit } = useLeadSubmit();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    await submit({
      tour: "Private tour",
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
    });
  }

  if (status === "success") {
    return (
      <div className="flex w-full max-w-[518px] flex-col gap-2 rounded-[30px] bg-white px-6 py-5 text-ink">
        <p className="font-sans text-2xl font-medium">Thank you!</p>
        <p className="font-sans text-lg">
          We&rsquo;ve received your request and will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[518px] flex-col"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-1">
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
      </div>

      {status === "error" && (
        <p className="mt-2 font-sans text-sm text-red-300">
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
  );
}
```

- [ ] **Step 2: Manual verification — happy path**

With `npm run dev` running, open `http://localhost:3000` in a browser, scroll to the "Want a private tour?" section, fill in the three fields with real-looking test data, submit. Expected:
- Button shows "Sending…" briefly, then the form is replaced by the "Thank you!" message.
- The Telegram group receives a message with `Tour: Private tour`.
- The Google Sheet gets a new row with `Tour` = `Private tour`.

- [ ] **Step 3: Manual verification — error path**

Temporarily set `TELEGRAM_BOT_TOKEN=invalid-token` in `.env.local`, restart `npm run dev`, reload the page, submit the form again. Expected: after "Sending…", the form reappears (not replaced) with the entered values still in the inputs, and the red "Couldn't send your request — please try again." message appears above the submit button, which is re-enabled. Restore the correct token in `.env.local` and restart `npm run dev`.

- [ ] **Step 4: Lint**

```bash
npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/PrivateTourForm.tsx
git commit -m "Wire PrivateTourForm to /api/lead via useLeadSubmit"
```

---

### Task 5: Booking popup for group tours

**Files:**
- Create: `src/components/BookingModalProvider.tsx`
- Create: `src/components/BookingModal.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/components/TourCard.tsx`

**Interfaces:**
- Consumes: `useLeadSubmit` from `src/lib/useLeadSubmit.ts` (Task 3).
- Produces: `useBookingModal()` hook (from `BookingModalProvider.tsx`) returning `{ tourName: string | null, open: (tourName: string) => void, close: () => void }`. `TourCard.tsx` and (later, next sub-project) tour detail pages call `open(...)`.

- [ ] **Step 1: Create `src/components/BookingModalProvider.tsx`**

```tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type BookingModalContextValue = {
  tourName: string | null;
  open: (tourName: string) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [tourName, setTourName] = useState<string | null>(null);

  return (
    <BookingModalContext.Provider
      value={{
        tourName,
        open: (name: string) => setTourName(name),
        close: () => setTourName(null),
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

- [ ] **Step 2: Mount the provider in `src/app/layout.tsx`**

Read the current file first:

```bash
cat /Users/tamerlansharifov/projects/sabi-go_website/src/app/layout.tsx
```

It currently wraps `children` in `LanguageProvider` → `MobileMenuProvider`. Add `BookingModalProvider` as the innermost wrapper:

```tsx
import type { Metadata } from "next";
import { neueMontreal, ppEditorialItalic } from "./fonts";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MobileMenuProvider } from "@/components/MobileMenuProvider";
import { BookingModalProvider } from "@/components/BookingModalProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sabi Go Travel",
  description:
    "Explore Kazakhstan's most breathtaking landscapes with carefully planned tours and local guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${neueMontreal.variable} ${ppEditorialItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <MobileMenuProvider>
            <BookingModalProvider>{children}</BookingModalProvider>
          </MobileMenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create `src/components/BookingModal.tsx`**

```tsx
"use client";

import {
  useEffect,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useBookingModal } from "./BookingModalProvider";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

function subscribeNoop() {
  return () => {};
}

export default function BookingModal() {
  const { tourName, close } = useBookingModal();
  const { status, submit, reset } = useLeadSubmit();
  const isOpen = tourName !== null;

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

  function handleClose() {
    close();
    reset();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tourName) return;

    const form = event.currentTarget;
    await submit({
      tour: tourName,
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
        <div className="relative flex w-full max-w-[518px] flex-col gap-4 rounded-[30px] bg-ink p-6">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl leading-none text-white/70 transition-colors hover:text-white"
          >
            &times;
          </button>

          <h3 className="pr-8 font-sans text-2xl font-medium text-white">
            Book: {tourName}
          </h3>

          {status === "success" ? (
            <div className="flex flex-col gap-2 text-white">
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
                <p className="mt-2 font-sans text-sm text-red-300">
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

- [ ] **Step 4: Mount the modal in `src/app/page.tsx`**

Read the current file first:

```bash
cat /Users/tamerlansharifov/projects/sabi-go_website/src/app/page.tsx
```

Add the import and render it next to `<MobileMenu />`:

```tsx
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import BookingModal from "@/components/BookingModal";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tours from "@/components/Tours";
import PrivateTour from "@/components/PrivateTour";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <MobileMenu />
      <BookingModal />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <Tours />
        <PrivateTour />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Wire the trigger in `src/components/TourCard.tsx`**

Replace the file:

```tsx
"use client";

import Link from "next/link";
import type { Tour } from "@/data/tours";
import TourGallery from "./TourGallery";
import { useBookingModal } from "./BookingModalProvider";

export default function TourCard({ tour }: { tour: Tour }) {
  const { open } = useBookingModal();

  return (
    <article className="flex flex-col">
      <TourGallery images={tour.images} badge={tour.badge} />

      <h3 className="mt-3 line-clamp-2 min-h-[40px] font-sans text-[15px] leading-tight text-ink md:mt-6 md:portrait:min-h-[48px] md:portrait:text-lg lg:min-h-[54px] lg:text-xl xl:min-h-[60px] xl:text-2xl">
        {tour.title}
      </h3>

      <span className="mt-2 inline-flex h-[36px] w-fit items-center justify-center rounded-full bg-muted px-3 font-sans text-sm text-ink md:mt-4 md:portrait:h-[42px] md:portrait:px-4 md:portrait:text-base lg:h-[46px] lg:px-4 lg:text-lg xl:h-[50px] xl:px-5 xl:text-2xl">
        {tour.price}
      </span>

      <div className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-2">
        <button
          type="button"
          onClick={() => open(tour.title)}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-accent text-sm tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
        >
          Book a tour
        </button>
        <Link
          href={tour.moreHref}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-ink text-sm tracking-[-0.5px] text-white transition-colors hover:bg-ink-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
        >
          More
        </Link>
      </div>
    </article>
  );
}
```

This adds `"use client"` to `TourCard.tsx` (it wasn't a client component before) since it now uses the `useBookingModal` hook. `tour.bookHref` is no longer used by this button — leave the field in `Tour`/Sanity as-is, it may be reused later or removed in a future cleanup, out of scope here.

- [ ] **Step 6: Manual verification**

With `npm run dev` running, open `http://localhost:3000`, scroll to the Tours block, click "Book a tour" on any card. Expected:
- A popup appears centered on screen with a dark backdrop, heading "Book: <that tour's title>", and the three inputs.
- Clicking the backdrop or the × closes it.
- Reopening it (click "Book a tour" on the same or a different card) shows a fresh empty form (not the previous success/error state) — confirms `reset()` in `handleClose` works.
- Fill in the three fields and submit. Expected: "Sending…", then the form is replaced by "Thank you!" inside the popup.
- Check the Telegram group: new message with `Tour: <the specific tour's title>` (not "Private tour").
- Check the Google Sheet: new row with `Tour` = that tour's title.
- Click "Book a tour" on a **different** tour card and confirm the heading shows the new tour's title, not the previous one.

- [ ] **Step 7: Lint and build**

```bash
npm run lint && npm run build
```

Expected: both succeed with no errors.

- [ ] **Step 8: Commit**

```bash
git add src/components/BookingModalProvider.tsx src/components/BookingModal.tsx src/app/layout.tsx src/app/page.tsx src/components/TourCard.tsx
git commit -m "Add booking popup for group tours, wired to /api/lead"
```

---

### Task 6: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

**Interfaces:**
- None — documentation only.

- [ ] **Step 1: Read the current file**

```bash
cat /Users/tamerlansharifov/projects/sabi-go_website/CLAUDE.md
```

- [ ] **Step 2: Update "Карта файлов"**

Add entries (in the same style as existing ones, alphabetically near related entries) for: `src/app/api/lead/route.ts`, `src/lib/telegram.ts`, `src/lib/leadSheet.ts`, `src/lib/useLeadSubmit.ts`, `src/components/BookingModalProvider.tsx`, `src/components/BookingModal.tsx`. Note in the `TourCard.tsx` entry that it's now `"use client"` (uses `useBookingModal`).

- [ ] **Step 3: Update "Конвенции"**

Add to the `"use client"` list: `TourCard`, `BookingModalProvider`, `BookingModal`. Note that non-component shared logic (hooks, external API clients) lives in `src/lib/` alongside `sanity.ts`/`queries.ts` — this is now an established pattern, not just Sanity-specific.

- [ ] **Step 4: Update "Переменные окружения"**

Replace the note that says forms aren't connected to a backend — document the five new env vars (names only, matching `.env.example`) and that `PrivateTourForm` and `BookingModal` now POST to `/api/lead`.

- [ ] **Step 5: Update "Прогресс"**

Add a line noting the lead backend (Telegram + Google Sheets) and booking popup are done, referencing this plan file's path for anyone who wants implementation details.

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md
git commit -m "Update CLAUDE.md for lead backend and booking popup"
```

---

## Self-Review Notes

- **Spec coverage:** Two entry points (inline form + popup) → Tasks 4 & 5. Shared backend → Task 2. Shared client submit logic → Task 3. Honeypot → Task 2 Steps 3 & 7. "Both must succeed" → Task 2 Step 3 (`Promise.allSettled` + `find` rejected). Env vars/external setup → Task 1. `tour` always populated, no `source` field → Task 2 Step 3 request type, Tasks 4 & 5 payloads. Error UX (fields kept, retry) → Tasks 4 & 5 (no `form.reset()` anywhere on error, since `submit()` never clears inputs itself). Docs updated → Task 6.
- **Type consistency:** `LeadPayload` (Task 3) matches the fields read in both `PrivateTourForm.tsx` (Task 4) and `BookingModal.tsx` (Task 5): `tour, fullName, whatsapp, email, company`. `LeadRequestBody` (Task 2) matches the same shape server-side. `sendLeadToTelegram`/`appendLeadToSheet` both take `{ tour, fullName, whatsapp, email }` (no `company` — stripped before calling them in `route.ts`, matches Task 2 Step 3's `const lead = { tour, fullName, whatsapp, email }`). `useBookingModal()`'s `open(tourName: string)` (Task 5 Step 1) matches the call site `open(tour.title)` (Task 5 Step 5) and the `tourName` read in `BookingModal.tsx` (Task 5 Step 3).
