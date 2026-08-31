# Tour Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dynamic tour detail page (`/tours/[slug]`) reached from each tour card's "More" button, built from five blocks: photo hero, photo slider, a Timing/Inclusive/Exclusive/Additional-info accordion, the existing "Want a private tour?" form, and the existing footer.

**Architecture:** One shared Next.js dynamic route (`src/app/tours/[slug]/page.tsx`) looks up a tour by `id` from the existing `src/data/tours.ts` array and renders three new data-driven components (`TourHero`, `TourGallerySlider`, `TourDetails`) plus two reused ones (`PrivateTour`, `Footer`). `Header`/`MobileMenu`/`BookingModal`/`Footer` move from the home page into the root layout so both routes get them without duplication.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 — no new dependencies.

## Global Constraints

- No test framework exists in this repo. Verification per task is
  `npx tsc --noEmit && npm run lint && npm run build`, plus a live browser
  check. The live browser check is a **controller** step (performed by the
  orchestrating session with browser tools, not the implementing
  subagent) — matching the pattern from the three prior plans in
  `docs/superpowers/plans/`.
- No animation library (no `framer-motion`). All interactivity is plain
  React state + Tailwind CSS transitions, matching `TourGallery.tsx` and
  `FaqItem.tsx`.
- Styling is Tailwind utility classes only. `"use client"` only on
  components that need state/effects/handlers.
- Real content (per-tour description, photos beyond the one each tour
  already has, timing/inclusive/exclusive/additional-info text) is
  gathered from the user interactively, block by block, **after** each
  block's component exists and is verified structurally. Do not invent
  placeholder business copy (prices, itineraries, inclusions) — new text
  fields default to `""` and new list fields default to `[]` until the
  user supplies real content. This mirrors how the 4 existing tours'
  `title`/`price`/`images` were filled in during this same project.
- Next.js 16 dynamic route `params` (and `generateMetadata`'s `params`)
  are `Promise`s that must be `await`ed — this is a breaking change from
  older Next.js versions per this repo's `AGENTS.md`. Every task below
  that touches `params` already accounts for this; don't "fix" it back to
  a synchronous object.

---

## Task 1: Move shared chrome into the root layout

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `Header` (`src/components/Header.tsx`, default export, no
  props), `MobileMenu` (`src/components/MobileMenu.tsx`, default export,
  no props), `BookingModal` (`src/components/BookingModal.tsx`, default
  export, no props), `Footer` (`src/components/Footer.tsx`, default
  export, no props) — none of these four change in this task.
- Produces: every route rendered under `RootLayout` now gets `Header`,
  `MobileMenu`, `BookingModal`, and `Footer` automatically. Every future
  `page.tsx` only needs its own `<main>` content between them.

- [ ] **Step 1: Rewrite `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { neueMontreal, ppEditorialItalic } from "./fonts";
import { LanguageProvider } from "@/components/LanguageProvider";
import { MobileMenuProvider } from "@/components/MobileMenuProvider";
import { BookingModalProvider } from "@/components/BookingModalProvider";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
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
            <BookingModalProvider>
              <Header />
              <MobileMenu />
              <BookingModal />
              {children}
              <Footer />
            </BookingModalProvider>
          </MobileMenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Rewrite `src/app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tours from "@/components/Tours";
import PrivateTour from "@/components/PrivateTour";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <Tours />
      <PrivateTour />
      <Reviews />
      <Faq />
    </main>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "Move Header/MobileMenu/BookingModal/Footer into root layout"
```

- [ ] **Step 5 (controller, live browser check):** Run `npm run dev`, open
  `http://localhost:3000`. Confirm: sticky `Header` still fades in only
  after scrolling past the Hero (not immediately visible on load),
  hamburger opens the same mobile drawer as before, clicking "Book a
  tour" on any tour card still opens the same popup, `Footer` still
  renders once at the bottom (not duplicated). This is a refactor with no
  intended visual change — anything different from before this task is a
  regression to fix before moving on.

---

## Task 2: Extend the `Tour` data model

**Files:**
- Modify: `src/data/tours.ts`

**Interfaces:**
- Produces: `Tour` type gains `description: string`, `timing: string[]`,
  `inclusive: string[]`, `exclusive: string[]`, `additionalInfo: string[]`.
  Loses `bookHref` and `moreHref`. All four existing tour objects conform
  to the new shape with empty placeholders (`description: ""`,
  `timing: []`, `inclusive: []`, `exclusive: []`, `additionalInfo: []`)
  pending real content gathered in a later, separate conversation (see
  Global Constraints).

- [ ] **Step 1: Rewrite `src/data/tours.ts`**

```ts
export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Unique, stable id — used as the React key and the tour detail slug (/tours/[id]). */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: string;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). */
  price: string;
  /**
   * Photos under /public/tours. Feeds the card gallery (TourGallery), the
   * detail page hero background (first photo), and the detail page photo
   * slider (full array). One photo = no gallery arrows/thumbnails shown
   * anywhere. Add more entries once there are extra photos for a tour.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: string;
  /** Short subtitle shown under the title on the tour detail page hero. */
  description: string;
  /** Detail page accordion: bullet points under "Timing". */
  timing: string[];
  /** Detail page accordion: bullet points under "Inclusive". */
  inclusive: string[];
  /** Detail page accordion: bullet points under "Exclusive". */
  exclusive: string[];
  /** Detail page accordion: bullet points under "Additional information". */
  additionalInfo: string[];
};

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: "Kolsai, Kaindy & Moon Canyon",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-moon-canyon.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountains",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
  {
    id: "kolsai-kaindy-charyn-black-moon-2-day",
    title:
      "Kolsai, Kaindy, Charyn, Black Canyon & Moon Canyon (2-Day Tour)",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-charyn-black-moon-2-day.webp",
        alt: "Canyon landscape with layered rock formations",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
  {
    id: "big-almaty-lake-falcon-show",
    title: "Big Almaty Lake & Falcon Show",
    price: "$60",
    images: [
      {
        src: "/tours/big-almaty-lake-falcon-show.webp",
        alt: "Big Almaty Lake surrounded by snow-capped mountains",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
  {
    id: "oi-qaragai-mountain-resort",
    title: "Oi-Qaragai Mountain Resort",
    price: "$60",
    images: [
      {
        src: "/tours/oi-qaragai-mountain-resort.webp",
        alt: "Oi-Qaragai mountain resort in a pine forest",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
];
```

- [ ] **Step 2: Confirm no other file still references the removed fields**

Run: `grep -rn "bookHref\|moreHref" src/`
Expected: no output (Task 3 will introduce the replacement for
`moreHref`'s only usage in `TourCard.tsx`; if this greps a hit right now
before Task 3 runs, that's expected — re-run this exact grep again at the
end of Task 3 and expect no output then).

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: FAILS at this point — `TourCard.tsx:32` still references
`tour.moreHref`, which no longer exists on `Tour`. This is expected; Task
3 fixes it. Do not attempt to fix `TourCard.tsx` in this task.

- [ ] **Step 4: Commit**

```bash
git add src/data/tours.ts
git commit -m "Add tour detail content fields, drop dead bookHref/moreHref"
```

---

## Task 3: Tour detail route, Block 1 (`TourHero`), and the real "More" link

**Files:**
- Create: `src/app/tours/[slug]/page.tsx`
- Create: `src/components/TourHero.tsx`
- Modify: `src/components/TourCard.tsx`

**Interfaces:**
- Consumes: `Tour` type and `tours` array from `src/data/tours.ts` (Task
  2). `useMobileMenu()` from `src/components/MobileMenuProvider.tsx`
  (existing, unchanged). `useBookingModal()` from
  `src/components/BookingModalProvider.tsx` (existing, unchanged; `open`
  has signature `(tour: Tour) => void`). `NavbarContent` from
  `src/components/NavbarContent.tsx` (existing, unchanged; default export,
  optional `theme` prop, defaults to `"light"` which renders white text —
  correct for a photo hero).
- Produces: `TourHero` — `export default function TourHero({ tour }: { tour: Tour })`.
  `src/app/tours/[slug]/page.tsx` renders `<main>` containing `<TourHero />`
  today; Tasks 4–6 add more children inside that same `<main>`.

- [ ] **Step 1: Create `src/components/TourHero.tsx`**

```tsx
"use client";

import Image from "next/image";
import type { Tour } from "@/data/tours";
import NavbarContent from "./NavbarContent";
import { useMobileMenu } from "./MobileMenuProvider";
import { useBookingModal } from "./BookingModalProvider";

export default function TourHero({ tour }: { tour: Tour }) {
  const { isOpen } = useMobileMenu();
  const { open } = useBookingModal();

  return (
    <section
      id="main"
      className="mx-auto w-full max-w-[1920px] p-0 md:portrait:p-4 lg:p-4"
    >
      <div className="relative h-dvh w-full overflow-hidden rounded-none md:portrait:h-[750px] md:portrait:rounded-[40px] lg:h-[750px] lg:rounded-[40px]">
        <Image
          src={tour.images[0].src}
          alt={tour.images[0].alt}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <nav
          className={`absolute inset-x-4 top-4 flex h-16 items-center xl:inset-x-10 xl:top-10 xl:h-auto ${
            isOpen ? "pointer-events-none xl:pointer-events-auto" : ""
          }`}
        >
          <NavbarContent />
        </nav>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center max-lg:landscape:gap-3 md:portrait:gap-6 lg:gap-6">
          <h1 className="max-w-3xl font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-white md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
            {tour.title}
          </h1>

          {tour.description && (
            <p className="max-w-2xl text-[clamp(13px,3.6vw,18px)] text-white md:portrait:text-2xl lg:text-2xl">
              {tour.description}
            </p>
          )}

          <button
            type="button"
            onClick={() => open(tour)}
            className="pointer-events-auto flex h-[50px] items-center gap-2 rounded-full bg-accent px-7 text-white transition-colors hover:bg-accent-hover"
          >
            <Image
              src="/hero/route-square.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
            />
            <span className="text-[22px] tracking-[-0.5px]">Book a tour</span>
          </button>
        </div>
      </div>
    </section>
  );
}
```

Note: reuses `id="main"` deliberately — `Header.tsx` already watches
`document.getElementById("main")` via `IntersectionObserver` to decide
when to fade in the sticky header, and silently no-ops if it can't find
the element (`if (!heroEl) return;`). Reusing the same id means the
sticky header works on this page with zero changes to `Header.tsx`.

- [ ] **Step 2: Create `src/app/tours/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tours } from "@/data/tours";
import TourHero from "@/components/TourHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.id === slug);
  if (!tour) return {};

  return {
    title: `${tour.title} — Sabi Go Travel`,
    description: tour.description || undefined,
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => t.id === slug);
  if (!tour) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <TourHero tour={tour} />
    </main>
  );
}
```

- [ ] **Step 3: Wire up the real "More" link in `src/components/TourCard.tsx`**

Replace the entire `<Link>` block (currently lines 31–39, the one with
the `onClick` that calls `event.preventDefault()` when
`tour.moreHref === "#"`) with:

```tsx
        <Link
          href={`/tours/${tour.id}`}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-ink text-sm tracking-[-0.5px] text-white transition-colors hover:bg-ink-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
        >
          More
        </Link>
```

- [ ] **Step 4: Confirm the dead-field grep is now clean**

Run: `grep -rn "bookHref\|moreHref" src/`
Expected: no output.

- [ ] **Step 5: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 6: SSR smoke check**

Run: `npm run dev &` then, after a few seconds,
`curl -s http://localhost:3000/tours/kolsai-kaindy-moon-canyon | grep -o "Kolsai, Kaindy & Moon Canyon"`
Expected: prints the title once (confirms the route resolves and
server-renders the matched tour's title, not a 404 page). Then
`curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/tours/does-not-exist`
Expected: `404`. Stop the dev server afterward
(`pkill -f "next dev"` or equivalent).

- [ ] **Step 7: Commit**

```bash
git add src/app/tours/ src/components/TourHero.tsx src/components/TourCard.tsx
git commit -m "Add tour detail route and Block 1 (TourHero)"
```

- [ ] **Step 8 (controller, live browser check):** From the home page,
  click "More" on a tour card. Confirm: lands on `/tours/<that-id>`, hero
  shows that tour's real photo and title, "Book a tour" opens the same
  `BookingModal` popup pre-filled with that tour (photo/price/name match),
  sticky `Header` fades in on scroll same as the home page. Navigate to a
  made-up URL like `/tours/nonsense` and confirm it renders the site's
  404 page, not a crash.

---

## Task 4: Block 2 — `TourGallerySlider`

**Files:**
- Create: `src/components/TourGallerySlider.tsx`
- Modify: `src/app/tours/[slug]/page.tsx`

**Interfaces:**
- Consumes: `TourImage` type from `src/data/tours.ts` (existing,
  unchanged).
- Produces: `TourGallerySlider` —
  `export default function TourGallerySlider({ images }: { images: TourImage[] })`.

- [ ] **Step 1: Create `src/components/TourGallerySlider.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { TourImage } from "@/data/tours";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      className={direction === "right" ? "rotate-180" : undefined}
      aria-hidden
    >
      <path
        d="M8 1L1.5 7.5L8 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TourGallerySlider({
  images,
}: {
  images: TourImage[];
}) {
  const [index, setIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  function showPrevious() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function showNext() {
    setIndex((current) => Math.min(images.length - 1, current + 1));
  }

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-12 md:py-20">
      <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] md:portrait:h-[420px] lg:h-[500px] xl:h-[600px]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          unoptimized
          className="object-cover"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={index === images.length - 1}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-40"
            >
              <Chevron direction="right" />
            </button>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, i) => (
            <button
              key={image.src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative h-20 shrink-0 overflow-hidden rounded-lg transition-[width] duration-300 ${
                i === index ? "w-[120px]" : "w-[35px]"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
```

Note: matches `TourGallery.tsx`'s existing "one photo = no arrows/dots"
convention — with a single-image tour (the current state of all 4 tours
until more photos are added), `hasMultiple` is `false`, so the arrows,
counter, and thumbnail strip are all hidden and only the plain photo
shows. This is expected, not a bug, until the user sends more photos per
tour.

- [ ] **Step 2: Insert into the tour page**

In `src/app/tours/[slug]/page.tsx`, add the import and render it right
after `TourHero`:

```tsx
import TourGallerySlider from "@/components/TourGallerySlider";
```

```tsx
    <main className="flex flex-1 flex-col">
      <TourHero tour={tour} />
      <TourGallerySlider images={tour.images} />
    </main>
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/TourGallerySlider.tsx src/app/tours/
git commit -m "Add Block 2 (TourGallerySlider) to tour detail page"
```

- [ ] **Step 5 (controller, live browser check):** Open any
  `/tours/<id>` page. Confirm the single existing photo renders full-size
  below the hero with no arrows/counter/thumbnails (single-image state).
  To confirm the multi-image path works before real extra photos exist,
  temporarily duplicate an entry in one tour's `images` array in
  `src/data/tours.ts` (e.g. add the same `{ src, alt }` object twice),
  reload, confirm arrows/counter/thumbnails now appear and clicking
  each one changes the active photo and scrolls the thumbnail strip —
  then revert that temporary duplicate before committing anything further
  (it was only for this manual check, not a real content change).

---

## Task 5: Block 3 — `TourDetails`

**Files:**
- Create: `src/components/TourDetails.tsx`
- Modify: `src/app/tours/[slug]/page.tsx`

**Interfaces:**
- Consumes: `Tour` type from `src/data/tours.ts` (Task 2's
  `timing`/`inclusive`/`exclusive`/`additionalInfo` fields).
- Produces: `TourDetails` —
  `export default function TourDetails({ tour }: { tour: Tour })`.

- [ ] **Step 1: Create `src/components/TourDetails.tsx`**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import type { Tour } from "@/data/tours";

const categories = [
  { key: "timing", label: "Timing" },
  { key: "inclusive", label: "Inclusive" },
  { key: "exclusive", label: "Exclusive" },
  { key: "additionalInfo", label: "Additional information" },
] as const;

export default function TourDetails({ tour }: { tour: Tour }) {
  const [openKey, setOpenKey] = useState<
    (typeof categories)[number]["key"] | null
  >(null);

  return (
    <section className="mx-auto w-full max-w-[800px] px-4 py-12 md:py-20">
      <div className="flex flex-col gap-2">
        {categories.map(({ key, label }) => {
          const items = tour[key];
          const isOpen = openKey === key;

          return (
            <div
              key={key}
              className="rounded-2xl bg-muted px-4 md:portrait:px-5 lg:px-5 xl:px-6"
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                aria-expanded={isOpen}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left md:portrait:min-h-[62px] md:portrait:gap-3.5 md:portrait:py-4 lg:min-h-[66px] lg:gap-4 lg:py-4 xl:min-h-[70px] xl:gap-4 xl:py-5"
              >
                <span className="font-sans text-sm text-ink md:portrait:text-base lg:text-base xl:text-lg">
                  {label}
                </span>
                <Image
                  src="/faq/plus.svg"
                  alt=""
                  width={50}
                  height={50}
                  unoptimized
                  className={`size-8 shrink-0 transition-transform duration-300 md:portrait:size-10 lg:size-11 xl:size-[50px] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="flex flex-col gap-1 pb-4 font-sans text-xs leading-normal text-ink/70 md:portrait:pb-5 md:portrait:text-sm lg:pb-5 lg:text-sm xl:pb-6 xl:text-base">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Insert into the tour page**

In `src/app/tours/[slug]/page.tsx`, add the import and render it after
`TourGallerySlider`:

```tsx
import TourDetails from "@/components/TourDetails";
```

```tsx
    <main className="flex flex-1 flex-col">
      <TourHero tour={tour} />
      <TourGallerySlider images={tour.images} />
      <TourDetails tour={tour} />
    </main>
```

- [ ] **Step 3: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/TourDetails.tsx src/app/tours/
git commit -m "Add Block 3 (TourDetails accordion) to tour detail page"
```

- [ ] **Step 5 (controller, live browser check):** Open any
  `/tours/<id>` page, scroll to the accordion. Confirm all 4 cards
  render (Timing, Inclusive, Exclusive, Additional information), clicking
  one expands it and collapses whichever was previously open (only one
  open at a time), and expanding a card with no content yet
  (all 4 currently are, since `tours.ts` still has empty arrays) shows an
  empty expanded area with no console error — expected pre-content state,
  not a bug.

---

## Task 6: Wire in Block 4 (`PrivateTour`) — page complete

**Files:**
- Modify: `src/app/tours/[slug]/page.tsx`

**Interfaces:**
- Consumes: `PrivateTour` from `src/components/PrivateTour.tsx`
  (existing, unchanged; default export, no props).

- [ ] **Step 1: Add the import and render it last**

In `src/app/tours/[slug]/page.tsx`:

```tsx
import PrivateTour from "@/components/PrivateTour";
```

```tsx
    <main className="flex flex-1 flex-col">
      <TourHero tour={tour} />
      <TourGallerySlider images={tour.images} />
      <TourDetails tour={tour} />
      <PrivateTour />
    </main>
```

(`Footer` is not added here — it already renders for every route via the
root layout from Task 1.)

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three pass with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/tours/
git commit -m "Add Block 4 (PrivateTour) to tour detail page — page complete"
```

- [ ] **Step 4 (controller, live browser check):** Open a `/tours/<id>`
  page and scroll through the whole thing top to bottom: Hero → slider →
  accordion → "Want a private tour?" form → footer. Submit-test the
  private tour form same as on the home page (it's the same
  `PrivateTourForm` component/backend, so a full resubmission test isn't
  required — just confirm it renders and the fields are interactive).

  Known, expected, out-of-scope limitation to note (not fix in this
  plan): the navbar/footer links `#tours`, `#reviews`, and `#main`
  (`ScrollLink`, from a prior session's work) only resolve on the home
  page, since those section ids don't exist on the tour detail page —
  clicking them here silently does nothing (no crash, no navigation).
  `#contacts` and `#private-tour` do work here since `Footer` and
  `PrivateTour` are both present. Flag this to the user after this plan
  is done; don't silently patch `ScrollLink` as part of this task since
  it's cross-cutting and outside this spec's stated scope.

---

## After this plan

All five blocks exist, are wired together, and are visually/functionally
verified with the one real photo each tour already has and empty
description/timing/inclusive/exclusive/additionalInfo fields. The next
step (outside this plan, per the project's usual "one block at a time,
ask for content, then build/fill it" workflow) is going back through each
tour, block by block, asking the user for real hero descriptions,
additional photos, and the four accordion lists, and filling them into
`src/data/tours.ts` — no further component code changes should be needed
for that, since every block already reads from the `Tour` object.
