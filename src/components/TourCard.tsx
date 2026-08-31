"use client";

import Link from "next/link";
import type { Tour } from "@/data/tours";
import TourGallery from "./TourGallery";
import { useBookingModal } from "./BookingModalProvider";

export default function TourCard({ tour }: { tour: Tour }) {
  const { open } = useBookingModal();

  return (
    <article className="flex flex-col">
      <TourGallery images={tour.images} badge={tour.badge} />

      <h3 className="mt-3 line-clamp-2 min-h-[40px] font-sans text-[15px] leading-tight text-ink md:mt-6 md:portrait:min-h-[48px] md:portrait:text-lg lg:min-h-[54px] lg:text-xl xl:min-h-[60px] xl:text-2xl">
        {tour.title}
      </h3>

      <span className="mt-2 inline-flex h-[36px] w-fit items-center justify-center rounded-full bg-muted px-3 font-sans text-sm text-ink md:mt-4 md:portrait:h-[42px] md:portrait:px-4 md:portrait:text-base lg:h-[46px] lg:px-4 lg:text-lg xl:h-[50px] xl:px-5 xl:text-2xl">
        {tour.price}
      </span>

      <div className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-2">
        <button
          type="button"
          onClick={() => open(tour)}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-accent text-sm tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
        >
          Book a tour
        </button>
        <Link
          href={`/tours/${tour.id}`}
          className="flex h-[40px] w-full items-center justify-center rounded-full bg-ink text-sm tracking-[-0.5px] text-white transition-colors hover:bg-ink-hover md:portrait:h-[44px] md:portrait:text-base lg:h-[48px] lg:text-lg xl:h-[50px] xl:max-w-[220px] xl:text-[22px]"
        >
          More
        </Link>
      </div>
    </article>
  );
}
