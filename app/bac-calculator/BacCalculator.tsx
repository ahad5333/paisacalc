"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBac } from "@/lib/calc/bac";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { weight: 75, drinks: 2, hours: 1 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BacCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [standardDrinks, setStandardDrinks] = useState(() => initialParam("d", DEFAULTS.drinks));
  const [hoursElapsed, setHoursElapsed] = useState(() => initialParam("t", DEFAULTS.hours));

  useEffect(() => {
    replaceUrlParams({ w: weightKg, d: standardDrinks, t: hoursElapsed });
  }, [weightKg, standardDrinks, hoursElapsed]);

  const result = calculateBac({ sex, weightKg, standardDrinks, hoursElapsed });
  const { bac, impairmentLevel } = result.value;

  return (
    <CalculatorPage
      title="BAC calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Estimated blood alcohol content from drinks consumed, body weight, and time elapsed, using the Widmark formula. Educational estimate only — never use this to decide whether it's safe to drive."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Body weight" value={weightKg} onChange={setWeightKg} min={40} max={150} step={1} suffix="kg" slider />
          <NumericInput
            label="Standard drinks"
            value={standardDrinks}
            onChange={setStandardDrinks}
            min={0}
            max={15}
            step={0.5}
            slider
            helpText="1 standard drink ≈ 14g pure alcohol — roughly a 12oz beer, 5oz wine, or 1.5oz spirit."
          />
          <NumericInput label="Hours since first drink" value={hoursElapsed} onChange={setHoursElapsed} min={0} max={24} step={0.5} suffix="hrs" slider />
        </>
      }
      result={<ResultDisplay value={`${bac.toFixed(3)}%`} caption={`Estimated BAC — ${impairmentLevel}. Never drive after drinking, regardless of this estimate.`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
