import type { CalcResult } from "./types";

export type Sex = "male" | "female";

export type BmrInputs = {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
};

export type BmrValue = {
  bmr: number;
};

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "veryActive";

// Standard activity multipliers applied to BMR — shared by the TDEE and
// Calorie calculators so both stay consistent with each other.
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  veryActive: 1.9,
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "sedentary (little or no exercise)",
  light: "lightly active (light exercise 1-3 days/week)",
  moderate: "moderately active (moderate exercise 3-5 days/week)",
  active: "very active (hard exercise 6-7 days/week)",
  veryActive: "extremely active (hard daily exercise plus a physical job)",
};

// Mifflin-St Jeor (1990) — the equation most dietitians now use in place
// of the older Harris-Benedict formula, which several validation studies
// found systematically overestimates BMR. Shared by the BMR, TDEE, and
// Calorie calculators (the latter two call this directly and read
// result.value.bmr) rather than duplicated three times.
export function calculateBmr(inputs: BmrInputs): CalcResult<BmrValue> {
  const { sex, age, heightCm, weightKg } = inputs;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = Math.round(sex === "male" ? base + 5 : base - 161);

  return {
    value: { bmr },
    steps: [
      {
        label: "BMR (Mifflin-St Jeor)",
        formula: sex === "male" ? "10×weight + 6.25×height − 5×age + 5" : "10×weight + 6.25×height − 5×age − 161",
        value: bmr,
      },
    ],
    assumptions: [
      "Mifflin-St Jeor is the equation most dietitians currently favour over the older Harris-Benedict formula, which several validation studies found tends to overestimate BMR",
      "BMR is calories burned at complete rest — it doesn't include any activity, which is what the TDEE and Calorie calculators add on top",
    ],
    rulesVersion: "Mifflin-St Jeor equation (1990)",
  };
}
