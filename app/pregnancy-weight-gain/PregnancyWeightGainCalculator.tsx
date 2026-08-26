"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePregnancyWeightGain } from "@/lib/calc/pregnancy-weight-gain";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 165, weight: 60, week: 20 };

const TWIN_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "false", label: "Singleton" },
  { value: "true", label: "Twins" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PregnancyWeightGainCalculator({ content }: { content: ReactNode }) {
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [prePregnancyWeightKg, setPrePregnancyWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [currentWeek, setCurrentWeek] = useState(() => initialParam("wk", DEFAULTS.week));
  const [twinsStr, setTwinsStr] = useState<"true" | "false">("false");

  useEffect(() => {
    replaceUrlParams({ h: heightCm, w: prePregnancyWeightKg, wk: currentWeek });
  }, [heightCm, prePregnancyWeightKg, currentWeek]);

  const twins = twinsStr === "true";
  const result = calculatePregnancyWeightGain({ prePregnancyHeightCm: heightCm, prePregnancyWeightKg, currentWeek, twins });
  const { prePregnancyBmi, category, totalGainLowKg, totalGainHighKg, recommendedAtWeekLowKg, recommendedAtWeekHighKg } = result.value;

  const categoryLabel = { underweight: "Underweight", normal: "Normal weight", overweight: "Overweight", obese: "Obese" }[category];

  return (
    <CalculatorPage
      title="Pregnancy weight gain calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Recommended total pregnancy weight gain for your pre-pregnancy BMI, using the IOM guidelines, plus where you should be by your current week."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Pre-pregnancy height"
            value={heightCm}
            onChange={setHeightCm}
            min={140}
            max={200}
            step={1}
            suffix="cm"
            slider
          />
          <NumericInput
            label="Pre-pregnancy weight"
            value={prePregnancyWeightKg}
            onChange={setPrePregnancyWeightKg}
            min={35}
            max={150}
            step={0.5}
            suffix="kg"
            slider
          />
          <NumericInput label="Current week of pregnancy" value={currentWeek} onChange={setCurrentWeek} min={1} max={42} step={1} suffix="weeks" slider />
          <ChoiceInput label="Pregnancy type" value={twinsStr} onChange={setTwinsStr} options={TWIN_OPTIONS} />
        </>
      }
      result={
        <ResultDisplay
          value={`${totalGainLowKg}–${totalGainHighKg} kg`}
          caption={`Total recommended gain — ${categoryLabel} (BMI ${prePregnancyBmi}), ${recommendedAtWeekLowKg}–${recommendedAtWeekHighKg} kg by week ${currentWeek}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
