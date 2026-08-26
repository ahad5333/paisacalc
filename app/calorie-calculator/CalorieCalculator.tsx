"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCalorie, type ActivityLevel, type CalorieGoal } from "@/lib/calc/calorie";
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

const GOAL_OPTIONS: { value: CalorieGoal; label: string }[] = [
  { value: "lose", label: "Lose weight" },
  { value: "maintain", label: "Maintain" },
  { value: "gain", label: "Gain weight" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CalorieCalculator({ content }: { content: ReactNode }) {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<CalorieGoal>("lose");

  useEffect(() => {
    replaceUrlParams({ a: age, h: heightCm, w: weightKg });
  }, [age, heightCm, weightKg]);

  const result = calculateCalorie({ sex, age, heightCm, weightKg, activityLevel, goal });
  const { dailyCalorieTarget, weeklyWeightChangeKg } = result.value;

  return (
    <CalculatorPage
      title="Calorie calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Daily calorie target for losing, maintaining, or gaining weight — built on BMR (Mifflin-St Jeor) plus your activity level."
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
          <ChoiceInput label="Goal" value={goal} onChange={setGoal} options={GOAL_OPTIONS} />
        </>
      }
      result={
        <ResultDisplay
          value={`${dailyCalorieTarget} kcal`}
          caption={
            weeklyWeightChangeKg === 0
              ? "Daily target to maintain your current weight"
              : `Daily target — about ${Math.abs(weeklyWeightChangeKg)}kg ${weeklyWeightChangeKg < 0 ? "lost" : "gained"} per week at this rate`
          }
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
