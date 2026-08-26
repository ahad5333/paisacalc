"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Counts up from 0 to target once, on mount — used for small stat figures
// where the count itself is the whole point of the motion, not a
// scroll-triggered reveal. Jumps straight to the target under
// prefers-reduced-motion rather than animating.
export function CountUp({
  target,
  durationMs = 900,
  className,
}: {
  target: number;
  durationMs?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (reduced) return; // display falls back to target directly below
    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, reduced]);

  return <span className={className}>{reduced ? target : animatedValue}</span>;
}
