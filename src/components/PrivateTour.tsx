import Image from "next/image";
import PrivateTourForm from "./PrivateTourForm";

export default function PrivateTour() {
  return (
    <section id="private-tour" className="w-full scroll-mt-[140px] p-4">
      <div className="relative flex h-[569px] flex-col justify-center gap-6 overflow-hidden rounded-[40px] px-16">
        <Image
          src="/private-tour/background.webp"
          alt="Mountain lake near Almaty"
          fill
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 rounded-[40px] bg-gradient-to-l from-white/60 from-[35%] to-black/60 to-[88%] mix-blend-multiply" />

        <div className="relative flex max-w-[518px] flex-col gap-2">
          <h2 className="font-sans text-[60px] font-medium leading-[1.1] text-white">
            Want a <span className="font-accent italic">private tour?</span>
          </h2>
          <p className="font-sans text-[32px] leading-tight text-white">
            Leave your details and we&rsquo;ll help you create the perfect
            trip from Almaty.
          </p>
        </div>

        <div className="relative">
          <PrivateTourForm />
        </div>
      </div>
    </section>
  );
}
