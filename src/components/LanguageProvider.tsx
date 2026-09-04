"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "sabi-go-locale";

type LanguageContextValue = {
  current: Locale;
  setCurrent: (lang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "ru" || value === "kz" || value === "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Locale>("en");

  // Server always renders "en" (localStorage doesn't exist during SSR).
  // Read the stored preference after mount so hydration matches the
  // server output, then switch to it if one exists.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(stored);
    }
  }, []);

  function updateCurrent(lang: Locale) {
    setCurrent(lang);
    window.localStorage.setItem(STORAGE_KEY, lang);
  }

  return (
    <LanguageContext.Provider value={{ current, setCurrent: updateCurrent }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
