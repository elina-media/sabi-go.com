"use client";

import { faq } from "@/data/faq";
import FaqList from "./FaqList";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function Faq() {
  const t = useT();
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <h2 className="mx-auto text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
        {t(copy.faq.heading)}
      </h2>

      <FaqList entries={faq} />
    </section>
  );
}
