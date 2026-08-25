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
    <section id="reviews" className="w-full scroll-mt-[140px] py-12 md:py-20">
      <h2 className="mx-auto max-w-[701px] px-4 text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:text-[60px] md:leading-[1.1]">
        Don&rsquo;t take our word for it –{" "}
        <span className="font-accent italic text-accent">hear</span> from{" "}
        <span className="font-accent italic text-accent">travelers</span>
      </h2>

      <div className="mt-8 flex flex-col gap-3 md:mt-16 md:gap-6">
        <MarqueeRow direction="left" />
        <MarqueeRow direction="right" />
      </div>
    </section>
  );
}
