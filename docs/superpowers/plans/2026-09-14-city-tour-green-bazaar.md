# City Tour & Green Bazaar Content Replacement — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder "City Tour" entry in `src/data/tours.ts` with real content from the client's `City tour + Green Bazaar.docx`, and make `TourDetails.tsx` gracefully hide accordion categories with no content.

**Architecture:** No schema or component restructuring. Four photos are converted from the client's docx into WebP assets under `/public/tours/`; the existing `city-tour` tour object in `tours.ts` is replaced in place with a new object (`id: "city-tour-green-bazaar"`) populated per the mapping rules in `docs/superpowers/specs/2026-09-14-tour-content-rewrite-design.md`; `TourDetails.tsx` gets a one-line guard so an empty `exclusive` array renders no accordion row.

**Tech Stack:** Next.js 16 (App Router), TypeScript, React 19, Tailwind CSS v4. No test runner configured (`npm run lint` and `npx tsc --noEmit` are the available static checks; verification is otherwise manual via `npm run dev`).

## Global Constraints

- `Tour` type in `src/data/tours.ts` is not modified — new content must fit `id`/`title`/`price`/`images`/`badge`/`description`/`timing`/`inclusive`/`exclusive`/`additionalInfo` as-is.
- `price` field format: `"from $X"` where X is the lowest per-person price among group tiers capped at 20 people (larger tiers from the client's table are dropped).
- All 4 locales (`en`/`ru`/`kz`/`ar`) must be filled for every `Localized<string>` field — `ru` authored naturally (not literal), `kz`/`ar` machine-translated, matching existing site convention.
- Raster images go under `/public/tours/` as WebP, named `{tour-id}.webp`, `{tour-id}-2.webp`, etc.
- Do not delete or rename any existing `city-tour-*.webp` files — the `tour-package` tour (`src/data/tours.ts`, id `tour-package`) reuses `city-tour.webp`, `city-tour-3.webp`, `city-tour-4.webp`, `city-tour-7.webp`, `city-tour-8.webp`, `city-tour-9.webp` in its own `images` array.

---

### Task 1: Convert the client's tour photos to WebP

**Files:**
- Create: `public/tours/city-tour-green-bazaar.webp`
- Create: `public/tours/city-tour-green-bazaar-2.webp`
- Create: `public/tours/city-tour-green-bazaar-3.webp`
- Create: `public/tours/city-tour-green-bazaar-4.webp`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: four WebP files consumed by Task 3's `images` array (`src` values `/tours/city-tour-green-bazaar.webp`, `/tours/city-tour-green-bazaar-2.webp`, `/tours/city-tour-green-bazaar-3.webp`, `/tours/city-tour-green-bazaar-4.webp`).

The source JPEGs are embedded in `/Users/tamerlansharifov/Desktop/City tour + Green Bazaar.docx` (a zip archive). A 5th embedded image (`image1.png`) is a third-party operator's logo and is not used.

- [ ] **Step 1: Unzip the docx to extract embedded media**

```bash
mkdir -p /tmp/city-tour-green-bazaar-media
unzip -o -j '/Users/tamerlansharifov/Desktop/City tour + Green Bazaar.docx' 'word/media/*' -d /tmp/city-tour-green-bazaar-media
ls /tmp/city-tour-green-bazaar-media
```

Expected output: `image1.png image2.jpeg image3.jpeg image4.jpeg image5.jpeg`

- [ ] **Step 2: Convert the 4 usable photos to WebP directly into `public/tours/`**

Run from the repo root (`/Users/tamerlansharifov/projects/sabi-go_website`):

```bash
cwebp -q 82 /tmp/city-tour-green-bazaar-media/image2.jpeg -o public/tours/city-tour-green-bazaar.webp
cwebp -q 82 /tmp/city-tour-green-bazaar-media/image4.jpeg -o public/tours/city-tour-green-bazaar-2.webp
cwebp -q 82 /tmp/city-tour-green-bazaar-media/image3.jpeg -o public/tours/city-tour-green-bazaar-3.webp
cwebp -q 82 /tmp/city-tour-green-bazaar-media/image5.jpeg -o public/tours/city-tour-green-bazaar-4.webp
```

`image2.jpeg` (Almaty skyline with TV tower) becomes the cover photo; `image4.jpeg` (Ascension Cathedral), `image3.jpeg` (Republic Square) and `image5.jpeg` (Green Bazaar interior) follow, matching the itinerary order (Panfilov Park landmarks → Republic Square → Green Bazaar).

- [ ] **Step 3: Verify the 4 files exist and are valid WebP**

```bash
file public/tours/city-tour-green-bazaar.webp public/tours/city-tour-green-bazaar-2.webp public/tours/city-tour-green-bazaar-3.webp public/tours/city-tour-green-bazaar-4.webp
```

Expected: all four lines report `RIFF (little-endian) data, Web/P image`.

Note: these source photos are only 660–900px wide (vs. ~1400px for the site's existing tour photos), so they will look softer than the rest of the site when stretched across the hero background — expected for now since they're a temporary placeholder per the docx, per the design doc.

- [ ] **Step 4: Commit**

```bash
git add public/tours/city-tour-green-bazaar.webp public/tours/city-tour-green-bazaar-2.webp public/tours/city-tour-green-bazaar-3.webp public/tours/city-tour-green-bazaar-4.webp
git commit -m "$(cat <<'EOF'
Add City Tour & Green Bazaar photos from client docx

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01F47Cayry9JyWSN4YnSC2bw
EOF
)"
```

---

### Task 2: Hide empty accordion categories in TourDetails

**Files:**
- Modify: `src/components/TourDetails.tsx:25-83`

**Interfaces:**
- Consumes: `Tour` type from `@/data/tours` (unchanged).
- Produces: `TourDetails` now renders nothing for a category whose array is empty — relied on by Task 3's tour, which sets `exclusive: []`.

- [ ] **Step 1: Add the empty-array guard**

In `src/components/TourDetails.tsx`, the `categories.map` callback currently starts like this (lines 25-29):

```tsx
        {categories.map(({ key, label }) => {
          const items = tour[key];
          const isOpen = openKey === key;

          return (
```

Change it to return `null` before computing `isOpen` when there's nothing to show:

```tsx
        {categories.map(({ key, label }) => {
          const items = tour[key];
          if (items.length === 0) return null;
          const isOpen = openKey === key;

          return (
```

- [ ] **Step 2: Typecheck and lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TourDetails.tsx
git commit -m "$(cat <<'EOF'
Hide empty TourDetails accordion categories

Some client-supplied tours won't have all four categories filled in
(e.g. no "what's excluded" list) — render nothing for those instead
of an empty accordion row with a heading and no items.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01F47Cayry9JyWSN4YnSC2bw
EOF
)"
```

---

### Task 3: Replace the `city-tour` entry with `city-tour-green-bazaar`

**Files:**
- Modify: `src/data/tours.ts:615-722`

**Interfaces:**
- Consumes: WebP assets from Task 1 (`/tours/city-tour-green-bazaar*.webp`); relies on Task 2's `TourDetails.tsx` guard to render the empty `exclusive: []` correctly.
- Produces: a `tours` array entry with `id: "city-tour-green-bazaar"`, consumed by `src/app/tours/[slug]/page.tsx` (via `tours.find((t) => t.id === slug)`), `TourCard.tsx`, and the homepage `Tours.tsx` listing — no changes needed in those files since they iterate `tours` generically.

The current `city-tour` tour object spans `src/data/tours.ts:615-722` (from the opening `{` right after `tours: Tour[] = [` continuation, through its closing `},`, immediately before the `tour-package` entry). Replace that whole object with the one below. Do not touch the `sharedInclusive`, `sharedExclusive`, or `sharedHikingFalconryAdditionalInfo` constants, and do not touch any other tour object (in particular, `tour-package` at the following lines still references the old `city-tour-*.webp` filenames directly and must keep doing so).

- [ ] **Step 1: Replace the tour object**

Find this block (starts at `src/data/tours.ts:615`):

```tsx
  {
    id: "city-tour",
    title: {
      en: "City Tour",
      ru: "Городской тур",
      kz: "Қалалық тур",
      ar: "جولة المدينة",
    },
```

... through its closing `  },` at line 722 (immediately before `  {` opening the `tour-package` entry). Replace the entire object with:

```tsx
  {
    id: "city-tour-green-bazaar",
    title: {
      en: "City Tour & Green Bazaar",
      ru: "Городской тур и Зелёный базар",
      kz: "Қалалық тур және Жасыл базар",
      ar: "جولة المدينة والسوق الأخضر",
    },
    price: "from $29",
    images: [
      {
        src: "/tours/city-tour-green-bazaar.webp",
        alt: "Aerial view of Almaty's skyline with the TV tower and Trans-Ili Alatau mountains behind it",
      },
      {
        src: "/tours/city-tour-green-bazaar-2.webp",
        alt: "Ascension Cathedral's colorful domes in Panfilov Park",
      },
      {
        src: "/tours/city-tour-green-bazaar-3.webp",
        alt: "Republic Square in central Almaty with the Independence Monument",
      },
      {
        src: "/tours/city-tour-green-bazaar-4.webp",
        alt: "Rows of dried fruits, nuts and produce inside Almaty's Green Bazaar",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "Discover Almaty's blend of history and modern life — Panfilov Street, the Ascension Cathedral, Republic Square and the vibrant Green Bazaar with a stop at the Rakhat chocolate shop. A relaxed introduction to the city through its landmarks, flavors and atmosphere.",
      ru: "Алматы, каким его знают местные — улица Панфилова, Вознесенский собор, площадь Республики и колоритный Зелёный базар с заходом в фирменный магазин шоколада «Рахат». Неспешное знакомство с городом через его историю, вкусы и атмосферу.",
      kz: "Алматының тарихы мен қазіргі өмірінің үйлесімі — Панфилов көшесі, Вознесенск соборы, Республика алаңы және түрлі-түсті Жасыл базар, «Рахат» шоколад дүкеніне соғу. Қаланың нысандары, дәмдері мен атмосферасы арқылы асықпай танысу.",
      ar: "اكتشف مزيج ألماتي من التاريخ والحياة الحديثة — شارع بانفيلوف، كاتدرائية الصعود، ميدان الجمهورية والسوق الأخضر النابض بالحياة مع توقف عند متجر حلويات راحات. تعارف هادئ على المدينة عبر معالمها ونكهاتها وأجوائها.",
    },
    timing: [
      {
        en: "10:00 — Meeting at the hotel",
        ru: "10:00 — Встреча в отеле",
        kz: "10:00 — Қонақүйде кездесу",
        ar: "10:00 — اللقاء في الفندق",
      },
      {
        en: "10:30–13:30 — Panoramic city tour",
        ru: "10:30–13:30 — Панорамный тур по городу",
        kz: "10:30–13:30 — Қала бойынша панорамалық тур",
        ar: "10:30–13:30 — جولة بانورامية في المدينة",
      },
      {
        en: "13:30–15:00 — Green Bazaar and Rakhat Chocolate shop",
        ru: "13:30–15:00 — Зелёный базар и магазин шоколада «Рахат»",
        kz: "13:30–15:00 — Жасыл базар және «Рахат» шоколад дүкені",
        ar: "13:30–15:00 — السوق الأخضر ومتجر حلويات راحات",
      },
      {
        en: "15:00–16:00 — Transfer to the hotel",
        ru: "15:00–16:00 — Трансфер в отель",
        kz: "15:00–16:00 — Қонақүйге трансфер",
        ar: "15:00–16:00 — النقل إلى الفندق",
      },
    ],
    inclusive: [
      {
        en: "Comfortable tourist transport",
        ru: "Комфортабельный туристический транспорт",
        kz: "Ыңғайлы туристік көлік",
        ar: "وسائل نقل سياحية مريحة",
      },
      {
        en: "Professional guide services",
        ru: "Услуги профессионального гида",
        kz: "Кәсіби гид қызметтері",
        ar: "خدمات مرشد محترف",
      },
      {
        en: "Guided tour throughout the trip",
        ru: "Сопровождение гидом на протяжении всей поездки",
        kz: "Сапар бойы гидтің сүйемелдеуі",
        ar: "مرافقة المرشد طوال الرحلة",
      },
      {
        en: "Assistance and recommendations for photo spots and leisure areas",
        ru: "Помощь и рекомендации по фотолокациям и местам отдыха",
        kz: "Фотосурет түсіруге қолайлы жерлер мен демалыс аймақтары бойынша көмек пен ұсыныстар",
        ar: "المساعدة والتوصيات لأماكن التصوير ومناطق الاستجمام",
      },
      {
        en: "Drinking water for the journey",
        ru: "Питьевая вода в дороге",
        kz: "Жолда ішетін су",
        ar: "مياه الشرب أثناء الرحلة",
      },
    ],
    exclusive: [],
    additionalInfo: [
      {
        en: "$147 per person for a group of 1",
        ru: "$147 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $147",
        ar: "147 دولارًا للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$96 per person for a group of 2",
        ru: "$96 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $96",
        ar: "96 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$76 per person for a group of 3",
        ru: "$76 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $76",
        ar: "76 دولارًا للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$78 per person for a group of 4",
        ru: "$78 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $78",
        ar: "78 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$65 per person for a group of 5",
        ru: "$65 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $65",
        ar: "65 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$57 per person for a group of 6",
        ru: "$57 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $57",
        ar: "57 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$48 per person for a group of 7",
        ru: "$48 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $48",
        ar: "48 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$46 per person for a group of 8",
        ru: "$46 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $46",
        ar: "46 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$38 per person for a group of 9",
        ru: "$38 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $38",
        ar: "38 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$35 per person for a group of 10",
        ru: "$35 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $35",
        ar: "35 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$29 per person for a group of 15",
        ru: "$29 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $29",
        ar: "29 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$29 per person for a group of 20",
        ru: "$29 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $29",
        ar: "29 دولارًا للشخص لمجموعة من 20 شخصًا",
      },
      {
        en: "Tours run every day",
        ru: "Туры проходят каждый день",
        kz: "Турлар күн сайын өтеді",
        ar: "الجولات تُقام يوميًا",
      },
    ],
  },
```

- [ ] **Step 2: Typecheck and lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: both exit with no errors (confirms every `Localized<string>` field has all 4 locale keys and the object matches the `Tour` type).

- [ ] **Step 3: Build**

```bash
npm run build
```

Expected: build completes successfully, including static generation of `/tours/city-tour-green-bazaar` (Next.js will report it among the generated routes; there is no longer a `/tours/city-tour` route since that `id` no longer exists).

- [ ] **Step 4: Commit**

```bash
git add src/data/tours.ts
git commit -m "$(cat <<'EOF'
Replace City Tour with client's City Tour & Green Bazaar content

Real itinerary, pricing tiers (capped at 20 people), inclusions and
description from the client's docx, per docs/superpowers/specs/2026-09-14-tour-content-rewrite-design.md.
Old id "city-tour" is retired in favor of "city-tour-green-bazaar".

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01F47Cayry9JyWSN4YnSC2bw
EOF
)"
```

---

### Task 4: Document `TourDetails.tsx` in CLAUDE.md and manually verify in the browser

**Files:**
- Modify: `CLAUDE.md` (Карта файлов section)

**Interfaces:**
- Consumes: nothing (documentation only).
- Produces: nothing consumed by other tasks — final task.

`TourDetails.tsx` is not currently listed in CLAUDE.md's "Карта файлов" section even though it already existed before this plan; since this plan modifies its behavior (Task 2), add an entry now per the project's standing instruction to keep the file map current.

- [ ] **Step 1: Add a Карта файлов entry**

In `CLAUDE.md`, find this line (in the Карта файлов section, right after the `PrivateTour.tsx`/`PrivateTourForm.tsx` line):

```
- `src/components/Reviews.tsx`, `ReviewCard.tsx`, `Stars.tsx` — бесконечная карусель отзывов, данные из `src/data/reviews.ts`
```

Insert a new line immediately before it:

```
- `src/components/TourDetails.tsx` — аккордеон на странице тура (`/tours/[slug]`) с категориями timing/inclusive/exclusive/additionalInfo; категория с пустым массивом не рендерится (ни заголовка, ни пустого списка). `"use client"`
- `src/components/Reviews.tsx`, `ReviewCard.tsx`, `Stars.tsx` — бесконечная карусель отзывов, данные из `src/data/reviews.ts`
```

Also add `TourDetails` to the `"use client"` list in the Конвенции section. Find:

```
- `"use client"` — только там, где реально нужен интерактив (state/эффекты/обработчики): `Header`, `NavbarContent`, `MobileMenuProvider`, `MobileMenu`, `BookingModalProvider`, `BookingModal`, `PhoneInput`, `LanguageProvider`, `LanguageSwitcher`, `TourCard`, `PrivateTourForm`, `Faq`, `TourGallery`, `MotionConfigProvider`, `Reveal`, `CountUp`. Остальное — серверные компоненты по умолчанию
```

Replace with:

```
- `"use client"` — только там, где реально нужен интерактив (state/эффекты/обработчики): `Header`, `NavbarContent`, `MobileMenuProvider`, `MobileMenu`, `BookingModalProvider`, `BookingModal`, `PhoneInput`, `LanguageProvider`, `LanguageSwitcher`, `TourCard`, `PrivateTourForm`, `Faq`, `TourGallery`, `TourDetails`, `MotionConfigProvider`, `Reveal`, `CountUp`. Остальное — серверные компоненты по умолчанию
```

- [ ] **Step 2: Commit the doc update**

```bash
git add CLAUDE.md
git commit -m "$(cat <<'EOF'
Document TourDetails.tsx in CLAUDE.md file map

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01F47Cayry9JyWSN4YnSC2bw
EOF
)"
```

- [ ] **Step 3: Manually verify in the browser**

```bash
npm run dev
```

With the dev server running, check:
1. Homepage tour grid — the card that was "City Tour" now shows "City Tour & Green Bazaar" with price "from $29" and the new cover photo.
2. Navigate to `/tours/city-tour-green-bazaar` — hero shows the new title/description/photo; the gallery slider cycles all 4 new photos; the accordion shows Timing, Inclusive and Additional information, but **no "Exclusive" row at all** (confirms Task 2's guard works with real data).
3. Open the booking modal (Book a tour) for this card — seat stepper shows "from $29"-derived totals (e.g. 2 seats → "$58"); this is the known `priceForSeats` limitation documented in the design doc, not a bug to fix here.
4. Switch language to RU/KZ/AR via the language switcher and re-check the same tour card/detail page for each locale — no missing/`undefined` text anywhere.

Stop the dev server (Ctrl+C) once verified.
