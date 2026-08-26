"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateArea, type AreaShape } from "@/lib/calc/area";

const LAST_VERIFIED = "19 Aug 2026";

const SHAPE_OPTIONS: { value: AreaShape; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "rectangle", label: "Rectangle" },
  { value: "circle", label: "Circle" },
  { value: "triangle", label: "Triangle" },
  { value: "trapezoid", label: "Trapezoid" },
];

export function AreaCalculator({ content }: { content: ReactNode }) {
  const [shape, setShape] = useState<AreaShape>("rectangle");
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const [height, setHeight] = useState(4);

  const result = calculateArea({ shape, a, b, height });
  const { area } = result.value;

  const aLabel = shape === "circle" ? "Radius" : shape === "square" ? "Side" : shape === "triangle" ? "Base" : "Side a (parallel)";

  return (
    <CalculatorPage
      title="Area calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Area of a square, rectangle, circle, triangle, or trapezoid."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Shape" value={shape} onChange={setShape} options={SHAPE_OPTIONS} />
          <NumericInput label={aLabel} value={a} onChange={setA} min={0.01} step={0.5} />
          {shape === "rectangle" && <NumericInput label="Side b (width)" value={b} onChange={setB} min={0.01} step={0.5} />}
          {shape === "trapezoid" && <NumericInput label="Side b (other parallel side)" value={b} onChange={setB} min={0.01} step={0.5} />}
          {(shape === "triangle" || shape === "trapezoid") && (
            <NumericInput label="Height" value={height} onChange={setHeight} min={0.01} step={0.5} />
          )}
        </>
      }
      result={<ResultDisplay value={`${area}`} caption={`Area (square units) — ${shape}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
