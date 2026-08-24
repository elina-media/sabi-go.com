import Image from "next/image";
import type { Review } from "@/data/reviews";
import Stars from "./Stars";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-[240px] w-[411px] shrink-0 flex-col gap-6 overflow-hidden rounded-[30px] bg-muted p-4">
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-sans text-2xl text-ink">{review.name}</p>
            <p className="font-sans text-base text-ink/50">
              {review.daysAgo}
            </p>
          </div>
        </div>
        <Stars rating={review.rating} />
      </div>

      <p className="line-clamp-5 font-sans text-base leading-normal text-ink">
        {review.text}
      </p>
    </article>
  );
}
