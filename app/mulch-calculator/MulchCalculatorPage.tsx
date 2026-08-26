"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMulch } from "@/lib/calc/mulch";

const LAST_VERIFIED = "19 Aug 2026";

export function MulchCalculatorPage({ content }: { content: ReactNode }) {
  const [areaSqft, setAreaSqft] = useState(100);
  const [depthInches, setDepthInches] = useState(3);

  const result = calculateMulch({ areaSqft, depthInches });
  const { cubicYards, bags } = result.value;

  return (
    <CalculatorPage
      title="Mulch calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How much mulch to buy for a garden bed, by area and depth."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Area" value={areaSqft} onChange={setAreaSqft} min={1} step={5} suffix="sq ft" />
          <NumericInput label="Depth" value={depthInches} onChange={setDepthInches} min={0.5} max={6} step={0.5} suffix="in" slider />
        </>
      }
      result={<ResultDisplay value={`${cubicYards} yd³`} caption={`${bags} bags (2 ft³ each)`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
