"use client";

import Image from "next/image";
import type { FaqEntry } from "@/data/faq";
import { useT } from "@/lib/i18n";

export default function FaqItem({
  entry,
  isOpen,
  onToggle,
}: {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useT();
  return (
    <div className="rounded-2xl bg-muted px-4 md:portrait:px-5 lg:px-5 xl:px-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left md:portrait:min-h-[62px] md:portrait:gap-3.5 md:portrait:py-4 lg:min-h-[66px] lg:gap-4 lg:py-4 xl:min-h-[70px] xl:gap-4 xl:py-5"
      >
        <span className="font-sans text-sm text-ink md:portrait:text-base lg:text-base xl:text-lg">
          {t(entry.question)}
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
          <p className="pb-4 font-sans text-xs leading-normal text-ink/70 md:portrait:pb-5 md:portrait:text-sm lg:pb-5 lg:text-sm xl:pb-6 xl:text-base">
            {t(entry.answer)}
          </p>
        </div>
      </div>
    </div>
  );
}
