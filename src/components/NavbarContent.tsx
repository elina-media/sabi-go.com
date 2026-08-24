import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const navLinks = [
  { label: "Main", href: "#main" },
  { label: "Tours", href: "#tours" },
  { label: "Private tour", href: "#private-tour" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contacts", href: "#contacts" },
];

export default function NavbarContent({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const textColor = theme === "dark" ? "text-ink" : "text-white";

  return (
    <div className="grid w-full grid-cols-3 items-center">
      <Image
        src={theme === "dark" ? "/hero/logo-dark.svg" : "/hero/logo.svg"}
        alt="Sabi Go Travel"
        width={193}
        height={46}
        className="h-[46px] w-[193px]"
      />

      <ul className={`flex items-center justify-center gap-6 text-base ${textColor}`}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="transition-colors hover:text-accent">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end gap-8">
        <LanguageSwitcher theme={theme} />

        <div className="flex items-center gap-2">
          <span className="flex size-[30px] items-center justify-center rounded-full bg-white">
            <Image
              src="/hero/whatsapp.svg"
              alt="WhatsApp"
              width={16}
              height={16}
            />
          </span>
          <p className={`text-base ${textColor}`}>+7 (777) 747 3243</p>
        </div>
      </div>
    </div>
  );
}
