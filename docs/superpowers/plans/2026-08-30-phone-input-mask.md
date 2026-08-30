# WhatsApp Phone Input Mask Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain "WhatsApp number" `<input>` in both lead-capture forms with a country-flag-dropdown, auto-masking phone input (default Kazakhstan, any country selectable), and block form submission until the number is complete/valid.

**Architecture:** One new shared `"use client"` component, `PhoneInput.tsx`, wraps `react-phone-number-input` and is restyled with Tailwind to match the project's existing pill-input look. Both `PrivateTourForm.tsx` and `BookingModal.tsx` swap their native `<input type="tel">` for it, converting `whatsapp` from an uncontrolled DOM-read field to controlled local state (the only field that changes this way — `fullName`/`email` stay uncontrolled).

**Tech Stack:** `react-phone-number-input` (bundles `libphonenumber-js`), Next.js 16 App Router, Tailwind CSS v4.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-30-phone-input-mask.md`.
- Default country `KZ`, all countries selectable.
- Submit button disabled when `!isValidPhoneNumber(whatsapp)`, in addition to the existing `status === "submitting"` check — same mechanism (`disabled` prop), no new error message.
- `react-phone-number-input/style.css` is the **first and only** non-Tailwind-utility CSS in this project — document this exception in `design-system.md`, don't treat it as a precedent to reach for elsewhere.
- No server-side change: `route.ts`'s `whatsapp` validation stays `isNonEmptyString`.
- `fullName`/`email` inputs are unaffected — still uncontrolled, still read via `form.elements.namedItem(...)`.
- No test framework exists in this repo — verification is `tsc`/`lint`/`build`, a curl-based SSR smoke check, a manual code-path trace, and a live browser check performed by the controller after each task (not the implementer), matching the pattern established in the two prior lead-backend plans.

---

### Task 1: Install dependency, create shared `PhoneInput` component

**Files:**
- Modify: `package.json` (via `npm install`)
- Create: `src/components/PhoneInput.tsx`
- Modify: `src/app/globals.css`
- Modify: `design-system.md`

**Interfaces:**
- Produces: `PhoneInput` component, default export from `src/components/PhoneInput.tsx`, props `{ value: string, onChange: (value: string) => void, background: "white" | "muted" }`. Task 2 imports and uses this in both forms.

This task has no consumer yet (Task 2 wires it in) — verified via `tsc`/`lint`/`build` only, no runtime check needed since nothing renders it yet.

- [ ] **Step 1: Install the library**

```bash
cd /Users/tamerlansharifov/projects/sabi-go_website && npm install react-phone-number-input
```

Expected: `package.json` gains `"react-phone-number-input": "^<version>"` under `dependencies`, install finishes with no errors. If npm reports a peer-dependency conflict with React 19, re-run with `npm install react-phone-number-input --legacy-peer-deps` and note this in your report — the library's peer range may lag React's latest major even though it works fine at runtime.

- [ ] **Step 2: Import the library's base stylesheet in `src/app/globals.css`**

Read the current file first. Add the import as the second line, right after the existing Tailwind import:

```css
@import "tailwindcss";
@import "react-phone-number-input/style.css";
```

(Everything else in the file — `:root`, `@theme inline`, the marquee keyframes, `.marquee-fade` — stays exactly as-is below this.)

- [ ] **Step 3: Create `src/components/PhoneInput.tsx`**

```tsx
"use client";

import PhoneNumberInput from "react-phone-number-input";

type Background = "white" | "muted";

const backgroundClassName: Record<Background, string> = {
  white: "bg-white",
  muted: "bg-muted",
};

export default function PhoneInput({
  value,
  onChange,
  background,
}: {
  value: string;
  onChange: (value: string) => void;
  background: Background;
}) {
  return (
    <PhoneNumberInput
      international
      defaultCountry="KZ"
      value={value}
      onChange={(next) => onChange(next ?? "")}
      placeholder="WhatsApp number"
      className={`flex h-[50px] w-full items-center rounded-[70px] ${backgroundClassName[background]} px-6 font-sans text-[20px] text-ink focus-within:ring-2 focus-within:ring-accent [&_.PhoneInputInput]:h-full [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:font-sans [&_.PhoneInputInput]:text-[20px] [&_.PhoneInputInput]:text-ink [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:placeholder:text-ink/50`}
    />
  );
}
```

(`PhoneNumberInput`'s own base stylesheet, imported in Step 2, handles the internal flex layout of the flag icon + country-select arrow + input — the Tailwind classes above only override colors/sizing/background to match the project's pill inputs, via the `[&_.PhoneInputInput]:...` arbitrary-child-selector syntax reaching into the library's internal `<input class="PhoneInputInput">`.)

- [ ] **Step 4: Type-check, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three pass with no errors. (`PhoneInput.tsx` isn't imported anywhere yet — this only confirms it's valid on its own.)

- [ ] **Step 5: Document the CSS exception in `design-system.md`**

Read the current file first (it ends with a "## Технические заметки" section, currently ending around line 110 with a note about a Next.js image bug). Append one bullet to that section:

```markdown
- **`react-phone-number-input` — единственный не-Tailwind CSS в проекте (2026-08-30)** — компонент `PhoneInput.tsx` (маска WhatsApp-номера с флагом страны) использует библиотеку `react-phone-number-input`, которой для раскладки (флаг + стрелка селекта страны + инпут) нужен её собственный `style.css` (`@import "react-phone-number-input/style.css"` в `globals.css`, сразу после `@import "tailwindcss"`). Все цвета/размеры/фон переопределены Tailwind-классами поверх через `[&_.PhoneInputInput]:...`-селекторы — сама библиотечная разметка (флаг/дропдаун) не переделывалась. Это осознанное разовое исключение из правила "только Tailwind-классы", не прецедент для остального проекта.
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json src/components/PhoneInput.tsx src/app/globals.css design-system.md
git commit -m "Add PhoneInput component (react-phone-number-input, Tailwind-restyled)"
```

---

### Task 2: Wire `PhoneInput` into both lead-capture forms

**Files:**
- Modify: `src/components/PrivateTourForm.tsx`
- Modify: `src/components/BookingModal.tsx`

**Interfaces:**
- Consumes: `PhoneInput` from `src/components/PhoneInput.tsx` (Task 1), `isValidPhoneNumber` from `react-phone-number-input` (the library itself, already installed in Task 1).

- [ ] **Step 1: Replace `src/components/PrivateTourForm.tsx`**

Read the current file first. Replace it entirely with:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import PhoneInput from "./PhoneInput";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

export default function PrivateTourForm() {
  const { status, submit } = useLeadSubmit();
  const [whatsapp, setWhatsapp] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    await submit({
      tour: "Private tour",
      seats: 1,
      totalPrice: "",
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp,
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
        <PhoneInput value={whatsapp} onChange={setWhatsapp} background="white" />
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
        disabled={status === "submitting" || !isValidPhoneNumber(whatsapp)}
        className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit a request"}
      </button>
    </form>
  );
}
```

Note what changed from the current file: the `whatsapp` `<input type="tel">` is replaced by `<PhoneInput>`; a `useState` for `whatsapp` is added; `handleSubmit` reads `whatsapp` from that state instead of `form.elements.namedItem("whatsapp")`; the submit button's `disabled` gains the `!isValidPhoneNumber(whatsapp)` condition. Nothing else changes — `fullName`/`email`/`company` stay exactly as they were.

- [ ] **Step 2: Replace `src/components/BookingModal.tsx`**

Read the current file first. Replace it entirely with:

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
import { isValidPhoneNumber } from "react-phone-number-input";
import { useBookingModal } from "./BookingModalProvider";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import PhoneInput from "./PhoneInput";

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
  const [whatsapp, setWhatsapp] = useState("");
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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset seats/whatsapp to their defaults whenever the modal is (re)opened for a tour, mirroring the existing seats reset
      setSeats(MIN_SEATS);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: see above
      setWhatsapp("");
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
      whatsapp,
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
              <span aria-live="polite" className="font-sans text-sm text-ink">{seats}x</span>
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
              <PhoneInput value={whatsapp} onChange={setWhatsapp} background="muted" />
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
                disabled={status === "submitting" || !isValidPhoneNumber(whatsapp)}
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

Note what changed from the current file: added `whatsapp` state; the reset-on-open effect now also resets `whatsapp` to `""` (alongside the pre-existing `seats`/`reset()` resets — this is required because `BookingModal` never unmounts, so `useState` values persist across close/reopen unless explicitly reset, same reasoning as the pre-existing `seats` reset); the `whatsapp` `<input type="tel">` is replaced by `<PhoneInput>`; `handleSubmit` reads `whatsapp` from state; submit button gains the `!isValidPhoneNumber(whatsapp)` condition. Nothing else changes.

- [ ] **Step 3: Type-check, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Expected: all three pass with no errors.

- [ ] **Step 4: Start the dev server and verify with curl (SSR smoke test)**

```bash
npm run dev
```

In a second terminal:

```bash
curl -s http://localhost:3000/ | grep -o 'PhoneInputInput' | head -1
curl -s http://localhost:3000/ | grep -o 'placeholder="WhatsApp number"'
```

Expected: the homepage doesn't 500; the first grep finds at least one match (confirms the library's input class renders server-side inside `PrivateTourForm`, which is not conditionally hidden behind a client-only mount gate the way `BookingModal` is); the second grep also matches (the placeholder text is still present, now on the library's internal input instead of a plain `<input>`).

Stop the dev server using its exact PID (`lsof -i :3000` then `kill <pid>` — never a broad `pkill` pattern, which has previously killed an unrelated process belonging to someone else).

- [ ] **Step 5: Manual code-path trace (no live browser available to you)**

Read through your own diff once and confirm in your report:
- `PrivateTourForm`: does `whatsapp` genuinely flow from `PhoneInput`'s `onChange` into the `submit()` call's `whatsapp` field, unchanged from what the user typed/selected?
- `BookingModal`: does reopening the modal (for the same or a different tour) genuinely clear `whatsapp` back to `""` — trace through the `useEffect` keyed on `[tour]`, same reasoning already established for why `seats` needed an explicit reset (the component never unmounts, so state persists across close/open unless cleared).
- Is the submit button in both forms disabled when `whatsapp` is empty on initial render (confirms `isValidPhoneNumber("")` returns `false`, not throwing)?
- Does the honeypot (`company`) input remain completely untouched by this diff in both files?

This is a live-browser-verification item explicitly deferred to the controller, matching the pattern from the two prior lead-backend plans — note this in your report rather than claiming you clicked through it. In particular, flag that the library's actual visual appearance (flag icon size, dropdown arrow, spacing match against the existing pill inputs) has NOT been visually confirmed by you and needs the controller's live check.

- [ ] **Step 6: Commit**

```bash
git add src/components/PrivateTourForm.tsx src/components/BookingModal.tsx
git commit -m "Wire PhoneInput into PrivateTourForm and BookingModal"
```

---

## Self-Review Notes

- **Spec coverage:** Library + shared component + Tailwind restyle + CSS-exception doc → Task 1. Both forms wired, controlled `whatsapp` state, reset-on-reopen for `BookingModal`, submit gated on validity → Task 2. Default country KZ + any country selectable → `defaultCountry="KZ"` with no `countries` restriction prop set (the library defaults to all countries when `countries` isn't passed) → Task 1 Step 3. No backend change → confirmed, no task touches `route.ts`/`telegram.ts`/`leadSheet.ts`.
- **Type consistency:** `PhoneInput`'s props (`value: string`, `onChange: (value: string) => void`, `background: "white" | "muted"`) defined in Task 1 Step 3 are used identically at both call sites in Task 2 (`background="white"` in `PrivateTourForm`, `background="muted"` in `BookingModal`, matching each form's existing `inputClassName` background). `isValidPhoneNumber` imported the same way (`from "react-phone-number-input"`) in both Task 2 files.
- **State-reset symmetry:** `BookingModal`'s existing reset effect (already reviewed/shipped for `seats`) is extended with `setWhatsapp("")` using the exact same justification and the same `eslint-disable-next-line react-hooks/set-state-in-effect` pattern already accepted in a prior review — not a new pattern being introduced.
