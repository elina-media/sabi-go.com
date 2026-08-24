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
    <section className="mx-auto max-w-[1280px] px-4 py-20">
      <h2 className="mx-auto max-w-[624px] text-center font-sans text-[60px] font-medium leading-[1.1] text-ink">
        The little <span className="font-accent italic">things</span> that{" "}
        <span className="font-accent italic">make</span> every trip{" "}
        <span className="font-accent italic">better</span>
      </h2>

      <div className="mt-16 grid grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="relative flex h-[300px] flex-col justify-end overflow-hidden rounded-[30px] bg-muted p-4"
          >
            <Image
              src={feature.image}
              alt={feature.imageAlt}
              fill
              unoptimized
              className="pointer-events-none object-cover"
            />
            <p className="relative font-sans text-[32px] font-medium leading-[1.1] text-ink">
              {feature.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
