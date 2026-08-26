"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateCaloriesBurned, ACTIVITY_LABELS, type Activity } from "@/lib/calc/calories-burned";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { weight: 75, duration: 30 };

const ACTIVITY_OPTIONS = (Object.keys(ACTIVITY_LABELS) as Activity[]).map((value) => ({
  value,
  label: ACTIVITY_LABELS[value],
}));

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CaloriesBurnedCalculator({ content }: { content: ReactNode }) {
  const [activity, setActivity] = useState<Activity>("running");
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [durationMinutes, setDurationMinutes] = useState(() => initialParam("d", DEFAULTS.duration));

  useEffect(() => {
    replaceUrlParams({ w: weightKg, d: durationMinutes });
  }, [weightKg, durationMinutes]);

  const result = calculateCaloriesBurned({ activity, weightKg, durationMinutes });
  const { caloriesBurned } = result.value;

  return (
    <CalculatorPage
      title="Calories burned calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 45%"
      description="Calories burned during an activity, using MET values from the Compendium of Physical Activities — the standard reference fitness apps and researchers use."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Activity" value={activity} onChange={setActivity} options={ACTIVITY_OPTIONS} />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={30} max={180} step={0.5} suffix="kg" slider />
          <NumericInput
            label="Duration"
            value={durationMinutes}
            onChange={setDurationMinutes}
            min={5}
            max={180}
            step={5}
            suffix="minutes"
            slider
          />
        </>
      }
      result={<ResultDisplay value={`${caloriesBurned} kcal`} caption={`Calories burned — ${ACTIVITY_LABELS[activity]}, ${durationMinutes} minutes`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
