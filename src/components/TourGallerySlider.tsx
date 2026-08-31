"use client";

import { useEffect, useRef, useState } from "react";
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

export default function TourGallerySlider({
  images,
}: {
  images: TourImage[];
}) {
  const [index, setIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  function showPrevious() {
    setIndex((current) => Math.max(0, current - 1));
  }

  function showNext() {
    setIndex((current) => Math.min(images.length - 1, current + 1));
  }

  return (
    <section className="mx-auto w-full max-w-[1067px] px-4 py-6 md:py-14">
      <div className="relative h-[300px] w-full overflow-hidden rounded-[24px] md:portrait:h-[420px] lg:h-[420px] xl:h-[480px]">
        <Image
          src={images[index].src}
          alt={images[index].alt}
          fill
          unoptimized
          className="object-cover"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-40 md:portrait:size-11 lg:size-12 xl:size-14"
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={index === images.length - 1}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink transition-colors hover:bg-white disabled:pointer-events-none disabled:opacity-40 md:portrait:size-11 lg:size-12 xl:size-14"
            >
              <Chevron direction="right" />
            </button>

            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white md:portrait:text-base lg:text-base xl:px-4 xl:py-1.5 xl:text-lg">
              {index + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 [scrollbar-width:none] md:portrait:mt-4 md:portrait:gap-2 lg:mt-4 lg:gap-2 xl:mt-5 [&::-webkit-scrollbar]:hidden">
          {images.map((image, i) => (
            <button
              key={image.src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`relative h-20 shrink-0 overflow-hidden rounded-lg transition-[width] duration-300 md:portrait:h-24 lg:h-24 xl:h-28 ${
                i === index
                  ? "w-[120px] md:portrait:w-[150px] lg:w-[150px] xl:w-[175px]"
                  : "w-[35px] md:portrait:w-10 lg:w-10 xl:w-12"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                unoptimized
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
