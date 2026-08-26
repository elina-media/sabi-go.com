// Content lives in Sanity now (see src/lib/queries.ts, getTours()) — this
// file only keeps the shared type, since components import it as a type.
export type TourImage = {
  src: string;
  alt: string;
};

export type Tour = {
  /** Sanity document _id — used as the React key. */
  id: string;
  /** Card title. Wraps naturally, no manual line breaks needed. */
  title: string;
  /** Display price, formatted exactly as it should appear (e.g. "$60"). */
  price: string;
  /**
   * One photo = no gallery arrows shown. Add more in Sanity to enable the
   * arrow/dot gallery in the card automatically.
   */
  images: TourImage[];
  /** Small pill on the photo, e.g. "every day". Omit to hide it. */
  badge?: string;
  /** Where "Book a tour" links to. */
  bookHref: string;
  /** Where "More" links to. */
  moreHref: string;
};
