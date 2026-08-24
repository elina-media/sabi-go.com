"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type LanguageContextValue = {
  current: string;
  setCurrent: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState("ENG");

  return (
    <LanguageContext.Provider value={{ current, setCurrent }}>
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
