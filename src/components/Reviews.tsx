import { reviews } from "@/data/reviews";
import ReviewCard from "./ReviewCard";

function MarqueeRow({ direction }: { direction: "left" | "right" }) {
  const track = [...reviews, ...reviews];

  return (
    <div className="group marquee-fade overflow-hidden">
      <div
        className={`flex w-max gap-6 group-hover:[animation-play-state:paused] ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
      >
        {track.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full scroll-mt-[140px] py-20">
      <h2 className="mx-auto max-w-[701px] px-4 text-center font-sans text-[60px] font-medium leading-[1.1] text-ink">
        Don&rsquo;t take our word for it –{" "}
        <span className="font-accent italic text-accent">hear</span> from{" "}
        <span className="font-accent italic text-accent">travelers</span>
      </h2>

      <div className="mt-16 flex flex-col gap-6">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
      </div>
    </section>
  );
}
