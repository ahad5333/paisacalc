"use client";

import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { FloatingField } from "./FloatingField";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function ScrollCamera({ animate }: { animate: boolean }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!animate) return;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8,
      onUpdate: (self) => {
        camera.position.y = -self.progress * 20;
        camera.position.x = Math.sin(self.progress * Math.PI * 2) * 0.6;
        camera.rotation.z = Math.sin(self.progress * Math.PI) * 0.02;
      },
    });

    return () => trigger.kill();
  }, [animate, camera]);

  return null;
}

export default function Scene() {
  const animate = !useReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={animate ? "always" : "demand"}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0B1730"]} />
      <fog attach="fog" args={["#0B1730", 10, 26]} />
      <Suspense fallback={null}>
        <FloatingField animate={animate} />
        <ScrollCamera animate={animate} />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.5} luminanceThreshold={0.25} mipmapBlur />
          <Vignette eskil={false} offset={0.15} darkness={0.55} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
