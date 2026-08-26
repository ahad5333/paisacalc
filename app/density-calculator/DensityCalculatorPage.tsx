"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDensityMassVolume } from "@/lib/calc/density-mass-volume";

const LAST_VERIFIED = "19 Aug 2026";

export function DensityCalculatorPage({ content }: { content: ReactNode }) {
  const [mass, setMass] = useState(100);
  const [volume, setVolume] = useState(10);

  const result = calculateDensityMassVolume({ density: 0, mass, volume, unknown: "density" });
  const { result: density } = result.value;

  return (
    <CalculatorPage
      title="Density calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Density from mass and volume."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Mass" value={mass} onChange={setMass} min={0.01} step={1} suffix="g" />
          <NumericInput label="Volume" value={volume} onChange={setVolume} min={0.01} step={1} suffix="cm³" />
        </>
      }
      result={<ResultDisplay value={`${density} g/cm³`} caption="Density" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
