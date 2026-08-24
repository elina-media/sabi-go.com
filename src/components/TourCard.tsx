import Link from "next/link";
import type { Tour } from "@/data/tours";
import TourGallery from "./TourGallery";

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="flex flex-col">
      <TourGallery images={tour.images} badge={tour.badge} />

      <h3 className="mt-6 line-clamp-2 min-h-[60px] font-sans text-2xl leading-tight text-ink">
        {tour.title}
      </h3>

      <span className="mt-4 inline-flex h-[50px] w-fit items-center justify-center rounded-full bg-muted px-5 font-sans text-2xl text-ink">
        {tour.price}
      </span>

      <div className="mt-4 flex flex-col gap-2">
        <Link
          href={tour.bookHref}
          className="flex h-[60px] w-full max-w-[302px] items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover"
        >
          Book a tour
        </Link>
        <Link
          href={tour.moreHref}
          className="flex h-[60px] w-full max-w-[302px] items-center justify-center rounded-full bg-ink text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-[#3a3a3a]"
        >
          More
        </Link>
      </div>
    </article>
  );
}
