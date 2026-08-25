import Link from "next/link";
import type { Tour } from "@/data/tours";
import TourGallery from "./TourGallery";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex flex-col">
      <TourGallery images={tour.images} badge={tour.badge} />

      <h3 className="mt-3 line-clamp-2 min-h-[40px] font-sans text-[15px] leading-tight text-ink md:mt-6 md:min-h-[60px] md:text-2xl">
        {tour.title}
      </h3>

      <span className="mt-2 inline-flex h-[36px] w-fit items-center justify-center rounded-full bg-muted px-3 font-sans text-sm text-ink md:mt-4 md:h-[50px] md:px-5 md:text-2xl">
        {tour.price}
      </span>

      <div className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-2">
        <Link
          href={tour.bookHref}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-accent text-sm tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover md:h-[50px] md:max-w-[220px] md:text-[22px]"
        >
          Book a tour
        </Link>
        <Link
          href={tour.moreHref}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-ink text-sm tracking-[-0.5px] text-white transition-colors hover:bg-[#3a3a3a] md:h-[50px] md:max-w-[220px] md:text-[22px]"
        >
          More
        </Link>
      </div>
    </article>
  );
}
