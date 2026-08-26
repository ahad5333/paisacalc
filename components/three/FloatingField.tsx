"use client";

import { useMemo } from "react";
import { Float } from "@react-three/drei";

const COLORS = ["#60A5FA", "#FB923C"] as const; // --figure, --deduction — no other data colours

type ShapeKind = "icosahedron" | "torus" | "octahedron";

type ShapeSpec = {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  kind: ShapeKind;
  color: (typeof COLORS)[number];
  speed: number;
};

function randomShapes(count: number): ShapeSpec[] {
  const kinds: ShapeKind[] = ["icosahedron", "torus", "octahedron"];
  return Array.from({ length: count }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 12,
      -(i / count) * 24 - Math.random() * 2, // spread down the scroll axis
      (Math.random() - 0.5) * 6 - 2,
    ],
    scale: 0.6 + Math.random() * 1.1,
    rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
    kind: kinds[i % kinds.length],
    color: COLORS[i % COLORS.length],
    speed: 0.6 + Math.random() * 0.8,
  }));
}

function ShapeMesh({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[0.8, 0.28, 32, 96]} />;
    case "octahedron":
      return <octahedronGeometry args={[1, 0]} />;
    default:
      return <icosahedronGeometry args={[1, 0]} />;
  }
}

export function FloatingField({ animate }: { animate: boolean }) {
  const shapes = useMemo(() => randomShapes(14), []);

  return (
    <>
      {/* No <Environment> map here on purpose — the preset fetches an HDR
          file from a third-party CDN at runtime, which the site's CSP
          blocks and which is one more point of failure for a purely
          decorative background. These three analytic lights are enough. */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} color="#EEF2FC" />
      <pointLight position={[-6, -4, -4]} intensity={0.4} color="#60A5FA" />

      {shapes.map((s, i) => (
        <Float
          key={i}
          speed={animate ? s.speed : 0}
          rotationIntensity={animate ? 0.5 : 0}
          floatIntensity={animate ? 1 : 0}
        >
          <mesh position={s.position} scale={s.scale} rotation={s.rotation}>
            <ShapeMesh kind={s.kind} />
            <meshPhysicalMaterial
              color={s.color}
              roughness={0.25}
              metalness={0.1}
              clearcoat={1}
              clearcoatRoughness={0.15}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}
