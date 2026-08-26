import { client, urlForImage } from "./sanity";
import type { Tour } from "@/data/tours";
import type { Review } from "@/data/reviews";
import type { FaqEntry } from "@/data/faq";

type SanityImage = {
  asset: { _ref: string };
  alt: string;
};

type TourDoc = {
  _id: string;
  title: string;
  price: string;
  images: SanityImage[];
  badge?: string;
  bookHref: string;
  moreHref: string;
};

export async function getTours(): Promise<Tour[]> {
  const docs = await client.fetch<TourDoc[]>(
    `*[_type == "tour"] | order(order asc) {
      _id, title, price, images, badge, bookHref, moreHref
    }`,
  );

  return docs.map((doc) => ({
    id: doc._id,
    title: doc.title,
    price: doc.price,
    images: doc.images.map((image) => ({
      src: urlForImage(image),
      alt: image.alt,
    })),
    badge: doc.badge,
    bookHref: doc.bookHref,
    moreHref: doc.moreHref,
  }));
}

type ReviewDoc = {
  _id: string;
  name: string;
  avatar: { asset: { _ref: string } };
  rating: number;
  reviewDate: string;
  text: string;
};

export async function getReviews(): Promise<Review[]> {
  const docs = await client.fetch<ReviewDoc[]>(
    `*[_type == "review"] | order(_createdAt asc) {
      _id, name, avatar, rating, reviewDate, text
    }`,
  );

  return docs.map((doc) => ({
    id: doc._id,
    name: doc.name,
    reviewDate: doc.reviewDate,
    rating: doc.rating,
    text: doc.text,
    avatar: urlForImage(doc.avatar),
  }));
}

type FaqDoc = {
  _id: string;
  question: string;
  answer: string;
};

export async function getFaqEntries(): Promise<FaqEntry[]> {
  const docs = await client.fetch<FaqDoc[]>(
    `*[_type == "faq"] | order(order asc) { _id, question, answer }`,
  );

  return docs.map((doc) => ({
    id: doc._id,
    question: doc.question,
    answer: doc.answer,
  }));
}
