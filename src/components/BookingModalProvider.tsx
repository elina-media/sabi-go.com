"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Tour } from "@/data/tours";

type BookingModalContextValue = {
  tour: Tour | null;
  open: (tour: Tour) => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [tour, setTour] = useState<Tour | null>(null);

  return (
    <BookingModalContext.Provider
      value={{
        tour,
        open: (nextTour: Tour) => setTour(nextTour),
        close: () => setTour(null),
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
