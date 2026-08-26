"use client";

import { useEffect, type ReactNode } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Drives Lenis from GSAP's ticker (not its own rAF) so Lenis's interpolated
// scroll position and GSAP ScrollTrigger's scroll-linked animations never
// drift apart — see darkroomengineering/lenis' documented GSAP integration.
function GsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const smooth = !useReducedMotion();

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.12, duration: 1.1 }}>
      <GsapSync />
      {children}
    </ReactLenis>
  );
}
