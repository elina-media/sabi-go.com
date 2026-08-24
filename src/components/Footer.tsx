import Image from "next/image";

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
      <div className="rounded-[40px] bg-ink p-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Image
              src="/hero/logo.svg"
              alt="Sabi Go Travel"
              width={193}
              height={46}
              className="h-[46px] w-[193px]"
            />
          </div>

          <div className="col-span-3 flex flex-col gap-4">
            <p className="font-sans text-xl text-white">
              Social Media &amp; Contacts
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex size-10 items-center justify-center rounded-full bg-white transition-colors hover:bg-white/80"
                >
                  <Image
                    src={social.icon}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 font-sans text-base text-white/70">
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
            <p className="font-sans text-xl text-white">Menu</p>
            {menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-base text-white/70 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="col-span-3 flex flex-col gap-2">
            <p className="font-sans text-xl text-white">Documentation</p>
            {documentationLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-sans text-base text-white/70 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-20 font-sans text-sm text-white/50">
          TOO &ldquo;Sabi Go Travel&rdquo; 2025
        </p>
      </div>
    </footer>
  );
}
