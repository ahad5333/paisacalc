"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGravel } from "@/lib/calc/gravel";

const LAST_VERIFIED = "19 Aug 2026";

export function GravelCalculatorPage({ content }: { content: ReactNode }) {
  const [areaSqft, setAreaSqft] = useState(200);
  const [depthInches, setDepthInches] = useState(4);

  const result = calculateGravel({ areaSqft, depthInches });
  const { cubicYards, tons } = result.value;

  return (
    <CalculatorPage
      title="Gravel calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How much gravel to buy for a path or driveway, by area and depth."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Area" value={areaSqft} onChange={setAreaSqft} min={1} step={10} suffix="sq ft" />
          <NumericInput label="Depth" value={depthInches} onChange={setDepthInches} min={1} max={12} step={0.5} suffix="in" slider />
        </>
      }
      result={<ResultDisplay value={`${tons} tons`} caption={`${cubicYards} cubic yards`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
