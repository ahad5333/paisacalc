import type { CalcResult } from "./types";
import { calculateCalorie, type CalorieGoal } from "./calorie";
import type { Sex, ActivityLevel } from "./bmr";

export type DietPlan = "balanced" | "lowCarb" | "highProtein" | "lowFat";

export type MacroInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: CalorieGoal;
  plan: DietPlan;
};

export type MacroValue = {
  dailyCalorieTarget: number;
  proteinG: number;
  carbG: number;
  fatG: number;
  proteinPct: number;
  carbPct: number;
  fatPct: number;
};

const DIET_PLANS: Record<DietPlan, { protein: number; carb: number; fat: number; label: string }> = {
  balanced: { protein: 30, carb: 40, fat: 30, label: "Balanced" },
  lowCarb: { protein: 40, carb: 20, fat: 40, label: "Low carb" },
  highProtein: { protein: 40, carb: 30, fat: 30, label: "High protein" },
  lowFat: { protein: 30, carb: 50, fat: 20, label: "Low fat" },
};

// Splits a goal-adjusted daily calorie target (same calculation the
// calorie calculator uses) into grams of protein, carbs, and fat, by a
// chosen diet-plan preset — protein and carbs at 4 kcal/gram, fat at 9
// kcal/gram, the standard Atwater conversion factors.
export function calculateMacro(inputs: MacroInputs): CalcResult<MacroValue> {
  const { sex, age, heightCm, weightKg, activityLevel, goal, plan } = inputs;
  const calorie = calculateCalorie({ sex, age, heightCm, weightKg, activityLevel, goal });
  const dailyCalorieTarget = calorie.value.dailyCalorieTarget;
  const split = DIET_PLANS[plan];

  const proteinG = Math.round((dailyCalorieTarget * split.protein) / 100 / 4);
  const carbG = Math.round((dailyCalorieTarget * split.carb) / 100 / 4);
  const fatG = Math.round((dailyCalorieTarget * split.fat) / 100 / 9);

  return {
    value: { dailyCalorieTarget, proteinG, carbG, fatG, proteinPct: split.protein, carbPct: split.carb, fatPct: split.fat },
    steps: [
      { label: "Daily calorie target", formula: "TDEE, adjusted for goal", value: dailyCalorieTarget },
      { label: `Protein (${split.protein}%)`, formula: `${dailyCalorieTarget} × ${split.protein}% ÷ 4 kcal/g`, value: proteinG },
      { label: `Carbs (${split.carb}%)`, formula: `${dailyCalorieTarget} × ${split.carb}% ÷ 4 kcal/g`, value: carbG },
      { label: `Fat (${split.fat}%)`, formula: `${dailyCalorieTarget} × ${split.fat}% ÷ 9 kcal/g`, value: fatG },
    ],
    assumptions: [
      `The "${split.label}" plan splits calories ${split.protein}/${split.carb}/${split.fat}% across protein/carbs/fat — a preset ratio, not personalised to training goals the way gram-per-kg protein targets are`,
      "Protein and carbs are converted at 4 kcal/gram, fat at 9 kcal/gram — the standard Atwater factors",
      "For a bodyweight-scaled protein target instead of a percentage split, see the protein calculator",
    ],
    rulesVersion: "Atwater factors (4/4/9 kcal per gram)",
  };
}
