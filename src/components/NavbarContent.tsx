"use client";

import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import MenuToggleIcon from "./MenuToggleIcon";
import ScrollLink from "./ScrollLink";
import { useMobileMenu } from "./MobileMenuProvider";

const navLinks = [
  { label: "Main", href: "#main" },
  { label: "Tours", href: "#tours" },
  { label: "Private tour", href: "#private-tour" },
  { label: "Reviews", href: "#reviews" },
  { label: "Education", href: "#" },
  { label: "Contacts", href: "#contacts" },
];

export default function NavbarContent({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const { isOpen, setIsOpen } = useMobileMenu();
  const textColor = theme === "dark" ? "text-ink" : "text-white";
  const logoSrc = theme === "dark" ? "/hero/logo-dark.svg" : "/hero/logo.svg";

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
        <Image
          src={logoSrc}
          alt="Sabi Go Travel"
          width={130}
          height={31}
          unoptimized
          className={`h-[31px] w-[130px] transition-opacity duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />

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
        <Image src={logoSrc} alt="Sabi Go Travel" width={193} height={46} unoptimized className="h-[46px] w-[193px]" />

        <ul className={`flex items-center justify-center gap-6 text-base ${textColor}`}>
          {navLinks.map((link) => (
            <li key={link.label} className="whitespace-nowrap">
              <ScrollLink href={link.href} className="transition-colors hover:text-accent">
                {link.label}
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
            className="flex items-center gap-2"
          >
            <span className="flex size-[30px] items-center justify-center rounded-full bg-white">
              <Image
                src="/hero/whatsapp.svg"
                alt="WhatsApp"
                width={16}
                height={16}
                unoptimized
              />
            </span>
            <p className={`text-base ${textColor}`}>+7 (702) 985 5133</p>
          </a>
        </div>
      </div>
    </>
  );
}
