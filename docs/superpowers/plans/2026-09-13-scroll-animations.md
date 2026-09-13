# Scroll-Reveal + Count-Up Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll-triggered fade+slide reveal animations to every section below the fold, and a count-up animation for the three numeric stat blurbs in the Features section, using `framer-motion`'s `motion` package.

**Architecture:** Two small reusable `"use client"` components (`Reveal`, `CountUp`) get dropped into existing server/client components at the exact spots the spec identifies. A `MotionConfigProvider` mounted once in the root layout makes every animation instance respect `prefers-reduced-motion` globally. One data shape in `copy.tsx` gets split into three fields (`value`/`styledSuffix`/`restText`) so `CountUp` can animate just the digits while preserving the original accent-span styling exactly.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind v4, `motion` (npm package `motion`, imported from `motion/react` — the current umbrella package; `framer-motion` is a legacy alias for the same library at the same version).

## Global Constraints

- Design spec: `docs/superpowers/specs/2026-09-13-scroll-animations-design.md` — read it if any task here seems ambiguous.
- Only animate `opacity`/`transform` — no layout-affecting properties.
- `viewport={{ once: true }}` on every reveal — animations play once, never replay on scroll-up.
- `prefers-reduced-motion` must be respected globally via one `MotionConfig` mount point, not per-component checks.
- No new dependency beyond `motion`. No new "/hooks" or nested component folders — flat files in `src/components/`, matching existing project convention.
- This project has **no automated test suite** (confirmed: no test files anywhere in the repo). "Testing" in each task below means: `npx tsc --noEmit` must produce no output, and the final task is a full manual verification pass in the browser.
- Hero is explicitly out of scope for scroll-reveal (see spec).
- Do not touch FAQ accordion open/close animation, hover states, or `BookingModal` — out of scope for this round.

---

### Task 1: Install the `motion` package

**Files:**
- Modify: `package.json`, `package-lock.json`

**Interfaces:**
- Produces: the `motion` package available for import as `motion/react` in every later task.

- [ ] **Step 1: Install the dependency**

Run: `npm install motion`

- [ ] **Step 2: Verify it landed in package.json**

Run: `grep '"motion"' package.json`
Expected: a line like `"motion": "^13.x.x",` under `dependencies` (exact version may differ from what's shown here — any recent `motion` version works).

- [ ] **Step 3: Typecheck still passes**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "Add motion package for scroll-reveal/count-up animations"
```

---

### Task 2: Global `prefers-reduced-motion` handling via `MotionConfigProvider`

**Files:**
- Create: `src/components/MotionConfigProvider.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `MotionConfig` from `motion/react` (installed in Task 1).
- Produces: `MotionConfigProvider` (named export), a `"use client"` wrapper component. Every `Reveal`/`CountUp` created in later tasks lives inside this provider's subtree and automatically no-ops its animation when the user's OS/browser requests reduced motion — no per-component work needed in later tasks.

- [ ] **Step 1: Create the provider**

```tsx
// src/components/MotionConfigProvider.tsx
"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function MotionConfigProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Step 2: Wire it into the root layout**

In `src/app/layout.tsx`, add the import next to the other provider imports:

```tsx
import { MotionConfigProvider } from "@/components/MotionConfigProvider";
```

Then wrap the existing provider tree with it (outermost, inside `<body>`):

```tsx
      <body className="min-h-full flex flex-col">
        <MotionConfigProvider>
          <LanguageProvider>
            <MobileMenuProvider>
              <BookingModalProvider>
                <ScrollToTop />
                <Header />
                <MobileMenu />
                <BookingModal />
                {children}
                <Footer />
              </BookingModalProvider>
            </MobileMenuProvider>
          </LanguageProvider>
        </MotionConfigProvider>
      </body>
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Manual smoke check**

Run: `npm run dev`, open `http://localhost:3000`. Page should render exactly as before (this task adds no visible animation yet, just the provider). Confirm no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/MotionConfigProvider.tsx src/app/layout.tsx
git commit -m "Add MotionConfigProvider for global prefers-reduced-motion handling"
```

---

### Task 3: `Reveal` scroll-reveal component

**Files:**
- Create: `src/components/Reveal.tsx`

**Interfaces:**
- Consumes: `motion` from `motion/react`.
- Produces: `Reveal` (default export), a `"use client"` component with signature:
  ```ts
  function Reveal(props: { children: ReactNode; delay?: number; className?: string }): JSX.Element
  ```
  Used by every later task that needs a scroll-triggered fade+slide-up. `className` is forwarded directly to the underlying `motion.div` — pass a node's original layout classes there instead of adding an extra wrapping `<div>`, whenever the wrapped content doesn't already have its own root element with those classes (e.g. inline JSX in `Features.tsx`). When wrapping a component that renders its own root element (e.g. `<TourCard>`, `<FaqItem>`), omit `className` and just nest the component as `children`.

- [ ] **Step 1: Create the component**

```tsx
// src/components/Reveal.tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output (component isn't used anywhere yet, but must compile standalone).

- [ ] **Step 3: Commit**

```bash
git add src/components/Reveal.tsx
git commit -m "Add Reveal scroll-triggered fade+slide component"
```

---

### Task 4: `CountUp` number animation component

**Files:**
- Create: `src/components/CountUp.tsx`

**Interfaces:**
- Consumes: `useInView`, `useMotionValue`, `animate` from `motion/react`.
- Produces: `CountUp` (default export), a `"use client"` component with signature:
  ```ts
  function CountUp(props: { value: number; duration?: number }): JSX.Element
  ```
  Renders a `<span>` containing the current animated integer, counting from 0 to `value` once it scrolls into view. `duration` defaults to `1.2` seconds.

- [ ] **Step 1: Create the component**

```tsx
// src/components/CountUp.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue } from "motion/react";

export default function CountUp({
  value,
  duration = 1.2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, value, duration, motionValue]);

  return <span ref={ref}>{display}</span>;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add src/components/CountUp.tsx
git commit -m "Add CountUp number animation component"
```

---

### Task 5: Animate the Features stats (data split + CountUp + Reveal)

**Files:**
- Modify: `src/data/copy.tsx:179-262` (the `destinations`, `seasons`, `guides` entries under `copy.features`)
- Modify: `src/components/Features.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3), `CountUp` (Task 4), `Localized<T>` from `@/lib/i18n`.
- Produces: nothing consumed by later tasks — this is a leaf task.

This is the most involved task because the original JSX bakes the number into
styled text differently per entry: `destinations` wraps only `"10+"` in the
accent span (`font-accent italic`), but `seasons` wraps `"4 Seasons"` and
`guides` wraps `"10 guides"` — the word right after the digits is inside the
accent span too, for those two. To preserve the exact original visual output
while animating only the digits, each entry splits into three fields:
`value` (the number `CountUp` animates), `styledSuffix` (whatever immediately
follows the number *inside* the accent span, empty of layout meaning — just
text), and `restText` (the unstyled remainder, rendered outside the span).

- [ ] **Step 1: Replace the three data entries in `copy.tsx`**

In `src/data/copy.tsx`, replace lines 179–262 (the `destinations`, `seasons`,
`groups`, `guides` entries — `groups` stays the same, included here only for
exact placement) with:

```tsx
    destinations: {
      value: 10,
      styledSuffix: {
        en: "+",
        ru: "+",
        kz: "+",
        ar: "+",
      } satisfies Localized<string>,
      restText: {
        en: " Destinations across Kazakhstan",
        ru: " направлений по Казахстану",
        kz: " бағыт Қазақстан бойынша",
        ar: " وجهة في جميع أنحاء كازاخستان",
      } satisfies Localized<string>,
    },
    seasons: {
      value: 4,
      styledSuffix: {
        en: " Seasons",
        ru: " сезона",
        kz: " маусым",
        ar: " فصول",
      } satisfies Localized<string>,
      restText: {
        en: " tours all year round",
        ru: " туров круглый год",
        kz: " турлары жыл бойы",
        ar: " من الجولات على مدار السنة",
      } satisfies Localized<string>,
    },
    groups: {
      en: "Small Groups More comfort, less crowds",
      ru: "Маленькие группы Больше комфорта, меньше людей",
      kz: "Шағын топтар Жайлылық көп, адам аз",
      ar: "مجموعات صغيرة راحة أكبر وازدحام أقل",
    } satisfies Localized<string>,
    guides: {
      value: 10,
      styledSuffix: {
        en: " guides",
        ru: " гидов",
        kz: " гид",
        ar: " مرشدين",
      } satisfies Localized<string>,
      restText: {
        en: " with C1 English level",
        ru: " с английским уровня C1",
        kz: " C1 деңгейіндегі ағылшын тілімен",
        ar: " يتحدثون الإنجليزية بمستوى C1",
      } satisfies Localized<string>,
    },
```

- [ ] **Step 2: Replace `Features.tsx` in full**

```tsx
// src/components/Features.tsx
"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT, type Localized } from "@/lib/i18n";

type CountFeature = {
  id: string;
  image: string;
  imageAlt: string;
  kind: "count";
  value: number;
  styledSuffix: Localized<string>;
  restText: Localized<string>;
};

type TextFeature = {
  id: string;
  image: string;
  imageAlt: string;
  kind: "text";
  label: Localized<ReactNode>;
};

const features: (CountFeature | TextFeature)[] = [
  {
    id: "destinations",
    image: "/features/destinations.webp",
    imageAlt: "Map of Kazakhstan with tour destinations marked",
    kind: "count",
    value: copy.features.destinations.value,
    styledSuffix: copy.features.destinations.styledSuffix,
    restText: copy.features.destinations.restText,
  },
  {
    id: "seasons",
    image: "/features/seasons.webp",
    imageAlt: "Tour van",
    kind: "count",
    value: copy.features.seasons.value,
    styledSuffix: copy.features.seasons.styledSuffix,
    restText: copy.features.seasons.restText,
  },
  {
    id: "groups",
    image: "/features/groups.webp",
    imageAlt: "Camping tent",
    kind: "text",
    label: copy.features.groups,
  },
  {
    id: "guides",
    image: "/features/guides.webp",
    imageAlt: "Passport",
    kind: "count",
    value: copy.features.guides.value,
    styledSuffix: copy.features.guides.styledSuffix,
    restText: copy.features.guides.restText,
  },
];

export default function Features() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <Reveal>
        <h2 className="mx-auto max-w-[624px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.features.heading)}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:portrait:grid-cols-4 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, index) => (
          <Reveal
            key={feature.id}
            delay={index * 0.08}
            className="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[20px] bg-muted p-3 md:portrait:h-[220px] md:portrait:rounded-[24px] lg:h-[260px] lg:rounded-[28px] lg:p-4 xl:h-[300px] xl:rounded-[30px]"
          >
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              unoptimized
              className="pointer-events-none object-cover"
            />
            <p className="relative font-sans text-[clamp(15px,4vw,18px)] font-medium leading-[1.15] text-ink md:portrait:text-[22px] lg:text-[26px] xl:text-[32px] xl:leading-[1.1]">
              {feature.kind === "count" ? (
                <>
                  <span className="font-accent italic">
                    <CountUp value={feature.value} />
                    {t(feature.styledSuffix)}
                  </span>
                  {t(feature.restText)}
                </>
              ) : (
                t(feature.label)
              )}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, open the homepage, scroll to the Features section.
Confirm:
- The 4 cards fade+slide up as they enter view, staggered left-to-right.
- "10+", "4", and "10" count up from 0 instead of appearing static.
- The rendered text reads identically to before (compare against `git show HEAD~1:src/components/Features.tsx` render if unsure) — same words, same accent-italic styling boundaries.
- Switch language via the header switcher (RU/KZ/AR) and confirm each locale's stat text still reads correctly (no missing words, no double spaces).

- [ ] **Step 5: Commit**

```bash
git add src/data/copy.tsx src/components/Features.tsx
git commit -m "Animate Features stat numbers with CountUp, reveal cards on scroll"
```

---

### Task 6: Reveal for Tours section

**Files:**
- Modify: `src/components/Tours.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3).

- [ ] **Step 1: Replace `Tours.tsx` in full**

```tsx
// src/components/Tours.tsx
"use client";

import { tours } from "@/data/tours";
import TourCard from "./TourCard";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function Tours() {
  const t = useT();
  return (
    <section
      id="tours"
      className="mx-auto max-w-[1280px] scroll-mt-[140px] px-4 py-12 md:py-20"
    >
      <Reveal>
        <h2 className="mx-auto max-w-[552px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.tours.heading)}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:portrait:grid-cols-3 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {tours.map((tour, index) => (
          <Reveal key={tour.id} delay={index * 0.08}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the Tours section. Confirm the heading and each
tour card fade+slide in, staggered, and that clicking "Book a tour" /
"More" still works exactly as before (Reveal must not intercept clicks —
`motion.div` has no pointer-events changes by default, so this should be a
non-issue, but verify).

- [ ] **Step 4: Commit**

```bash
git add src/components/Tours.tsx
git commit -m "Add scroll-reveal to Tours heading and cards"
```

---

### Task 7: Reveal for Private Tour section

**Files:**
- Modify: `src/components/PrivateTour.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3).

- [ ] **Step 1: Replace `PrivateTour.tsx` in full**

```tsx
// src/components/PrivateTour.tsx
"use client";

import PrivateTourForm from "./PrivateTourForm";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function PrivateTour() {
  const t = useT();

  return (
    <section
      id="private-tour"
      className="mx-auto w-full max-w-[1920px] scroll-mt-[140px] p-4"
    >
      <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[40px] px-6 py-12 md:portrait:h-[420px] md:portrait:px-10 md:portrait:py-0 lg:h-[500px] lg:px-14 xl:h-[569px] xl:px-16">
        <video
          src="/private-tour/background.mp4"
          poster="/private-tour/background-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <Reveal className="relative flex max-w-[518px] flex-col gap-2 text-center">
          <h2 className="font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-white md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
            {t(copy.privateTour.heading)}
          </h2>
          <p className="font-sans text-[clamp(17px,4.8vw,24px)] leading-tight text-white">
            {t(copy.privateTour.subtitle)}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative flex w-full justify-center">
          <PrivateTourForm />
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the Private Tour section. Confirm the heading
text fades in first, then the form fades in ~0.15s after, and that the
form is still fully interactive (inputs, submit) afterward.

- [ ] **Step 4: Commit**

```bash
git add src/components/PrivateTour.tsx
git commit -m "Add scroll-reveal to Private Tour heading and form"
```

---

### Task 8: Reveal for FAQ heading and items

**Files:**
- Modify: `src/components/Faq.tsx` (entire file)
- Modify: `src/components/FaqList.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3).

- [ ] **Step 1: Replace `Faq.tsx` in full**

```tsx
// src/components/Faq.tsx
"use client";

import { faq } from "@/data/faq";
import FaqList from "./FaqList";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function Faq() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <Reveal>
        <h2 className="mx-auto text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.faq.heading)}
        </h2>
      </Reveal>

      <FaqList entries={faq} />
    </section>
  );
}
```

- [ ] **Step 2: Replace `FaqList.tsx` in full**

```tsx
// src/components/FaqList.tsx
"use client";

import { useState } from "react";
import type { FaqEntry } from "@/data/faq";
import FaqItem from "./FaqItem";
import Reveal from "./Reveal";

export default function FaqList({ entries }: { entries: FaqEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-2 md:mt-16 md:grid-cols-2 md:gap-2">
      {entries.map((entry, index) => (
        <Reveal key={entry.id} delay={index * 0.06}>
          <FaqItem
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
          />
        </Reveal>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, scroll to the FAQ section. Confirm the heading and each
accordion item fade+slide in staggered, and that opening/closing an item by
clicking still works exactly as before (only one open at a time).

- [ ] **Step 5: Commit**

```bash
git add src/components/Faq.tsx src/components/FaqList.tsx
git commit -m "Add scroll-reveal to FAQ heading and accordion items"
```

---

### Task 9: Reveal for Reviews heading

**Files:**
- Modify: `src/components/Reviews.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3).

- [ ] **Step 1: Replace `Reviews.tsx` in full**

```tsx
// src/components/Reviews.tsx
"use client";

import { reviews, type Review } from "@/data/reviews";
import ReviewCard from "./ReviewCard";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

function MarqueeRow({
  direction,
  reviews,
}: {
  direction: "left" | "right";
  reviews: Review[];
}) {
  const track = [...reviews, ...reviews];

  return (
    <div className="group marquee-fade overflow-hidden">
      <div
        className={`flex w-max gap-6 group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {track.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  const t = useT();
  return (
    <section id="reviews" className="w-full scroll-mt-[140px] py-12 md:py-20">
      <Reveal>
        <h2 className="mx-auto max-w-[701px] px-4 text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.reviews.heading)}
        </h2>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3 md:mt-16 md:gap-6">
        <MarqueeRow direction="left" reviews={reviews} />
        <MarqueeRow direction="right" reviews={reviews} />
      </div>
    </section>
  );
}
```

Note: the marquee rows themselves are intentionally left unwrapped — they
already animate continuously via the existing CSS keyframes, and the spec
calls for revealing the heading only in this section.

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the Reviews section. Confirm the heading
fades+slides in, and the two marquee rows keep scrolling continuously as
before (unaffected).

- [ ] **Step 4: Commit**

```bash
git add src/components/Reviews.tsx
git commit -m "Add scroll-reveal to Reviews heading"
```

---

### Task 10: Reveal for Footer

**Files:**
- Modify: `src/components/Footer.tsx` (entire file)

**Interfaces:**
- Consumes: `Reveal` (Task 3).

- [ ] **Step 1: Replace `Footer.tsx` in full**

```tsx
// src/components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollLink from "./ScrollLink";
import Reveal from "./Reveal";
import { navLinks, documentationLinks, copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: "/footer/whatsapp.svg",
    href: "https://wa.me/77029855133",
  },
  {
    name: "Telegram",
    icon: "/footer/telegram.svg",
    href: "https://t.me/sabigotravel",
  },
  {
    name: "Instagram",
    icon: "/footer/instagram.svg",
    href: "https://www.instagram.com/sabigo_kz",
  },
];

export default function Footer() {
  const t = useT();
  return (
    <footer id="contacts" className="w-full scroll-mt-[140px] p-4">
      <Reveal className="rounded-[24px] bg-ink p-6 md:portrait:rounded-[32px] md:portrait:p-10 lg:rounded-[40px] lg:p-16">
        <div className="grid grid-cols-1 gap-8 md:portrait:grid-cols-12 md:portrait:gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-3">
            <Link href="/">
              <Image
                src="/hero/logo.webp"
                alt="Sabi Go Travel"
                width={68}
                height={72}
                unoptimized
                className="h-[64px] w-auto md:portrait:h-[80px] lg:h-[96px]"
              />
            </Link>
          </div>

          <div className="col-span-3 flex flex-col gap-4">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.socialContacts)}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) =>
                social.href.startsWith("http") ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80 lg:size-10"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                    />
                  </a>
                ) : (
                  <ScrollLink
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80 lg:size-10"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                    />
                  </ScrollLink>
                ),
              )}
            </div>
            <div className="flex flex-col gap-2 font-sans text-sm text-white/70 lg:text-base">
              <a href="tel:+77029855133" className="hover:text-white">
                +7 (702) 985 5133
              </a>
              <a
                href="mailto:sabigotravel@gmail.com"
                className="hover:text-white"
              >
                sabigotravel@gmail.com
              </a>
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.menu)}
            </p>
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {t(link.label)}
              </ScrollLink>
            ))}
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.documentation)}
            </p>
            {documentationLinks.map((link) => (
              <ScrollLink
                key={link.en}
                href="#"
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {t(link)}
              </ScrollLink>
            ))}
          </div>
        </div>

        <p className="mt-10 font-sans text-sm text-white/50 md:portrait:mt-16 lg:mt-20">
          TOO &ldquo;Sabi Go Travel&rdquo; 2025
        </p>
      </Reveal>
    </footer>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no output.

- [ ] **Step 3: Manual check**

Run: `npm run dev`, scroll to the Footer. Confirm the whole block fades+slides
in as one unit (not staggered), and that all links (social icons, nav,
documentation) are still clickable afterward.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Add scroll-reveal to Footer"
```

---

### Task 11: Full manual verification pass

**Files:** none (verification only)

- [ ] **Step 1: Full page scroll-through**

Run: `npm run dev`, open `http://localhost:3000` in a fresh tab (hard
refresh to reset scroll position). Scroll slowly from top to bottom.
Confirm every section reveals as designed: Features (staggered cards +
count-up numbers), Tours (staggered cards), Private Tour (heading then
form), Reviews (heading only, marquee unaffected), FAQ (staggered items),
Footer (single block). Confirm nothing pops in unstyled or flashes.

- [ ] **Step 2: Scroll-up does not replay**

Scroll back to the top, then down again past an already-revealed section.
Confirm it does NOT re-play the animation (viewport `once: true` should
guarantee this).

- [ ] **Step 3: Reduced-motion check**

In Chrome DevTools: Command/Ctrl+Shift+P → "Show Rendering" → set "Emulate
CSS media feature prefers-reduced-motion" to "reduce". Reload the page and
scroll through again. Confirm all sections appear immediately with no
animation (both `Reveal` and `CountUp` should be inert — the marquee, which
already has its own explicit `prefers-reduced-motion` CSS rule in
`globals.css`, should also stop).

- [ ] **Step 4: Language switch spot-check**

Switch to RU, KZ, and AR via the language switcher and re-scroll past
Features. Confirm the count-up text renders correctly in each locale (no
missing words, correct spacing) as verified in Task 5.

- [ ] **Step 5: Full typecheck and lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors from either command.

- [ ] **Step 6: Update CLAUDE.md progress section**

Add a line to the "Прогресс" checklist in `/Users/tamerlansharifov/projects/sabi-go_website/CLAUDE.md` noting scroll-reveal + count-up animations are done (mention `motion` as a new dependency and the two new components), following the existing style of other checklist entries in that file.

- [ ] **Step 7: Commit**

```bash
git add CLAUDE.md
git commit -m "Document scroll-reveal/count-up animations in CLAUDE.md"
```
