import Image from "next/image";
import type { FaqEntry } from "@/data/faq";

export default function FaqItem({
  entry,
  isOpen,
  onToggle,
}: {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-muted px-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[70px] w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-sans text-lg text-ink">{entry.question}</span>
        <Image
          src="/faq/plus.svg"
          alt=""
          width={50}
          height={50}
          className={`shrink-0 transition-transform duration-300 ${
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
          <p className="pb-6 font-sans text-base leading-normal text-ink/70">
            {entry.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
