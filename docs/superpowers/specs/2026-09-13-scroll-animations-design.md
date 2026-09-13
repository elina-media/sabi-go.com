# Scroll-reveal + count-up animations

Date: 2026-09-13
Status: approved, not yet implemented

## Context

The site currently has almost no motion beyond the infinite reviews
marquee (`.animate-marquee-left/right` keyframes in `globals.css`). The
user asked to "liven up" the site with trendy animations. Two directions
were selected as priority: scroll-triggered reveal animations on sections,
and count-up animation for the numeric stat blurbs in `Features.tsx`.
Hover micro-interactions and open/close state-transition polish (FAQ
accordion, modal) are explicitly out of scope for this round.

## Goals

- Sections/cards below the fold fade+slide into view as the user scrolls
  to them, once, without replaying on scroll-up.
- The three numeric stat blurbs in Features ("10+", "4 Seasons", "10
  guides") count up from 0 when they enter the viewport instead of
  appearing as static text.
- Respect `prefers-reduced-motion` globally, in one place, not per
  component.
- No layout-affecting animations (no animating `width`/`height`/margins) —
  only `opacity`/`transform`, to avoid jank.

## Library

`framer-motion` — the standard React animation library. New dependency;
the project currently has none. (Confirm exact current package name/import
path at install time — Framer Motion's npm package has been renamed
before.)

## Components

Two new flat client components in `src/components/` (matching the
project's existing flat-file convention, no `/hooks` or nested animation
folder):

- **`Reveal.tsx`** — `"use client"`. Wraps children in `motion.div` with
  `initial={{ opacity: 0, y: 24 }}`, `whileInView={{ opacity: 1, y: 0 }}`,
  `viewport={{ once: true, amount: 0.25 }}`. Accepts an optional `delay`
  prop (seconds) for staggering items inside a `.map()`.
- **`CountUp.tsx`** — `"use client"`. Props: `value: number`, optional
  `duration`. Uses `useInView` + `animate()` on a `useMotionValue` to tween
  from 0 to `value` once the element enters the viewport, rendered as
  plain text (no decimals, matches current display).

### Global reduced-motion handling

New `MotionConfigProvider.tsx` (`"use client"`, same provider pattern as
`LanguageProvider.tsx`) wraps children in framer-motion's
`<MotionConfig reducedMotion="user">`. Mounted once in `layout.tsx`
alongside the other providers. This makes every `Reveal`/`CountUp`
instance automatically no-op for users with `prefers-reduced-motion`,
with no per-component checks.

## Data change: splitting number from text in `copy.tsx`

The three animatable stat entries under `copy.features` (`destinations`,
`seasons`, `guides`) currently store the number fused into the localized
JSX string, e.g.:

```tsx
destinations: {
  en: <><span className="font-accent italic">10+</span> Destinations across Kazakhstan</>,
  ru: <><span className="font-accent italic">10+</span> направлений по Казахстану</>,
  // kz, ar similarly
} satisfies Localized<ReactNode>,
```

In all four locales the number/prefix leads the string, so it can be
split cleanly into a plain numeric `value` plus a localized "rest of the
string" (including any leading `+` or space) without reordering words per
language:

```tsx
destinations: {
  value: 10,
  styledSuffix: {
    en: "+", ru: "+", kz: "+", ar: "+",
  } satisfies Localized<string>,
  restText: {
    en: " Destinations across Kazakhstan",
    ru: " направлений по Казахстану",
    kz: " бағыт Қазақстан бойынша",
    ar: " وجهة في جميع أنحاء كازاخستان",
  } satisfies Localized<string>,
},
```

The original markup only wraps part of the phrase in the accent span
(`font-accent italic`) — for `destinations` that's just `"10+"`, but for
`seasons` it's `"4 Seasons"` and for `guides` it's `"10 guides"` (the word
right after the number is styled too, not just the digits). To preserve
the exact original visual result, each entry splits into three parts
instead of two:

- `value: number` — the digits, animated by `CountUp`.
- `styledSuffix: Localized<string>` — whatever sits inside the accent
  span immediately after the number (`"+"` for destinations, `" Seasons"`
  / `" сезона"` / etc. for seasons, `" guides"` / `" гидов"` / etc. for
  guides).
- `restText: Localized<string>` — the unstyled remainder, rendered
  outside the span (`" Destinations across Kazakhstan"`, `" tours all
  year round"`, `" with C1 English level"`, and their translations).

Same three-field treatment for `seasons` (value: 4) and `guides` (value:
10). The fourth feature card, `groups`, has no number and keeps its
current `label: Localized<ReactNode>` shape untouched.

`Features.tsx` renders the animated entries as:

```tsx
<span className="font-accent italic">
  <CountUp value={feature.value} />
  {t(feature.styledSuffix)}
</span>
{t(feature.restText)}
```

The local `features` array in `Features.tsx` becomes a discriminated
union of two shapes (`{ kind: "count", value, styledSuffix, restText }`
vs `{ kind: "text", label }`); the component branches on `kind`.

## Where `Reveal` is applied

- **Features** — section heading + each of the 4 cards (staggered by
  index).
- **Tours** — section heading + tour cards (staggered).
- **PrivateTour** — the form block.
- **Reviews** — section heading only. The marquee itself is already in
  continuous motion and is not wrapped (wrapping a `whileInView` reveal
  around an infinitely-animating marquee adds no visible value and risks
  interaction with the existing CSS animation).
- **Faq** — section heading + accordion items (staggered).
- **Footer** — the whole block, single reveal (not staggered).

**Hero is excluded** from scroll-reveal (it's the first thing visible on
load, there's no scroll to trigger on). A mount-time fade-in for the hero
text was considered and declined for this round — out of scope.

## Non-goals (explicitly deferred)

- Hover micro-interactions (button/card scale, icon color shifts).
- Animated open/close transitions for the FAQ accordion or
  `BookingModal`.
- Any animation work tied to mobile/tablet breakpoints beyond what already
  exists — this follows the existing responsive classes as-is, no new
  breakpoint-specific animation behavior.

## Testing

No automated test suite exists for visual/animation behavior in this
project (confirmed by existing conventions — no test files anywhere).
Verification is manual: run `npm run dev`, scroll through each section,
confirm reveal timing feels right, confirm count-up plays once, confirm
`prefers-reduced-motion` (via browser/OS emulation or Chrome DevTools)
disables all animation.
