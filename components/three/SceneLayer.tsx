"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { hasWebGL } from "@/lib/webgl-support";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// The Canvas touches window/WebGL — client-only, and heavy enough to keep
// out of the initial bundle. Fixed + pointer-events-none: it's atmosphere
// behind the real UI, never something a click or tab-stop can land on.
const Scene = dynamic(() => import("./Scene"), { ssr: false });

export function SceneLayer() {
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (!webgl) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen"
    >
      <SceneErrorBoundary>
        <Scene />
      </SceneErrorBoundary>
    </div>
  );
}
