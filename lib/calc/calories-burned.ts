import type { CalcResult } from "./types";

export type Activity =
  | "walking"
  | "running"
  | "cycling"
  | "swimming"
  | "yoga"
  | "weightTraining"
  | "jumpRope"
  | "dancing";

export type CaloriesBurnedInputs = {
  activity: Activity;
  weightKg: number;
  durationMinutes: number;
};

export type CaloriesBurnedValue = {
  met: number;
  caloriesBurned: number;
};

// MET (Metabolic Equivalent of Task) values from the Compendium of
// Physical Activities, the standard reference researchers and fitness
// apps use — 1 MET is the energy cost of sitting quietly, and other
// activities are expressed as a multiple of that. The formula
// (kcal/min = MET × 3.5 × weight in kg ÷ 200) is the standard ACSM
// conversion from MET to actual calories.
export const ACTIVITY_METS: Record<Activity, number> = {
  walking: 3.5,
  running: 9.8,
  cycling: 8.0,
  swimming: 6.0,
  yoga: 2.5,
  weightTraining: 6.0,
  jumpRope: 11.0,
  dancing: 5.0,
};

export const ACTIVITY_LABELS: Record<Activity, string> = {
  walking: "Walking (moderate pace)",
  running: "Running (6 mph)",
  cycling: "Cycling (moderate)",
  swimming: "Swimming (moderate)",
  yoga: "Yoga",
  weightTraining: "Weight training",
  jumpRope: "Jump rope",
  dancing: "Dancing",
};

export function calculateCaloriesBurned(inputs: CaloriesBurnedInputs): CalcResult<CaloriesBurnedValue> {
  const { activity, weightKg, durationMinutes } = inputs;
  const met = ACTIVITY_METS[activity];

  const caloriesPerMinute = (met * 3.5 * weightKg) / 200;
  const caloriesBurned = Math.round(caloriesPerMinute * durationMinutes);

  return {
    value: { met, caloriesBurned },
    steps: [
      { label: `MET value (${ACTIVITY_LABELS[activity]})`, formula: "from the Compendium of Physical Activities", value: met },
      {
        label: "Calories burned",
        formula: `(${met} × 3.5 × ${weightKg} ÷ 200) × ${durationMinutes} minutes`,
        value: caloriesBurned,
      },
    ],
    assumptions: [
      "MET values are averages for a general intensity level of each activity — actual effort (pace, incline, resistance) shifts the real number up or down",
      "The MET-to-calorie formula (MET × 3.5 × weight ÷ 200 per minute) is the standard ACSM conversion",
      "Doesn't account for individual fitness level, which affects how efficiently a given activity is performed",
    ],
    rulesVersion: "Compendium of Physical Activities MET values",
  };
}
