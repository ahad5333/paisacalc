import type { CalcResult } from "./types";
import type { Sex } from "./bmr";

export type BacInputs = {
  sex: Sex;
  weightKg: number;
  standardDrinks: number;
  hoursElapsed: number;
};

export type BacValue = {
  peakBac: number;
  bac: number;
  impairmentLevel: string;
};

const WIDMARK_R: Record<Sex, number> = { male: 0.68, female: 0.55 };
const GRAMS_ALCOHOL_PER_DRINK = 14;
const METABOLISM_RATE_PCT_PER_HOUR = 0.015;

function impairmentLevel(bac: number): string {
  if (bac <= 0) return "No alcohol detected";
  if (bac < 0.03) return "Minimal impairment";
  if (bac < 0.06) return "Mild impairment";
  if (bac < 0.1) return "Significant impairment";
  return "Severe impairment";
}

// Widmark formula (1932) — a population-average estimate built on a
// fixed body-water distribution ratio (r) per sex and a fixed elimination
// rate, not a personal measurement. Provided for education only: this
// cannot replace a breathalyzer or blood test, and it must never be used
// to judge whether it's safe to drive.
export function calculateBac(inputs: BacInputs): CalcResult<BacValue> {
  const { sex, weightKg, standardDrinks, hoursElapsed } = inputs;
  const alcoholGrams = standardDrinks * GRAMS_ALCOHOL_PER_DRINK;
  const weightGrams = weightKg * 1000;
  const r = WIDMARK_R[sex];

  const peakBacRaw = (alcoholGrams / (weightGrams * r)) * 100;
  const peakBac = Math.round(peakBacRaw * 1000) / 1000;
  const bac = Math.max(0, Math.round((peakBacRaw - METABOLISM_RATE_PCT_PER_HOUR * hoursElapsed) * 1000) / 1000);

  return {
    value: { peakBac, bac, impairmentLevel: impairmentLevel(bac) },
    steps: [
      { label: "Alcohol consumed", formula: `${standardDrinks} drinks × ${GRAMS_ALCOHOL_PER_DRINK}g`, value: alcoholGrams },
      { label: "Peak BAC (Widmark)", formula: "alcohol ÷ (weight × r) × 100", value: peakBac },
      { label: "BAC after elapsed time", formula: `peak − (${METABOLISM_RATE_PCT_PER_HOUR} × ${hoursElapsed}hr)`, value: bac },
    ],
    assumptions: [
      "Uses the Widmark formula, a population-average estimate — actual BAC varies significantly with metabolism, food intake, medication, and other individual factors this formula can't capture",
      `Assumes a standard drink is ${GRAMS_ALCOHOL_PER_DRINK}g of pure alcohol (roughly a 12oz beer, 5oz wine, or 1.5oz spirit) and a fixed elimination rate of ${METABOLISM_RATE_PCT_PER_HOUR}% per hour`,
      "This is an educational estimate, not a legal or medical measurement, and cannot replace a breathalyzer or blood test — never use it to decide whether it's safe to drive; the only safe BAC for driving is 0.00%",
    ],
    rulesVersion: "Widmark formula, standard elimination rate",
  };
}
