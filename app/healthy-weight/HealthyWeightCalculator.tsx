"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHealthyWeight } from "@/lib/calc/healthy-weight";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 170 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function HealthyWeightCalculator({ content }: { content: ReactNode }) {
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));

  useEffect(() => {
    replaceUrlParams({ h: heightCm });
  }, [heightCm]);

  const result = calculateHealthyWeight({ heightCm });
  const { minWeightKg, maxWeightKg } = result.value;

  return (
    <CalculatorPage
      title="Healthy weight calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="The healthy weight range for a given height, using the same Asian-specific BMI cutoffs as the BMI calculator."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
        </>
      }
      result={<ResultDisplay value={`${minWeightKg} - ${maxWeightKg} kg`} caption="Healthy weight range for this height" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
