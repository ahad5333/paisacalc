import type { CalcResult } from "./types";
import { calculateCalorie, type CalorieGoal } from "./calorie";
import type { Sex, ActivityLevel } from "./bmr";

export type CarbohydrateInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
};

export type CarbohydrateValue = {
  dailyCalorieTarget: number;
  carbLowG: number;
  carbHighG: number;
};

const CARB_PCT_LOW = 45;
const CARB_PCT_HIGH = 65;

// The Acceptable Macronutrient Distribution Range (AMDR) for carbohydrate
// — 45-65% of total calories — from the US Dietary Guidelines, applied to
// the same goal-adjusted daily calorie target the calorie calculator
// computes. A range rather than a single figure, since the guideline
// itself is a range, not a point estimate.
export function calculateCarbohydrate(inputs: CarbohydrateInputs): CalcResult<CarbohydrateValue> {
  const { sex, age, heightCm, weightKg, activityLevel, goal } = inputs;
  const dailyCalorieTarget = calculateCalorie({ sex, age, heightCm, weightKg, activityLevel, goal }).value.dailyCalorieTarget;
  const carbLowG = Math.round((dailyCalorieTarget * CARB_PCT_LOW) / 100 / 4);
  const carbHighG = Math.round((dailyCalorieTarget * CARB_PCT_HIGH) / 100 / 4);

  return {
    value: { dailyCalorieTarget, carbLowG, carbHighG },
    steps: [
      { label: "Daily calorie target", formula: "TDEE, adjusted for goal", value: dailyCalorieTarget },
      { label: `Carbohydrate (${CARB_PCT_LOW}%)`, formula: `${dailyCalorieTarget} × ${CARB_PCT_LOW}% ÷ 4 kcal/g`, value: carbLowG },
      { label: `Carbohydrate (${CARB_PCT_HIGH}%)`, formula: `${dailyCalorieTarget} × ${CARB_PCT_HIGH}% ÷ 4 kcal/g`, value: carbHighG },
    ],
    assumptions: [
      `Uses the US Dietary Guidelines' Acceptable Macronutrient Distribution Range for carbohydrate (${CARB_PCT_LOW}-${CARB_PCT_HIGH}% of total calories) — a broad range covering typical diets, not a single optimal figure`,
      "Carbohydrate is converted at 4 kcal/gram, the standard Atwater factor",
      "Lower-carbohydrate approaches deliberately sit below this range — it describes typical population guidance, not every valid dietary pattern",
    ],
    rulesVersion: "US Dietary Guidelines AMDR, 45-65% of calories",
  };
}
