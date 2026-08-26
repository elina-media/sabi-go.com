"use client";

import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";
import { useMobileMenu } from "./MobileMenuProvider";

// Hero section is h-[750px] plus its own p-4 (16px top/bottom) — this
// fades in once the user has scrolled past it.
const SCROLL_THRESHOLD = 700;

export default function Header() {
  const [visible, setVisible] = useState(false);
  const { isOpen } = useMobileMenu();

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
      className={`fixed inset-x-4 top-4 z-[70] flex h-16 items-center rounded-[25px] px-4 transition-all duration-300 md:h-[100px] md:px-10 ${
        isOpen ? "bg-transparent pointer-events-none md:pointer-events-auto" : "bg-ink/40 backdrop-blur-md"
      } ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0"
      }`}
    >
      <NavbarContent theme="light" />
    </header>
  );
}
