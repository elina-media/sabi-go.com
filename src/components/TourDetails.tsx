"use client";

import { useState } from "react";
import Image from "next/image";
import type { Tour } from "@/data/tours";

const categories = [
  { key: "timing", label: "Timing" },
  { key: "inclusive", label: "Inclusive" },
  { key: "exclusive", label: "Exclusive" },
  { key: "additionalInfo", label: "Additional information" },
] as const;

export default function TourDetails({ tour }: { tour: Tour }) {
  const [openKey, setOpenKey] = useState<
    (typeof categories)[number]["key"] | null
  >(null);

  return (
    <section className="mx-auto w-full max-w-[800px] px-4 py-12 md:py-20">
      <div className="flex flex-col gap-2">
        {categories.map(({ key, label }) => {
          const items = tour[key];
          const isOpen = openKey === key;

          return (
            <div
              key={key}
              className="rounded-2xl bg-muted px-4 md:portrait:px-5 lg:px-5 xl:px-6"
            >
              <button
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                aria-expanded={isOpen}
                className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left md:portrait:min-h-[62px] md:portrait:gap-3.5 md:portrait:py-4 lg:min-h-[66px] lg:gap-4 lg:py-4 xl:min-h-[70px] xl:gap-4 xl:py-5"
              >
                <span className="font-sans text-sm text-ink md:portrait:text-base lg:text-base xl:text-lg">
                  {label}
                </span>
                <Image
                  src="/faq/plus.svg"
                  alt=""
                  width={50}
                  height={50}
                  unoptimized
                  className={`size-8 shrink-0 transition-transform duration-300 md:portrait:size-10 lg:size-11 xl:size-[50px] ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="flex flex-col gap-1 pb-4 font-sans text-xs leading-normal text-ink/70 md:portrait:pb-5 md:portrait:text-sm lg:pb-5 lg:text-sm xl:pb-6 xl:text-base">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
