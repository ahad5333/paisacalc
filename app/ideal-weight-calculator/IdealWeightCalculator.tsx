"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateIdealWeight } from "@/lib/calc/ideal-weight";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 175 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function IdealWeightCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));

  useEffect(() => {
    replaceUrlParams({ h: heightCm });
  }, [heightCm]);

  const result = calculateIdealWeight({ sex, heightCm });
  const { average, hamwi, devine, robinson, miller } = result.value;
  const allValues = [hamwi, devine, robinson, miller];
  const lowest = Math.min(...allValues);
  const highest = Math.max(...allValues);

  return (
    <CalculatorPage
      title="Ideal weight calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 40%"
      description="Four different clinical formulas for ideal body weight — Hamwi, Devine, Robinson, and Miller — shown together since they don't agree, not one picked as the answer."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={140} max={210} step={1} suffix="cm" slider />
        </>
      }
      result={
        <ResultDisplay
          value={`${average} kg`}
          caption={`Average of all four formulas — they range from ${lowest}kg to ${highest}kg`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
