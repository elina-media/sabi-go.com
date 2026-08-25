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
        className={`fixed inset-y-0 right-0 z-[58] flex w-[82%] max-w-[340px] flex-col gap-8 overflow-y-auto bg-ink/90 p-6 pt-24 backdrop-blur-md transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Image
          src="/hero/logo.svg"
          alt="Sabi Go Travel"
          width={150}
          height={36}
          className="h-[36px] w-[150px]"
        />

        <LanguageSwitcher theme="light" />

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

        <div className="flex items-center gap-2">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-white">
            <Image
              src="/hero/whatsapp.svg"
              alt="WhatsApp"
              width={16}
              height={16}
            />
          </span>
          <p className="text-base text-white">+7 (777) 747 3243</p>
        </div>

        <a
          href="https://wa.me/77777473243"
          className="mt-auto flex h-[50px] w-full shrink-0 items-center justify-center rounded-full bg-accent text-[18px] text-white transition-colors hover:bg-accent-hover"
        >
          Write on WhatsApp
        </a>
      </div>
    </>,
    document.body,
  );
}
