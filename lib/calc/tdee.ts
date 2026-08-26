import type { CalcResult } from "./types";
import { calculateBmr, ACTIVITY_MULTIPLIERS, ACTIVITY_LABELS, type Sex, type ActivityLevel } from "./bmr";

export type { ActivityLevel } from "./bmr";

export type TdeeInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
};

export type ActivityLevelRow = {
  level: ActivityLevel;
  label: string;
  multiplier: number;
  calories: number;
};

export type TdeeValue = {
  bmr: number;
  tdee: number;
  allLevels: ActivityLevelRow[];
};

const ALL_LEVELS: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "veryActive"];

// TDEE at the selected activity level, plus the same BMR run across every
// activity level for comparison — the Calorie calculator computes this
// same number internally but only surfaces the one selected level, since
// its focus is a weight-goal target rather than comparing activity tiers.
export function calculateTdee(inputs: TdeeInputs): CalcResult<TdeeValue> {
  const { sex, age, heightCm, weightKg, activityLevel } = inputs;
  const bmr = calculateBmr({ sex, age, heightCm, weightKg }).value.bmr;
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const tdee = Math.round(bmr * multiplier);

  const allLevels: ActivityLevelRow[] = ALL_LEVELS.map((level) => ({
    level,
    label: ACTIVITY_LABELS[level],
    multiplier: ACTIVITY_MULTIPLIERS[level],
    calories: Math.round(bmr * ACTIVITY_MULTIPLIERS[level]),
  }));

  return {
    value: { bmr, tdee, allLevels },
    steps: [
      { label: "BMR (Mifflin-St Jeor)", formula: "calories burned at complete rest", value: bmr },
      { label: "TDEE", formula: `${bmr} × ${multiplier} (${ACTIVITY_LABELS[activityLevel]})`, value: tdee },
    ],
    assumptions: [
      "TDEE uses standard activity multipliers (1.2 to 1.9) applied to BMR — a rough category based on self-reported activity, not a measured value",
      "This is the estimated calories needed to maintain current weight — for a target above or below that, see the calorie calculator",
    ],
    rulesVersion: "Mifflin-St Jeor + standard activity multipliers",
  };
}
