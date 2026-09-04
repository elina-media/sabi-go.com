"use client";

import Image from "next/image";
import NavbarContent from "./NavbarContent";
import ScrollLink from "./ScrollLink";
import { useMobileMenu } from "./MobileMenuProvider";
import { copy } from "@/data/copy";
import { useT } from "@/lib/i18n";

export default function Hero() {
  const { isOpen } = useMobileMenu();
  const t = useT();

  return (
    <section id="main" className="mx-auto w-full max-w-[1920px] p-0 md:portrait:p-4 lg:p-4">
      <div className="relative h-dvh w-full overflow-hidden rounded-none md:portrait:h-[750px] md:portrait:rounded-[40px] lg:h-[750px] lg:rounded-[40px]">
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
          className={`absolute inset-x-4 top-4 flex h-16 items-center xl:inset-x-10 xl:top-10 xl:h-auto ${
            isOpen ? "pointer-events-none xl:pointer-events-auto" : ""
          }`}
        >
          <NavbarContent />
        </nav>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center max-lg:landscape:gap-3 md:portrait:gap-6 lg:gap-6">
          <div className="flex h-[30px] items-center gap-2 rounded-full bg-white/16 px-4 backdrop-blur-[3.5px]">
            <Image src="/hero/geo-pin.svg" alt="" width={16} height={18} unoptimized />
            <span className="text-base text-white">
              {t(copy.hero.locationBadge)}
            </span>
          </div>

          <h1 className="max-w-4xl font-sans text-[clamp(28px,8.5vw,44px)] font-medium leading-[1.15] text-white max-lg:landscape:text-[26px] md:portrait:text-[56px] md:portrait:leading-[1.1] lg:text-[68px] lg:leading-[1.08] xl:text-[80px] xl:leading-[1.05]">
            {t(copy.hero.heading)}
          </h1>

          <p className="max-w-2xl text-[clamp(13px,3.6vw,18px)] text-white md:portrait:text-2xl lg:text-2xl">
            {t(copy.hero.subtitle)}
          </p>

          <ScrollLink
            href="#tours"
            className="pointer-events-auto flex h-[50px] items-center gap-2 rounded-full bg-accent px-7 text-white transition-colors hover:bg-accent-hover"
          >
            <Image
              src="/hero/route-square.svg"
              alt=""
              width={24}
              height={24}
              unoptimized
            />
            <span className="text-[22px] tracking-[-0.5px]">
              {t(copy.hero.viewToursButton)}
            </span>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
