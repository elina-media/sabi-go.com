"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (window.location.hash) return;

    // Next.js moves focus to the new page's heading after navigation for
    // accessibility, which makes the browser auto-scroll that heading into
    // view — overriding a single scrollTo(0, 0) call. Re-assert the top
    // position for a few frames so this always wins.
    let frame = 0;
    let rafId: number;
    function forceTop() {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      frame += 1;
      if (frame < 15) {
        rafId = requestAnimationFrame(forceTop);
      }
    }
    rafId = requestAnimationFrame(forceTop);
    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
