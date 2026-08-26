"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateLeanBodyMass } from "@/lib/calc/lean-body-mass";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 175, weight: 75 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function LeanBodyMassCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));

  useEffect(() => {
    replaceUrlParams({ h: heightCm, w: weightKg });
  }, [heightCm, weightKg]);

  const result = calculateLeanBodyMass({ sex, heightCm, weightKg });
  const { leanMassKg, leanMassPercent } = result.value;

  return (
    <CalculatorPage
      title="Lean body mass calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Lean body mass from height and weight alone, using the Boer formula — a coarser estimate than the body fat calculator's tape measurements, but needs nothing but a scale."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
        </>
      }
      result={<ResultDisplay value={`${leanMassKg} kg`} caption={`Lean body mass — ${leanMassPercent}% of total weight`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
