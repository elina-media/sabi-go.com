import type { ReactNode } from "react";
import type { Localized } from "@/lib/i18n";

export const navLinks: { label: Localized<string>; href: string }[] = [
  { label: { en: "Main", ru: "Главная" }, href: "#main" },
  { label: { en: "Tours", ru: "Туры" }, href: "#tours" },
  {
    label: { en: "Private tour", ru: "Приватный тур" },
    href: "#private-tour",
  },
  { label: { en: "Reviews", ru: "Отзывы" }, href: "#reviews" },
  { label: { en: "Education", ru: "Образование" }, href: "#" },
  { label: { en: "Contacts", ru: "Контакты" }, href: "#contacts" },
];

export const documentationLinks: Localized<string>[] = [
  { en: "Privacy Policy", ru: "Политика конфиденциальности" },
  { en: "Public Offer Agreement", ru: "Публичная оферта" },
];

export const copy = {
  nav: {
    writeOnWhatsapp: {
      en: "Write on WhatsApp",
      ru: "Написать в WhatsApp",
    } satisfies Localized<string>,
  },
  hero: {
    locationBadge: {
      en: "Kazakhstan, Almaty",
      ru: "Казахстан, Алматы",
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
    } satisfies Localized<ReactNode>,
    viewToursButton: {
      en: "View tours",
      ru: "Смотреть туры",
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
    } satisfies Localized<ReactNode>,
    destinations: {
      en: (
        <>
          <span className="font-accent italic">10+</span> Destinations across
          Kazakhstan
        </>
      ),
      ru: (
        <>
          <span className="font-accent italic">10+</span> направлений по
          Казахстану
        </>
      ),
    } satisfies Localized<ReactNode>,
    seasons: {
      en: (
        <>
          <span className="font-accent italic">4 Seasons</span> tours all
          year round
        </>
      ),
      ru: (
        <>
          <span className="font-accent italic">4 сезона</span> туров
          круглый год
        </>
      ),
    } satisfies Localized<ReactNode>,
    groups: {
      en: "Small Groups More comfort, less crowds",
      ru: "Маленькие группы Больше комфорта, меньше людей",
    } satisfies Localized<string>,
    guides: {
      en: (
        <>
          <span className="font-accent italic">10 guides</span> with C1
          English level
        </>
      ),
      ru: (
        <>
          <span className="font-accent italic">10 гидов</span> с английским
          уровня C1
        </>
      ),
    } satisfies Localized<ReactNode>,
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
    } satisfies Localized<ReactNode>,
    bookButton: {
      en: "Book a tour",
      ru: "Забронировать тур",
    } satisfies Localized<string>,
    moreButton: { en: "More", ru: "Подробнее" } satisfies Localized<string>,
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
    } satisfies Localized<ReactNode>,
    subtitle: {
      en: "Leave your details and we’ll help you create the perfect trip from Almaty.",
      ru: "Оставьте свои данные, и мы поможем создать идеальное путешествие из Алматы.",
    } satisfies Localized<string>,
  },
  form: {
    fullNamePlaceholder: {
      en: "Full name",
      ru: "Ваше имя",
    } satisfies Localized<string>,
    emailPlaceholder: { en: "E-mail", ru: "Email" } satisfies Localized<string>,
    submitButton: {
      en: "Submit a request",
      ru: "Отправить заявку",
    } satisfies Localized<string>,
    sending: { en: "Sending…", ru: "Отправка…" } satisfies Localized<string>,
    thankYouTitle: {
      en: "Thank you!",
      ru: "Спасибо!",
    } satisfies Localized<string>,
    thankYouBody: {
      en: "We’ve received your request and will contact you shortly.",
      ru: "Мы получили вашу заявку и скоро свяжемся с вами.",
    } satisfies Localized<string>,
    errorMessage: {
      en: "Couldn’t send your request — please try again.",
      ru: "Не удалось отправить заявку — попробуйте ещё раз.",
    } satisfies Localized<string>,
  },
  bookingModal: {
    title: {
      en: "Booking a tour",
      ru: "Бронирование тура",
    } satisfies Localized<string>,
    confirmationNote: {
      en: "After booking, our manager will contact you via WhatsApp to confirm the details of your tour.",
      ru: "После бронирования наш менеджер свяжется с вами в WhatsApp, чтобы уточнить детали тура.",
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
    } satisfies Localized<ReactNode>,
  },
  tourDetails: {
    timingLabel: { en: "Timing", ru: "Расписание" } satisfies Localized<string>,
    inclusiveLabel: {
      en: "Inclusive",
      ru: "Включено",
    } satisfies Localized<string>,
    exclusiveLabel: {
      en: "Exclusive",
      ru: "Не включено",
    } satisfies Localized<string>,
    additionalInfoLabel: {
      en: "Additional information",
      ru: "Дополнительная информация",
    } satisfies Localized<string>,
  },
  footer: {
    socialContacts: {
      en: "Social Media & Contacts",
      ru: "Соцсети и контакты",
    } satisfies Localized<string>,
    menu: { en: "Menu", ru: "Меню" } satisfies Localized<string>,
    documentation: {
      en: "Documentation",
      ru: "Документы",
    } satisfies Localized<string>,
  },
  a11y: {
    previousPhoto: {
      en: "Previous photo",
      ru: "Предыдущее фото",
    } satisfies Localized<string>,
    nextPhoto: { en: "Next photo", ru: "Следующее фото" } satisfies Localized<string>,
    photoLabel: { en: "Photo", ru: "Фото" } satisfies Localized<string>,
    close: { en: "Close", ru: "Закрыть" } satisfies Localized<string>,
    decreaseSeats: {
      en: "Decrease seats",
      ru: "Уменьшить количество мест",
    } satisfies Localized<string>,
    increaseSeats: {
      en: "Increase seats",
      ru: "Увеличить количество мест",
    } satisfies Localized<string>,
  },
};
