import Image from "next/image";

const features = [
  {
    id: "destinations",
    image: "/features/destinations.webp",
    imageAlt: "Map of Kazakhstan with tour destinations marked",
    label: (
      <>
        <span className="font-accent italic">10+</span> Destinations across
        Kazakhstan
      </>
    ),
  },
  {
    id: "seasons",
    image: "/features/seasons.webp",
    imageAlt: "Tour van",
    label: (
      <>
        <span className="font-accent italic">4 Seasons</span> tours all year
        round
      </>
    ),
  },
  {
    id: "groups",
    image: "/features/groups.webp",
    imageAlt: "Camping tent",
    label: "Small Groups More comfort, less crowds",
  },
  {
    id: "guides",
    image: "/features/guides.webp",
    imageAlt: "Passport",
    label: (
      <>
        <span className="font-accent italic">10 guides</span> with C1 English
        level
      </>
    ),
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <h2 className="mx-auto max-w-[624px] text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:text-[60px] md:leading-[1.1]">
        The little <span className="font-accent italic text-accent">things</span> that{" "}
        <span className="font-accent italic text-accent">make</span> every trip{" "}
        <span className="font-accent italic text-accent">better</span>
      </h2>

      <div className="mt-8 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative flex h-[180px] flex-col justify-end overflow-hidden rounded-[20px] bg-muted p-3 md:h-[300px] md:rounded-[30px] md:p-4"
          >
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              unoptimized
              className="pointer-events-none object-cover"
            />
            <p className="relative font-sans text-[clamp(15px,4vw,18px)] font-medium leading-[1.15] text-ink md:text-[32px] md:leading-[1.1]">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
