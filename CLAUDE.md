@AGENTS.md

# Проект: Sabi Go (travel)

Лендинг тур-оператора по Казахстану: подбор туров + оставление заявки.

## Архитектура
- Next.js 16 (App Router), TypeScript, React 19
- Роутинг файловый, App Router. Роут пока один: `src/app/page.tsx` (весь сайт — одна страница, все блоки собраны в ней подряд)
- API-роут `src/app/api/lead/route.ts` — POST handler для сбора лидов (валидация, honeypot, интеграция с Telegram и Google Sheets)
- `src/app/layout.tsx` — корневой layout (html/body, шрифты, `metadata`). `Header` и `Footer` рендерятся не в layout, а в `page.tsx`
- Стили — Tailwind CSS v4, конфиг через CSS (`@theme inline` в `src/app/globals.css`), файла `tailwind.config.js` нет
- Данные повторяющихся блоков (туры/отзывы/FAQ) — статические TS-массивы в `src/data/`, без БД
- i18n: `Locale`/`Localized<T>`/`useT()` в `src/lib/i18n.ts` (см. Конвенции). Переводимые поля данных (`src/data/tours.ts`, `reviews.ts`, `faq.ts`) хранят локали инлайн в самой записи (`{ en: "...", ru: "...", kz: "...", ar: "..." }`), не отдельными файлами на язык. Статичный UI-копирайт, не привязанный к записи данных, — в `src/data/copy.tsx`. Все 4 языка (EN/RU/KZ/AR) заполнены контентом; KZ/AR — машинный перевод, нужна проверка носителем языка перед публикацией (см. Прогресс). Разметка не поддерживает `dir="rtl"` — для арабского отдельные строки рендерятся справа налево (юникод bidi), но порядок блоков/выравнивание остаются LTR; полное зеркалирование layout — отдельная задача, не сделана

## Карта файлов
- `src/app/layout.tsx` — корневой layout, подключение шрифтов, `metadata`
- `src/app/page.tsx` — единственная страница, собирает все блоки по порядку
- `src/app/globals.css` — глобальные стили, Tailwind v4 `@theme` (цвета/шрифты), keyframes анимаций марки (marquee), утилита `.marquee-fade`
- `src/app/fonts.ts` — локальные шрифты через `next/font/local`
- `src/app/favicon.ico` — фавикон
- `src/app/api/lead/route.ts` — POST handler для сбора лидов: валидация `{tour, seats, totalPrice, fullName, whatsapp, email, company}`, honeypot-проверка, параллельный вызов Telegram и Google Sheets, 200 только если оба вызова успешны
- `src/lib/telegram.ts` — `sendLeadToTelegram(lead)`, отправка лида в Telegram-чат через Bot API, строки Seats/Total только если `totalPrice` не пустой
- `src/lib/leadSheet.ts` — `appendLeadToSheet(lead)`, добавление строки в Google Sheet (`Timestamp|Tour|Seats|Total price|Full name|WhatsApp|Email`) используя `googleapis` и service-account JWT
- `src/lib/useLeadSubmit.ts` — `"use client"` shared хук для обеих форм сбора лидов (PrivateTourForm + BookingModal), управляет состоянием `idle/submitting/success/error` и `fetch("/api/lead")`
- `src/lib/i18n.ts` — `"use client"` типы `Locale` (`"en" | "ru" | "kz" | "ar"`), `Localized<T>` (`Partial<Record<Locale, T>> & { en: T }`) и хук `useT()` — резолвит текущую локаль из `useLanguage()` с фолбэком на `en`
- `src/components/Header.tsx` — sticky-хедер, появляется при скролле, `"use client"`
- `src/components/NavbarContent.tsx` — общее содержимое navbar (лого/меню/языковой переключатель/WhatsApp), переиспользуется в `Hero.tsx` и `Header.tsx`, принимает `theme: "light" | "dark"`. На мобилке рендерит только лого + кнопку-триггер (гамбургер/крестик), сам мобильный drawer — в `MobileMenu.tsx`. `"use client"`
- `src/components/MobileMenuProvider.tsx` — React Context для состояния мобильного меню (`isOpen`/`setIsOpen`), тот же паттерн что `LanguageProvider.tsx`; общее состояние нужно, т.к. `NavbarContent.tsx` монтируется дважды (Hero + Header). Подключён в `layout.tsx`. `"use client"`
- `src/components/MobileMenu.tsx` — сам мобильный drawer (боковая шторка с лого/языком/меню/контактами/кнопкой), рендерится ОДИН раз в `page.tsx` через `createPortal` в `document.body`. `"use client"`
- `src/components/BookingModalProvider.tsx` — React Context для состояния booking-модала (`tour: Tour | null`/`open(tour)`/`close()`), тот же паттерн что `MobileMenuProvider.tsx`. Подключён в `layout.tsx`. `"use client"`
- `src/components/MotionConfigProvider.tsx` — обёртка `MotionConfig` (пакет `motion`) с `reducedMotion="user"`, подключена в `layout.tsx`; глобально уважает системную настройку `prefers-reduced-motion` для всех `motion`-компонентов сайта. `"use client"`
- `src/components/Reveal.tsx` — переиспользуемый `motion.div`-wrapper для fade+slide-анимации при появлении в viewport (`whileInView`, `viewport={{ once: true }}`), опциональный `delay` для стаггера карточек; используется в Features, Tours, PrivateTour, FAQ, Reviews (только заголовок), Footer. `"use client"`
- `src/components/CountUp.tsx` — анимация счётчика числа при попадании в viewport (`useInView` + `animate` из `motion`), используется для 3 статистик в Features. `"use client"`
- `src/components/BookingModal.tsx` — светлый popup для выбранного тура: карточка тура (фото/название/степпер мест 1–10/растущая цена через `priceForSeats`), форма + состояние отправки. Рендерится ОДИН раз в `page.tsx` через `createPortal` в `document.body`. Использует `useBookingModal()` и `useLeadSubmit()`. `"use client"`
- `src/components/PhoneInput.tsx` — общий инпут номера WhatsApp с маской и выбором страны (обёртка над `react-phone-number-input`, дефолт Казахстан, любая страна доступна), переиспользуется в `PrivateTourForm` и `BookingModal`. Единственный не-Tailwind CSS в проекте (`react-phone-number-input/style.css`, см. `design-system.md`). `"use client"`
- `src/components/LanguageProvider.tsx` — React Context для языка (`current: Locale`/`setCurrent`), подключён в `layout.tsx`, читается через `useLanguage()`. Persist в `localStorage` (`sabi-go-locale`); сервер всегда рендерит `en`, клиент подхватывает сохранённое значение после mount (SSR-safe hydration). `"use client"`
- `src/components/Hero.tsx` — первый экран (видео-фон + встроенный статичный navbar)
- `src/components/Features.tsx` — блок "The little things..." (4 карточки)
- `src/components/Tours.tsx`, `TourCard.tsx`, `TourGallery.tsx` — блок туров, данные из `src/data/tours.ts`. `TourCard.tsx` — `"use client"` (кнопка "Book a tour" открывает `BookingModal` через `useBookingModal().open(tour)`, передаёт весь объект тура — нужны фото/цена для попапа)
- `src/components/PrivateTour.tsx`, `PrivateTourForm.tsx` — форма заявки на приватный тур (`PrivateTourForm.tsx` — `"use client"`)
- `src/components/TourDetails.tsx` — аккордеон на странице тура (`/tours/[slug]`) с категориями timing/inclusive/exclusive/additionalInfo; категория с пустым массивом не рендерится (ни заголовка, ни пустого списка). `"use client"`
- `src/components/Reviews.tsx`, `ReviewCard.tsx`, `Stars.tsx` — бесконечная карусель отзывов, данные из `src/data/reviews.ts`
- `src/components/Faq.tsx`, `FaqItem.tsx` — аккордеон FAQ, данные из `src/data/faq.ts`, `Faq.tsx` — `"use client"`
- `src/components/Footer.tsx` — футер (лого, соцсети, меню, документация, копирайт)
- `src/components/LanguageSwitcher.tsx` — переключатель языка (навбар + мобильное меню), рендерит `LOCALE_LABELS` (ENG/RU/KZ/العربية) поверх `Locale`-кодов из `useLanguage()`, реально переключает язык контента. `"use client"`
- `src/components/GlobeIcon.tsx` — инлайн SVG-иконка глобуса (`currentColor`, для темизации)
- `src/components/MenuIcon.tsx`, `CloseIcon.tsx` — инлайн SVG-иконки гамбургера и крестика (`currentColor`), тот же паттерн что `GlobeIcon.tsx`, используются в мобильном меню
- `src/data/tours.ts` — данные туров + типы `Tour`/`TourImage`. Переводимые поля (`title`/`description`/`badge`/`timing`/`inclusive`/`exclusive`/`additionalInfo`) — `Localized<string>`; `id`/`price`/`images` (включая `alt`) — обычные строки, не переводятся
- `src/data/reviews.ts` — данные отзывов + тип `Review`. `text`/`reviewDate` — `Localized<string>`; `name`/`avatar` не переводятся
- `src/data/faq.ts` — вопросы/ответы FAQ + тип `FaqEntry`. `question`/`answer` — `Localized<string>`
- `src/data/copy.tsx` — весь статичный UI-копирайт, не привязанный к записи данных (`navLinks`, `documentationLinks`, `copy.{nav,hero,features,tours,privateTour,form,bookingModal,reviews,faq,tourDetails,footer,a11y}`), EN+RU. `.tsx` (не `.ts`) — часть заголовков хранит JSX с инлайн-стилизованным акцентным словом
- `src/fonts/*.woff` — файлы шрифтов (Neue Montreal Regular/Medium, PP Editorial New Italic)
- `public/hero/`, `public/features/`, `public/tours/`, `public/reviews/`, `public/private-tour/`, `public/footer/`, `public/faq/` — ассеты по блокам
- `design-system.md` — источник правды по стилям и переиспользуемым паттернам (цвета, типографика, компоненты, технические заметки)
- `next.config.ts` — конфиг Next.js (пока дефолтный, пустой)
- `eslint.config.mjs` — ESLint, flat config (`eslint-config-next`)
- `postcss.config.mjs` — PostCSS, только `@tailwindcss/postcss`
- `tsconfig.json` — path alias `@/*` → `src/*`

## Конвенции
- Компоненты — `PascalCase.tsx`, один компонент = один блок страницы (`src/components/{Block}.tsx`)
- Стили — только Tailwind-классы (utility-first); кастомные токены — через `@theme inline` в `globals.css`; inline `style`, CSS-модули и styled-components не используются
- `"use client"` — только там, где реально нужен интерактив (state/эффекты/обработчики): `Header`, `NavbarContent`, `MobileMenuProvider`, `MobileMenu`, `BookingModalProvider`, `BookingModal`, `PhoneInput`, `LanguageProvider`, `LanguageSwitcher`, `TourCard`, `PrivateTourForm`, `Faq`, `TourGallery`, `TourDetails`, `MotionConfigProvider`, `Reveal`, `CountUp`. Остальное — серверные компоненты по умолчанию
- Данные для повторяющихся блоков — TS-массивы в `src/data/*.ts`; каждый файл экспортирует `type` + массив, компоненты просто мапят данные — контент редактируется без изменения компонентов
- Типы — не в отдельной папке `/types`, а прямо рядом с данными в `src/data/*.ts`
- Общая логика (хуки, клиенты внешних API) — `src/lib/*.ts` рядом с компонентами (например `telegram.ts`, `leadSheet.ts`, `useLeadSubmit.ts`). Не в отдельных папках `/hooks`, `/utils`
- Переменные окружения (`.env.local`): `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID` используются `/api/lead` для интеграции с Telegram-ботом и Google Sheets. `PrivateTourForm` и `BookingModal` отправляют данные лидов на `/api/lead` (раньше формы не отправляли данные на бэкенд)
- Импорты — алиас `@/*` → `src/*` (например `@/components/Hero`, `@/data/tours`)
- Ассеты — по подпапкам на блок в `/public/{имя-блока}/`, растровые изображения — WebP (кроме случаев с причиной, см. `design-system.md`)

## Стек
- Next.js 16.3.2 (App Router)
- React 19.2.8 / React DOM 19.2.8
- TypeScript ^5
- Tailwind CSS ^4 (+ `@tailwindcss/postcss`)
- ESLint ^9 (`eslint-config-next`)
- `googleapis` — Google Sheets API integration
- `react-phone-number-input` — маска/валидация номера WhatsApp с выбором страны (`PhoneInput.tsx`)
- `motion` — анимации: scroll-reveal (`Reveal.tsx`) и count-up чисел (`CountUp.tsx`), глобальный `prefers-reduced-motion` через `MotionConfigProvider.tsx`
- Package manager: npm (pnpm недоступен на этой машине из-за прав corepack)
- Деплой: Vercel
- Интеграции: заявки → Telegram-бот + Google Sheets (реализовано через `/api/lead`)

## Статус проекта
Начинаем с нуля. Собираем ТОЛЬКО десктопную версию, одна страница.
Контент (тексты) — финальный. Мультиязычность: все 4 языка (EN/RU/KZ/AR) заполнены контентом на всём сайте + всех 6 tour detail страницах. KZ/AR — машинный перевод (сгенерирован моделью), рекомендуется проверка носителем языка перед публикацией для реальных KZ/AR посетителей. RTL-разметка (`dir="rtl"`, зеркалирование layout) не реализована — отдельная задача.
Дальше по плану (отдельными этапами, не сейчас):
1. Адаптив (мобилка/планшет)
2. Проверка KZ/AR переводов носителем языка; RTL layout для арабского, если понадобится
3. Онлайн-бронирование, эквайринг, AI-чат, CRM

## Источник дизайна — Figma MCP, не скриншоты
- Figma-файл: https://www.figma.com/design/lFMyxNEfgL8JgeJDRNu95i/Sabi-go-travel
- На каждый блок присылается ссылка на конкретный фрейм/секцию (node-id)
- Точные значения (цвета, spacing, шрифты, переменные) брать через Figma MCP (`get_design_context`, `get_metadata`, `get_variable_defs`), а не угадывать по пикселям
- Ассеты:
  - иконки/векторные элементы — забирать напрямую из Figma (`download_assets`) в `/assets/{имя-блока}/`
  - фото и финальные растровые картинки — пользователь кладёт вручную в `/assets/{имя-блока}/`
- Dev Mode подписка не нужна — базовые read-only инструменты работают и без неё
- **Лимит Figma MCP (Starter-план): 20 вызовов в месяц**, общий на все read-инструменты (`get_metadata`, `get_design_context`, `get_screenshot` и т.д.). Не дневной — сбрасывается раз в месяц. Как исчерпан — блок/футер собран по неполным данным (только metadata, без screenshot/точных ассетов), см. пометки "нужно сверить визуально" в design-system.md. Если лимит мешает — предложить пользователю: (а) подождать сброса, (б) апгрейд Figma-плана, (в) прислать скриншот/ассеты вручную.

## Шрифты
- Основной: Neue Montreal — только начертания Regular и Medium
- Акцентный (для части заголовков): PP Editorial New — только Italic
- Загружены через `next/font/local` в `src/app/fonts.ts`, без лишних начертаний — только те, что реально используются

## Как мы работаем
- Верстаем БЛОК ЗА БЛОКОМ. Порядок не жёстко "сверху вниз" — стартовали с Hero (в Figma навбар — отдельная секция, попросили начать именно с Hero)
- На каждый блок — ссылка на Figma-фрейм (+ ассеты, если нужны вручную)
- Все цвета/шрифты/отступы, которые определяются — записывать и обновлять в design-system.md
- Перед вёрсткой нового блока — свериться с design-system.md, использовать уже сохранённые значения, если подходят
- После каждого блока — стоп, жду проверку, не переходить дальше самому
- Один блок = один компонент в коде (`src/components/{Block}.tsx`), не мешать всё в один файл

## SEO
Закладываем сразу: Metadata API Next.js (title/description/OG), favicon, sitemap.xml, robots.txt.

## Прогресс (отмечай по ходу)
- [x] Hero (включая статичный embedded navbar)
- [x] Features ("The little things that make every trip better")
- [x] Tours (карточки туров — data-driven, см. `src/data/tours.ts`)
- [x] Форма заявки (Private tour) — рабочий фронт (ввод, валидация, submit-состояния), интеграция с Telegram-ботом/Google Sheets реализована (используется shared `useLeadSubmit` hook)
- [x] Reviews (бесконечная карусель отзывов, 2 ряда в разные стороны — data-driven, см. `src/data/reviews.ts`)
- [x] FAQ (аккордеон, только 1 карточка открыта одновременно — data-driven, см. `src/data/faq.ts`, реальные вопросы/ответы от пользователя, добавлены 2026-08-24)
- [x] Футер (лого, соцсети/контакты, меню, документация, копирайт) — собран по `get_metadata` (координаты/текст), без `get_design_context`/скриншота — упёрлись в месячный лимит Figma MCP (20 запросов, Starter-план). Тёмный сплошной фон вместо фото — стоит сверить визуально когда лимит сбросится или дизайнер пришлёт скрин/ассеты. Иконки соцсетей — настоящие из Figma (прислал пользователь вручную).
- [x] Sticky Header (`Header.tsx`) — тот же контент navbar, что в hero (общий `NavbarContent.tsx`), капсула `bg-ink/15 rounded-[25px] h-[100px] backdrop-blur-md`, белый текст. Появляется при скролле после первого блока (`window.scrollY > 700`), плавно (`opacity`/`translate-y`).
- [x] Lead backend (Telegram + Google Sheets) — POST `/api/lead`, shared `useLeadSubmit()` hook, honeypot валидация, оба вызова успешны или 502. Две точки входа: `PrivateTourForm` (inline) + `BookingModal` (popup). См. `docs/superpowers/plans/2026-08-27-lead-backend.md`
- [x] Редизайн `BookingModal` — светлая тема, карточка тура с фото/степпером мест (1–10)/растущей ценой, `seats`/`totalPrice` уходят в Telegram/Sheets. См. `docs/superpowers/plans/2026-08-29-booking-modal-redesign.md`
- [x] Маска номера WhatsApp — `PhoneInput.tsx` (флаг страны, дефолт Казахстан, любая страна доступна), отправка заблокирована пока номер не полный. В обеих формах. См. `docs/superpowers/plans/2026-08-30-phone-input-mask.md`
- [x] i18n RU + рабочий `LanguageSwitcher` — весь сайт (главная страница + все 6 `/tours/[slug]`) рендерится на EN или RU через `useT()`/`Localized<T>` (`src/lib/i18n.ts`), выбор персистится в `localStorage`. `tour` в `/api/lead` всегда уходит на английском (`tour.title.en`) независимо от языка UI. SEO `<title>`/`<meta description>` тоже всегда английские. См. `docs/superpowers/plans/2026-09-04-i18n-ru.md`
- [x] i18n KZ/AR контент — `kz`/`ar` ключи добавлены во все существующие `Localized<...>` объекты (`copy.tsx`, `tours.ts`, `reviews.ts`, `faq.ts`), без изменений компонентов (кроме расширения regex в `TourDetails.tsx` для распознавания "Күн"/"Нұсқа"/"اليوم"/"الخيار" как заголовков дня/варианта). Машинный перевод — нужна проверка носителем языка перед публикацией. RTL для арабского не реализован (отдельные строки рендерятся справа налево через юникод bidi, но общий layout остаётся LTR)
- [x] Scroll-reveal + count-up анимации — новая зависимость `motion`; `Reveal.tsx` (fade+slide через `whileInView`/`viewport={{ once: true }}`, опциональный `delay` для стаггера) и `CountUp.tsx` (анимация числа при появлении в viewport) подключены в Features (+ `CountUp` на 3 статистиках), Tours, PrivateTour, FAQ, Reviews (только заголовок), Footer. Глобальный `prefers-reduced-motion` — `MotionConfigProvider` (`MotionConfig reducedMotion="user"`) в `layout.tsx`. Для анимируемых статистик Features `copy.tsx` перестроен с цельной строки на `{value, styledSuffix, restText}`, чтобы число анимировалось отдельно от текста. См. `docs/superpowers/plans/2026-09-13-scroll-animations.md`
- [x] Контент туров — реальные данные от клиента (Word-документы) заменили плейсхолдеры для всех 6 однодневных туров на сайте: `kolsai-kaindy-moon-canyon`, `big-almaty-lake-falcon-show`, `oi-qaragai-mountain-resort` (был 3-дневный курортный отдых — заменён на однодневную поездку по новому docx), `city-tour-green-bazaar` (обновлён, добавлена Кок-Тобе), плюс два новых тура `alma-arasan-falcon-show` и `shymbulak`. Удалены нереализованные плейсхолдеры без реального контента: `kolsai-kaindy-charyn-black-moon-2-day`, `tour-package` (вместе с неиспользуемыми `sharedInclusive`/`sharedExclusive`/`sharedHikingFalconryAdditionalInfo` в `tours.ts`). Фото — реальные из клиентских docx (не сток), у части туров всего 1–2 фото в галерее — намеренно, компонент это поддерживает. Одно фото сокола/филина отбраковано во всех документах — несло чужой водяной знак ("Wild Ticket"), решили не использовать. `Tour.price` — `Localized<string>` (не просто `string`): слово-обёртка "from"/"от"/"-ден бастап"/"ابتداءً من" переводится, число — нет (см. `priceForSeats` в `BookingModal.tsx`, парсит `tour.price.en`). Пайплайн описан в `docs/superpowers/specs/2026-09-14-tour-content-rewrite-design.md`
- [x] Пакетные многодневные туры — добавлены 3 тура-пакета `almaty-highlights-2n3d`/`-3n4d`/`-4n5d` (2–4 ночи/3–5 дней) из docx "Spring PROMO" — перелёт/трансфер/отель + комбинация уже описанных однодневных активностей (Шымбулак, Сити-тур+Кок-Тобе, Алма-Арасан, Ой-Карагай). Новый паттерн ценообразования: `additionalInfo` содержит цену за каждую комбинацию (размер группы × категория отеля 3★/4★/5★) плюс доплату за одноместное размещение — не просто одна цена на размер группы, как у однодневных туров. Все фото переиспользованы из уже загруженных (клиент прислал те же фото повторно, просто в другом экспорте/кропе) — новых конвертаций не потребовалось. Ожидаются ещё docx от клиента
- [ ] (добавим следующие блоки по мере появления)

## ВАЖНО
При создании новых компонентов, страниц, папок или изменении архитектуры проекта — сразу обновляй соответствующий раздел этого файла (Карта файлов / Конвенции / Стек). Не жди отдельного запроса на это. Перед началом любой новой задачи сверяйся с этим файлом вместо повторного сканирования всего проекта — читай отдельные файлы только если в CLAUDE.md не хватает деталей для конкретной задачи.
