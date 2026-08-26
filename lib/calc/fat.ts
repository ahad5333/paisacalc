import type { CalcResult } from "./types";
import { calculateCalorie, type CalorieGoal } from "./calorie";
import type { Sex, ActivityLevel } from "./bmr";

export type FatInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
};

export type FatValue = {
  dailyCalorieTarget: number;
  fatLowG: number;
  fatHighG: number;
  saturatedFatCapG: number;
};

const FAT_PCT_LOW = 20;
const FAT_PCT_HIGH = 35;
const SATURATED_FAT_PCT_CAP = 10;

// The AMDR for total fat (20-35% of calories, US Dietary Guidelines) plus
// the separate saturated fat cap (under 10% of calories, AHA/Dietary
// Guidelines) — the two figures answer different questions: how much fat
// overall, and how much of that should specifically not be saturated.
export function calculateFat(inputs: FatInputs): CalcResult<FatValue> {
  const { sex, age, heightCm, weightKg, activityLevel, goal } = inputs;
  const dailyCalorieTarget = calculateCalorie({ sex, age, heightCm, weightKg, activityLevel, goal }).value.dailyCalorieTarget;
  const fatLowG = Math.round((dailyCalorieTarget * FAT_PCT_LOW) / 100 / 9);
  const fatHighG = Math.round((dailyCalorieTarget * FAT_PCT_HIGH) / 100 / 9);
  const saturatedFatCapG = Math.round((dailyCalorieTarget * SATURATED_FAT_PCT_CAP) / 100 / 9);

  return {
    value: { dailyCalorieTarget, fatLowG, fatHighG, saturatedFatCapG },
    steps: [
      { label: "Daily calorie target", formula: "TDEE, adjusted for goal", value: dailyCalorieTarget },
      { label: `Total fat (${FAT_PCT_LOW}%)`, formula: `${dailyCalorieTarget} × ${FAT_PCT_LOW}% ÷ 9 kcal/g`, value: fatLowG },
      { label: `Total fat (${FAT_PCT_HIGH}%)`, formula: `${dailyCalorieTarget} × ${FAT_PCT_HIGH}% ÷ 9 kcal/g`, value: fatHighG },
      { label: `Saturated fat cap (${SATURATED_FAT_PCT_CAP}%)`, formula: `${dailyCalorieTarget} × ${SATURATED_FAT_PCT_CAP}% ÷ 9 kcal/g`, value: saturatedFatCapG },
    ],
    assumptions: [
      `Uses the US Dietary Guidelines' Acceptable Macronutrient Distribution Range for total fat (${FAT_PCT_LOW}-${FAT_PCT_HIGH}% of calories)`,
      `Saturated fat is capped separately at under ${SATURATED_FAT_PCT_CAP}% of calories, per AHA and Dietary Guidelines advice — this is a subset of total fat, not additional to it`,
      "Fat is converted at 9 kcal/gram, the standard Atwater factor — more than double protein or carbohydrate per gram",
    ],
    rulesVersion: "US Dietary Guidelines AMDR + AHA saturated fat cap",
  };
}
