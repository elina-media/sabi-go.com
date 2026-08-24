import { tours } from "@/data/tours";
import TourCard from "./TourCard";

export default function Tours() {
  return (
    <section
      id="tours"
      className="mx-auto max-w-[1280px] scroll-mt-[140px] px-4 py-20"
    >
      <h2 className="mx-auto max-w-[552px] text-center font-sans text-[60px] font-medium leading-[1.1] text-ink">
        Your <span className="font-accent italic">next adventure</span> is
        waiting – pick one
      </h2>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
