"use client";

import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import MenuToggleIcon from "./MenuToggleIcon";
import ScrollLink from "./ScrollLink";
import { useMobileMenu } from "./MobileMenuProvider";
import { navLinks, copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function NavbarContent({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const { isOpen, setIsOpen } = useMobileMenu();
  const t = useT();
  const textColor = theme === "dark" ? "text-ink" : "text-white";

  return (
    <>
      {/* Mobile: logo + round hamburger button, toggles the shared drawer
          (rendered once by <MobileMenu />, not here — this component mounts
          twice, once in Hero, once in the sticky Header). z-[60] keeps this
          row above the drawer/backdrop regardless of which instance is
          currently visible. */}
      <div
        className={`relative z-[60] flex w-full items-center justify-between xl:hidden ${
          isOpen ? "pointer-events-none" : ""
        }`}
      >
        <Link
          href="/"
          className={`transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <Image
            src="/hero/logo.webp"
            alt="Sabi Go Travel"
            width={42}
            height={44}
            unoptimized
            className="h-[44px] w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Menu"}
          aria-expanded={isOpen}
          className={`pointer-events-auto flex size-11 items-center justify-center rounded-full backdrop-blur-[3.5px] ${textColor} ${
            theme === "dark" ? "bg-ink/10" : "bg-white/16"
          }`}
        >
          <MenuToggleIcon open={isOpen} className="size-5" />
        </button>
      </div>

      {/* Desktop: full nav — logo, links, language switcher, phone. */}
      <div className="hidden w-full grid-cols-3 items-center xl:grid">
        <Link href="/" className="relative z-10">
          <Image
            src="/hero/logo.webp"
            alt="Sabi Go Travel"
            width={68}
            height={72}
            unoptimized
            className="h-[72px] w-auto"
          />
        </Link>

        <ul className={`flex items-center justify-center gap-6 text-base ${textColor}`}>
          {navLinks.map((link) => (
            <li key={link.href} className="whitespace-nowrap">
              <ScrollLink href={link.href} className="transition-colors hover:text-accent">
                {t(link.label)}
              </ScrollLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-8">
          <LanguageSwitcher theme={theme} />

          <a
            href="https://wa.me/77029855133"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-[50px] items-center gap-2 rounded-full bg-white pl-3 pr-5 text-ink transition-colors hover:bg-white/90"
          >
            <Image
              src="/hero/whatsapp.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              unoptimized
            />
            <span className="text-base">{t(copy.nav.writeOnWhatsapp)}</span>
          </a>
        </div>
      </div>
    </>
  );
}
