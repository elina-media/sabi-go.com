import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tours from "@/components/Tours";
import PrivateTour from "@/components/PrivateTour";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
      <Tours />
      <PrivateTour />
      <Reviews />
      <Faq />
    </main>
  );
}
