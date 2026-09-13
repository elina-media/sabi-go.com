"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollLink from "./ScrollLink";
import Reveal from "./Reveal";
import { navLinks, documentationLinks, copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

const socialLinks = [
  {
    name: "WhatsApp",
    icon: "/footer/whatsapp.svg",
    href: "https://wa.me/77029855133",
  },
  {
    name: "Telegram",
    icon: "/footer/telegram.svg",
    href: "https://t.me/sabigotravel",
  },
  {
    name: "Instagram",
    icon: "/footer/instagram.svg",
    href: "https://www.instagram.com/sabigo_kz",
  },
];

export default function Footer() {
  const t = useT();
  return (
    <footer id="contacts" className="w-full scroll-mt-[140px] p-4">
      <Reveal className="rounded-[24px] bg-ink p-6 md:portrait:rounded-[32px] md:portrait:p-10 lg:rounded-[40px] lg:p-16">
        <div className="grid grid-cols-1 gap-8 md:portrait:grid-cols-12 md:portrait:gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-3">
            <Link href="/">
              <Image
                src="/hero/logo.webp"
                alt="Sabi Go Travel"
                width={68}
                height={72}
                unoptimized
                className="h-[64px] w-auto md:portrait:h-[80px] lg:h-[96px]"
              />
            </Link>
          </div>

          <div className="col-span-3 flex flex-col gap-4">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.socialContacts)}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) =>
                social.href.startsWith("http") ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80 lg:size-10"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                    />
                  </a>
                ) : (
                  <ScrollLink
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80 lg:size-10"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={16}
                      height={16}
                      unoptimized
                    />
                  </ScrollLink>
                ),
              )}
            </div>
            <div className="flex flex-col gap-2 font-sans text-sm text-white/70 lg:text-base">
              <a href="tel:+77029855133" className="hover:text-white">
                +7 (702) 985 5133
              </a>
              <a
                href="mailto:sabigotravel@gmail.com"
                className="hover:text-white"
              >
                sabigotravel@gmail.com
              </a>
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.menu)}
            </p>
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {t(link.label)}
              </ScrollLink>
            ))}
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">
              {t(copy.footer.documentation)}
            </p>
            {documentationLinks.map((link) => (
              <ScrollLink
                key={link.en}
                href="#"
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {t(link)}
              </ScrollLink>
            ))}
          </div>
        </div>

        <p className="mt-10 font-sans text-sm text-white/50 md:portrait:mt-16 lg:mt-20">
          TOO &ldquo;Sabi Go Travel&rdquo; 2025
        </p>
      </Reveal>
    </footer>
  );
}
