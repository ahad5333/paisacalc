import type { CalcResult } from "./types";
import { calculateBmr, ACTIVITY_MULTIPLIERS, ACTIVITY_LABELS, type Sex, type ActivityLevel } from "./bmr";

export type { ActivityLevel } from "./bmr";
export type CalorieGoal = "lose" | "maintain" | "gain";

export type CalorieInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
};

export type CalorieValue = {
  bmr: number;
  tdee: number;
  dailyCalorieTarget: number;
  weeklyWeightChangeKg: number;
};

// A standard 500 kcal/day deficit or surplus for weight goals — the
// commonly cited figure for roughly 0.5kg/week of change, since 1kg of
// body fat is approximately 7,700 kcal (500 × 7 ÷ 7700 ≈ 0.45kg/week).
const GOAL_ADJUSTMENT_KCAL = 500;
const KCAL_PER_KG_FAT = 7700;

export function calculateCalorie(inputs: CalorieInputs): CalcResult<CalorieValue> {
  const { sex, age, heightCm, weightKg, activityLevel, goal } = inputs;

  const bmr = calculateBmr({ sex, age, heightCm, weightKg }).value.bmr;
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const tdee = Math.round(bmr * multiplier);

  const adjustment = goal === "lose" ? -GOAL_ADJUSTMENT_KCAL : goal === "gain" ? GOAL_ADJUSTMENT_KCAL : 0;
  const dailyCalorieTarget = tdee + adjustment;
  const weeklyWeightChangeKg = Math.round(((adjustment * 7) / KCAL_PER_KG_FAT) * 100) / 100;

  return {
    value: { bmr, tdee, dailyCalorieTarget, weeklyWeightChangeKg },
    steps: [
      { label: "BMR (Mifflin-St Jeor)", formula: "calories burned at complete rest", value: bmr },
      { label: "TDEE", formula: `${bmr} × ${multiplier} (${ACTIVITY_LABELS[activityLevel]})`, value: tdee },
      {
        label: "Daily calorie target",
        formula: goal === "maintain" ? "TDEE, no adjustment" : `TDEE ${goal === "lose" ? "−" : "+"} ${GOAL_ADJUSTMENT_KCAL}`,
        value: dailyCalorieTarget,
      },
    ],
    assumptions: [
      "TDEE uses standard activity multipliers (1.2 to 1.9) applied to BMR — a rough category, not a measured value",
      `A ${GOAL_ADJUSTMENT_KCAL} kcal/day deficit or surplus is the commonly cited figure for roughly 0.5kg/week of change, using 1kg of body fat ≈ 7,700 kcal`,
      "Real weight change also depends on water retention, muscle gain/loss, and how consistently the target is actually hit — this is a planning estimate, not a guarantee",
    ],
    rulesVersion: "Mifflin-St Jeor + standard activity multipliers",
  };
}
