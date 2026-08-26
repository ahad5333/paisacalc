"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHeightPrediction } from "@/lib/calc/height-prediction";
import type { Sex } from "@/lib/calc/bmr";

const LAST_VERIFIED = "19 Aug 2026";

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Boy" },
  { value: "female" as Sex, label: "Girl" },
];

export function HeightCalculatorPage({ content }: { content: ReactNode }) {
  const [fatherHeightCm, setFatherHeightCm] = useState(175);
  const [motherHeightCm, setMotherHeightCm] = useState(162);
  const [childSex, setChildSex] = useState<Sex>("male");

  const result = calculateHeightPrediction({ fatherHeightCm, motherHeightCm, childSex });
  const { predictedHeightCm, rangeLowCm, rangeHighCm } = result.value;

  return (
    <CalculatorPage
      title="Height calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Predicted adult height for a child, from both parents' heights."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Father's height" value={fatherHeightCm} onChange={setFatherHeightCm} min={140} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Mother's height" value={motherHeightCm} onChange={setMotherHeightCm} min={130} max={200} step={1} suffix="cm" slider />
          <ChoiceInput label="Child's sex" value={childSex} onChange={setChildSex} options={SEX_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${predictedHeightCm} cm`} caption={`Likely range ${rangeLowCm}–${rangeHighCm} cm`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
