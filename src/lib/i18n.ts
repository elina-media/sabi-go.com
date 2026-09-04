"use client";

import { useLanguage } from "@/components/LanguageProvider";

export type Locale = "en" | "ru" | "kz" | "ar";

export type Localized<T = string> = Partial<Record<Locale, T>> & { en: T };

export function useT() {
  const { current } = useLanguage();
  return function t<T>(field: Localized<T>): T {
    return field[current] ?? field.en;
  };
}
