"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateProtein, type ProteinGoal } from "@/lib/calc/protein";
import type { ActivityLevel } from "@/lib/calc/bmr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { weight: 75 };

const ACTIVITY_OPTIONS: { value: ActivityLevel; label: string }[] = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Light" },
  { value: "moderate", label: "Moderate" },
  { value: "active", label: "Active" },
  { value: "veryActive", label: "Very active" },
];

const GOAL_OPTIONS: { value: ProteinGoal; label: string }[] = [
  { value: "maintain", label: "Maintain" },
  { value: "lose", label: "Lose weight" },
  { value: "buildMuscle", label: "Build muscle" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ProteinCalculator({ content }: { content: ReactNode }) {
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<ProteinGoal>("maintain");

  useEffect(() => {
    replaceUrlParams({ w: weightKg });
  }, [weightKg]);

  const result = calculateProtein({ weightKg, activityLevel, goal });
  const { gramsPerKg, proteinG, proteinCalories } = result.value;

  return (
    <CalculatorPage
      title="Protein calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Daily protein target scaled from your bodyweight and activity level — the approach most sports-nutrition guidance actually uses."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
          <ChoiceInput label="Activity level" value={activityLevel} onChange={setActivityLevel} options={ACTIVITY_OPTIONS} />
          <ChoiceInput label="Goal" value={goal} onChange={setGoal} options={GOAL_OPTIONS} />
        </>
      }
      result={
        <ResultDisplay
          value={`${proteinG}g`}
          caption={`${gramsPerKg}g per kg bodyweight — ${proteinCalories} kcal from protein`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
