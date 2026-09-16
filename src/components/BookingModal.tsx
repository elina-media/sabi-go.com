"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useBookingModal } from "./BookingModalProvider";
import { useLeadSubmit } from "@/lib/useLeadSubmit";
import PhoneInput from "./PhoneInput";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

const inputClassName =
  "h-[50px] w-full rounded-[70px] bg-muted px-6 font-sans text-[20px] text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent";

const MIN_SEATS = 1;
const MAX_SEATS = 10;

function subscribeNoop() {
  return () => {};
}

function priceForSeats(price: string, seats: number): string {
  const match = price.match(/[\d.]+/);
  if (!match) return price;
  const perSeat = parseFloat(match[0]);
  if (Number.isNaN(perSeat)) return price;
  const total = perSeat * seats;
  return `$${Number.isInteger(total) ? total : total.toFixed(2)}`;
}

export default function BookingModal() {
  const { tour, close } = useBookingModal();
  const { status, submit, reset } = useLeadSubmit();
  const t = useT();
  const [seats, setSeats] = useState(MIN_SEATS);
  const [whatsapp, setWhatsapp] = useState("");
  const isOpen = tour !== null;

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
    if (tour !== null) {
      reset();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: reset seats/whatsapp to their defaults whenever the modal is (re)opened for a tour, mirroring the existing seats reset
      setSeats(MIN_SEATS);
      setWhatsapp("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour]);

  function handleClose() {
    close();
    reset();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tour) return;

    const form = event.currentTarget;
    await submit({
      tour: tour.title.en,
      seats,
      totalPrice: priceForSeats(tour.price.en, seats),
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement)
        .value,
      whatsapp,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement)
        .value,
    });
  }

  if (!mounted || !isOpen) return null;

  return createPortal(
    <>
      <div
        aria-hidden
        className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm"
      />

      <div
        onClick={handleClose}
        className="fixed inset-0 z-[71] flex items-center justify-center p-4"
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="relative flex w-full max-w-[518px] flex-col gap-4 rounded-[30px] bg-white p-6"
        >
          <button
            type="button"
            onClick={handleClose}
            aria-label={t(copy.a11y.close)}
            className="absolute right-4 top-4 text-3xl leading-none text-ink/70 transition-colors hover:text-ink"
          >
            &times;
          </button>

          <h3 className="pr-8 font-sans text-2xl font-medium text-ink">
            {t(copy.bookingModal.title)}
          </h3>

          <div className="flex items-center gap-3 rounded-[20px] bg-muted p-3">
            <div className="relative size-[52px] shrink-0 overflow-hidden rounded-[12px]">
              <Image
                src={tour.images[0].src}
                alt={tour.images[0].alt}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            <p className="flex-1 font-sans text-sm text-ink">{t(tour.title)}</p>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setSeats((s) => Math.max(MIN_SEATS, s - 1))}
                disabled={seats <= MIN_SEATS}
                aria-label={t(copy.a11y.decreaseSeats)}
                className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-40"
              >
                −
              </button>
              <span aria-live="polite" className="font-sans text-sm text-ink">{seats}x</span>
              <button
                type="button"
                onClick={() => setSeats((s) => Math.min(MAX_SEATS, s + 1))}
                disabled={seats >= MAX_SEATS}
                aria-label={t(copy.a11y.increaseSeats)}
                className="flex size-6 items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-white/70 disabled:opacity-40"
              >
                +
              </button>
            </div>

            <span className="shrink-0 font-sans text-lg text-ink">
              {priceForSeats(tour.price.en, seats)}
            </span>
          </div>

          <p className="font-sans text-sm text-ink/60">
            {t(copy.bookingModal.confirmationNote)}
          </p>

          {status === "success" ? (
            <div className="flex flex-col gap-2 text-ink">
              <p className="font-sans text-2xl font-medium">
                {t(copy.form.thankYouTitle)}
              </p>
              <p className="font-sans text-lg">{t(copy.form.thankYouBody)}</p>
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
                placeholder={t(copy.form.fullNamePlaceholder)}
                autoComplete="name"
                className={inputClassName}
              />
              <PhoneInput value={whatsapp} onChange={setWhatsapp} background="muted" />
              <input
                type="email"
                name="email"
                required
                placeholder={t(copy.form.emailPlaceholder)}
                autoComplete="email"
                className={inputClassName}
              />

              {status === "error" && (
                <p className="mt-2 font-sans text-sm text-red-500">
                  {t(copy.form.errorMessage)}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !isValidPhoneNumber(whatsapp)}
                className="mt-2 flex h-[50px] w-full items-center justify-center rounded-full bg-accent text-[22px] tracking-[-0.5px] text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
              >
                {status === "submitting"
                  ? t(copy.form.sending)
                  : t(copy.form.submitButton)}
              </button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
}
