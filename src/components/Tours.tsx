"use client";

import { tours } from "@/data/tours";
import TourCard from "./TourCard";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function Tours() {
  const t = useT();
  return (
    <section
      id="tours"
      className="mx-auto max-w-[1280px] scroll-mt-[140px] px-4 py-12 md:py-20"
    >
      <Reveal>
        <h2 className="mx-auto max-w-[552px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.tours.heading)}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-16 md:portrait:grid-cols-3 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
        {tours.map((tour, index) => (
          <Reveal key={tour.id} delay={index * 0.08}>
            <TourCard tour={tour} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
