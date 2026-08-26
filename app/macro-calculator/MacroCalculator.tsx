"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateMacro, type DietPlan } from "@/lib/calc/macro";
import type { CalorieGoal } from "@/lib/calc/calorie";
import type { Sex, ActivityLevel } from "@/lib/calc/bmr";
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

const GOAL_OPTIONS: { value: CalorieGoal; label: string }[] = [
  { value: "lose", label: "Lose weight" },
  { value: "maintain", label: "Maintain" },
  { value: "gain", label: "Gain weight" },
];

const PLAN_OPTIONS: { value: DietPlan; label: string }[] = [
  { value: "balanced", label: "Balanced" },
  { value: "lowCarb", label: "Low carb" },
  { value: "highProtein", label: "High protein" },
  { value: "lowFat", label: "Low fat" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function MacroCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<CalorieGoal>("maintain");
  const [plan, setPlan] = useState<DietPlan>("balanced");

  useEffect(() => {
    replaceUrlParams({ a: age, h: heightCm, w: weightKg });
  }, [age, heightCm, weightKg]);

  const result = calculateMacro({ sex, age, heightCm, weightKg, activityLevel, goal, plan });
  const { dailyCalorieTarget, proteinG, carbG, fatG, proteinPct, carbPct, fatPct } = result.value;

  return (
    <CalculatorPage
      title="Macro calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Daily protein, carb, and fat targets in grams, from your calorie target and a diet-plan preset."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Sex" value={sex} onChange={setSex} options={SEX_OPTIONS} />
          <NumericInput label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="years" slider />
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={120} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
          <ChoiceInput label="Activity level" value={activityLevel} onChange={setActivityLevel} options={ACTIVITY_OPTIONS} />
          <ChoiceInput label="Goal" value={goal} onChange={setGoal} options={GOAL_OPTIONS} />
          <ChoiceInput label="Diet plan" value={plan} onChange={setPlan} options={PLAN_OPTIONS} />
        </>
      }
      result={
        <ResultDisplay
          value={`${proteinG}P / ${carbG}C / ${fatG}F`}
          caption={`Grams per day at ${dailyCalorieTarget} kcal — ${proteinPct}/${carbPct}/${fatPct}% split`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Macro breakdown"
          columns={[
            { key: "macro", label: "Macro" },
            { key: "pct", label: "% of calories", align: "right" },
            { key: "grams", label: "Grams/day", align: "right" },
          ]}
          rows={[
            { macro: "Protein", pct: `${proteinPct}%`, grams: `${proteinG}g` },
            { macro: "Carbohydrate", pct: `${carbPct}%`, grams: `${carbG}g` },
            { macro: "Fat", pct: `${fatPct}%`, grams: `${fatG}g` },
          ]}
        />
      }
      content={content}
    />
  );
}
