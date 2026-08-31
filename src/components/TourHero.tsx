"use client";

import Image from "next/image";
import type { Tour } from "@/data/tours";
import NavbarContent from "./NavbarContent";
import { useMobileMenu } from "./MobileMenuProvider";
import { useBookingModal } from "./BookingModalProvider";

export default function TourHero({ tour }: { tour: Tour }) {
  const { isOpen } = useMobileMenu();
  const { open } = useBookingModal();

  return (
    <section
      id="main"
      className="mx-auto w-full max-w-[1920px] p-0 md:portrait:p-4 lg:p-4"
    >
      <div className="relative h-dvh w-full overflow-hidden rounded-none md:portrait:h-[750px] md:portrait:rounded-[40px] lg:h-[750px] lg:rounded-[40px]">
        <Image
          src={tour.images[0].src}
          alt={tour.images[0].alt}
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <nav
          className={`absolute inset-x-4 top-4 flex h-16 items-center xl:inset-x-10 xl:top-10 xl:h-auto ${
            isOpen ? "pointer-events-none xl:pointer-events-auto" : ""
          }`}
        >
          <NavbarContent />
        </nav>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center max-lg:landscape:gap-3 md:portrait:gap-6 lg:gap-6">
          <h1 className="max-w-3xl font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-white md:portrait:text-[44px] md:portrait:leading-[1.15] md:max-w-5xl md:text-[60px] md:leading-[1.1]">
            {tour.title}
          </h1>

          {tour.description && (
            <p className="max-w-2xl text-[clamp(13px,3.6vw,18px)] text-white md:portrait:text-2xl lg:text-2xl">
              {tour.description}
            </p>
          )}

          <button
            type="button"
            onClick={() => open(tour)}
            className="pointer-events-auto flex h-[50px] items-center gap-2 rounded-full bg-accent px-7 text-white transition-colors hover:bg-accent-hover"
          >
            <Image
              src="/hero/route-square.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
            />
            <span className="text-[22px] tracking-[-0.5px]">Book a tour</span>
          </button>
        </div>
      </div>
    </section>
  );
}
