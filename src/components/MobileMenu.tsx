"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useMobileMenu } from "./MobileMenuProvider";

const navLinks = [
  { label: "Main", href: "#main" },
  { label: "Tours", href: "#tours" },
  { label: "Private tour", href: "#private-tour" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contacts", href: "#contacts" },
];

// Rendered once at the page level (not inside NavbarContent, which mounts
// twice — once in Hero, once in the sticky Header) so the drawer/backdrop
// only ever exist once in the DOM regardless of which trigger opened them.
export default function MobileMenu() {
  const { isOpen, setIsOpen } = useMobileMenu();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop — dims the rest of the site behind the drawer. */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Side drawer — slides in from the right, above everything else. */}
      <div
        className={`fixed inset-y-0 right-0 z-[58] flex w-[82%] max-w-[340px] flex-col gap-8 overflow-y-auto bg-ink/90 p-6 backdrop-blur-md transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <LanguageSwitcher theme="light" hoverable={false} />

        <ul className="flex flex-col gap-5 text-xl text-white">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="text-xl text-white/50">+7 (777) 747 3243</p>

        <a
          href="https://wa.me/77777473243"
          className="mt-auto flex h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white text-[18px] text-ink transition-colors hover:bg-white/90"
        >
          <Image src="/hero/whatsapp.svg" alt="" width={20} height={20} />
          Write on WhatsApp
        </a>
      </div>
    </>,
    document.body,
  );
}
