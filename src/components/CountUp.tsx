"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";

export default function CountUp({
  value,
  duration = 1.2,
}: {
  value: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  // motion's built-in `MotionConfig reducedMotion="user"` only patches
  // `motion` components (via `VisualElement`) — the imperative `animate()`
  // call below never reads that context, so under prefers-reduced-motion
  // the count would still climb from 0 unless we check this explicitly.
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [motionValue]);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, value, duration, motionValue, shouldReduceMotion]);

  return <span ref={ref}>{display}</span>;
}
