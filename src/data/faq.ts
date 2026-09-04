import type { Localized } from "@/lib/i18n";

export type FaqEntry = {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
};

export const faq: FaqEntry[] = [
  {
    id: "faq-1",
    question: {
      en: "Which trip should I choose if I’m going for the first time?",
      ru: "Какой тур выбрать, если я еду впервые?",
    },
    answer: {
      en: "If it’s your first time in Almaty, we recommend the Charyn, Kolsay & Kaindy tour. It’s our most popular route and covers the region’s main natural highlights in a single day, suitable for any fitness level.",
      ru: "Если вы впервые в Алматы, рекомендуем тур Чарын, Кольсай и Каинды. Это наш самый популярный маршрут — за один день вы увидите главные природные достопримечательности региона, подходит для любого уровня подготовки.",
    },
  },
  {
    id: "faq-2",
    question: {
      en: "Do I need any special physical preparation?",
      ru: "Нужна ли специальная физическая подготовка?",
    },
    answer: {
      en: "No, most of our tours are designed for travelers without special training. Routes include short, easy walks. If a tour involves more active hiking, we mention it clearly in the tour description.",
      ru: "Нет, большинство наших туров рассчитаны на путешественников без специальной подготовки. Маршруты включают короткие, лёгкие прогулки. Если тур предполагает более активный трекинг, мы чётко указываем это в описании.",
    },
  },
  {
    id: "faq-3",
    question: {
      en: "What’s included in the tour price?",
      ru: "Что включено в стоимость тура?",
    },
    answer: {
      en: "The price includes transportation in a comfortable vehicle, an English-speaking guide, and entrance fees to parks and reserves. Meals and personal expenses are not included unless stated otherwise.",
      ru: "В стоимость входит транспорт на комфортабельном автомобиле, англоговорящий гид и входные билеты в парки и заповедники. Питание и личные расходы не включены, если не указано иное.",
    },
  },
  {
    id: "faq-4",
    question: {
      en: "Can I book a private tour?",
      ru: "Можно ли заказать приватный тур?",
    },
    answer: {
      en: "Yes, we organize private tours tailored to your schedule and preferences. Just leave a request in the \"Private tour\" section, and we’ll help you build a route that fits your needs.",
      ru: "Да, мы организуем приватные туры под ваш график и пожелания. Просто оставьте заявку в разделе «Приватный тур», и мы поможем построить маршрут под ваши потребности.",
    },
  },
  {
    id: "faq-5",
    question: {
      en: "Do you offer hotel pickup?",
      ru: "Есть ли трансфер из отеля?",
    },
    answer: {
      en: "Yes, most of our tours include pickup from your hotel or another location in Almaty. The exact time and meeting point will be confirmed by our manager after booking.",
      ru: "Да, большинство туров включают трансфер из отеля или другого места в Алматы. Точное время и место встречи менеджер подтвердит после бронирования.",
    },
  },
  {
    id: "faq-6",
    question: {
      en: "Do your guides speak English?",
      ru: "Ваши гиды говорят по-английски?",
    },
    answer: {
      en: "Yes, all our guides have a C1 level of English, so language won’t be a barrier during your trip.",
      ru: "Да, все наши гиды владеют английским на уровне C1, поэтому язык не станет барьером во время поездки.",
    },
  },
];
