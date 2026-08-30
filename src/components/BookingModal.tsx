"use client";

import {
  useEffect,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import { useBookingModal } from "./BookingModalProvider";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-white px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

function subscribeNoop() {
  return () => {};
}

export default function BookingModal() {
  const { tourName, close } = useBookingModal();
  const { status, submit, reset } = useLeadSubmit();
  const isOpen = tourName !== null;

  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (tourName !== null) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourName]);

  function handleClose() {
    close();
    reset();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tourName) return;

    const form = event.currentTarget;
    await submit({
      tour: tourName,
      seats: 1,
      totalPrice: "",
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp: (form.elements.namedItem("whatsapp") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
    });
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div
        onClick={handleClose}
        aria-hidden
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      />

      <div className="fixed inset-0 z-[71] flex items-center justify-center p-4">
        <div className="relative flex w-full max-w-[518px] flex-col gap-4 rounded-[30px] bg-ink p-6">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-2xl leading-none text-white/70 transition-colors hover:text-white"
          >
            &times;
          </button>

          <h3 className="pr-8 font-sans text-2xl font-medium text-white">
            Book: {tourName}
          </h3>

          {status === "success" ? (
            <div className="flex flex-col gap-2 text-white">
              <p className="font-sans text-2xl font-medium">Thank you!</p>
              <p className="font-sans text-lg">
                We&rsquo;ve received your request and will contact you
                shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
              />
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

              {status === "error" && (
                <p className="mt-2 font-sans text-sm text-red-300">
                  Couldn&rsquo;t send your request — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit a request"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
