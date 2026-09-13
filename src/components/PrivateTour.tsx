// src/components/PrivateTour.tsx
"use client";

import PrivateTourForm from "./PrivateTourForm";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function PrivateTour() {
  const t = useT();

  return (
    <section
      id="private-tour"
      className="mx-auto w-full max-w-[1920px] scroll-mt-[140px] p-4"
    >
      <div className="relative flex flex-col items-center justify-center gap-6 overflow-hidden rounded-[40px] px-6 py-12 md:portrait:h-[420px] md:portrait:px-10 md:portrait:py-0 lg:h-[500px] lg:px-14 xl:h-[569px] xl:px-16">
        <video
          src="/private-tour/background.mp4"
          poster="/private-tour/background-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <Reveal className="relative flex max-w-[518px] flex-col gap-2 text-center">
          <h2 className="font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-white md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
            {t(copy.privateTour.heading)}
          </h2>
          <p className="font-sans text-[clamp(17px,4.8vw,24px)] leading-tight text-white">
            {t(copy.privateTour.subtitle)}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="relative flex w-full justify-center">
          <PrivateTourForm />
        </Reveal>
      </div>
    </section>
  );
}
