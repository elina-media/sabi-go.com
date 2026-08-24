"use client";

import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";

// Hero section is h-[750px] plus its own p-4 (16px top/bottom) — this
// fades in once the user has scrolled past it.
const SCROLL_THRESHOLD = 700;

export default function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-4 top-4 z-50 flex h-[100px] items-center rounded-[25px] bg-ink/40 px-10 backdrop-blur-md transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <NavbarContent theme="light" />
    </header>
  );
}
