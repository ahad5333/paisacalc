"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDensityMassVolume } from "@/lib/calc/density-mass-volume";

const LAST_VERIFIED = "19 Aug 2026";

export function MassCalculatorPage({ content }: { content: ReactNode }) {
  const [density, setDensity] = useState(2.7);
  const [volume, setVolume] = useState(50);

  const result = calculateDensityMassVolume({ density, mass: 0, volume, unknown: "mass" });
  const { result: mass } = result.value;

  return (
    <CalculatorPage
      title="Mass calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Mass from density and volume."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Density" value={density} onChange={setDensity} min={0.01} step={0.1} suffix="g/cm³" helpText="e.g. water = 1, aluminum = 2.7, steel = 7.8" />
          <NumericInput label="Volume" value={volume} onChange={setVolume} min={0.01} step={1} suffix="cm³" />
        </>
      }
      result={<ResultDisplay value={`${mass} g`} caption="Mass" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
