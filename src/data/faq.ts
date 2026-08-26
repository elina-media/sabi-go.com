// Content lives in Sanity now (see src/lib/queries.ts, getFaqEntries()) —
// this file only keeps the shared type, since components import it as a type.
export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};
