"use client";

import Image from "next/image";
import NavbarContent from "./NavbarContent";
import { useMobileMenu } from "./MobileMenuProvider";

export default function Hero() {
  const { isOpen } = useMobileMenu();

  return (
    <section id="main" className="mx-auto w-full max-w-[1920px] p-0 md:p-4">
      <div className="relative h-dvh w-full overflow-hidden rounded-none md:h-[750px] md:rounded-[40px]">
        <video
          src="/hero/hero-bg.mp4"
          poster="/hero/hero-bg-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Static header, part of the hero — scrolls away with it.
            Header.tsx is the sticky version that fades in once this
            scrolls out of view. */}
        <nav
          className={`absolute inset-x-4 top-4 flex h-16 items-center md:inset-x-10 md:top-10 md:h-auto ${
            isOpen ? "pointer-events-none md:pointer-events-auto" : ""
          }`}
        >
          <NavbarContent />
        </nav>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-6">
          <div className="flex h-[30px] items-center gap-2 rounded-full bg-white/16 px-4 backdrop-blur-[3.5px]">
            <Image src="/hero/geo-pin.svg" alt="" width={16} height={18} />
            <span className="text-base text-white">Kazakhstan, Almaty</span>
          </div>

          <h1 className="max-w-4xl font-sans text-[clamp(28px,8.5vw,44px)] font-medium leading-[1.15] text-white md:text-[80px] md:leading-[1.05]">
            Discover the{" "}
            <span className="font-accent italic">wild side</span>
            <br />
            of Kazakhstan
          </h1>

          <p className="max-w-2xl text-[clamp(13px,3.6vw,18px)] text-white md:text-2xl">
            Explore Kazakhstan&rsquo;s most breathtaking landscapes
            <br />
            with carefully planned tours and local guides.
          </p>

          <a
            href="#tours"
            className="pointer-events-auto flex h-[50px] items-center gap-2 rounded-full bg-accent px-7 text-white transition-colors hover:bg-accent-hover"
          >
            <Image
              src="/hero/route-square.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[22px] tracking-[-0.5px]">View tours</span>
          </a>
        </div>
      </div>
    </section>
  );
}
