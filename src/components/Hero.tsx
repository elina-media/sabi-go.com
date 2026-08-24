import Image from "next/image";
import NavbarContent from "./NavbarContent";

export default function Hero() {
  return (
    <section id="main" className="w-full p-4">
      <div className="relative h-[750px] w-full overflow-hidden rounded-[40px]">
        <video
          src="/hero/hero-bg.mp4"
          poster="/hero/hero-bg-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Static header, part of the hero — scrolls away with it.
            Header.tsx is the sticky version that fades in once this
            scrolls out of view. */}
        <nav className="absolute inset-x-10 top-10">
          <NavbarContent />
        </nav>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
          <div className="flex h-[30px] items-center gap-2 rounded-full bg-white/16 px-4 backdrop-blur-[3.5px]">
            <Image src="/hero/geo-pin.svg" alt="" width={16} height={18} />
            <span className="text-base text-white">Kazakhstan, Almaty</span>
          </div>

          <h1 className="max-w-4xl font-sans text-[80px] font-medium leading-[1.05] text-white">
            Discover the{" "}
            <span className="font-accent italic">wild side</span> of
            Kazakhstan
          </h1>

          <p className="max-w-2xl text-2xl text-white">
            Explore Kazakhstan&rsquo;s most breathtaking landscapes with
            carefully planned tours and local guides.
          </p>

          <button className="pointer-events-auto flex h-[50px] items-center gap-2 rounded-full bg-accent px-7 text-white transition-colors hover:bg-accent-hover">
            <Image
              src="/hero/route-square.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[22px] tracking-[-0.5px]">View tours</span>
          </button>
        </div>
      </div>
    </section>
  );
}
