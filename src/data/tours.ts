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
  {
    en: "Pickup from the meeting point",
    ru: "Трансфер от точки встречи",
    kz: "Кездесу орнынан алып кету",
    ar: "الاستلام من نقطة اللقاء",
  },
  {
    en: "Transportation",
    ru: "Транспорт",
    kz: "Көлік",
    ar: "النقل",
  },
  {
    en: "English-speaking guide",
    ru: "Англоговорящий гид",
    kz: "Ағылшын тілін білетін гид",
    ar: "مرشد يتحدث الإنجليزية",
  },
  {
    en: "Entrance tickets to all national parks",
    ru: "Входные билеты во все национальные парки",
    kz: "Барлық ұлттық парктерге кіру билеттері",
    ar: "تذاكر الدخول لجميع المتنزهات الوطنية",
  },
  {
    en: "Lunch box",
    ru: "Ланч-бокс",
    kz: "Тағамдар жинағы (ланч-бокс)",
    ar: "علبة غداء",
  },
  {
    en: "Bottled water",
    ru: "Питьевая вода",
    kz: "Бөтелкедегі су",
    ar: "مياه معبأة",
  },
];

const sharedExclusive: Localized<string>[] = [
  {
    en: "Horseback riding",
    ru: "Катание на лошадях",
    kz: "Атпен серуендеу",
    ar: "ركوب الخيل",
  },
  {
    en: "Taxi at certain locations",
    ru: "Такси в отдельных местах",
    kz: "Кейбір жерлерде такси",
    ar: "سيارات الأجرة في بعض المواقع",
  },
];

const sharedHikingFalconryAdditionalInfo: Localized<string>[] = [
  {
    en: "$60 per person — hiking route + falconry show",
    ru: "$60 с человека — пеший маршрут + шоу соколиной охоты",
    kz: "Адам басына $60 — жаяу жүру маршруты + сұңқар шоуы",
    ar: "60 دولارًا للشخص — مسار المشي + عرض الصقور",
  },
  {
    en: "$80 per person — car ride",
    ru: "$80 с человека — поездка на автомобиле",
    kz: "Адам басына $80 — көлікпен жүру",
    ar: "80 دولارًا للشخص — رحلة بالسيارة",
  },
  {
    en: "Tours run every day",
    ru: "Туры проходят каждый день",
    kz: "Турлар күн сайын өтеді",
    ar: "الجولات تُقام يوميًا",
  },
];

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: {
      en: "Kolsai, Kaindy & Moon Canyon",
      ru: "Кольсай, Каинды и Лунный каньон",
      kz: "Көлсай, Қайыңды және Ай каньоны",
      ar: "كولساي وكايندي ووادي القمر",
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
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "Moon Canyon, the mysterious sunken forest of Kaindy Lake, and the crystal-clear waters of Kolsai Lake — all in one unforgettable day. A scenic journey through Kazakhstan's mountains, with breathtaking landscapes, a local lunch and plenty of time to explore.",
      ru: "Лунный каньон, таинственный затопленный лес озера Каинды и кристально чистые воды озера Кольсай — всё это за один незабываемый день. Живописное путешествие по горам Казахстана с захватывающими пейзажами, местным обедом и достаточным временем на осмотр.",
      kz: "Ай каньоны, Қайыңды көлінің құпия суға батқан орманы және Көлсай көлінің мөлдір суы — бәрі бір ұмытылмас күнде. Қазақстан тауларымен көркем саяхат, тамсандыратын пейзаждар, жергілікті түскі ас және аралауға жеткілікті уақыт.",
      ar: "وادي القمر، الغابة الغارقة الغامضة في بحيرة كايندي، والمياه الصافية لبحيرة كولساي — كل ذلك في يوم واحد لا يُنسى. رحلة خلابة عبر جبال كازاخستان، بمناظر طبيعية رائعة وغداء محلي ووقت كافٍ للاستكشاف.",
    },
    timing: [
      {
        en: "5:00–5:30 — Guest pickup",
        ru: "5:00–5:30 — Встреча с гостями",
        kz: "5:00–5:30 — Қонақтарды алып кету",
        ar: "5:00–5:30 — استقبال الضيوف",
      },
      {
        en: "7:00–7:30 — Stop at a gas station (breakfast option)",
        ru: "7:00–7:30 — Остановка на заправке (можно позавтракать)",
        kz: "7:00–7:30 — Жанармай құю станциясында аялдама (таңғы ас мүмкіндігі)",
        ar: "7:00–7:30 — توقف عند محطة وقود (خيار الإفطار)",
      },
      {
        en: "8:30–10:00 — Moon Canyon",
        ru: "8:30–10:00 — Лунный каньон",
        kz: "8:30–10:00 — Ай каньоны",
        ar: "8:30–10:00 — وادي القمر",
      },
      {
        en: "11:00–13:30 — Kaindy Lake",
        ru: "11:00–13:30 — Озеро Каинды",
        kz: "11:00–13:30 — Қайыңды көлі",
        ar: "11:00–13:30 — بحيرة كايندي",
      },
      {
        en: "13:30–14:00 — Lunch",
        ru: "13:30–14:00 — Обед",
        kz: "13:30–14:00 — Түскі ас",
        ar: "13:30–14:00 — الغداء",
      },
      {
        en: "14:30–16:00 — Kolsai Lake",
        ru: "14:30–16:00 — Озеро Кольсай",
        kz: "14:30–16:00 — Көлсай көлі",
        ar: "14:30–16:00 — بحيرة كولساي",
      },
      {
        en: "18:00–18:30 — Stop at a gas station",
        ru: "18:00–18:30 — Остановка на заправке",
        kz: "18:00–18:30 — Жанармай құю станциясында аялдама",
        ar: "18:00–18:30 — توقف عند محطة وقود",
      },
      {
        en: "20:00–21:00 — Return to Almaty",
        ru: "20:00–21:00 — Возвращение в Алматы",
        kz: "20:00–21:00 — Алматыға оралу",
        ar: "20:00–21:00 — العودة إلى ألماتي",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$60 per person for a group of 16",
        ru: "$60 с человека при группе 16 человек",
        kz: "16 адамдық топ үшін адам басына $60",
        ar: "60 دولارًا للشخص لمجموعة من 16 شخصًا",
      },
      {
        en: "$90 per person for a group of 8",
        ru: "$90 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $90",
        ar: "90 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$110 per person for a group of 3",
        ru: "$110 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $110",
        ar: "110 دولارات للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "Tours run every day",
        ru: "Туры проходят каждый день",
        kz: "Турлар күн сайын өтеді",
        ar: "الجولات تُقام يوميًا",
      },
    ],
  },
  {
    id: "kolsai-kaindy-charyn-black-moon-2-day",
    title: {
      en: "Kolsai, Kaindy, Charyn, Black Canyon & Moon Canyon (2-Day Tour)",
      ru: "Кольсай, Каинды, Чарын, Чёрный каньон и Лунный каньон (тур на 2 дня)",
      kz: "Көлсай, Қайыңды, Шарын, Қара каньон және Ай каньоны (2 күндік тур)",
      ar: "كولساي وكايندي وتشارين والوادي الأسود ووادي القمر (جولة يومين)",
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
    badge: { en: "Mon, Wed, Fri", ru: "Пн, Ср, Пт", kz: "Дс, Ср, Жм", ar: "الإثنين، الأربعاء، الجمعة" },
    description: {
      en: "Moon Canyon, Black Canyon and the dramatic Charyn Canyon, turquoise Kolsai Lake and the sunken forest of Kaindy Lake — two days of Kazakhstan's most spectacular mountain landscapes, with cozy accommodation, local food and an unforgettable road trip through the wild.",
      ru: "Лунный каньон, Чёрный каньон и впечатляющий Чарынский каньон, бирюзовое озеро Кольсай и затопленный лес озера Каинды — два дня среди самых зрелищных горных пейзажей Казахстана, с уютным проживанием, местной кухней и незабываемой поездкой по дикой природе.",
      kz: "Ай каньоны, Қара каньон және әсерлі Шарын каньоны, көгілдір Көлсай көлі және Қайыңды көлінің суға батқан орманы — Қазақстанның ең тамаша тау пейзаждарын көретін екі күн, жайлы қонақүй, жергілікті тағамдар және дикі табиғат арқылы ұмытылмас жол сапары.",
      ar: "وادي القمر والوادي الأسود ووادي تشارين المهيب، بحيرة كولساي الفيروزية والغابة الغارقة في بحيرة كايندي — يومان من أروع المناظر الجبلية في كازاخستان، مع إقامة مريحة وطعام محلي ورحلة برية لا تُنسى عبر الطبيعة البرية.",
    },
    timing: [
      { en: "Day 1", ru: "День 1", kz: "Күн 1", ar: "اليوم 1" },
      {
        en: "7:00–7:30 — Guest pickup at the hotel",
        ru: "7:00–7:30 — Встреча гостей в отеле",
        kz: "7:00–7:30 — Қонақтарды қонақүйден алып кету",
        ar: "7:00–7:30 — استقبال الضيوف من الفندق",
      },
      {
        en: "8:00–8:30 — Stop at a gas station",
        ru: "8:00–8:30 — Остановка на заправке",
        kz: "8:00–8:30 — Жанармай құю станциясында аялдама",
        ar: "8:00–8:30 — توقف عند محطة وقود",
      },
      {
        en: "10:00–10:30 — Moon Canyon",
        ru: "10:00–10:30 — Лунный каньон",
        kz: "10:00–10:30 — Ай каньоны",
        ar: "10:00–10:30 — وادي القمر",
      },
      {
        en: "11:00–11:30 — Black Canyon",
        ru: "11:00–11:30 — Чёрный каньон",
        kz: "11:00–11:30 — Қара каньон",
        ar: "11:00–11:30 — الوادي الأسود",
      },
      {
        en: "12:30–13:30 — Lunch",
        ru: "12:30–13:30 — Обед",
        kz: "12:30–13:30 — Түскі ас",
        ar: "12:30–13:30 — الغداء",
      },
      {
        en: "14:00–18:00 — Kolsai Lake",
        ru: "14:00–18:00 — Озеро Кольсай",
        kz: "14:00–18:00 — Көлсай көлі",
        ar: "14:00–18:00 — بحيرة كولساي",
      },
      {
        en: "19:00–19:30 — Hotel check-in and dinner",
        ru: "19:00–19:30 — Заселение в отель и ужин",
        kz: "19:00–19:30 — Қонақүйге орналасу және кешкі ас",
        ar: "19:00–19:30 — تسجيل الوصول إلى الفندق والعشاء",
      },
      { en: "Day 2", ru: "День 2", kz: "Күн 2", ar: "اليوم 2" },
      {
        en: "7:00–7:30 — Breakfast",
        ru: "7:00–7:30 — Завтрак",
        kz: "7:00–7:30 — Таңғы ас",
        ar: "7:00–7:30 — الإفطار",
      },
      {
        en: "8:00–10:00 — Kaindy Lake",
        ru: "8:00–10:00 — Озеро Каинды",
        kz: "8:00–10:00 — Қайыңды көлі",
        ar: "8:00–10:00 — بحيرة كايندي",
      },
      {
        en: "11:30–12:00 — Lunch",
        ru: "11:30–12:00 — Обед",
        kz: "11:30–12:00 — Түскі ас",
        ar: "11:30–12:00 — الغداء",
      },
      {
        en: "13:30–16:30 — Charyn Canyon",
        ru: "13:30–16:30 — Чарынский каньон",
        kz: "13:30–16:30 — Шарын каньоны",
        ar: "13:30–16:30 — وادي تشارين",
      },
      {
        en: "18:00–19:00 — Return to Almaty",
        ru: "18:00–19:00 — Возвращение в Алматы",
        kz: "18:00–19:00 — Алматыға оралу",
        ar: "18:00–19:00 — العودة إلى ألماتي",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$110 per person — guest house (shared bathroom)",
        ru: "$110 с человека — гостевой дом (общая ванная)",
        kz: "Адам басына $110 — қонақ үй (ортақ санитарлық түйін)",
        ar: "110 دولارات للشخص — بيت ضيافة (حمام مشترك)",
      },
      {
        en: "$130 per person — guest house (private bathroom)",
        ru: "$130 с человека — гостевой дом (отдельная ванная)",
        kz: "Адам басына $130 — қонақ үй (жеке санитарлық түйін)",
        ar: "130 دولارًا للشخص — بيت ضيافة (حمام خاص)",
      },
      {
        en: "$150 per person — traditional house (yurt, shared bathroom)",
        ru: "$150 с человека — традиционный дом (юрта, общая ванная)",
        kz: "Адам басына $150 — дәстүрлі үй (киіз үй, ортақ санитарлық түйін)",
        ar: "150 دولارًا للشخص — منزل تقليدي (يورت، حمام مشترك)",
      },
      {
        en: "Tours run on Monday, Wednesday, and Friday",
        ru: "Туры проходят по понедельникам, средам и пятницам",
        kz: "Турлар дүйсенбі, сәрсенбі және жұма күндері өтеді",
        ar: "تُقام الجولات أيام الإثنين والأربعاء والجمعة",
      },
    ],
  },
  {
    id: "big-almaty-lake-falcon-show",
    title: {
      en: "Big Almaty Lake & Falcon Show",
      ru: "Большое Алматинское озеро и шоу соколиной охоты",
      kz: "Үлкен Алматы көлі және сұңқар шоуы",
      ar: "بحيرة ألماتي الكبرى وعرض الصقور",
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
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "Big Almaty Lake surrounded by the peaks of the Trans-Ili Alatau, followed by an impressive falconry show. A perfect day trip from Almaty combining breathtaking mountain scenery, fresh air, free time by the lake and a unique look into Kazakhstan's nomadic traditions.",
      ru: "Большое Алматинское озеро в окружении вершин Заилийского Алатау, а затем впечатляющее шоу соколиной охоты. Идеальная однодневная поездка из Алматы, сочетающая захватывающие горные пейзажи, свежий воздух, свободное время у озера и уникальное знакомство с кочевыми традициями Казахстана.",
      kz: "Іле Алатауының шыңдарымен қоршалған Үлкен Алматы көлі, содан кейін әсерлі сұңқар шоуы. Алматыдан керемет бір күндік сапар — тамсандыратын тау пейзаждары, таза ауа, көл жағасында бос уақыт және Қазақстанның көшпелі дәстүрлерімен таныстыратын ерекше сәт.",
      ar: "بحيرة ألماتي الكبرى المحاطة بقمم جبال ترانس إيلي ألاتاو، يليها عرض مذهل للصقور. رحلة يومية مثالية من ألماتي تجمع بين المناظر الجبلية الخلابة والهواء النقي ووقت الفراغ بجانب البحيرة ونظرة فريدة على التقاليد البدوية لكازاخستان.",
    },
    timing: [
      {
        en: "7:00 — Guest pickup at the hotel",
        ru: "7:00 — Встреча гостей в отеле",
        kz: "7:00 — Қонақтарды қонақүйден алып кету",
        ar: "7:00 — استقبال الضيوف من الفندق",
      },
      {
        en: "10:00 — Arrival at Big Almaty Lake",
        ru: "10:00 — Прибытие на Большое Алматинское озеро",
        kz: "10:00 — Үлкен Алматы көліне келу",
        ar: "10:00 — الوصول إلى بحيرة ألماتي الكبرى",
      },
      {
        en: "10:00–14:00 — Free time at Big Almaty Lake",
        ru: "10:00–14:00 — Свободное время на озере",
        kz: "10:00–14:00 — Үлкен Алматы көлінде бос уақыт",
        ar: "10:00–14:00 — وقت حر عند بحيرة ألماتي الكبرى",
      },
      {
        en: "15:00 — Arrival at the hotel parking lot",
        ru: "15:00 — Прибытие на парковку отеля",
        kz: "15:00 — Қонақүй тұрағына келу",
        ar: "15:00 — الوصول إلى موقف سيارات الفندق",
      },
      {
        en: "16:00–16:40 — Falconry show",
        ru: "16:00–16:40 — Шоу соколиной охоты",
        kz: "16:00–16:40 — Сұңқар шоуы",
        ar: "16:00–16:40 — عرض الصقور",
      },
      {
        en: "17:30 — Return to Almaty",
        ru: "17:30 — Возвращение в Алматы",
        kz: "17:30 — Алматыға оралу",
        ar: "17:30 — العودة إلى ألماتي",
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
      kz: "Ой-Қарағай тау курорты",
      ar: "منتجع أوي كاراغاي الجبلي",
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
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "A three-day escape to Oi-Qaragai Mountain Resort, surrounded by forests and mountain landscapes. Slow mornings, cozy accommodation and a huge choice of activities — hiking, horseback riding, ziplining, golf, archery, climbing and spa time. The perfect mix of adventure and complete relaxation just outside Almaty.",
      ru: "Трёхдневный отдых на горном курорте Ой-Карагай среди лесов и горных пейзажей. Неспешные утра, уютное проживание и огромный выбор активностей — пешие прогулки, катание на лошадях, зиплайн, гольф, стрельба из лука, скалолазание и спа. Идеальное сочетание приключений и полного расслабления совсем рядом с Алматы.",
      kz: "Ормандар мен тау пейзаждарымен қоршалған Ой-Қарағай тау курортына үш күндік сапар. Асықпайтын таңдар, жайлы қонақүй және көптеген белсенділік түрлері — жаяу серуендеу, атпен жүру, зиплайн, гольф, садақ ату, скалолазание және спа. Алматыдан алыс емес жерде шытырман оқиға мен толық демалыстың тамаша үйлесімі.",
      ar: "هروب لمدة ثلاثة أيام إلى منتجع أوي كاراغاي الجبلي، المحاط بالغابات والمناظر الجبلية. صباحات هادئة، إقامة مريحة، ومجموعة كبيرة من الأنشطة — المشي لمسافات طويلة، ركوب الخيل، التزلج على الحبال، الغولف، الرماية، التسلق ووقت السبا. المزيج المثالي من المغامرة والاسترخاء الكامل بالقرب من ألماتي.",
    },
    timing: [
      { en: "Day 1", ru: "День 1", kz: "Күн 1", ar: "اليوم 1" },
      {
        en: "12:30 — Guest pickup",
        ru: "12:30 — Встреча гостей",
        kz: "12:30 — Қонақтарды алып кету",
        ar: "12:30 — استقبال الضيوف",
      },
      {
        en: "14:00–14:30 — Arrival at Oi-Qaragai mountain resort",
        ru: "14:00–14:30 — Прибытие на курорт Ой-Карагай",
        kz: "14:00–14:30 — Ой-Қарағай тау курортына келу",
        ar: "14:00–14:30 — الوصول إلى منتجع أوي كاراغاي الجبلي",
      },
      {
        en: "14:30–15:00 — Check-in",
        ru: "14:30–15:00 — Заселение",
        kz: "14:30–15:00 — Орналасу",
        ar: "14:30–15:00 — تسجيل الوصول",
      },
      {
        en: "15:00 — Free time",
        ru: "15:00 — Свободное время",
        kz: "15:00 — Бос уақыт",
        ar: "15:00 — وقت حر",
      },
      { en: "Day 2", ru: "День 2", kz: "Күн 2", ar: "اليوم 2" },
      {
        en: "7:00–7:30 — Breakfast at the resort",
        ru: "7:00–7:30 — Завтрак на курорте",
        kz: "7:00–7:30 — Курортта таңғы ас",
        ar: "7:00–7:30 — الإفطار في المنتجع",
      },
      {
        en: "8:00 — Free time — enjoy the resort's activities:",
        ru: "8:00 — Свободное время — активности курорта:",
        kz: "8:00 — Бос уақыт — курорт белсенділіктерін пайдаланыңыз:",
        ar: "8:00 — وقت حر — استمتع بأنشطة المنتجع:",
      },
      { en: "Paintball", ru: "Пейнтбол", kz: "Пейнтбол", ar: "بينتبول" },
      {
        en: "Hiking",
        ru: "Пешие прогулки",
        kz: "Жаяу серуендеу",
        ar: "المشي لمسافات طويلة",
      },
      {
        en: "Mountain golf",
        ru: "Горный гольф",
        kz: "Тау гольфі",
        ar: "غولف الجبال",
      },
      {
        en: "Archery",
        ru: "Стрельба из лука",
        kz: "Садақ ату",
        ar: "الرماية بالقوس",
      },
      {
        en: "Rope park",
        ru: "Верёвочный парк",
        kz: "Арқан паркі",
        ar: "منتزه الحبال",
      },
      {
        en: "Climbing park",
        ru: "Скалодром",
        kz: "Скалодром",
        ar: "منتزه التسلق",
      },
      { en: "Zipline", ru: "Зиплайн", kz: "Зиплайн", ar: "التزلج على الحبال" },
      {
        en: "Horseback riding",
        ru: "Катание на лошадях",
        kz: "Атпен серуендеу",
        ar: "ركوب الخيل",
      },
      { en: "Spa", ru: "Спа", kz: "Спа", ar: "سبا" },
      { en: "Day 3", ru: "День 3", kz: "Күн 3", ar: "اليوم 3" },
      {
        en: "7:00–7:30 — Breakfast at the resort",
        ru: "7:00–7:30 — Завтрак на курорте",
        kz: "7:00–7:30 — Курортта таңғы ас",
        ar: "7:00–7:30 — الإفطار في المنتجع",
      },
      {
        en: "7:30–11:30 — Free time",
        ru: "7:30–11:30 — Свободное время",
        kz: "7:30–11:30 — Бос уақыт",
        ar: "7:30–11:30 — وقت حر",
      },
      {
        en: "11:30–12:00 — Check-out",
        ru: "11:30–12:00 — Выезд",
        kz: "11:30–12:00 — Кету",
        ar: "11:30–12:00 — تسجيل المغادرة",
      },
      {
        en: "13:30–14:00 — Return to Almaty",
        ru: "13:30–14:00 — Возвращение в Алматы",
        kz: "13:30–14:00 — Алматыға оралу",
        ar: "13:30–14:00 — العودة إلى ألماتي",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: sharedHikingFalconryAdditionalInfo,
  },
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
  {
    id: "tour-package",
    title: {
      en: "Tour Package",
      ru: "Тур-пакет",
      kz: "Тур-пакет",
      ar: "باقة الجولات",
    },
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
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "A 6-day journey through Almaty's mountains and lakes — Shymbulak ski resort, Kolsai Lake, Alma-Arasan and Ayusai gorges, Butakovka gorge, the Lesnaya Skazka mountain resort and Issyk Lake. Scenic hikes, riverside stops and breathtaking views every day.",
      ru: "6-дневное путешествие по горам и озёрам Алматы — горнолыжный курорт Шымбулак, озеро Кольсай, ущелья Алма-Арасан и Аюсай, ущелье Бутаковка, горный курорт «Лесная сказка» и озеро Иссык. Живописные прогулки, остановки у рек и захватывающие виды каждый день.",
      kz: "Алматының таулары мен көлдері арқылы 6 күндік саяхат — Шымбұлақ тау-шаңғы курорты, Көлсай көлі, Алма-Арасан және Аюсай шатқалдары, Бутаковка шатқалы, «Лесная сказка» тау курорты және Есік көлі. Күн сайын көркем серуендер, өзен жағасындағы аялдамалар және тамсандыратын көріністер.",
      ar: "رحلة لمدة 6 أيام عبر جبال وبحيرات ألماتي — منتجع شيمبولاك للتزلج، بحيرة كولساي، وادي ألما-أراسان وأيوساي، وادي بوتاكوفكا، منتجع ليسنايا سكازكا الجبلي وبحيرة إيسيك. مسارات مشي خلابة وتوقفات على ضفاف الأنهار ومناظر رائعة كل يوم.",
    },
    timing: [
      { en: "Day 1", ru: "День 1", kz: "Күн 1", ar: "اليوم 1" },
      {
        en: "11:00–15:30 — Visit Shymbulak Mountain Resort (3 cable car stations), enjoy the mountain views and snowy scenery",
        ru: "11:00–15:30 — Посещение горнолыжного курорта Шымбулак (3 очереди канатной дороги), горные и снежные пейзажи",
        kz: "11:00–15:30 — Шымбұлақ тау курортына бару (3 канат жол станциясы), тау және қар көрінісін тамашалау",
        ar: "11:00–15:30 — زيارة منتجع شيمبولاك الجبلي (3 محطات تلفريك)، الاستمتاع بالمناظر الجبلية والثلجية",
      },
      {
        en: "16:30–17:30 — Visit Panfilov Park and the Memorial of Glory",
        ru: "16:30–17:30 — Посещение парка Панфилова и Мемориала Славы",
        kz: "16:30–17:30 — Панфилов паркі мен Даңқ мемориалына бару",
        ar: "16:30–17:30 — زيارة حديقة بانفيلوف ونصب المجد التذكاري",
      },
      { en: "Day 2", ru: "День 2", kz: "Күн 2", ar: "اليوم 2" },
      {
        en: "09:00–18:00 — Trip to Kolsai Lake, enjoy the breathtaking natural scenery and relax by the lake",
        ru: "09:00–18:00 — Поездка на озеро Кольсай, потрясающая природа и отдых у озера",
        kz: "09:00–18:00 — Көлсай көліне сапар, тамсандыратын табиғи көріністі тамашалау және көл жағасында демалу",
        ar: "09:00–18:00 — رحلة إلى بحيرة كولساي، الاستمتاع بالمناظر الطبيعية الخلابة والاسترخاء بجانب البحيرة",
      },
      { en: "Day 3", ru: "День 3", kz: "Күн 3", ar: "اليوم 3" },
      {
        en: "10:30–15:30 — Visit Alma-Arasan Gorge (natural springs and riverside relaxation) and Ayusai Gorge",
        ru: "10:30–15:30 — Посещение ущелья Алма-Арасан (природные источники и отдых у реки) и ущелья Аюсай",
        kz: "10:30–15:30 — Алма-Арасан шатқалына (табиғи бұлақтар және өзен жағасында демалу) және Аюсай шатқалына бару",
        ar: "10:30–15:30 — زيارة وادي ألما-أراسان (ينابيع طبيعية واسترخاء على ضفاف النهر) ووادي أيوساي",
      },
      {
        en: "16:00–17:30 — Visit the Presidential Park",
        ru: "16:00–17:30 — Посещение Президентского парка",
        kz: "16:00–17:30 — Президент паркіне бару",
        ar: "16:00–17:30 — زيارة الحديقة الرئاسية",
      },
      { en: "Day 4", ru: "День 4", kz: "Күн 4", ar: "اليوم 4" },
      {
        en: "10:30–15:30 — Visit Butakovka Gorge, a walk through the forest and along the river",
        ru: "10:30–15:30 — Посещение ущелья Бутаковка, прогулка по лесу и вдоль реки",
        kz: "10:30–15:30 — Бутаковка шатқалына бару, орман мен өзен бойымен серуендеу",
        ar: "10:30–15:30 — زيارة وادي بوتاكوفكا، المشي عبر الغابة وعلى طول النهر",
      },
      {
        en: "16:00–18:00 — Visit Lesnaya Skazka Mountain Resort (cable car, mountain views and entertainment)",
        ru: "16:00–18:00 — Посещение горного курорта «Лесная сказка» (канатная дорога, горные виды и развлечения)",
        kz: "16:00–18:00 — «Лесная сказка» тау курортына бару (канат жол, тау көрінісі және ойын-сауық)",
        ar: "16:00–18:00 — زيارة منتجع ليسنايا سكازكا الجبلي (تلفريك، إطلالات جبلية وترفيه)",
      },
      { en: "Day 5", ru: "День 5", kz: "Күн 5", ar: "اليوم 5" },
      {
        en: "09:30–17:30 — Trip to Issyk Lake, with stops at trout farms and riverside recreation areas along the way",
        ru: "09:30–17:30 — Поездка на озеро Иссык с остановками у форелевых хозяйств и мест отдыха у реки",
        kz: "09:30–17:30 — Есік көліне сапар, жолда алабұға фермалары мен өзен жағасындағы демалыс аймақтарында аялдамалармен",
        ar: "09:30–17:30 — رحلة إلى بحيرة إيسيك، مع توقفات عند مزارع تربية الأسماك ومناطق الاستجمام على ضفاف النهر على طول الطريق",
      },
      { en: "Day 6", ru: "День 6", kz: "Күн 6", ar: "اليوم 6" },
      {
        en: "Transfer to Almaty Airport according to the flight departure time",
        ru: "Трансфер в аэропорт Алматы согласно времени вылета",
        kz: "Ұшу уақытына сай Алматы әуежайына трансфер",
        ar: "النقل إلى مطار ألماتي حسب موعد إقلاع الرحلة",
      },
    ],
    inclusive: sharedInclusive,
    exclusive: sharedExclusive,
    additionalInfo: [
      {
        en: "$60 per person for a group of 16",
        ru: "$60 с человека при группе 16 человек",
        kz: "16 адамдық топ үшін адам басына $60",
        ar: "60 دولارًا للشخص لمجموعة من 16 شخصًا",
      },
      {
        en: "$90 per person for a group of 8",
        ru: "$90 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $90",
        ar: "90 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$110 per person for a group of 3",
        ru: "$110 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $110",
        ar: "110 دولارات للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "Tours run every day",
        ru: "Туры проходят каждый день",
        kz: "Турлар күн сайын өтеді",
        ar: "الجولات تُقام يوميًا",
      },
    ],
  },
];
