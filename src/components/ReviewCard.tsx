import Image from "next/image";
import type { Review } from "@/data/reviews";
import Stars from "./Stars";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-[180px] w-[300px] shrink-0 flex-col gap-3 overflow-hidden rounded-[20px] bg-muted p-3 md:portrait:h-[210px] md:portrait:w-[350px] md:portrait:gap-4 md:portrait:rounded-[24px] md:portrait:p-3.5 lg:h-[225px] lg:w-[380px] lg:gap-5 lg:rounded-[27px] lg:p-4 xl:h-[240px] xl:w-[411px] xl:gap-6 xl:rounded-[30px]">
      <div className="flex shrink-0 items-start justify-between">
        <div className="flex items-start gap-2 md:portrait:gap-3 lg:gap-3 xl:gap-4">
          <div className="relative size-8 shrink-0 overflow-hidden rounded-full md:portrait:size-9 lg:size-9 xl:size-10">
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
            <p className="font-sans text-sm text-ink md:portrait:text-base lg:text-lg xl:text-[20px]">{review.name}</p>
            <p className="font-sans text-xs text-ink/50 md:portrait:text-sm lg:text-sm xl:text-base">
              {review.reviewDate}
            </p>
          </div>
        </div>
        <div className="scale-75 origin-right md:portrait:scale-90 lg:scale-95 xl:scale-100">
          <Stars rating={review.rating} />
        </div>
      </div>

      <p className="line-clamp-4 font-sans text-xs leading-normal text-ink md:portrait:text-sm lg:text-sm xl:line-clamp-5 xl:text-base">
        {review.text}
      </p>
    </article>
  );
}
