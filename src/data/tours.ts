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
  /** Display price, formatted exactly as it should appear (e.g. "$60" or "from $60"). Only the wrapping word ("from"/"от"/...) is translated — the number stays identical across locales. */
  price: Localized<string>;
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

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: {
      en: "Kolsai, Kaindy & Moon Canyon",
      ru: "Кольсай, Каинды и Лунный каньон",
      kz: "Көлсай, Қайыңды және Ай каньоны",
      ar: "كولساي وكايندي ووادي القمر",
    },
    price: { en: "from $67", ru: "от $67", kz: "$67-ден бастап", ar: "ابتداءً من $67" },
    images: [
      {
        src: "/tours/kolsai-kaindy-moon-canyon.webp",
        alt: "Kolsai Lake winding through a pine-forested valley",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Kaindy Lake's sunken forest of dead trees rising from turquoise water",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "Moon Canyon's layered orange and gold rock formations",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "Moon Canyon's otherworldly rock formations, the eerie sunken forest of Kaindy Lake and the turquoise waters of Kolsai Lake — three of Kazakhstan's most iconic landscapes in one scenic day trip through the Tien Shan foothills, with a packed lunch along the way.",
      ru: "Причудливые скальные формации Лунного каньона, загадочный затопленный лес озера Каинды и бирюзовые воды озера Кольсай — три самых узнаваемых пейзажа Казахстана за один день в предгорьях Тянь-Шаня, с обедом в дороге.",
      kz: "Ай каньонының ғажайып тас түзілімдері, Қайыңды көлінің құпия суға батқан орманы және Көлсай көлінің көгілдір суы — Тянь-Шань етегіндегі бір күндік көрікті сапарда Қазақстанның ең танымал үш пейзажы, жолда түскі аспен қоса.",
      ar: "التشكيلات الصخرية الخلابة لوادي القمر، والغابة الغامضة الغارقة في بحيرة كايندي، والمياه الفيروزية لبحيرة كولساي — ثلاثة من أبرز المناظر الطبيعية في كازاخستان في رحلة يوم واحد عبر سفوح تيان شان، مع وجبة غداء معبأة على الطريق.",
    },
    timing: [
      {
        en: "6:00 — Meeting at the hotel",
        ru: "6:00 — Встреча в отеле",
        kz: "6:00 — Қонақүйде кездесу",
        ar: "6:00 — اللقاء في الفندق",
      },
      {
        en: "6:30–12:00 — Transfer to Kolsai",
        ru: "6:30–12:00 — Трансфер до Кольсая",
        kz: "6:30–12:00 — Көлсайға трансфер",
        ar: "6:30–12:00 — النقل إلى كولساي",
      },
      {
        en: "12:00–13:00 — Walking around Kolsai Lakes",
        ru: "12:00–13:00 — Прогулка вокруг озёр Кольсай",
        kz: "12:00–13:00 — Көлсай көлдерінің айналасында серуендеу",
        ar: "12:00–13:00 — التجول حول بحيرات كولساي",
      },
      {
        en: "13:00–14:00 — Packed lunch",
        ru: "13:00–14:00 — Обед (ланч-бокс)",
        kz: "13:00–14:00 — Түскі ас (ланч-бокс)",
        ar: "13:00–14:00 — وجبة غداء معبأة",
      },
      {
        en: "14:00–14:30 — Transfer to Kaindy Lake",
        ru: "14:00–14:30 — Трансфер до озера Каинды",
        kz: "14:00–14:30 — Қайыңды көліне трансфер",
        ar: "14:00–14:30 — النقل إلى بحيرة كايندي",
      },
      {
        en: "14:30–15:30 — Walking around Kaindy",
        ru: "14:30–15:30 — Прогулка вокруг Каинды",
        kz: "14:30–15:30 — Қайыңды айналасында серуендеу",
        ar: "14:30–15:30 — التجول حول كايندي",
      },
      {
        en: "15:30–16:30 — Transfer to Moon Canyon",
        ru: "15:30–16:30 — Трансфер до Лунного каньона",
        kz: "15:30–16:30 — Ай каньонына трансфер",
        ar: "15:30–16:30 — النقل إلى وادي القمر",
      },
      {
        en: "16:30–17:00 — Photo stop at Moon Canyon",
        ru: "16:30–17:00 — Фотоостановка в Лунном каньоне",
        kz: "16:30–17:00 — Ай каньонында фотосурет үшін аялдама",
        ar: "16:30–17:00 — توقف للتصوير في وادي القمر",
      },
      {
        en: "17:00–22:00 — Transfer to the city",
        ru: "17:00–22:00 — Трансфер в город",
        kz: "17:00–22:00 — Қалаға трансфер",
        ar: "17:00–22:00 — النقل إلى المدينة",
      },
      {
        en: "22:30 — Transfer to the hotel",
        ru: "22:30 — Трансфер в отель",
        kz: "22:30 — Қонақүйге трансфер",
        ar: "22:30 — النقل إلى الفندق",
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
        en: "Visit to Kolsai Lake",
        ru: "Посещение озера Кольсай",
        kz: "Көлсай көліне бару",
        ar: "زيارة بحيرة كولساي",
      },
      {
        en: "Visit to Kaindy Lake",
        ru: "Посещение озера Каинды",
        kz: "Қайыңды көліне бару",
        ar: "زيارة بحيرة كايندي",
      },
      {
        en: "National Park entrance fees",
        ru: "Входные билеты в национальный парк",
        kz: "Ұлттық паркке кіру билеттері",
        ar: "رسوم دخول المتنزه الوطني",
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
      {
        en: "Packed lunch",
        ru: "Ланч-бокс",
        kz: "Ланч-бокс",
        ar: "وجبة غداء معبأة",
      },
    ],
    exclusive: [],
    additionalInfo: [
      {
        en: "$358 per person for a group of 1",
        ru: "$358 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $358",
        ar: "358 دولارًا للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$212 per person for a group of 2",
        ru: "$212 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $212",
        ar: "212 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$157 per person for a group of 3",
        ru: "$157 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $157",
        ar: "157 دولارًا للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$154 per person for a group of 4",
        ru: "$154 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $154",
        ar: "154 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$126 per person for a group of 5",
        ru: "$126 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $126",
        ar: "126 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$114 per person for a group of 6",
        ru: "$114 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $114",
        ar: "114 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$96 per person for a group of 7",
        ru: "$96 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $96",
        ar: "96 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$90 per person for a group of 8",
        ru: "$90 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $90",
        ar: "90 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$85 per person for a group of 9",
        ru: "$85 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $85",
        ar: "85 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$90 per person for a group of 10",
        ru: "$90 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $90",
        ar: "90 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$70 per person for a group of 15",
        ru: "$70 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $70",
        ar: "70 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$67 per person for a group of 20",
        ru: "$67 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $67",
        ar: "67 دولارًا للشخص لمجموعة من 20 شخصًا",
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
    id: "big-almaty-lake-falcon-show",
    title: {
      en: "Big Almaty Lake & Falcon Show",
      ru: "Большое Алматинское озеро и шоу соколиной охоты",
      kz: "Үлкен Алматы көлі және сұңқар шоуы",
      ar: "بحيرة ألماتي الكبرى وعرض الصقور",
    },
    price: { en: "from $77", ru: "от $77", kz: "$77-ден бастап", ar: "ابتداءً من $77" },
    images: [
      {
        src: "/tours/big-almaty-lake-falcon-show.webp",
        alt: "Big Almaty Lake's turquoise water surrounded by snow-capped peaks",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "The turquoise waters of Big Almaty Lake framed by the snow-capped peaks of the Trans-Ili Alatau, followed by a falconry show featuring golden eagles, falcons and owls in a display of Kazakhstan's ancient hunting tradition.",
      ru: "Бирюзовые воды Большого Алматинского озера на фоне заснеженных вершин Заилийского Алатау, а затем шоу соколиной охоты с беркутами, соколами и филинами — демонстрация древней казахской охотничьей традиции.",
      kz: "Іле Алатауының қарлы шыңдарын аясында Үлкен Алматы көлінің көгілдір суы, содан кейін бүркіт, сұңқар және үкілермен өтетін сұңқар шоуы — Қазақстанның ежелгі аңшылық дәстүрінің көрінісі.",
      ar: "المياه الفيروزية لبحيرة ألماتي الكبرى المحاطة بقمم جبال ترانس إيلي ألاتاو المكسوة بالثلوج، يليها عرض للصقور يضم النسور الذهبية والصقور والبوم — استعراض لتقليد الصيد الكازاخستاني القديم.",
    },
    timing: [
      {
        en: "11:00 — Meeting at the hotel",
        ru: "11:00 — Встреча в отеле",
        kz: "11:00 — Қонақүйде кездесу",
        ar: "11:00 — اللقاء في الفندق",
      },
      {
        en: "11:30–12:00 — Transfer to Alma-Arasan Gorge",
        ru: "11:30–12:00 — Трансфер до ущелья Алма-Арасан",
        kz: "11:30–12:00 — Алма-Арасан шатқалына трансфер",
        ar: "11:30–12:00 — النقل إلى وادي ألما-أراسان",
      },
      {
        en: "12:00–13:00 — Transfer to Big Almaty Lake",
        ru: "12:00–13:00 — Трансфер до Большого Алматинского озера",
        kz: "12:00–13:00 — Үлкен Алматы көліне трансфер",
        ar: "12:00–13:00 — النقل إلى بحيرة ألماتي الكبرى",
      },
      {
        en: "13:00–14:30 — Walking around Big Almaty Lake",
        ru: "13:00–14:30 — Прогулка вокруг Большого Алматинского озера",
        kz: "13:00–14:30 — Үлкен Алматы көлінің айналасында серуендеу",
        ar: "13:00–14:30 — التجول حول بحيرة ألماتي الكبرى",
      },
      {
        en: "14:30–15:30 — Transfer to Falcon Show",
        ru: "14:30–15:30 — Трансфер до шоу соколиной охоты",
        kz: "14:30–15:30 — Сұңқар шоуына трансфер",
        ar: "14:30–15:30 — النقل إلى عرض الصقور",
      },
      {
        en: "16:00–17:00 — Falconry show",
        ru: "16:00–17:00 — Шоу соколиной охоты",
        kz: "16:00–17:00 — Сұңқар шоуы",
        ar: "16:00–17:00 — عرض الصقور",
      },
      {
        en: "17:00–17:30 — Transfer to the hotel",
        ru: "17:00–17:30 — Трансфер в отель",
        kz: "17:00–17:30 — Қонақүйге трансфер",
        ar: "17:00–17:30 — النقل إلى الفندق",
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
        en: "Entrance tickets according to the program",
        ru: "Входные билеты согласно программе",
        kz: "Бағдарламаға сәйкес кіру билеттері",
        ar: "تذاكر الدخول وفقًا للبرنامج",
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
        en: "$275 per person for a group of 1",
        ru: "$275 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $275",
        ar: "275 دولارًا للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$166 per person for a group of 2",
        ru: "$166 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $166",
        ar: "166 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$123 per person for a group of 3",
        ru: "$123 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $123",
        ar: "123 دولارًا للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$159 per person for a group of 4",
        ru: "$159 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $159",
        ar: "159 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$129 per person for a group of 5",
        ru: "$129 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $129",
        ar: "129 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$130 per person for a group of 6",
        ru: "$130 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $130",
        ar: "130 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$108 per person for a group of 7",
        ru: "$108 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $108",
        ar: "108 دولارات للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$99 per person for a group of 8",
        ru: "$99 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $99",
        ar: "99 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$92 per person for a group of 9",
        ru: "$92 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $92",
        ar: "92 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$99 per person for a group of 10",
        ru: "$99 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $99",
        ar: "99 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$77 per person for a group of 15",
        ru: "$77 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $77",
        ar: "77 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$96 per person for a group of 20",
        ru: "$96 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $96",
        ar: "96 دولارًا للشخص لمجموعة من 20 شخصًا",
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
    id: "alma-arasan-falcon-show",
    title: {
      en: "Alma-Arasan Gorge & Falcon Show",
      ru: "Ущелье Алма-Арасан и шоу соколиной охоты",
      kz: "Алма-Арасан шатқалы және сұңқар шоуы",
      ar: "وادي ألما-أراسان وعرض الصقور",
    },
    price: { en: "from $50", ru: "от $50", kz: "$50-ден бастап", ar: "ابتداءً من $50" },
    images: [
      {
        src: "/tours/alma-arasan-falcon-show.webp",
        alt: "Alma-Arasan's modern wooden visitor building set against forested mountains",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "The authentic mountain atmosphere of Alma-Arasan Gorge — scenic trails, a rushing river and dense coniferous forest — followed by a falconry show featuring golden eagles and falcons and the ancient Kazakh art of sayatshylyk.",
      ru: "Настоящая горная атмосфера ущелья Алма-Арасан — живописные тропы, шумная горная река и густой хвойный лес — а затем шоу соколиной охоты с беркутами и соколами, знакомящее с древним казахским искусством охоты с птицами.",
      kz: "Алма-Арасан шатқалының нағыз тау атмосферасы — көркем соқпақтар, сарқырама тау өзені және қалың қылқан жапырақты орман — содан кейін бүркіт пен сұңқарлармен өтетін, ежелгі қазақтың құспен аңшылық өнерімен таныстыратын сұңқар шоуы.",
      ar: "الأجواء الجبلية الأصيلة لوادي ألما-أراسان — مسارات خلابة ونهر جبلي متدفق وغابة صنوبرية كثيفة — يليها عرض للصقور يضم النسور الذهبية والصقور، تعريفًا بفن الصيد الكازاخستاني القديم بالطيور الجارحة.",
    },
    timing: [
      {
        en: "11:00 — Meeting at the hotel",
        ru: "11:00 — Встреча в отеле",
        kz: "11:00 — Қонақүйде кездесу",
        ar: "11:00 — اللقاء في الفندق",
      },
      {
        en: "11:30–12:00 — Transfer to Alma-Arasan Gorge",
        ru: "11:30–12:00 — Трансфер до ущелья Алма-Арасан",
        kz: "11:30–12:00 — Алма-Арасан шатқалына трансфер",
        ar: "11:30–12:00 — النقل إلى وادي ألما-أراسان",
      },
      {
        en: "12:00–15:00 — Walking in the Alma-Arasan area",
        ru: "12:00–15:00 — Прогулка по Алма-Арасану",
        kz: "12:00–15:00 — Алма-Арасан аймағында серуендеу",
        ar: "12:00–15:00 — التجول في منطقة ألما-أراسان",
      },
      {
        en: "15:00–15:30 — Transfer to Falcon Show",
        ru: "15:00–15:30 — Трансфер до шоу соколиной охоты",
        kz: "15:00–15:30 — Сұңқар шоуына трансфер",
        ar: "15:00–15:30 — النقل إلى عرض الصقور",
      },
      {
        en: "16:00–17:00 — Falconry show",
        ru: "16:00–17:00 — Шоу соколиной охоты",
        kz: "16:00–17:00 — Сұңқар шоуы",
        ar: "16:00–17:00 — عرض الصقور",
      },
      {
        en: "17:00–17:30 — Transfer to the hotel",
        ru: "17:00–17:30 — Трансфер в отель",
        kz: "17:00–17:30 — Қонақүйге трансфер",
        ar: "17:00–17:30 — النقل إلى الفندق",
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
        en: "Entrance tickets according to the program",
        ru: "Входные билеты согласно программе",
        kz: "Бағдарламаға сәйкес кіру билеттері",
        ar: "تذاكر الدخول وفقًا للبرنامج",
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
        en: "$184 per person for a group of 1",
        ru: "$184 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $184",
        ar: "184 دولارًا للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$120 per person for a group of 2",
        ru: "$120 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $120",
        ar: "120 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$93 per person for a group of 3",
        ru: "$93 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $93",
        ar: "93 دولارًا للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$113 per person for a group of 4",
        ru: "$113 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $113",
        ar: "113 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$92 per person for a group of 5",
        ru: "$92 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $92",
        ar: "92 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$85 per person for a group of 6",
        ru: "$85 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $85",
        ar: "85 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$69 per person for a group of 7",
        ru: "$69 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $69",
        ar: "69 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$65 per person for a group of 8",
        ru: "$65 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $65",
        ar: "65 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$62 per person for a group of 9",
        ru: "$62 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $62",
        ar: "62 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$67 per person for a group of 10",
        ru: "$67 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $67",
        ar: "67 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$52 per person for a group of 15",
        ru: "$52 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $52",
        ar: "52 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$50 per person for a group of 20",
        ru: "$50 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $50",
        ar: "50 دولارًا للشخص لمجموعة من 20 شخصًا",
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
    id: "shymbulak",
    title: {
      en: "Shymbulak",
      ru: "Шымбулак",
      kz: "Шымбұлақ",
      ar: "شيمبولاك",
    },
    price: { en: "from $57", ru: "от $57", kz: "$57-ден бастап", ar: "ابتداءً من $57" },
    images: [
      {
        src: "/tours/shymbulak.webp",
        alt: "Cable car gondolas over pine forest slopes at Shymbulak",
      },
      {
        src: "/tours/shymbulak-2.webp",
        alt: "Chairlift ascending toward snow-capped peaks at Shymbulak",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "A cable car ride up to Shymbulak, soaring above pine forests and mountain slopes for a breathtaking panorama of the Trans-Ili Alatau — cool mountain air and unforgettable views of Almaty from above.",
      ru: "Подъём на канатной дороге на Шымбулак над сосновыми лесами и горными склонами — захватывающая панорама Заилийского Алатау, свежий горный воздух и незабываемые виды на Алматы с высоты.",
      kz: "Шымбұлаққа қылқан жапырақты ормандар мен тау беткейлерінің үстінен өтетін канат жолмен көтерілу — Іле Алатауының тамсандыратын панорамасы, таза тау ауасы және Алматының биіктен көрінісі.",
      ar: "رحلة بالتلفريك صعودًا إلى شيمبولاك، محلقًا فوق الغابات الصنوبرية والمنحدرات الجبلية للاستمتاع بإطلالة بانورامية خلابة على جبال ترانس إيلي ألاتاو — هواء جبلي منعش وإطلالات لا تُنسى على ألماتي من الأعلى.",
    },
    timing: [
      {
        en: "10:00 — Meeting at the hotel",
        ru: "10:00 — Встреча в отеле",
        kz: "10:00 — Қонақүйде кездесу",
        ar: "10:00 — اللقاء في الفندق",
      },
      {
        en: "10:30–11:00 — Transfer to Shymbulak",
        ru: "10:30–11:00 — Трансфер до Шымбулака",
        kz: "10:30–11:00 — Шымбұлаққа трансфер",
        ar: "10:30–11:00 — النقل إلى شيمبولاك",
      },
      {
        en: "11:00–12:00 — Cable car to Shymbulak Resort (3rd level)",
        ru: "11:00–12:00 — Канатная дорога до 3-й очереди курорта Шымбулак",
        kz: "11:00–12:00 — Шымбұлақ курортының 3-ші кезеңіне канат жол",
        ar: "11:00–12:00 — التلفريك إلى المستوى الثالث من منتجع شيمبولاك",
      },
      {
        en: "12:00–13:30 — Walking around Shymbulak",
        ru: "12:00–13:30 — Прогулка по Шымбулаку",
        kz: "12:00–13:30 — Шымбұлақта серуендеу",
        ar: "12:00–13:30 — التجول في شيمبولاك",
      },
      {
        en: "13:30–14:30 — Cable car to parking",
        ru: "13:30–14:30 — Канатная дорога до парковки",
        kz: "13:30–14:30 — Тұраққа канат жол",
        ar: "13:30–14:30 — التلفريك إلى موقف السيارات",
      },
      {
        en: "14:30–15:00 — Transfer to the hotel",
        ru: "14:30–15:00 — Трансфер в отель",
        kz: "14:30–15:00 — Қонақүйге трансфер",
        ar: "14:30–15:00 — النقل إلى الفندق",
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
        en: "Entrance tickets according to the program",
        ru: "Входные билеты согласно программе",
        kz: "Бағдарламаға сәйкес кіру билеттері",
        ar: "تذاكر الدخول وفقًا للبرنامج",
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
        en: "$206 per person for a group of 1",
        ru: "$206 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $206",
        ar: "206 دولارات للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$137 per person for a group of 2",
        ru: "$137 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $137",
        ar: "137 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$107 per person for a group of 3",
        ru: "$107 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $107",
        ar: "107 دولارات للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$112 per person for a group of 4",
        ru: "$112 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $112",
        ar: "112 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$93 per person for a group of 5",
        ru: "$93 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $93",
        ar: "93 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$89 per person for a group of 6",
        ru: "$89 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $89",
        ar: "89 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$75 per person for a group of 7",
        ru: "$75 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $75",
        ar: "75 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$71 per person for a group of 8",
        ru: "$71 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $71",
        ar: "71 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$69 per person for a group of 9",
        ru: "$69 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $69",
        ar: "69 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$70 per person for a group of 10",
        ru: "$70 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $70",
        ar: "70 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$58 per person for a group of 15",
        ru: "$58 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $58",
        ar: "58 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$57 per person for a group of 20",
        ru: "$57 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $57",
        ar: "57 دولارًا للشخص لمجموعة من 20 شخصًا",
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
    id: "oi-qaragai-mountain-resort",
    title: {
      en: "Oi-Qaragai Mountain Resort",
      ru: "Горный курорт Ой-Карагай",
      kz: "Ой-Қарағай тау курорты",
      ar: "منتجع أوي كاراغاي الجبلي",
    },
    price: { en: "from $52", ru: "от $52", kz: "$52-ден бастап", ar: "ابتداءً من $52" },
    images: [
      {
        src: "/tours/oi-qaragai-mountain-resort.webp",
        alt: "Green mountain ridges and pine forest at Oi-Qaragai",
      },
      {
        src: "/tours/oi-qaragai-mountain-resort-2.webp",
        alt: "A mountain stream lined with cabins and a yurt at Oi-Qaragai in autumn",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "A peaceful day trip to Oi-Qaragai's centuries-old coniferous forests and mountain vistas — scenic trails, fresh air and cozy spots away from the city bustle, just a short drive from Almaty.",
      ru: "Спокойная однодневная поездка среди вековых хвойных лесов и горных пейзажей Ой-Карагая — живописные тропы, свежий воздух и уютные уголки вдали от городской суеты, совсем недалеко от Алматы.",
      kz: "Ой-Қарағайдың ғасырлық қылқан жапырақты ормандары мен тау пейзаждары арасындағы тыныш бір күндік сапар — көркем соқпақтар, таза ауа және қала қарбаласынан алыс жайлы бұрыштар, Алматыдан алыс емес жерде.",
      ar: "رحلة يومية هادئة إلى غابات أوي كاراغاي الصنوبرية العريقة ومناظرها الجبلية — مسارات خلابة وهواء نقي وأركان مريحة بعيدًا عن صخب المدينة، على مسافة قصيرة من ألماتي.",
    },
    timing: [
      {
        en: "10:00 — Meeting at the hotel",
        ru: "10:00 — Встреча в отеле",
        kz: "10:00 — Қонақүйде кездесу",
        ar: "10:00 — اللقاء في الفندق",
      },
      {
        en: "10:30–11:30 — Transfer to Oi-Qaragai Mountain Resort",
        ru: "10:30–11:30 — Трансфер до горного курорта Ой-Карагай",
        kz: "10:30–11:30 — Ой-Қарағай тау курортына трансфер",
        ar: "10:30–11:30 — النقل إلى منتجع أوي كاراغاي الجبلي",
      },
      {
        en: "11:30–16:00 — Walking in Oi-Qaragai",
        ru: "11:30–16:00 — Прогулка по Ой-Карагаю",
        kz: "11:30–16:00 — Ой-Қарағайда серуендеу",
        ar: "11:30–16:00 — التجول في أوي كاراغاي",
      },
      {
        en: "16:00–17:00 — Transfer to the city",
        ru: "16:00–17:00 — Трансфер в город",
        kz: "16:00–17:00 — Қалаға трансфер",
        ar: "16:00–17:00 — النقل إلى المدينة",
      },
      {
        en: "17:30 — Transfer to the hotel",
        ru: "17:30 — Трансфер в отель",
        kz: "17:30 — Қонақүйге трансфер",
        ar: "17:30 — النقل إلى الفندق",
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
        en: "Cable car entrance tickets",
        ru: "Билеты на канатную дорогу",
        kz: "Канат жолға билеттер",
        ar: "تذاكر التلفريك",
      },
      {
        en: "National Park entrance fees",
        ru: "Входные билеты в национальный парк",
        kz: "Ұлттық паркке кіру билеттері",
        ar: "رسوم دخول المتنزه الوطني",
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
        en: "$208 per person for a group of 1",
        ru: "$208 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $208",
        ar: "208 دولارات للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$134 per person for a group of 2",
        ru: "$134 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $134",
        ar: "134 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$102 per person for a group of 3",
        ru: "$102 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $102",
        ar: "102 دولارًا للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$121 per person for a group of 4",
        ru: "$121 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $121",
        ar: "121 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$99 per person for a group of 5",
        ru: "$99 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $99",
        ar: "99 دولارًا للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$90 per person for a group of 6",
        ru: "$90 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $90",
        ar: "90 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$74 per person for a group of 7",
        ru: "$74 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $74",
        ar: "74 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$70 per person for a group of 8",
        ru: "$70 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $70",
        ar: "70 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$66 per person for a group of 9",
        ru: "$66 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $66",
        ar: "66 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$71 per person for a group of 10",
        ru: "$71 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $71",
        ar: "71 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$56 per person for a group of 15",
        ru: "$56 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $56",
        ar: "56 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$52 per person for a group of 20",
        ru: "$52 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $52",
        ar: "52 دولارًا للشخص لمجموعة من 20 شخصًا",
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
    id: "city-tour-green-bazaar",
    title: {
      en: "City Tour, Kok Tobe & Green Bazaar",
      ru: "Городской тур, Кок-Тобе и Зелёный базар",
      kz: "Қалалық тур, Көк-Төбе және Жасыл базар",
      ar: "جولة المدينة وكوك توبي والسوق الأخضر",
    },
    price: { en: "from $62", ru: "от $62", kz: "$62-ден бастап", ar: "ابتداءً من $62" },
    images: [
      {
        src: "/tours/city-tour-green-bazaar.webp",
        alt: "Almaty's skyline with the TV tower against the Trans-Ili Alatau at dusk",
      },
      {
        src: "/tours/city-tour-green-bazaar-2.webp",
        alt: "Republic Square in central Almaty with government buildings and gardens",
      },
      {
        src: "/tours/city-tour-green-bazaar-3.webp",
        alt: "Ascension Cathedral's colorful domes surrounded by trees and mountains",
      },
      {
        src: "/tours/city-tour-green-bazaar-4.webp",
        alt: "Rows of dried fruits, nuts and produce inside Almaty's Green Bazaar",
      },
      {
        src: "/tours/city-tour-green-bazaar-5.webp",
        alt: "Almaty's TV tower on Kok Tobe overlooking the city at sunset",
      },
    ],
    badge: { en: "every day", ru: "каждый день", kz: "күн сайын", ar: "يوميًا" },
    description: {
      en: "Panfilov Street, the Ascension Cathedral, Republic Square and the vibrant Green Bazaar, followed by a cable car ride up to Kok Tobe for a panoramic view of Almaty against the Trans-Ili Alatau. A relaxed introduction to the city through its landmarks, flavors and views from above.",
      ru: "Улица Панфилова, Вознесенский собор, площадь Республики и колоритный Зелёный базар, а затем канатная дорога на Кок-Тобе с панорамным видом на Алматы и Заилийский Алатау. Неспешное знакомство с городом через его историю, вкусы и виды сверху.",
      kz: "Панфилов көшесі, Вознесенск соборы, Республика алаңы және түрлі-түсті Жасыл базар, содан кейін Көк-Төбеге канат жолмен көтеріліп, Алматы мен Іле Алатауының панорамалық көрінісін тамашалау. Қаланың тарихы, дәмдері және биіктен көрінісі арқылы асықпай танысу.",
      ar: "شارع بانفيلوف، كاتدرائية الصعود، ميدان الجمهورية والسوق الأخضر النابض بالحياة، ثم رحلة بالتلفريك إلى كوك توبي للاستمتاع بإطلالة بانورامية على ألماتي وجبال ترانس إيلي ألاتاو. تعارف هادئ على المدينة عبر معالمها ونكهاتها وإطلالاتها من الأعلى.",
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
        en: "15:00–15:30 — Transfer to Kok Tobe",
        ru: "15:00–15:30 — Трансфер до Кок-Тобе",
        kz: "15:00–15:30 — Көк-Төбеге трансфер",
        ar: "15:00–15:30 — النقل إلى كوك توبي",
      },
      {
        en: "15:30–16:00 — Cable car to Kok Tobe",
        ru: "15:30–16:00 — Канатная дорога на Кок-Тобе",
        kz: "15:30–16:00 — Көк-Төбеге канат жол",
        ar: "15:30–16:00 — التلفريك إلى كوك توبي",
      },
      {
        en: "16:00–17:30 — Visiting Kok Tobe",
        ru: "16:00–17:30 — Посещение Кок-Тобе",
        kz: "16:00–17:30 — Көк-Төбеге бару",
        ar: "16:00–17:30 — زيارة كوك توبي",
      },
      {
        en: "17:30–18:00 — Cable car to parking",
        ru: "17:30–18:00 — Канатная дорога до парковки",
        kz: "17:30–18:00 — Тұраққа канат жол",
        ar: "17:30–18:00 — التلفريك إلى موقف السيارات",
      },
      {
        en: "18:00–18:30 — Transfer to the hotel",
        ru: "18:00–18:30 — Трансфер в отель",
        kz: "18:00–18:30 — Қонақүйге трансфер",
        ar: "18:00–18:30 — النقل إلى الفندق",
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
        en: "Entrance tickets according to the program",
        ru: "Входные билеты согласно программе",
        kz: "Бағдарламаға сәйкес кіру билеттері",
        ar: "تذاكر الدخول وفقًا للبرنامج",
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
      {
        en: "Cable car to Kok Tobe",
        ru: "Канатная дорога на Кок-Тобе",
        kz: "Көк-Төбеге канат жол",
        ar: "التلفريك إلى كوك توبي",
      },
    ],
    exclusive: [],
    additionalInfo: [
      {
        en: "$195 per person for a group of 1",
        ru: "$195 с человека при группе 1 человек",
        kz: "1 адамдық топ үшін адам басына $195",
        ar: "195 دولارًا للشخص لمجموعة من شخص واحد",
      },
      {
        en: "$131 per person for a group of 2",
        ru: "$131 с человека при группе 2 человека",
        kz: "2 адамдық топ үшін адам басына $131",
        ar: "131 دولارًا للشخص لمجموعة من شخصين",
      },
      {
        en: "$104 per person for a group of 3",
        ru: "$104 с человека при группе 3 человека",
        kz: "3 адамдық топ үшін адам басына $104",
        ar: "104 دولارات للشخص لمجموعة من 3 أشخاص",
      },
      {
        en: "$127 per person for a group of 4",
        ru: "$127 с человека при группе 4 человека",
        kz: "4 адамдық топ үшін адам басына $127",
        ar: "127 دولارًا للشخص لمجموعة من 4 أشخاص",
      },
      {
        en: "$105 per person for a group of 5",
        ru: "$105 с человека при группе 5 человек",
        kz: "5 адамдық топ үшін адам басына $105",
        ar: "105 دولارات للشخص لمجموعة من 5 أشخاص",
      },
      {
        en: "$97 per person for a group of 6",
        ru: "$97 с человека при группе 6 человек",
        kz: "6 адамдық топ үшін адам басына $97",
        ar: "97 دولارًا للشخص لمجموعة من 6 أشخاص",
      },
      {
        en: "$81 per person for a group of 7",
        ru: "$81 с человека при группе 7 человек",
        kz: "7 адамдық топ үшін адам басына $81",
        ar: "81 دولارًا للشخص لمجموعة من 7 أشخاص",
      },
      {
        en: "$77 per person for a group of 8",
        ru: "$77 с человека при группе 8 человек",
        kz: "8 адамдық топ үшін адам басына $77",
        ar: "77 دولارًا للشخص لمجموعة من 8 أشخاص",
      },
      {
        en: "$74 per person for a group of 9",
        ru: "$74 с человека при группе 9 человек",
        kz: "9 адамдық топ үшін адам басына $74",
        ar: "74 دولارًا للشخص لمجموعة من 9 أشخاص",
      },
      {
        en: "$79 per person for a group of 10",
        ru: "$79 с человека при группе 10 человек",
        kz: "10 адамдық топ үшін адам басына $79",
        ar: "79 دولارًا للشخص لمجموعة من 10 أشخاص",
      },
      {
        en: "$64 per person for a group of 15",
        ru: "$64 с человека при группе 15 человек",
        kz: "15 адамдық топ үшін адам басына $64",
        ar: "64 دولارًا للشخص لمجموعة من 15 شخصًا",
      },
      {
        en: "$62 per person for a group of 20",
        ru: "$62 с человека при группе 20 человек",
        kz: "20 адамдық топ үшін адам басына $62",
        ar: "62 دولارًا للشخص لمجموعة من 20 شخصًا",
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
