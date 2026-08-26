import type { CalcResult } from "./types";

export type BmiInputs = {
  heightCm: number;
  weightKg: number;
};

export type BmiBand = "underweight" | "normal" | "overweight" | "obese";

export type BmiValue = {
  bmi: number;
  band: BmiBand;
};

// WHO's Asian-specific BMI cutoffs (18.5 / 23 / 25), not the more widely
// known Western ones (18.5 / 25 / 30). WHO's 2004 expert consultation
// found that Asian populations show elevated health risk — diabetes,
// cardiovascular disease — at meaningfully lower BMI than the Western
// cutoffs assume, and India's own public health guidance (ICMR) follows
// these lower thresholds rather than the global-default ones. Using the
// Western cutoffs here would systematically under-flag risk for the
// site's actual (Indian) audience.
export function calculateBmi(inputs: BmiInputs): CalcResult<BmiValue> {
  const { heightCm, weightKg } = inputs;
  const heightM = heightCm / 100;

  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  const band: BmiBand = bmi < 18.5 ? "underweight" : bmi < 23 ? "normal" : bmi < 25 ? "overweight" : "obese";

  return {
    value: { bmi, band },
    steps: [{ label: "BMI", formula: `${weightKg} ÷ (${heightCm / 100})²`, value: bmi }],
    assumptions: [
      "Uses WHO's Asian-specific BMI cutoffs (underweight <18.5, normal 18.5-22.9, overweight 23-24.9, obese ≥25) rather than the higher Western cutoffs (25/30) — Asian populations show elevated health risk at lower BMI, and India's own public health guidance follows these lower thresholds",
      "BMI doesn't distinguish muscle from fat — a very muscular person can show a high BMI while carrying low body fat",
      "Not meaningful for children, pregnant women, or the elderly, who need different reference standards entirely",
    ],
    rulesVersion: "WHO Asian BMI cutoffs",
  };
}
