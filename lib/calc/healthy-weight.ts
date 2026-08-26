import type { CalcResult } from "./types";

export type HealthyWeightInputs = {
  heightCm: number;
};

export type HealthyWeightValue = {
  minWeightKg: number;
  maxWeightKg: number;
};

// A healthy weight RANGE from height alone, using the same Asian BMI
// cutoffs as the BMI calculator (18.5-22.9) — deliberately consistent
// with that calculator rather than introducing a second set of
// thresholds. This is the inverse operation: BMI takes height+weight to
// a number, this takes height alone to a weight range.
const BMI_LOWER = 18.5;
const BMI_UPPER = 22.9;

export function calculateHealthyWeight(inputs: HealthyWeightInputs): CalcResult<HealthyWeightValue> {
  const { heightCm } = inputs;
  const heightM = heightCm / 100;

  const minWeightKg = Math.round(BMI_LOWER * heightM * heightM * 10) / 10;
  const maxWeightKg = Math.round(BMI_UPPER * heightM * heightM * 10) / 10;

  return {
    value: { minWeightKg, maxWeightKg },
    steps: [
      { label: "Minimum healthy weight", formula: `${BMI_LOWER} × (${heightM})²`, value: minWeightKg },
      { label: "Maximum healthy weight", formula: `${BMI_UPPER} × (${heightM})²`, value: maxWeightKg },
    ],
    assumptions: [
      "Uses the same WHO Asian BMI cutoffs (18.5-22.9) as the BMI calculator, for consistency between the two tools",
      "A range from height alone — doesn't account for frame size, muscle mass, or build",
    ],
    rulesVersion: "WHO Asian BMI cutoffs, inverted for a weight range",
  };
}
