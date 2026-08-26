"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateStair } from "@/lib/calc/stair";

const LAST_VERIFIED = "19 Aug 2026";

export function StairCalculatorPage({ content }: { content: ReactNode }) {
  const [totalRiseInches, setTotalRiseInches] = useState(108);
  const [totalRunInches, setTotalRunInches] = useState(120);
  const [numSteps, setNumSteps] = useState(16);

  const result = calculateStair({ totalRiseInches, totalRunInches, numSteps });
  const { riserHeight, treadDepth, stringerLength, riserOk } = result.value;

  return (
    <CalculatorPage
      title="Stair calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Riser height, tread depth, and stringer length for a staircase."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Total rise (floor to floor)" value={totalRiseInches} onChange={setTotalRiseInches} min={12} step={1} suffix="in" />
          <NumericInput label="Total run (horizontal space)" value={totalRunInches} onChange={setTotalRunInches} min={12} step={1} suffix="in" />
          <NumericInput label="Number of steps" value={numSteps} onChange={setNumSteps} min={2} max={40} step={1} slider />
        </>
      }
      result={
        <ResultDisplay
          value={`${riserHeight}in riser`}
          caption={`${treadDepth}in tread — ${riserOk ? "within typical code range" : "outside typical code range"}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
