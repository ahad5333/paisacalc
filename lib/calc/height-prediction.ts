import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type HeightPredictionInputs = {
  fatherHeightCm: number;
  motherHeightCm: number;
  childSex: Sex;
};

// The mid-parental height method — a widely cited pediatric estimate for
// a child's likely adult height, adding (boys) or subtracting (girls)
// 13cm to account for the average sex difference in adult height, then
// averaging both parents.
export function calculateHeightPrediction(inputs: HeightPredictionInputs): CalcResult<{ predictedHeightCm: number; rangeLowCm: number; rangeHighCm: number }> {
  const { fatherHeightCm, motherHeightCm, childSex } = inputs;
  const adjustment = childSex === "male" ? 13 : -13;
  const predictedHeightCm = Math.round(((fatherHeightCm + motherHeightCm + adjustment) / 2) * 10) / 10;
  const rangeLowCm = Math.round((predictedHeightCm - 8.5) * 10) / 10;
  const rangeHighCm = Math.round((predictedHeightCm + 8.5) * 10) / 10;

  return {
    value: { predictedHeightCm, rangeLowCm, rangeHighCm },
    steps: [
      {
        label: "Predicted adult height",
        formula: `(father + mother ${adjustment >= 0 ? "+" : "−"} ${Math.abs(adjustment)}cm) ÷ 2`,
        value: predictedHeightCm,
      },
      { label: "Likely range (±8.5cm)", formula: "", value: `${rangeLowCm}–${rangeHighCm} cm` },
    ],
    assumptions: [
      "Uses the mid-parental height method, a widely cited pediatric estimate — actual adult height also depends on nutrition, health, and genetic factors beyond the two parents' heights",
      "The ±8.5cm range reflects that roughly 2 out of 3 children land within this range of the prediction, not a guarantee",
    ],
    rulesVersion: "Mid-parental height method",
  };
}
