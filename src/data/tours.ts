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
    ],
    badge: "every day",
    description: "",
    timing: [],
    inclusive: [],
    exclusive: [],
    additionalInfo: [],
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
