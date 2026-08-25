"use client";

import { useState, type FormEvent } from "react";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

export default function PrivateTourForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
    };

    // No backend yet — request is only logged locally.
    // TODO: send `data` to the Telegram bot / Google Sheets API route once it exists.
    console.log("Private tour request:", data);
    await new Promise((resolve) => setTimeout(resolve, 400));

    form.reset();
    setStatus("success");
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
    <form onSubmit={handleSubmit} className="flex w-full max-w-[518px] flex-col">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="fullName"
          required
          placeholder="Full name"
          autoComplete="name"
          className={inputClassName}
        />
        <input
          type="tel"
          name="whatsapp"
          required
          placeholder="WhatsApp number"
          autoComplete="tel"
          className={inputClassName}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="E-mail"
          autoComplete="email"
          className={inputClassName}
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit a request"}
      </button>
    </form>
  );
}
