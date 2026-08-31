import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tours } from "@/data/tours";
import TourHero from "@/components/TourHero";
import TourGallerySlider from "@/components/TourGallerySlider";
import TourDetails from "@/components/TourDetails";
import PrivateTour from "@/components/PrivateTour";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = tours.find((t) => t.id === slug);
  if (!tour) return {};

  return {
    title: `${tour.title} — Sabi Go Travel`,
    description: tour.description || undefined,
  };
}

export default async function TourPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tour = tours.find((t) => t.id === slug);
  if (!tour) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <TourHero tour={tour} />
      <TourGallerySlider images={tour.images} />
      <TourDetails tour={tour} />
      <PrivateTour />
    </main>
  );
}
