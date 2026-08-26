"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const smooth = !useReducedMotion();

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ autoRaf: true, lerp: 0.12, duration: 1.1 }}>
      {children}
    </ReactLenis>
  );
}
