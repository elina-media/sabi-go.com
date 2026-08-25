import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Tours from "@/components/Tours";
import PrivateTour from "@/components/PrivateTour";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <MobileMenu />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <Tours />
        <PrivateTour />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
