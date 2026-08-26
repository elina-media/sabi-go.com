// Content lives in Sanity now (see src/lib/queries.ts, getReviews()) — this
// file only keeps the shared type, since components import it as a type.
export type Review = {
  id: string;
  name: string;
  reviewDate: string;
  rating: number;
  text: string;
  avatar: string;
};
