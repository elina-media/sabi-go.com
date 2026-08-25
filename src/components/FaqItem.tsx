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
    <div className="rounded-2xl bg-muted px-4 md:px-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 py-3 text-left md:min-h-[70px] md:gap-4 md:py-5"
      >
        <span className="font-sans text-sm text-ink md:text-lg">{entry.question}</span>
        <Image
          src="/faq/plus.svg"
          alt=""
          width={50}
          height={50}
          className={`size-8 shrink-0 transition-transform duration-300 md:size-[50px] ${
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
          <p className="pb-4 font-sans text-xs leading-normal text-ink/70 md:pb-6 md:text-base">
            {entry.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
