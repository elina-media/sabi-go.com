import type { ReactNode } from "react";
import type { Localized } from "@/lib/i18n";

export const navLinks: { label: Localized<string>; href: string }[] = [
  {
    label: { en: "Main", ru: "Главная", kz: "Басты бет", ar: "الرئيسية" },
    href: "#main",
  },
  {
    label: { en: "Tours", ru: "Туры", kz: "Турлар", ar: "الجولات" },
    href: "#tours",
  },
  {
    label: {
      en: "Private tour",
      ru: "Приватный тур",
      kz: "Жеке тур",
      ar: "جولة خاصة",
    },
    href: "#private-tour",
  },
  {
    label: {
      en: "Reviews",
      ru: "Отзывы",
      kz: "Пікірлер",
      ar: "التقييمات",
    },
    href: "#reviews",
  },
  {
    label: {
      en: "Contacts",
      ru: "Контакты",
      kz: "Байланыстар",
      ar: "التواصل",
    },
    href: "#contacts",
  },
];

export const documentationLinks: Localized<string>[] = [
  {
    en: "Privacy Policy",
    ru: "Политика конфиденциальности",
    kz: "Құпиялылық саясаты",
    ar: "سياسة الخصوصية",
  },
  {
    en: "Public Offer Agreement",
    ru: "Публичная оферта",
    kz: "Жария оферта",
    ar: "اتفاقية العرض العام",
  },
];

export const copy = {
  nav: {
    writeOnWhatsapp: {
      en: "Write on WhatsApp",
      ru: "Написать в WhatsApp",
      kz: "WhatsApp-қа жазу",
      ar: "راسلنا عبر واتساب",
    } satisfies Localized<string>,
  },
  hero: {
    locationBadge: {
      en: "Kazakhstan, Almaty",
      ru: "Казахстан, Алматы",
      kz: "Қазақстан, Алматы",
      ar: "كازاخستان، ألماتي",
    } satisfies Localized<string>,
    heading: {
      en: (
        <>
          Discover the{" "}
          <span className="font-accent italic">wild side</span>
          <br />
          of Kazakhstan
        </>
      ),
      ru: (
        <>
          Откройте{" "}
          <span className="font-accent italic">дикую сторону</span>
          <br />
          Казахстана
        </>
      ),
      kz: (
        <>
          Қазақстанның
          <br />
          <span className="font-accent italic">жабайы қырын</span> ашыңыз
        </>
      ),
      ar: (
        <>
          اكتشف{" "}
          <span className="font-accent italic">الجانب البري</span>
          <br />
          لكازاخستان
        </>
      ),
    } satisfies Localized<ReactNode>,
    subtitle: {
      en: (
        <>
          Explore Kazakhstan&rsquo;s most breathtaking landscapes
          <br />
          with carefully planned tours and local guides.
        </>
      ),
      ru: (
        <>
          Исследуйте самые захватывающие пейзажи Казахстана
          <br />с продуманными турами и местными гидами.
        </>
      ),
      kz: (
        <>
          Қазақстанның ең әсем табиғатын
          <br />
          мұқият жоспарланған турлар мен жергілікті гидтермен зерттеңіз.
        </>
      ),
      ar: (
        <>
          استكشف أروع مناظر كازاخستان الطبيعية
          <br />
          مع جولات مخططة بعناية ومرشدين محليين.
        </>
      ),
    } satisfies Localized<ReactNode>,
    viewToursButton: {
      en: "View tours",
      ru: "Смотреть туры",
      kz: "Турларды көру",
      ar: "عرض الجولات",
    } satisfies Localized<string>,
  },
  features: {
    heading: {
      en: (
        <>
          The little{" "}
          <span className="font-accent italic text-accent">things</span>{" "}
          that{" "}
          <span className="font-accent italic text-accent">make</span> every
          trip{" "}
          <span className="font-accent italic text-accent">better</span>
        </>
      ),
      ru: (
        <>
          Маленькие детали, которые{" "}
          <span className="font-accent italic text-accent">делают</span>{" "}
          каждую поездку{" "}
          <span className="font-accent italic text-accent">лучше</span>
        </>
      ),
      kz: (
        <>
          Әр сапарды{" "}
          <span className="font-accent italic text-accent">жақсырақ</span>{" "}
          ететін кішкентай{" "}
          <span className="font-accent italic text-accent">детальдар</span>
        </>
      ),
      ar: (
        <>
          التفاصيل الصغيرة التي{" "}
          <span className="font-accent italic text-accent">تجعل</span> كل
          رحلة{" "}
          <span className="font-accent italic text-accent">أفضل</span>
        </>
      ),
    } satisfies Localized<ReactNode>,
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
  },
  tours: {
    heading: {
      en: (
        <>
          Your{" "}
          <span className="font-accent italic text-accent">
            next adventure
          </span>{" "}
          is waiting – pick one
        </>
      ),
      ru: (
        <>
          Ваше{" "}
          <span className="font-accent italic text-accent">
            следующее приключение
          </span>{" "}
          уже ждёт — выбирайте
        </>
      ),
      kz: (
        <>
          Сіздің{" "}
          <span className="font-accent italic text-accent">
            келесі саяхатыңыз
          </span>{" "}
          сізді күтіп тұр — таңдаңыз
        </>
      ),
      ar: (
        <>
          <span className="font-accent italic text-accent">
            مغامرتك القادمة
          </span>{" "}
          في انتظارك – اختر واحدة
        </>
      ),
    } satisfies Localized<ReactNode>,
    bookButton: {
      en: "Book a tour",
      ru: "Забронировать тур",
      kz: "Тур брондау",
      ar: "احجز جولة",
    } satisfies Localized<string>,
    moreButton: {
      en: "More",
      ru: "Подробнее",
      kz: "Толығырақ",
      ar: "المزيد",
    } satisfies Localized<string>,
  },
  privateTour: {
    heading: {
      en: (
        <>
          Want a{" "}
          <span className="font-accent italic text-accent">
            private tour?
          </span>
        </>
      ),
      ru: (
        <>
          Хотите{" "}
          <span className="font-accent italic text-accent">
            приватный тур?
          </span>
        </>
      ),
      kz: (
        <>
          <span className="font-accent italic text-accent">Жеке тур</span>{" "}
          қалайсыз ба?
        </>
      ),
      ar: (
        <>
          هل تريد{" "}
          <span className="font-accent italic text-accent">
            جولة خاصة؟
          </span>
        </>
      ),
    } satisfies Localized<ReactNode>,
    subtitle: {
      en: "Leave your details and we’ll help you create the perfect trip from Almaty.",
      ru: "Оставьте свои данные, и мы поможем создать идеальное путешествие из Алматы.",
      kz: "Деректеріңізді қалдырыңыз, біз сізге Алматыдан керемет саяхат жасауға көмектесеміз.",
      ar: "اترك بياناتك وسنساعدك في تنظيم أفضل رحلة من ألماتي.",
    } satisfies Localized<string>,
  },
  form: {
    fullNamePlaceholder: {
      en: "Full name",
      ru: "Ваше имя",
      kz: "Аты-жөніңіз",
      ar: "الاسم الكامل",
    } satisfies Localized<string>,
    emailPlaceholder: {
      en: "E-mail",
      ru: "Email",
      kz: "Email",
      ar: "البريد الإلكتروني",
    } satisfies Localized<string>,
    submitButton: {
      en: "Submit a request",
      ru: "Отправить заявку",
      kz: "Өтінім жіберу",
      ar: "إرسال الطلب",
    } satisfies Localized<string>,
    sending: {
      en: "Sending…",
      ru: "Отправка…",
      kz: "Жіберілуде…",
      ar: "جارٍ الإرسال…",
    } satisfies Localized<string>,
    thankYouTitle: {
      en: "Thank you!",
      ru: "Спасибо!",
      kz: "Рахмет!",
      ar: "شكرًا لك!",
    } satisfies Localized<string>,
    thankYouBody: {
      en: "We’ve received your request and will contact you shortly.",
      ru: "Мы получили вашу заявку и скоро свяжемся с вами.",
      kz: "Біз сіздің өтінішіңізді алдық және жақын арада хабарласамыз.",
      ar: "لقد استلمنا طلبك وسنتواصل معك قريبًا.",
    } satisfies Localized<string>,
    errorMessage: {
      en: "Couldn’t send your request — please try again.",
      ru: "Не удалось отправить заявку — попробуйте ещё раз.",
      kz: "Өтінішті жіберу мүмкін болмады — қайталап көріңіз.",
      ar: "تعذر إرسال طلبك — يرجى المحاولة مرة أخرى.",
    } satisfies Localized<string>,
  },
  bookingModal: {
    title: {
      en: "Booking a tour",
      ru: "Бронирование тура",
      kz: "Турды брондау",
      ar: "حجز جولة",
    } satisfies Localized<string>,
    confirmationNote: {
      en: "After booking, our manager will contact you via WhatsApp to confirm the details of your tour.",
      ru: "После бронирования наш менеджер свяжется с вами в WhatsApp, чтобы уточнить детали тура.",
      kz: "Брондаудан кейін біздің менеджер тур мәліметтерін нақтылау үшін сізбен WhatsApp арқылы байланысады.",
      ar: "بعد الحجز، سيتواصل معك مديرنا عبر واتساب لتأكيد تفاصيل الجولة.",
    } satisfies Localized<string>,
  },
  reviews: {
    heading: {
      en: (
        <>
          Don&rsquo;t take our word for it –{" "}
          <span className="font-accent italic text-accent">hear</span> from{" "}
          <span className="font-accent italic text-accent">travelers</span>
        </>
      ),
      ru: (
        <>
          Не верьте нам на слово —{" "}
          <span className="font-accent italic text-accent">
            послушайте
          </span>{" "}
          <span className="font-accent italic text-accent">
            путешественников
          </span>
        </>
      ),
      kz: (
        <>
          Бізге сенбеңіз —{" "}
          <span className="font-accent italic text-accent">тыңдаңыз</span>{" "}
          <span className="font-accent italic text-accent">
            саяхатшыларды
          </span>
        </>
      ),
      ar: (
        <>
          لا تصدق كلامنا فقط –{" "}
          <span className="font-accent italic text-accent">استمع</span> إلى{" "}
          <span className="font-accent italic text-accent">المسافرين</span>
        </>
      ),
    } satisfies Localized<ReactNode>,
  },
  faq: {
    heading: {
      en: (
        <>
          Got <span className="font-accent italic text-accent">Questions</span>
          ?
          <br />
          We&rsquo;ve Got{" "}
          <span className="font-accent italic text-accent">Answers</span>
        </>
      ),
      ru: (
        <>
          Есть{" "}
          <span className="font-accent italic text-accent">вопросы</span>?
          <br />У нас есть{" "}
          <span className="font-accent italic text-accent">ответы</span>
        </>
      ),
      kz: (
        <>
          <span className="font-accent italic text-accent">
            Сұрақтарыңыз
          </span>{" "}
          бар ма?
          <br />
          Бізде{" "}
          <span className="font-accent italic text-accent">жауаптар</span>{" "}
          бар
        </>
      ),
      ar: (
        <>
          لديك{" "}
          <span className="font-accent italic text-accent">أسئلة</span>؟
          <br />
          لدينا{" "}
          <span className="font-accent italic text-accent">الإجابات</span>
        </>
      ),
    } satisfies Localized<ReactNode>,
  },
  tourDetails: {
    timingLabel: {
      en: "Timing",
      ru: "Расписание",
      kz: "Кесте",
      ar: "الجدول الزمني",
    } satisfies Localized<string>,
    inclusiveLabel: {
      en: "Inclusive",
      ru: "Включено",
      kz: "Бағаға кіреді",
      ar: "شامل",
    } satisfies Localized<string>,
    exclusiveLabel: {
      en: "Exclusive",
      ru: "Не включено",
      kz: "Бағаға кірмейді",
      ar: "غير شامل",
    } satisfies Localized<string>,
    additionalInfoLabel: {
      en: "Additional information",
      ru: "Дополнительная информация",
      kz: "Қосымша ақпарат",
      ar: "معلومات إضافية",
    } satisfies Localized<string>,
  },
  footer: {
    socialContacts: {
      en: "Social Media & Contacts",
      ru: "Соцсети и контакты",
      kz: "Әлеуметтік желілер және байланыс",
      ar: "التواصل الاجتماعي وبيانات الاتصال",
    } satisfies Localized<string>,
    menu: {
      en: "Menu",
      ru: "Меню",
      kz: "Мәзір",
      ar: "القائمة",
    } satisfies Localized<string>,
    documentation: {
      en: "Documentation",
      ru: "Документы",
      kz: "Құжаттама",
      ar: "الوثائق",
    } satisfies Localized<string>,
  },
  a11y: {
    previousPhoto: {
      en: "Previous photo",
      ru: "Предыдущее фото",
      kz: "Алдыңғы фото",
      ar: "الصورة السابقة",
    } satisfies Localized<string>,
    nextPhoto: {
      en: "Next photo",
      ru: "Следующее фото",
      kz: "Келесі фото",
      ar: "الصورة التالية",
    } satisfies Localized<string>,
    photoLabel: {
      en: "Photo",
      ru: "Фото",
      kz: "Фото",
      ar: "صورة",
    } satisfies Localized<string>,
    close: {
      en: "Close",
      ru: "Закрыть",
      kz: "Жабу",
      ar: "إغلاق",
    } satisfies Localized<string>,
    decreaseSeats: {
      en: "Decrease seats",
      ru: "Уменьшить количество мест",
      kz: "Орын санын азайту",
      ar: "تقليل عدد المقاعد",
    } satisfies Localized<string>,
    increaseSeats: {
      en: "Increase seats",
      ru: "Увеличить количество мест",
      kz: "Орын санын көбейту",
      ar: "زيادة عدد المقاعد",
    } satisfies Localized<string>,
  },
};
