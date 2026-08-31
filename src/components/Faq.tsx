import { faq } from "@/data/faq";
import FaqList from "./FaqList";

export default function Faq() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
      <h2 className="mx-auto text-center font-sans text-[clamp(24px,6.5vw,32px)] font-medium leading-[1.15] text-ink md:portrait:text-[44px] md:portrait:leading-[1.15] md:text-[60px] md:leading-[1.1]">
        Got <span className="font-accent italic text-accent">Questions</span>?
        <br />
        We&rsquo;ve Got <span className="font-accent italic text-accent">Answers</span>
      </h2>

      <FaqList entries={faq} />
    </section>
  );
}
