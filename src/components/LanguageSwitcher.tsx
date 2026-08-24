"use client";

import { useEffect, useRef, useState } from "react";
import GlobeIcon from "./GlobeIcon";
import { useLanguage } from "./LanguageProvider";

const allLanguages = ["ENG", "RU", "KZ", "العربية"];

export default function LanguageSwitcher({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { current, setCurrent } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const options = allLanguages.filter((lang) => lang !== current);
  const triggerColor = theme === "dark" ? "text-ink" : "text-white";

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        className={`flex items-center gap-1.5 text-base ${triggerColor}`}
      >
        <GlobeIcon />
        <span>{current}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* No gap between trigger and dropdown — a gap here creates a "dead
          zone" with nothing rendered in it, so the mouse briefly leaves the
          hoverable region while moving from the trigger to the dropdown,
          React unmounts the dropdown on mouseleave, and it vanishes before
          you can reach it. Visual breathing room comes from `pt-1` inside
          the dropdown instead of a margin outside it. */}
      {isOpen && (
        <ul className="absolute left-0 top-full z-10 flex min-w-[88px] flex-col overflow-hidden rounded-xl bg-white py-1 pt-1 shadow-lg">
          {options.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                onClick={() => {
                  setCurrent(lang);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-base text-ink transition-colors hover:bg-muted"
              >
                {lang}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
