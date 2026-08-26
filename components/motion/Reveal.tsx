"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Fades + rises a section into place the first time it enters the
// viewport. IntersectionObserver rather than GSAP ScrollTrigger here on
// purpose — a calculator page stacks half a dozen of these, and observer
// entries are far cheaper than that many scroll-linked triggers,
// especially under Lenis's virtual scroll (which ScrollTrigger needs the
// sync hookup in SmoothScroll.tsx for; a plain observer needs neither).
export function Reveal({
  children,
  delayMs = 0,
  className,
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return; // shown is derived from `reduced` directly below
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold is a fraction of the target's own area, not the
      // viewport's — for content taller than ~10x the viewport (e.g. a
      // 240-row amortisation table) even a fully-filled screen can't
      // reach 0.1, so it never reveals. 0 fires as soon as any pixel
      // crosses rootMargin, which is what "reveal on enter" actually
      // wants regardless of the target's height.
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: reduced ? undefined : `${delayMs}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
