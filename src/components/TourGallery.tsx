"use client";

import { useState } from "react";
import Image from "next/image";
import type { TourImage } from "@/data/tours";
import type { Localized } from "@/lib/i18n";
import { useT } from "@/lib/i18n";
import { copy } from "@/data/copy";

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
  badge?: Localized<string>;
}) {
  const [index, setIndex] = useState(0);
  const t = useT();
  const hasMultiple = images.length > 1;

  function showPrevious() {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setIndex((current) => (current + 1) % images.length);
  }

  return (
    <div className="relative h-[160px] w-full overflow-hidden rounded-[16px] md:portrait:h-[220px] md:portrait:rounded-[20px] lg:h-[280px] lg:rounded-[26px] xl:h-[350px] xl:rounded-[30px]">
      <Image
        src={images[index].src}
        alt={images[index].alt}
        fill
        unoptimized
        className="object-cover"
      />

      {badge && (
        <span className="absolute right-2 top-2 flex h-[22px] items-center rounded-full bg-white/16 px-2.5 text-xs text-white backdrop-blur-[3.5px] md:portrait:right-3 md:portrait:top-3 md:portrait:h-[26px] md:portrait:px-3 md:portrait:text-sm lg:right-3 lg:top-3 lg:h-[28px] lg:px-3.5 lg:text-sm xl:right-4 xl:top-4 xl:h-[30px] xl:px-4 xl:text-base">
          {t(badge)}
        </span>
      )}

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={t(copy.a11y.previousPhoto)}
            className="absolute left-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white md:portrait:left-2.5 md:portrait:size-8 lg:left-3 lg:size-8 xl:left-3 xl:size-9"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={t(copy.a11y.nextPhoto)}
            className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white md:portrait:right-2.5 md:portrait:size-8 lg:right-3 lg:size-8 xl:right-3 xl:size-9"
          >
            <Chevron direction="right" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:portrait:bottom-2.5 lg:bottom-3 xl:bottom-3">
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
