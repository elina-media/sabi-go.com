"use client";

import { useState } from "react";
import { faq } from "@/data/faq";
import FaqItem from "./FaqItem";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <h2 className="mx-auto text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:text-[60px] md:leading-[1.1]">
        Got <span className="font-accent italic text-accent">Questions</span>?
        <br />
        We&rsquo;ve Got <span className="font-accent italic text-accent">Answers</span>
      </h2>

      <div className="mt-8 grid grid-cols-1 items-start gap-2 md:mt-16 md:grid-cols-2 md:gap-2">
        {faq.map((entry) => (
          <FaqItem
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => toggle(entry.id)}
          />
        ))}
      </div>
    </section>
  );
}
