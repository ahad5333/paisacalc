"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSurfaceArea, type SolidShape } from "@/lib/calc/surface-area";

const LAST_VERIFIED = "19 Aug 2026";

const SHAPE_OPTIONS: { value: SolidShape; label: string }[] = [
  { value: "cube", label: "Cube" },
  { value: "box", label: "Rectangular box" },
  { value: "sphere", label: "Sphere" },
  { value: "cylinder", label: "Cylinder" },
  { value: "cone", label: "Cone" },
];

export function SurfaceAreaCalculator({ content }: { content: ReactNode }) {
  const [shape, setShape] = useState<SolidShape>("cube");
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const [height, setHeight] = useState(5);

  const result = calculateSurfaceArea({ shape, a, b, height });
  const { surfaceArea } = result.value;

  return (
    <CalculatorPage
      title="Surface area calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Surface area of a cube, box, sphere, cylinder, or cone."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Shape" value={shape} onChange={setShape} options={SHAPE_OPTIONS} />
          {shape === "cube" && <NumericInput label="Side length" value={a} onChange={setA} min={0.01} step={0.5} />}
          {shape === "box" && (
            <div className="grid grid-cols-3 gap-3">
              <NumericInput label="Length" value={a} onChange={setA} min={0.01} step={0.5} />
              <NumericInput label="Width" value={b} onChange={setB} min={0.01} step={0.5} />
              <NumericInput label="Height" value={height} onChange={setHeight} min={0.01} step={0.5} />
            </div>
          )}
          {shape === "sphere" && <NumericInput label="Radius" value={a} onChange={setA} min={0.01} step={0.5} />}
          {(shape === "cylinder" || shape === "cone") && (
            <div className="grid grid-cols-2 gap-3">
              <NumericInput label="Radius" value={a} onChange={setA} min={0.01} step={0.5} />
              <NumericInput label="Height" value={height} onChange={setHeight} min={0.01} step={0.5} />
            </div>
          )}
        </>
      }
      result={<ResultDisplay value={`${surfaceArea}`} caption={`Surface area (square units) — ${shape}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
