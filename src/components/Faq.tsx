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
    <section className="mx-auto max-w-[1280px] px-4 py-20">
      <h2 className="mx-auto text-center font-sans text-[60px] font-medium leading-[1.1] text-ink">
        Got <span className="font-accent italic">Questions</span>?
        <br />
        We&rsquo;ve Got <span className="font-accent italic">Answers</span>
      </h2>

      <div className="mt-16 grid grid-cols-2 items-start gap-6">
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
