import PrivateTourForm from "./PrivateTourForm";

export default function PrivateTour() {
  return (
    <section id="private-tour" className="w-full scroll-mt-[140px] p-4">
      <div className="relative flex h-[569px] flex-col justify-center gap-6 overflow-hidden rounded-[40px] px-16">
        <video
          src="/private-tour/background.mp4"
          poster="/private-tour/background-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative flex max-w-[518px] flex-col gap-2">
          <h2 className="font-sans text-[60px] font-medium leading-[1.1] text-white">
            Want a{" "}
            <span className="font-accent italic text-accent">private tour?</span>
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
