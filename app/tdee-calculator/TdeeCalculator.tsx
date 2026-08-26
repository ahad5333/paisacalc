"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateTdee, type ActivityLevel } from "@/lib/calc/tdee";
import type { Sex } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { age: 30, height: 175, weight: 75 };

const SEX_OPTIONS = [
  { value: "male" as Sex, label: "Male" },
  { value: "female" as Sex, label: "Female" },
];

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "active", label: "Active" },
  { value: "veryActive", label: "Very active" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function TdeeCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");

  useEffect(() => {
    replaceUrlParams({ a: age, h: heightCm, w: weightKg });
  }, [age, heightCm, weightKg]);

  const result = calculateTdee({ sex, age, heightCm, weightKg, activityLevel });
  const { bmr, tdee, allLevels } = result.value;

  return (
    <CalculatorPage
      title="TDEE calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Total Daily Energy Expenditure — calories to maintain your current weight, at every activity level for comparison."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="years" slider />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
          <ChoiceInput
            label="Activity level"
            value={activityLevel}
            onChange={setActivityLevel}
            options={ACTIVITY_OPTIONS}
            helpText="Sedentary = little/no exercise. Moderate = exercise 3-5 days/week. Very active = hard daily exercise plus a physical job."
          />
        </>
      }
      result={<ResultDisplay value={`${tdee} kcal`} caption={`Daily calories to maintain weight — BMR ${bmr} kcal at rest`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="TDEE at every activity level"
          columns={[
            { key: "label", label: "Activity level" },
            { key: "calories", label: "Calories/day", align: "right" },
          ]}
          rows={allLevels.map((row) => ({ label: row.label, calories: `${row.calories} kcal` }))}
        />
      }
      content={content}
    />
  );
}
