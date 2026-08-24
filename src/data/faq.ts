export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
};

// Placeholder content — same question repeated in the Figma source too,
// and answers are Lorem Ipsum for now. Replace with real copy later,
// the accordion just maps over whatever is here.
const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.";

export const faq: FaqEntry[] = [
  {
    id: "faq-1",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
  {
    id: "faq-2",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
  {
    id: "faq-3",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
  {
    id: "faq-4",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
  {
    id: "faq-5",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
  {
    id: "faq-6",
    question: "Which trip should I choose if I’m going for the first time?",
    answer: LOREM,
  },
];
