"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateEngineHorsepower } from "@/lib/calc/engine-horsepower";

const LAST_VERIFIED = "19 Aug 2026";

export function EngineHorsepowerCalculatorPage({ content }: { content: ReactNode }) {
  const [weightLbs, setWeightLbs] = useState(3200);
  const [trapSpeedMph, setTrapSpeedMph] = useState(100);

  const result = calculateEngineHorsepower({ weightLbs, trapSpeedMph });
  const { horsepower } = result.value;

  return (
    <CalculatorPage
      title="Engine horsepower calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Estimated horsepower from vehicle weight and quarter-mile trap speed."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Vehicle weight" value={weightLbs} onChange={setWeightLbs} min={500} max={10000} step={50} suffix="lbs" slider />
          <NumericInput label="Quarter-mile trap speed" value={trapSpeedMph} onChange={setTrapSpeedMph} min={30} max={200} step={1} suffix="mph" slider />
        </>
      }
      result={<ResultDisplay value={`${horsepower} HP`} caption="Estimated horsepower" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
