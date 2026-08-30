"use client";

import { useState, type FormEvent } from "react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import PhoneInput from "./PhoneInput";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

export default function PrivateTourForm() {
  const { status, submit } = useLeadSubmit();
  const [whatsapp, setWhatsapp] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    await submit({
      tour: "Private tour",
      seats: 1,
      totalPrice: "",
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
    });
  }

  if (status === "success") {
    return (
      <div className="flex w-full max-w-[518px] flex-col gap-2 rounded-[30px] bg-white px-6 py-5 text-ink">
        <p className="font-sans text-2xl font-medium">Thank you!</p>
        <p className="font-sans text-lg">
          We&rsquo;ve received your request and will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[518px] flex-col"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
      />
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="fullName"
          required
          placeholder="Full name"
          autoComplete="name"
          className={inputClassName}
        />
        <PhoneInput value={whatsapp} onChange={setWhatsapp} background="white" />
        <input
          type="email"
          name="email"
          required
          placeholder="E-mail"
          autoComplete="email"
          className={inputClassName}
        />
      </div>

      {status === "error" && (
        <p className="mt-2 font-sans text-sm text-red-300">
          Couldn&rsquo;t send your request — please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting" || !isValidPhoneNumber(whatsapp)}
        className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit a request"}
      </button>
    </form>
  );
}
