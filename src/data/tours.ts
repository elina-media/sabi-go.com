export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Unique, stable id — used as the React key and (later) the tour detail slug. */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: string;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). */
  price: string;
  /**
   * Photos under /public/tours. One photo = no gallery arrows shown.
   * Add more entries once there are extra photos for a tour to enable
   * the arrow/dot gallery in the card automatically.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: string;
  /** Where "Book a tour" links to. */
  bookHref: string;
  /** Where "More" links to. */
  moreHref: string;
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
    bookHref: "#",
    moreHref: "#",
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
    bookHref: "#",
    moreHref: "#",
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
    bookHref: "#",
    moreHref: "#",
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
    bookHref: "#",
    moreHref: "#",
  },
];
