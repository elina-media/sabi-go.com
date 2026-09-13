"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { copy } from "@/data/copy";
import { useT, type Localized } from "@/lib/i18n";

type CountFeature = {
  id: string;
  image: string;
  imageAlt: string;
  kind: "count";
  value: number;
  styledSuffix: Localized<string>;
  restText: Localized<string>;
};

type TextFeature = {
  id: string;
  image: string;
  imageAlt: string;
  kind: "text";
  label: Localized<ReactNode>;
};

const features: (CountFeature | TextFeature)[] = [
  {
    id: "destinations",
    image: "/features/destinations.webp",
    imageAlt: "Map of Kazakhstan with tour destinations marked",
    kind: "count",
    value: copy.features.destinations.value,
    styledSuffix: copy.features.destinations.styledSuffix,
    restText: copy.features.destinations.restText,
  },
  {
    id: "seasons",
    image: "/features/seasons.webp",
    imageAlt: "Tour van",
    kind: "count",
    value: copy.features.seasons.value,
    styledSuffix: copy.features.seasons.styledSuffix,
    restText: copy.features.seasons.restText,
  },
  {
    id: "groups",
    image: "/features/groups.webp",
    imageAlt: "Camping tent",
    kind: "text",
    label: copy.features.groups,
  },
  {
    id: "guides",
    image: "/features/guides.webp",
    imageAlt: "Passport",
    kind: "count",
    value: copy.features.guides.value,
    styledSuffix: copy.features.guides.styledSuffix,
    restText: copy.features.guides.restText,
  },
];

export default function Features() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <Reveal>
        <h2 className="mx-auto max-w-[624px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
          {t(copy.features.heading)}
        </h2>
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:portrait:grid-cols-4 lg:grid-cols-4 lg:gap-6">
        {features.map((feature, index) => (
          <Reveal
            key={feature.id}
            delay={index * 0.08}
            className="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[20px] bg-muted p-3 md:portrait:h-[220px] md:portrait:rounded-[24px] lg:h-[260px] lg:rounded-[28px] lg:p-4 xl:h-[300px] xl:rounded-[30px]"
          >
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              unoptimized
              className="pointer-events-none object-cover"
            />
            <p className="relative font-sans text-[clamp(15px,4vw,18px)] font-medium leading-[1.15] text-ink md:portrait:text-[22px] lg:text-[26px] xl:text-[32px] xl:leading-[1.1]">
              {feature.kind === "count" ? (
                <>
                  <span className="font-accent italic">
                    <CountUp value={feature.value} />
                    {t(feature.styledSuffix)}
                  </span>
                  {t(feature.restText)}
                </>
              ) : (
                t(feature.label)
              )}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
