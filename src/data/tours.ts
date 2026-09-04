import type { Localized } from "@/lib/i18n";

export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Unique, stable id — used as the React key and the tour detail slug (/tours/[id]). */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: Localized<string>;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). Not translated. */
  price: string;
  /**
   * Photos under /public/tours. Feeds the card gallery (TourGallery), the
   * detail page hero background (first photo), and the detail page photo
   * slider (full array). One photo = no gallery arrows/thumbnails shown
   * anywhere. Add more entries once there are extra photos for a tour.
   * Alt text is not translated.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: Localized<string>;
  /** Short subtitle shown under the title on the tour detail page hero. */
  description: Localized<string>;
  /** Detail page accordion: bullet points under "Timing". */
  timing: Localized<string>[];
  /** Detail page accordion: bullet points under "Inclusive". */
  inclusive: Localized<string>[];
  /** Detail page accordion: bullet points under "Exclusive". */
  exclusive: Localized<string>[];
  /** Detail page accordion: bullet points under "Additional information". */
  additionalInfo: Localized<string>[];
};

const sharedInclusive: Localized<string>[] = [
  { en: "Pickup from the meeting point", ru: "Трансфер от точки встречи" },
  { en: "Transportation", ru: "Транспорт" },
  { en: "English-speaking guide", ru: "Англоговорящий гид" },
  {
    en: "Entrance tickets to all national parks",
    ru: "Входные билеты во все национальные парки",
  },
  { en: "Lunch box", ru: "Ланч-бокс" },
  { en: "Bottled water", ru: "Питьевая вода" },
];

const sharedExclusive: Localized<string>[] = [
  { en: "Horseback riding", ru: "Катание на лошадях" },
  { en: "Taxi at certain locations", ru: "Такси в отдельных местах" },
];

const sharedHikingFalconryAdditionalInfo: Localized<string>[] = [
  {
    en: "$60 per person — hiking route + falconry show",
    ru: "$60 с человека — пеший маршрут + шоу соколиной охоты",
  },
  {
    en: "$80 per person — car ride",
    ru: "$80 с человека — поездка на автомобиле",
  },
  { en: "Tours run every day", ru: "Туры проходят каждый день" },
];

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: {
      en: "Kolsai, Kaindy & Moon Canyon",
      ru: "Кольсай, Каинды и Лунный каньон",
    },
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-moon-canyon.webp",
        alt: "Kaindy Lake's turquoise water and its sunken pine forest",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-4.webp",
        alt: "Wide view of Moon Canyon's layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "River winding through the canyon near Moon Canyon",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
    ],
    badge: { en: "every day", ru: "каждый день" },
    description: {
      en: "Moon Canyon, the mysterious sunken forest of Kaindy Lake, and the crystal-clear waters of Kolsai Lake — all in one unforgettable day. A scenic journey through Kazakhstan's mountains, with breathtaking landscapes, a local lunch and plenty of time to explore.",
      ru: "Лунный каньон, таинственный затопленный лес озера Каинды и кристально чистые воды озера Кольсай — всё это за один незабываемый день. Живописное путешествие по горам Казахстана с захватывающими пейзажами, местным обедом и достаточным временем на осмотр.",
    },
    timing: [
      { en: "5:00–5:30 — Guest pickup", ru: "5:00–5:30 — Встреча с гостями" },
      {
        en: "7:00–7:30 — Stop at a gas station (breakfast option)",
        ru: "7:00–7:30 — Остановка на заправке (можно позавтракать)",
      },
      { en: "8:30–10:00 — Moon Canyon", ru: "8:30–10:00 — Лунный каньон" },
      { en: "11:00–13:30 — Kaindy Lake", ru: "11:00–13:30 — Озеро Каинды" },
      { en: "13:30–14:00 — Lunch", ru: "13:30–14:00 — Обед" },
      { en: "14:30–16:00 — Kolsai Lake", ru: "14:30–16:00 — Озеро Кольсай" },
      {
        en: "18:00–18:30 — Stop at a gas station",
        ru: "18:00–18:30 — Остановка на заправке",
      },
      {
        en: "20:00–21:00 — Return to Almaty",
        ru: "20:00–21:00 — Возвращение в Алматы",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$60 per person for a group of 16",
        ru: "$60 с человека при группе 16 человек",
      },
      {
        en: "$90 per person for a group of 8",
        ru: "$90 с человека при группе 8 человек",
      },
      {
        en: "$110 per person for a group of 3",
        ru: "$110 с человека при группе 3 человека",
      },
      { en: "Tours run every day", ru: "Туры проходят каждый день" },
    ],
  },
  {
    id: "kolsai-kaindy-charyn-black-moon-2-day",
    title: {
      en: "Kolsai, Kaindy, Charyn, Black Canyon & Moon Canyon (2-Day Tour)",
      ru: "Кольсай, Каинды, Чарын, Чёрный каньон и Лунный каньон (тур на 2 дня)",
    },
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-charyn-black-moon-2-day.webp",
        alt: "Canyon landscape with layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-4.webp",
        alt: "Wide view of Moon Canyon's layered rock formations",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "River winding through the canyon near Moon Canyon",
      },
    ],
    badge: { en: "Mon, Wed, Fri", ru: "Пн, Ср, Пт" },
    description: {
      en: "Moon Canyon, Black Canyon and the dramatic Charyn Canyon, turquoise Kolsai Lake and the sunken forest of Kaindy Lake — two days of Kazakhstan's most spectacular mountain landscapes, with cozy accommodation, local food and an unforgettable road trip through the wild.",
      ru: "Лунный каньон, Чёрный каньон и впечатляющий Чарынский каньон, бирюзовое озеро Кольсай и затопленный лес озера Каинды — два дня среди самых зрелищных горных пейзажей Казахстана, с уютным проживанием, местной кухней и незабываемой поездкой по дикой природе.",
    },
    timing: [
      { en: "Day 1", ru: "День 1" },
      {
        en: "7:00–7:30 — Guest pickup at the hotel",
        ru: "7:00–7:30 — Встреча гостей в отеле",
      },
      {
        en: "8:00–8:30 — Stop at a gas station",
        ru: "8:00–8:30 — Остановка на заправке",
      },
      { en: "10:00–10:30 — Moon Canyon", ru: "10:00–10:30 — Лунный каньон" },
      { en: "11:00–11:30 — Black Canyon", ru: "11:00–11:30 — Чёрный каньон" },
      { en: "12:30–13:30 — Lunch", ru: "12:30–13:30 — Обед" },
      { en: "14:00–18:00 — Kolsai Lake", ru: "14:00–18:00 — Озеро Кольсай" },
      {
        en: "19:00–19:30 — Hotel check-in and dinner",
        ru: "19:00–19:30 — Заселение в отель и ужин",
      },
      { en: "Day 2", ru: "День 2" },
      { en: "7:00–7:30 — Breakfast", ru: "7:00–7:30 — Завтрак" },
      { en: "8:00–10:00 — Kaindy Lake", ru: "8:00–10:00 — Озеро Каинды" },
      { en: "11:30–12:00 — Lunch", ru: "11:30–12:00 — Обед" },
      {
        en: "13:30–16:30 — Charyn Canyon",
        ru: "13:30–16:30 — Чарынский каньон",
      },
      {
        en: "18:00–19:00 — Return to Almaty",
        ru: "18:00–19:00 — Возвращение в Алматы",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$110 per person — guest house (shared bathroom)",
        ru: "$110 с человека — гостевой дом (общая ванная)",
      },
      {
        en: "$130 per person — guest house (private bathroom)",
        ru: "$130 с человека — гостевой дом (отдельная ванная)",
      },
      {
        en: "$150 per person — traditional house (yurt, shared bathroom)",
        ru: "$150 с человека — традиционный дом (юрта, общая ванная)",
      },
      {
        en: "Tours run on Monday, Wednesday, and Friday",
        ru: "Туры проходят по понедельникам, средам и пятницам",
      },
    ],
  },
  {
    id: "big-almaty-lake-falcon-show",
    title: {
      en: "Big Almaty Lake & Falcon Show",
      ru: "Большое Алматинское озеро и шоу соколиной охоты",
    },
    price: "$60",
    images: [
      {
        src: "/tours/big-almaty-lake-falcon-show.webp",
        alt: "Big Almaty Lake surrounded by snow-capped mountains",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-2.webp",
        alt: "Big Almaty Lake's turquoise water framed by snowy peaks in winter",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-3.webp",
        alt: "Wildflowers and pine trees along the shore of Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-4.webp",
        alt: "Hikers walking along the mountain water pipeline near Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-5.webp",
        alt: "The mountain water pipeline leading toward Big Almaty Lake",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-6.webp",
        alt: "A forest lake with autumn foliage along the shore",
      },
    ],
    badge: { en: "every day", ru: "каждый день" },
    description: {
      en: "Big Almaty Lake surrounded by the peaks of the Trans-Ili Alatau, followed by an impressive falconry show. A perfect day trip from Almaty combining breathtaking mountain scenery, fresh air, free time by the lake and a unique look into Kazakhstan's nomadic traditions.",
      ru: "Большое Алматинское озеро в окружении вершин Заилийского Алатау, а затем впечатляющее шоу соколиной охоты. Идеальная однодневная поездка из Алматы, сочетающая захватывающие горные пейзажи, свежий воздух, свободное время у озера и уникальное знакомство с кочевыми традициями Казахстана.",
    },
    timing: [
      {
        en: "7:00 — Guest pickup at the hotel",
        ru: "7:00 — Встреча гостей в отеле",
      },
      {
        en: "10:00 — Arrival at Big Almaty Lake",
        ru: "10:00 — Прибытие на Большое Алматинское озеро",
      },
      {
        en: "10:00–14:00 — Free time at Big Almaty Lake",
        ru: "10:00–14:00 — Свободное время на озере",
      },
      {
        en: "15:00 — Arrival at the hotel parking lot",
        ru: "15:00 — Прибытие на парковку отеля",
      },
      {
        en: "16:00–16:40 — Falconry show",
        ru: "16:00–16:40 — Шоу соколиной охоты",
      },
      {
        en: "17:30 — Return to Almaty",
        ru: "17:30 — Возвращение в Алматы",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: sharedHikingFalconryAdditionalInfo,
  },
  {
    id: "oi-qaragai-mountain-resort",
    title: {
      en: "Oi-Qaragai Mountain Resort",
      ru: "Горный курорт Ой-Карагай",
    },
    price: "$60",
    images: [
      {
        src: "/tours/oi-qaragai-mountain-resort.webp",
        alt: "Colorful cottages of Oi-Qaragai Mountain Resort among autumn trees",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-2.webp",
        alt: "Traditional yurt restaurant at the entrance to Oi-Qaragai Mountain Resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-3.webp",
        alt: "Chairlift ride above the forest at Oi-Qaragai Mountain Resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-4.webp",
        alt: "Green mountain ridges and pine forest surrounding Oi-Qaragai",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-5.webp",
        alt: "Wooden cabins and a yurt along a mountain stream at the resort",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-6.webp",
        alt: "A treehouse-style cabin among tall pine trees",
      },
    ],
    badge: { en: "every day", ru: "каждый день" },
    description: {
      en: "A three-day escape to Oi-Qaragai Mountain Resort, surrounded by forests and mountain landscapes. Slow mornings, cozy accommodation and a huge choice of activities — hiking, horseback riding, ziplining, golf, archery, climbing and spa time. The perfect mix of adventure and complete relaxation just outside Almaty.",
      ru: "Трёхдневный отдых на горном курорте Ой-Карагай среди лесов и горных пейзажей. Неспешные утра, уютное проживание и огромный выбор активностей — пешие прогулки, катание на лошадях, зиплайн, гольф, стрельба из лука, скалолазание и спа. Идеальное сочетание приключений и полного расслабления совсем рядом с Алматы.",
    },
    timing: [
      { en: "Day 1", ru: "День 1" },
      { en: "12:30 — Guest pickup", ru: "12:30 — Встреча гостей" },
      {
        en: "14:00–14:30 — Arrival at Oi-Qaragai mountain resort",
        ru: "14:00–14:30 — Прибытие на курорт Ой-Карагай",
      },
      { en: "14:30–15:00 — Check-in", ru: "14:30–15:00 — Заселение" },
      { en: "15:00 — Free time", ru: "15:00 — Свободное время" },
      { en: "Day 2", ru: "День 2" },
      {
        en: "7:00–7:30 — Breakfast at the resort",
        ru: "7:00–7:30 — Завтрак на курорте",
      },
      {
        en: "8:00 — Free time — enjoy the resort's activities:",
        ru: "8:00 — Свободное время — активности курорта:",
      },
      { en: "Paintball", ru: "Пейнтбол" },
      { en: "Hiking", ru: "Пешие прогулки" },
      { en: "Mountain golf", ru: "Горный гольф" },
      { en: "Archery", ru: "Стрельба из лука" },
      { en: "Rope park", ru: "Верёвочный парк" },
      { en: "Climbing park", ru: "Скалодром" },
      { en: "Zipline", ru: "Зиплайн" },
      { en: "Horseback riding", ru: "Катание на лошадях" },
      { en: "Spa", ru: "Спа" },
      { en: "Day 3", ru: "День 3" },
      {
        en: "7:00–7:30 — Breakfast at the resort",
        ru: "7:00–7:30 — Завтрак на курорте",
      },
      { en: "7:30–11:30 — Free time", ru: "7:30–11:30 — Свободное время" },
      { en: "11:30–12:00 — Check-out", ru: "11:30–12:00 — Выезд" },
      {
        en: "13:30–14:00 — Return to Almaty",
        ru: "13:30–14:00 — Возвращение в Алматы",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: sharedHikingFalconryAdditionalInfo,
  },
  {
    id: "city-tour",
    title: { en: "City Tour", ru: "Городской тур" },
    price: "$60",
    images: [
      {
        src: "/tours/city-tour.webp",
        alt: "Shymbulak gondola cabin over a chalet village in the mountains",
      },
      {
        src: "/tours/city-tour-7.webp",
        alt: "Panfilov Park alley with the Momyshuly monument and war memorial cannons",
      },
      {
        src: "/tours/city-tour-8.webp",
        alt: "Ascension Cathedral in Panfilov Park",
      },
      {
        src: "/tours/city-tour-9.webp",
        alt: "Eternal flame at the Memorial of Glory in Panfilov Park",
      },
      {
        src: "/tours/city-tour-3.webp",
        alt: "Aerial view of Shymbulak's chalets and mountain road",
      },
      {
        src: "/tours/city-tour-4.webp",
        alt: "Gondola cabin carrying skiers over snowy peaks",
      },
      {
        src: "/tours/city-tour-5.webp",
        alt: "Medeu skating rink surrounded by autumn mountains",
      },
      {
        src: "/tours/city-tour-6.webp",
        alt: "View of the ski slope from above the clouds at Shymbulak",
      },
    ],
    badge: { en: "every day", ru: "каждый день" },
    description: {
      en: "A flexible one-day city tour around Almaty — choose one of four route options: Shymbulak ski resort and Panfilov Park, the Alma-Arasan and Ayusai gorges, Kok-Tobe and Central Park, or the Green Bazaar and Arbat pedestrian street. A relaxed way to see the best of Almaty and its surroundings, tailored to what you want to explore.",
      ru: "Гибкий однодневный тур по Алматы — выберите один из четырёх вариантов маршрута: горнолыжный курорт Шымбулак и парк Панфилова, ущелья Алма-Арасан и Аюсай, Кок-Тобе и Центральный парк, или Зелёный базар и пешеходная улица Арбат. Неспешный способ увидеть лучшее в Алматы и окрестностях, подобранный под ваши интересы.",
    },
    timing: [
      { en: "Option 1", ru: "Вариант 1" },
      {
        en: "11:00–15:30 — Visit Shymbulak Mountain Resort (3 cable car stations) and enjoy the snow and mountain scenery",
        ru: "11:00–15:30 — Посещение горнолыжного курорта Шымбулак (3 очереди канатной дороги), снежные и горные пейзажи",
      },
      {
        en: "16:30–17:30 — Visit Panfilov Park and the Memorial of Glory",
        ru: "16:30–17:30 — Посещение парка Панфилова и Мемориала Славы",
      },
      { en: "Option 2", ru: "Вариант 2" },
      {
        en: "11:00–15:30 — Visit Alma-Arasan Gorge (hot springs) and Ayusai Gorge",
        ru: "11:00–15:30 — Посещение ущелья Алма-Арасан (горячие источники) и ущелья Аюсай",
      },
      {
        en: "16:00–17:00 — Watch a bird show or visit the Presidential Park",
        ru: "16:00–17:00 — Шоу птиц или посещение Президентского парка",
      },
      { en: "Option 3", ru: "Вариант 3" },
      {
        en: "11:00–13:30 — Visit Kok-Tobe Park (cable car, panoramic views and summer slide)",
        ru: "11:00–13:30 — Посещение парка Кок-Тобе (канатная дорога, панорамные виды и летний спуск)",
      },
      {
        en: "14:00–17:00 — Visit Central Park: amusement rides, lake and zoo",
        ru: "14:00–17:00 — Посещение Центрального парка: аттракционы, озеро и зоопарк",
      },
      { en: "Option 4", ru: "Вариант 4" },
      {
        en: "13:30–15:30 — Visit Green Bazaar and a chocolate factory",
        ru: "13:30–15:30 — Посещение Зелёного базара и шоколадной фабрики",
      },
      {
        en: "16:00–18:00 — Walk along Arbat pedestrian street and explore the city center",
        ru: "16:00–18:00 — Прогулка по пешеходной улице Арбат и центру города",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: sharedHikingFalconryAdditionalInfo,
  },
  {
    id: "tour-package",
    title: { en: "Tour Package", ru: "Тур-пакет" },
    price: "$60",
    images: [
      {
        src: "/tours/city-tour-4.webp",
        alt: "Gondola cabin carrying skiers over snowy peaks",
      },
      {
        src: "/tours/city-tour.webp",
        alt: "Shymbulak gondola cabin over a chalet village in the mountains",
      },
      {
        src: "/tours/city-tour-3.webp",
        alt: "Aerial view of Shymbulak's chalets and mountain road",
      },
      {
        src: "/tours/city-tour-7.webp",
        alt: "Panfilov Park alley with the Momyshuly monument and war memorial cannons",
      },
      {
        src: "/tours/city-tour-8.webp",
        alt: "Ascension Cathedral in Panfilov Park",
      },
      {
        src: "/tours/city-tour-9.webp",
        alt: "Eternal flame at the Memorial of Glory in Panfilov Park",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Wooden boardwalk along Kolsai Lake with boats on the water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "A wooden pier reaching out over Kolsai Lake",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-4.webp",
        alt: "Green mountain ridges and pine forest near Almaty",
      },
      {
        src: "/tours/big-almaty-lake-falcon-show-3.webp",
        alt: "Wildflowers and pine trees in the Almaty mountains",
      },
    ],
    badge: { en: "every day", ru: "каждый день" },
    description: {
      en: "A 6-day journey through Almaty's mountains and lakes — Shymbulak ski resort, Kolsai Lake, Alma-Arasan and Ayusai gorges, Butakovka gorge, the Lesnaya Skazka mountain resort and Issyk Lake. Scenic hikes, riverside stops and breathtaking views every day.",
      ru: "6-дневное путешествие по горам и озёрам Алматы — горнолыжный курорт Шымбулак, озеро Кольсай, ущелья Алма-Арасан и Аюсай, ущелье Бутаковка, горный курорт «Лесная сказка» и озеро Иссык. Живописные прогулки, остановки у рек и захватывающие виды каждый день.",
    },
    timing: [
      { en: "Day 1", ru: "День 1" },
      {
        en: "11:00–15:30 — Visit Shymbulak Mountain Resort (3 cable car stations), enjoy the mountain views and snowy scenery",
        ru: "11:00–15:30 — Посещение горнолыжного курорта Шымбулак (3 очереди канатной дороги), горные и снежные пейзажи",
      },
      {
        en: "16:30–17:30 — Visit Panfilov Park and the Memorial of Glory",
        ru: "16:30–17:30 — Посещение парка Панфилова и Мемориала Славы",
      },
      { en: "Day 2", ru: "День 2" },
      {
        en: "09:00–18:00 — Trip to Kolsai Lake, enjoy the breathtaking natural scenery and relax by the lake",
        ru: "09:00–18:00 — Поездка на озеро Кольсай, потрясающая природа и отдых у озера",
      },
      { en: "Day 3", ru: "День 3" },
      {
        en: "10:30–15:30 — Visit Alma-Arasan Gorge (natural springs and riverside relaxation) and Ayusai Gorge",
        ru: "10:30–15:30 — Посещение ущелья Алма-Арасан (природные источники и отдых у реки) и ущелья Аюсай",
      },
      {
        en: "16:00–17:30 — Visit the Presidential Park",
        ru: "16:00–17:30 — Посещение Президентского парка",
      },
      { en: "Day 4", ru: "День 4" },
      {
        en: "10:30–15:30 — Visit Butakovka Gorge, a walk through the forest and along the river",
        ru: "10:30–15:30 — Посещение ущелья Бутаковка, прогулка по лесу и вдоль реки",
      },
      {
        en: "16:00–18:00 — Visit Lesnaya Skazka Mountain Resort (cable car, mountain views and entertainment)",
        ru: "16:00–18:00 — Посещение горного курорта «Лесная сказка» (канатная дорога, горные виды и развлечения)",
      },
      { en: "Day 5", ru: "День 5" },
      {
        en: "09:30–17:30 — Trip to Issyk Lake, with stops at trout farms and riverside recreation areas along the way",
        ru: "09:30–17:30 — Поездка на озеро Иссык с остановками у форелевых хозяйств и мест отдыха у реки",
      },
      { en: "Day 6", ru: "День 6" },
      {
        en: "Transfer to Almaty Airport according to the flight departure time",
        ru: "Трансфер в аэропорт Алматы согласно времени вылета",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$60 per person for a group of 16",
        ru: "$60 с человека при группе 16 человек",
      },
      {
        en: "$90 per person for a group of 8",
        ru: "$90 с человека при группе 8 человек",
      },
      {
        en: "$110 per person for a group of 3",
        ru: "$110 с человека при группе 3 человека",
      },
      { en: "Tours run every day", ru: "Туры проходят каждый день" },
    ],
  },
];
