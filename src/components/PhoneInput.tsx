"use client";

import PhoneNumberInput from "react-phone-number-input";

type Background = "white" | "muted";

const backgroundClassName: Record<Background, string> = {
  white: "bg-white",
  muted: "bg-muted",
};

export default function PhoneInput({
  value,
  onChange,
  background,
}: {
  value: string;
  onChange: (value: string) => void;
  background: Background;
}) {
  return (
    <PhoneNumberInput
      international
      defaultCountry="KZ"
      value={value}
      onChange={(next) => onChange(next ?? "")}
      placeholder="WhatsApp number"
      className={`flex h-[50px] w-full items-center rounded-[70px] ${backgroundClassName[background]} px-6 font-sans text-[20px] text-ink focus-within:ring-2 focus-within:ring-accent [&_.PhoneInputInput]:h-full [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:font-sans [&_.PhoneInputInput]:text-[20px] [&_.PhoneInputInput]:text-ink [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:placeholder:text-ink/50`}
    />
  );
}
