export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Unique, stable id — used as the React key and the tour detail slug (/tours/[id]). */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: string;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). */
  price: string;
  /**
   * Photos under /public/tours. Feeds the card gallery (TourGallery), the
   * detail page hero background (first photo), and the detail page photo
   * slider (full array). One photo = no gallery arrows/thumbnails shown
   * anywhere. Add more entries once there are extra photos for a tour.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: string;
  /** Short subtitle shown under the title on the tour detail page hero. */
  description: string;
  /** Detail page accordion: bullet points under "Timing". */
  timing: string[];
  /** Detail page accordion: bullet points under "Inclusive". */
  inclusive: string[];
  /** Detail page accordion: bullet points under "Exclusive". */
  exclusive: string[];
  /** Detail page accordion: bullet points under "Additional information". */
  additionalInfo: string[];
};

export const tours: Tour[] = [
  {
    id: "kolsai-kaindy-moon-canyon",
    title: "Kolsai, Kaindy & Moon Canyon",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-moon-canyon.webp",
        alt: "Kolsai Lake surrounded by pine forest and mountains",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-2.webp",
        alt: "Tourists boarding boats at the Kolsai Lake dock",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-3.webp",
        alt: "Aerial view of Kaindy Lake's sunken forest",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-4.webp",
        alt: "Kolsai Lake surrounded by snow-capped mountain peaks",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-5.webp",
        alt: "Turquoise waters of Kaindy Lake with sunken trees",
      },
      {
        src: "/tours/kolsai-kaindy-moon-canyon-6.webp",
        alt: "Wooden walkway along Kolsai Lake with mountain backdrop",
      },
    ],
    badge: "every day",
    description:
      "Moon Canyon, the mysterious sunken forest of Kaindy Lake, and the crystal-clear waters of Kolsai Lake — all in one unforgettable day. A scenic journey through Kazakhstan's mountains, with breathtaking landscapes, a local lunch and plenty of time to explore.",
    timing: [
      "5:00–5:30 — Guest pickup",
      "7:00–7:30 — Stop at a gas station (breakfast option)",
      "8:30–10:00 — Moon Canyon",
      "11:00–13:30 — Kaindy Lake",
      "13:30–14:00 — Lunch",
      "14:30–16:00 — Kolsai Lake",
      "18:00–18:30 — Stop at a gas station",
      "20:00–21:00 — Return to Almaty",
    ],
    inclusive: [
      "Pickup from the meeting point",
      "Transportation",
      "English-speaking guide",
      "Entrance tickets to all national parks",
      "Lunch box",
      "Bottled water",
    ],
    exclusive: ["Horseback riding", "Taxi at certain locations"],
    additionalInfo: [
      "$60 per person for a group of 16",
      "$90 per person for a group of 8",
      "$110 per person for a group of 3",
      "Tours run every day",
    ],
  },
  {
    id: "kolsai-kaindy-charyn-black-moon-2-day",
    title:
      "Kolsai, Kaindy, Charyn, Black Canyon & Moon Canyon (2-Day Tour)",
    price: "$60",
    images: [
      {
        src: "/tours/kolsai-kaindy-charyn-black-moon-2-day.webp",
        alt: "Canyon landscape with layered rock formations",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
  {
    id: "big-almaty-lake-falcon-show",
    title: "Big Almaty Lake & Falcon Show",
    price: "$60",
    images: [
      {
        src: "/tours/big-almaty-lake-falcon-show.webp",
        alt: "Big Almaty Lake surrounded by snow-capped mountains",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
  {
    id: "oi-qaragai-mountain-resort",
    title: "Oi-Qaragai Mountain Resort",
    price: "$60",
    images: [
      {
        src: "/tours/oi-qaragai-mountain-resort.webp",
        alt: "Oi-Qaragai mountain resort in a pine forest",
      },
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
  },
];
