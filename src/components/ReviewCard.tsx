import Image from "next/image";
import type { Review } from "@/data/reviews";
import Stars from "./Stars";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-[180px] w-[300px] shrink-0 flex-col gap-3 overflow-hidden rounded-[20px] bg-muted p-3 md:h-[240px] md:w-[411px] md:gap-6 md:rounded-[30px] md:p-4">
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex items-start gap-2 md:gap-4">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full md:size-10">
            <Image
              src={review.avatar}
              alt={review.name}
              fill
              unoptimized
              loading="eager"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-sans text-sm text-ink md:text-[20px]">{review.name}</p>
            <p className="font-sans text-xs text-ink/50 md:text-base">
              {review.reviewDate}
            </p>
          </div>
        </div>
        <div className="scale-75 origin-right md:scale-100">
          <Stars rating={review.rating} />
        </div>
      </div>

      <p className="line-clamp-4 font-sans text-xs leading-normal text-ink md:line-clamp-5 md:text-base">
        {review.text}
      </p>
    </article>
  );
}
