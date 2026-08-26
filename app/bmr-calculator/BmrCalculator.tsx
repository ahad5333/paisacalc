"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBmr, type Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatIndianNumber } from "@/lib/format";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { age: 30, height: 175, weight: 75 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BmrCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));

  useEffect(() => {
    replaceUrlParams({ a: age, h: heightCm, w: weightKg });
  }, [age, heightCm, weightKg]);

  const result = calculateBmr({ sex, age, heightCm, weightKg });
  const { bmr } = result.value;

  return (
    <CalculatorPage
      title="BMR calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Basal Metabolic Rate — calories your body burns at complete rest, using the Mifflin-St Jeor equation dietitians currently favour."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="years" slider />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
        </>
      }
      result={<ResultDisplay value={`${formatIndianNumber(bmr)} kcal/day`} caption="Calories burned at complete rest" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
