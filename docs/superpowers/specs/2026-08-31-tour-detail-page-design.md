# Tour detail page (`/tours/[slug]`)

Date: 2026-08-31
Status: approved, not yet implemented

## Context

The site has been single-page since launch (`src/app/page.tsx`). Each tour
card's "Book a tour" button already opens `BookingModal`, but "More" is a
dead `href="#"` placeholder (`TourCard.tsx`) — there is no internal page to
link to yet. The user now wants a real detail page per tour, reached from
that "More" button, and described its structure block by block in
conversation, referencing the existing Hero as a base for block 1 and a
21st.dev carousel component as a reference for block 2.

This is the first multi-page work in the project — routing and shared
layout don't exist yet for anything beyond the single root page.

## Routing

One shared dynamic route, not one file per tour: `src/app/tours/[slug]/page.tsx`.
`[slug]` matches `Tour.id` (already kebab-case, e.g.
`kolsai-kaindy-moon-canyon`). The page looks up the tour from
`src/data/tours.ts` by `id` and calls `notFound()` if no match. Adding a
new tour later means adding an object to the `tours` array — no new files.

`generateMetadata()` on this route sets `title`/`description` from the
matched tour's `title`/`description`, consistent with the project's stated
"SEO закладываем сразу" commitment.

## Layout restructuring

`Header`, `MobileMenu`, `BookingModal`, and `Footer` currently render inside
`src/app/page.tsx`, not `src/app/layout.tsx` (this was fine when there was
only one page). They move into `src/app/layout.tsx` so every route gets
them without duplicating the same four lines in every `page.tsx`.
`page.tsx` (home) and the new tour page keep only the content that's
unique between `<Header />`/`<MobileMenu />`/`<BookingModal />` and
`<Footer />`.

This is a refactor of existing behavior, not a visual change — sticky
Header show/hide logic, the mobile drawer, and the booking popup should
behave identically on the home page after the move; this needs to be
verified once implemented, not assumed.

## Data model changes (`src/data/tours.ts`)

```ts
export type Tour = {
  id: string;
  title: string;
  price: string;
  images: TourImage[];       // now also feeds the detail page hero + slider
  badge?: string;
  description: string;       // NEW — short subtitle for the detail-page hero
  timing: string[];          // NEW — bullet points
  inclusive: string[];       // NEW — bullet points
  exclusive: string[];       // NEW — bullet points
  additionalInfo: string[];  // NEW — bullet points
};
```

Removed fields:
- `bookHref` — dead. Grepped: only ever assigned in `tours.ts`, never read
  anywhere. "Book a tour" has always called `useBookingModal().open(tour)`
  directly, never navigated via a href.
- `moreHref` — replaced by a computed `/tours/${tour.id}` wherever `More`
  is rendered (`TourCard.tsx`). Removes the `href === "#"` placeholder
  special-case added earlier this session, since the link becomes real.

`tour.images` becomes the single source for three things: the card gallery
on the home page (existing `TourGallery.tsx`, unchanged), the detail page's
hero background (first image), and the detail page's slider (full array).
No separate hero-only image field — fewer fields to keep in sync, one photo
set per tour to manage.

## Block 1 — `TourHero.tsx`

Same structural pattern as `Hero.tsx` (embedded `NavbarContent`, full-bleed
section), with these differences:
- Background is `<Image>` using `tour.images[0]` instead of `<video>`.
- Heading is `tour.title`, sized like the other section h2s
  (`text-[clamp(24px,6.5vw,32px)] md:text-[60px]`) — not the large Hero h1
  scale (`clamp(28px,8.5vw,44px) ... xl:text-[80px]`).
- Subtitle is `tour.description`.
- CTA is "Book a tour" (not "View tours"), calling
  `useBookingModal().open(tour)` — opens the same `BookingModal` used
  everywhere else, prefilled with this tour.

## Block 2 — `TourGallerySlider.tsx`

Recreates the visual behavior of the user's 21st.dev reference
(large photo, prev/next arrows disabled at the ends, "X / Y" counter,
thumbnail strip where the active thumbnail is wider than the rest and the
strip auto-scrolls to keep it in view) using plain Tailwind/CSS state,
matching the existing no-animation-library convention
(`TourGallery.tsx`, `FaqItem.tsx`). No `framer-motion` dependency.

- Active-thumbnail width change and strip auto-centering use CSS
  transitions + `scrollIntoView`, the same pattern `TourGallery.tsx` already
  uses for its dot indicators.
- Explicitly out of scope: mouse/touch drag-to-swipe on the main image.
  Navigation is click-only (arrows, thumbnails). This is the traded-off
  piece of the reference for staying dependency-free.

## Block 3 — `TourDetails.tsx`

Single-column accordion (one card per row, not the 2-column grid the home
page FAQ uses), reusing `FaqItem.tsx`'s visual pattern (plus-icon rotate,
one card open at a time). Four fixed cards per tour, always in this order:
**Timing**, **Inclusive**, **Exclusive**, **Additional information**. Each
card's body renders `tour.timing` / `tour.inclusive` / `tour.exclusive` /
`tour.additionalInfo` as a bullet list.

## Blocks 4–5 — reused as-is

`<PrivateTour />` and `<Footer />` render unchanged. `Footer` comes from
the layout restructuring above; `PrivateTour` is rendered directly in the
tour page's own content, same component and copy as the home page.

## `TourCard.tsx` change

"More" button's `href` becomes `` `/tours/${tour.id}` `` (real Next.js
`<Link>`, no more placeholder-click interception).

## Build order

Matches the project's existing "one block at a time, stop for review"
convention (see CLAUDE.md "Как мы работаем"). After this spec and its
implementation plan are approved, blocks are built one at a time: content
(photos, description, timing/inclusive/exclusive/additional-info text) is
gathered per block, per tour, before that block is coded — not all
upfront.

## Out of scope

- Content/copy/photos for any of the 4 tours' new fields — gathered
  block-by-block during implementation, not part of this spec.
- Drag-to-swipe gallery interaction (see Block 2).
- Education, Privacy Policy, Public Offer Agreement, or any other internal
  page — only the tour detail page is in scope here.
- Any change to the home page's Tours grid layout or `TourCard` visuals
  beyond the `moreHref` → real link swap.

## Files touched

- `src/app/layout.tsx` — add `Header`, `MobileMenu`, `BookingModal`,
  `Footer`.
- `src/app/page.tsx` — remove `Header`, `MobileMenu`, `BookingModal`,
  `Footer` (now in layout).
- `src/app/tours/[slug]/page.tsx` — new dynamic route, `generateMetadata`.
- `src/data/tours.ts` — add `description`/`timing`/`inclusive`/`exclusive`/
  `additionalInfo`, remove `bookHref`/`moreHref`.
- `src/components/TourHero.tsx` — new (block 1).
- `src/components/TourGallerySlider.tsx` — new (block 2).
- `src/components/TourDetails.tsx` — new (block 3).
- `src/components/TourCard.tsx` — `moreHref` placeholder logic replaced by
  a real `Link` to `/tours/${tour.id}`.
