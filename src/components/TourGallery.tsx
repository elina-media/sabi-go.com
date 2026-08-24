"use client";

import { useState } from "react";
import Image from "next/image";
import type { TourImage } from "@/data/tours";

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      className={direction === "right" ? "rotate-180" : undefined}
      aria-hidden
    >
      <path
        d="M8 1L1.5 7.5L8 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function TourGallery({
  images,
  badge,
}: {
  images: TourImage[];
  badge?: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  function showPrevious() {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="relative h-[350px] w-full overflow-hidden rounded-[30px]">
      <Image
        src={images[index].src}
        alt={images[index].alt}
        fill
        unoptimized
        className="object-cover"
      />

      {badge && (
        <span className="absolute right-4 top-4 flex h-[30px] items-center rounded-full bg-white/16 px-4 text-base text-white backdrop-blur-[3.5px]">
          {badge}
        </span>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white"
          >
            <Chevron direction="right" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((image, i) => (
              <span
                key={image.src}
                className={`size-1.5 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
