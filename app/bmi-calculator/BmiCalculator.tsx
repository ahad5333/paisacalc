"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBmi, type BmiBand } from "@/lib/calc/bmi";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 170, weight: 65 };

const BAND_CAPTIONS: Record<BmiBand, string> = {
  underweight: "underweight — below the healthy range",
  normal: "in the healthy range",
  overweight: "overweight — above the healthy range",
  obese: "obese — well above the healthy range",
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BmiCalculator({ content }: { content: ReactNode }) {
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));

  useEffect(() => {
    replaceUrlParams({ h: heightCm, w: weightKg });
  }, [heightCm, weightKg]);

  const result = calculateBmi({ heightCm, weightKg });
  const { bmi, band } = result.value;

  return (
    <CalculatorPage
      title="BMI calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 40%"
      description="Body Mass Index using the Asian-specific WHO cutoffs — meaningfully lower than the Western thresholds most calculators default to."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={100} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
        </>
      }
      result={<ResultDisplay value={String(bmi)} caption={`BMI — ${BAND_CAPTIONS[band]}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
