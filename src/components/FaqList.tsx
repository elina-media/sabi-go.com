"use client";

import { useState } from "react";
import type { FaqEntry } from "@/data/faq";
import FaqItem from "./FaqItem";

export default function FaqList({ entries }: { entries: FaqEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-2 md:mt-16 md:grid-cols-2 md:gap-2">
      {entries.map((entry) => (
        <FaqItem
          key={entry.id}
          entry={entry}
          isOpen={openId === entry.id}
          onToggle={() => toggle(entry.id)}
        />
      ))}
    </div>
  );
}
