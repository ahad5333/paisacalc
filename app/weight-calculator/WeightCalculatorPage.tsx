"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateWeightForce } from "@/lib/calc/weight-force";

const LAST_VERIFIED = "19 Aug 2026";

export function WeightCalculatorPage({ content }: { content: ReactNode }) {
  const [massKg, setMassKg] = useState(70);

  const result = calculateWeightForce({ massKg });
  const { weightEarthN, weightMoonN, weightMarsN, weightJupiterN } = result.value;

  return (
    <CalculatorPage
      title="Weight calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Weight (the force of gravity) on Earth and other worlds, from mass."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<NumericInput label="Mass" value={massKg} onChange={setMassKg} min={0.1} step={1} suffix="kg" />}
      result={<ResultDisplay value={`${weightEarthN} N`} caption="Weight on Earth" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Weight elsewhere"
          columns={[
            { key: "body", label: "Body" },
            { key: "weight", label: "Weight (N)", align: "right" },
          ]}
          rows={[
            { body: "Earth", weight: `${weightEarthN}` },
            { body: "Moon", weight: `${weightMoonN}` },
            { body: "Mars", weight: `${weightMarsN}` },
            { body: "Jupiter", weight: `${weightJupiterN}` },
          ]}
        />
      }
      content={content}
    />
  );
}
