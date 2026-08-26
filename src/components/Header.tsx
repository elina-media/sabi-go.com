"use client";

import { useEffect, useState } from "react";
import NavbarContent from "./NavbarContent";
import { useMobileMenu } from "./MobileMenuProvider";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const { isOpen } = useMobileMenu();

  useEffect(() => {
    // Hero's height varies per breakpoint (h-dvh on mobile, fixed px on
    // tablet/desktop), so a hardcoded scroll-position threshold can't track
    // it reliably. Watching Hero (#main) directly works at any height.
    const heroEl = document.getElementById("main");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-4 top-4 z-[70] flex h-16 items-center rounded-[25px] px-4 transition-all duration-300 xl:h-[100px] xl:px-10 ${
        isOpen ? "bg-transparent pointer-events-none xl:pointer-events-auto" : "bg-ink/40 backdrop-blur-md"
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
