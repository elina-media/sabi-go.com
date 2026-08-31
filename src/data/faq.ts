export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

export const faq: FaqEntry[] = [
  {
    id: "faq-1",
    question: "Which trip should I choose if I’m going for the first time?",
    answer:
      "If it's your first time in Almaty, we recommend the Charyn, Kolsay & Kaindy tour. It's our most popular route and covers the region's main natural highlights in a single day, suitable for any fitness level.",
  },
  {
    id: "faq-2",
    question: "Do I need any special physical preparation?",
    answer:
      "No, most of our tours are designed for travelers without special training. Routes include short, easy walks. If a tour involves more active hiking, we mention it clearly in the tour description.",
  },
  {
    id: "faq-3",
    question: "What's included in the tour price?",
    answer:
      "The price includes transportation in a comfortable vehicle, an English-speaking guide, and entrance fees to parks and reserves. Meals and personal expenses are not included unless stated otherwise.",
  },
  {
    id: "faq-4",
    question: "Can I book a private tour?",
    answer:
      "Yes, we organize private tours tailored to your schedule and preferences. Just leave a request in the \"Private tour\" section, and we'll help you build a route that fits your needs.",
  },
  {
    id: "faq-5",
    question: "Do you offer hotel pickup?",
    answer:
      "Yes, most of our tours include pickup from your hotel or another location in Almaty. The exact time and meeting point will be confirmed by our manager after booking.",
  },
  {
    id: "faq-6",
    question: "Do your guides speak English?",
    answer:
      "Yes, all our guides have a C1 level of English, so language won't be a barrier during your trip.",
  },
];
