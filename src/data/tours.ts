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
    id: "charyn-kolsay-kaindy",
    title: "Charyn, Black & Moon Canyons Kolsay & Kaindy Lakes",
    price: "$60",
    images: [
      {
        src: "/tours/charyn-kolsay-kaindy.webp",
        alt: "Couple in traditional Kazakh fur coats holding a falcon",
      },
    ],
    badge: "every day",
    bookHref: "#",
    moreHref: "#",
  },
  {
    id: "2-day-charyn-kolsay-kaindy",
    title: "2-Day Tour Charyn, Kolsay & Kaindy",
    price: "$110",
    images: [
      {
        src: "/tours/2-day-charyn-kolsay-kaindy.webp",
        alt: "Kaindy Lake with sunken trees rising from turquoise water",
      },
    ],
    badge: "every day",
    bookHref: "#",
    moreHref: "#",
  },
  {
    id: "big-almaty-lake",
    title: "Big Almaty Lake Hiking & Falcon Show",
    price: "$80",
    images: [
      {
        src: "/tours/big-almaty-lake.webp",
        alt: "Big Almaty Lake surrounded by snow-capped mountains",
      },
    ],
    badge: "every day",
    bookHref: "#",
    moreHref: "#",
  },
];
