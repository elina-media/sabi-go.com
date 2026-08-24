@AGENTS.md

# Проект: Sabi Go (travel)

Лендинг тур-оператора по Казахстану: подбор туров + оставление заявки.

## Архитектура
- Next.js 16 (App Router), TypeScript, React 19
- Роутинг файловый, App Router. Роут пока один: `src/app/page.tsx` (весь сайт — одна страница, все блоки собраны в ней подряд)
- API-роутов нет (`src/app/api/` отсутствует) — формы пока не отправляют данные на бэкенд
- `src/app/layout.tsx` — корневой layout (html/body, шрифты, `metadata`). `Header` и `Footer` рендерятся не в layout, а в `page.tsx`
- Стили — Tailwind CSS v4, конфиг через CSS (`@theme inline` в `src/app/globals.css`), файла `tailwind.config.js` нет
- Данные повторяющихся блоков (туры/отзывы/FAQ) — статические TS-массивы в `src/data/`, без БД

## Карта файлов
- `src/app/layout.tsx` — корневой layout, подключение шрифтов, `metadata`
- `src/app/page.tsx` — единственная страница, собирает все блоки по порядку
- `src/app/globals.css` — глобальные стили, Tailwind v4 `@theme` (цвета/шрифты), keyframes анимаций марки (marquee), утилита `.marquee-fade`
- `src/app/fonts.ts` — локальные шрифты через `next/font/local`
- `src/app/favicon.ico` — фавикон
- `src/components/Header.tsx` — sticky-хедер, появляется при скролле, `"use client"`
- `src/components/NavbarContent.tsx` — общее содержимое navbar (лого/меню/языковой переключатель/WhatsApp), переиспользуется в `Hero.tsx` и `Header.tsx`, принимает `theme: "light" | "dark"`
- `src/components/Hero.tsx` — первый экран (видео-фон + встроенный статичный navbar)
- `src/components/Features.tsx` — блок "The little things..." (4 карточки)
- `src/components/Tours.tsx`, `TourCard.tsx`, `TourGallery.tsx` — блок туров, данные из `src/data/tours.ts`
- `src/components/PrivateTour.tsx`, `PrivateTourForm.tsx` — форма заявки на приватный тур (`PrivateTourForm.tsx` — `"use client"`)
- `src/components/Reviews.tsx`, `ReviewCard.tsx`, `Stars.tsx` — бесконечная карусель отзывов, данные из `src/data/reviews.ts`
- `src/components/Faq.tsx`, `FaqItem.tsx` — аккордеон FAQ, данные из `src/data/faq.ts`, `Faq.tsx` — `"use client"`
- `src/components/Footer.tsx` — футер (лого, соцсети, меню, документация, копирайт)
- `src/components/LanguageSwitcher.tsx` — переключатель языка (пока UI-заглушка без реального i18n), `"use client"`
- `src/components/GlobeIcon.tsx` — инлайн SVG-иконка глобуса (`currentColor`, для темизации)
- `src/data/tours.ts` — данные туров + типы `Tour`/`TourImage`
- `src/data/reviews.ts` — данные отзывов + тип `Review`
- `src/data/faq.ts` — вопросы/ответы FAQ + тип `FaqEntry`
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
- `"use client"` — только там, где реально нужен интерактив (state/эффекты/обработчики): `Header`, `LanguageSwitcher`, `PrivateTourForm`, `Faq`, `TourGallery`. Остальное — серверные компоненты по умолчанию
- Данные для повторяющихся блоков — TS-массивы в `src/data/*.ts`; каждый файл экспортирует `type` + массив, компоненты просто мапят данные — контент редактируется без изменения компонентов
- Типы — не в отдельной папке `/types`, а прямо рядом с данными в `src/data/*.ts`
- Отдельных папок `/hooks`, `/lib`, `/utils` пока нет — весь код лежит в компонентах
- Переменные окружения — `.env`-файлов в проекте пока нет (формы не подключены к бэкенду, см. `TODO` в `PrivateTourForm.tsx`)
- Импорты — алиас `@/*` → `src/*` (например `@/components/Hero`, `@/data/tours`)
- Ассеты — по подпапкам на блок в `/public/{имя-блока}/`, растровые изображения — WebP (кроме случаев с причиной, см. `design-system.md`)

## Стек
- Next.js 16.3.2 (App Router)
- React 19.2.8 / React DOM 19.2.8
- TypeScript ^5
- Tailwind CSS ^4 (+ `@tailwindcss/postcss`)
- ESLint ^9 (`eslint-config-next`)
- Package manager: npm (pnpm недоступен на этой машине из-за прав corepack)
- Деплой: Vercel
- Формы (когда дойдём): заявки → Telegram-бот + Google Sheets

## Статус проекта
Начинаем с нуля. Собираем ТОЛЬКО десктопную версию, одна страница.
Контент (тексты) — финальный, сайт пока только на английском.
Дальше по плану (отдельными этапами, не сейчас):
1. Адаптив (мобилка/планшет)
2. Мультиязычность (ru/en/kz/ar и т.д.) — писать копирайт так, чтобы потом было легко вынести в i18n, но сейчас без i18n-обвязки
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
- [x] Форма заявки (Private tour) — рабочий фронт (ввод, валидация, submit-состояния), интеграция с Telegram-ботом/Google Sheets — позже, см. TODO в `PrivateTourForm.tsx`
- [x] Reviews (бесконечная карусель отзывов, 2 ряда в разные стороны — data-driven, см. `src/data/reviews.ts`)
- [x] FAQ (аккордеон, только 1 карточка открыта одновременно — data-driven, см. `src/data/faq.ts`, реальные вопросы/ответы от пользователя, добавлены 2026-08-24)
- [x] Футер (лого, соцсети/контакты, меню, документация, копирайт) — собран по `get_metadata` (координаты/текст), без `get_design_context`/скриншота — упёрлись в месячный лимит Figma MCP (20 запросов, Starter-план). Тёмный сплошной фон вместо фото — стоит сверить визуально когда лимит сбросится или дизайнер пришлёт скрин/ассеты. Иконки соцсетей — настоящие из Figma (прислал пользователь вручную).
- [x] Sticky Header (`Header.tsx`) — тот же контент navbar, что в hero (общий `NavbarContent.tsx`), капсула `bg-ink/15 rounded-[25px] h-[100px] backdrop-blur-md`, белый текст. Появляется при скролле после первого блока (`window.scrollY > 700`), плавно (`opacity`/`translate-y`).
- [ ] (добавим следующие блоки по мере появления)

## ВАЖНО
При создании новых компонентов, страниц, папок или изменении архитектуры проекта — сразу обновляй соответствующий раздел этого файла (Карта файлов / Конвенции / Стек). Не жди отдельного запроса на это. Перед началом любой новой задачи сверяйся с этим файлом вместо повторного сканирования всего проекта — читай отдельные файлы только если в CLAUDE.md не хватает деталей для конкретной задачи.
