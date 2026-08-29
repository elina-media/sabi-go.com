"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type BookingModalContextValue = {
  tourName: string | null;
  open: (tourName: string) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [tourName, setTourName] = useState<string | null>(null);

  return (
    <BookingModalContext.Provider
      value={{
        tourName,
        open: (name: string) => setTourName(name),
        close: () => setTourName(null),
      }}
    >
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error(
      "useBookingModal must be used within a BookingModalProvider",
    );
  }
  return context;
}
