import Image from "next/image";
import ScrollLink from "./ScrollLink";

const menuLinks = [
  { label: "Main", href: "#main" },
  { label: "Tours", href: "#tours" },
  { label: "Private tour", href: "#private-tour" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contacts", href: "#contacts" },
];

const documentationLinks = ["Privacy Policy", "Public Offer Agreement"];

const socialLinks = [
  { name: "WhatsApp", icon: "/footer/whatsapp.svg", href: "#" },
  { name: "Telegram", icon: "/footer/telegram.svg", href: "#" },
  { name: "Instagram", icon: "/footer/instagram.svg", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contacts" className="w-full scroll-mt-[140px] p-4">
      <div className="rounded-[24px] bg-ink p-6 md:portrait:rounded-[32px] md:portrait:p-10 lg:rounded-[40px] lg:p-16">
        <div className="grid grid-cols-1 gap-8 md:portrait:grid-cols-12 md:portrait:gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="col-span-3">
            <Image
              src="/hero/logo.svg"
              alt="Sabi Go Travel"
              width={193}
              height={46}
              unoptimized
              className="h-[38px] w-[160px] md:portrait:h-[42px] md:portrait:w-[175px] lg:h-[46px] lg:w-[193px]"
            />
          </div>

          <div className="col-span-3 flex flex-col gap-4">
            <p className="font-sans text-lg text-white lg:text-xl">
              Social Media &amp; Contacts
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
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
              ))}
            </div>
            <div className="flex flex-col gap-2 font-sans text-sm text-white/70 lg:text-base">
              <a href="tel:+77777473243" className="hover:text-white">
                +7 (777) 747 3243
              </a>
              <a
                href="mailto:sabi-go-travel@gmail.com"
                className="hover:text-white"
              >
                sabi-go-travel@gmail.com
              </a>
            </div>
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">Menu</p>
            {menuLinks.map((link) => (
              <ScrollLink
                key={link.label}
                href={link.href}
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-lg text-white lg:text-xl">Documentation</p>
            {documentationLinks.map((link) => (
              <ScrollLink
                key={link}
                href="#"
                className="font-sans text-sm text-white/70 hover:text-white lg:text-base"
              >
                {link}
              </ScrollLink>
            ))}
          </div>
        </div>

        <p className="mt-10 font-sans text-sm text-white/50 md:portrait:mt-16 lg:mt-20">
          TOO &ldquo;Sabi Go Travel&rdquo; 2025
        </p>
      </div>
    </footer>
  );
}
