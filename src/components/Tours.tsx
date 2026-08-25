import { tours } from "@/data/tours";
import TourCard from "./TourCard";

export default function Tours() {
  return (
    <section
      id="tours"
      className="mx-auto max-w-[1280px] scroll-mt-[140px] px-4 py-12 md:py-20"
    >
      <h2 className="mx-auto max-w-[552px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:text-[60px] md:leading-[1.1]">
        Your <span className="font-accent italic text-accent">next adventure</span> is
        waiting – pick one
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
