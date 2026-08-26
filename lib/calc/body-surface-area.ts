import type { CalcResult } from "./types";

export type BsaInputs = {
  heightCm: number;
  weightKg: number;
};

export type BsaValue = {
  mosteller: number;
  dubois: number;
};

// Mosteller (1987) is the simpler, now more commonly used formula
// clinically (drug dosing, burn assessment); DuBois & DuBois (1916) is
// the original formula many reference ranges were historically built on.
// Both are shown since clinical practice hasn't fully standardised on
// one — figures from either are generally accepted.
export function calculateBodySurfaceArea(inputs: BsaInputs): CalcResult<BsaValue> {
  const { heightCm, weightKg } = inputs;
  const mosteller = Math.round(Math.sqrt((heightCm * weightKg) / 3600) * 100) / 100;
  const dubois = Math.round(0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725) * 100) / 100;

  return {
    value: { mosteller, dubois },
    steps: [
      { label: "BSA (Mosteller)", formula: "√((height × weight) ÷ 3600)", value: mosteller },
      { label: "BSA (DuBois)", formula: "0.007184 × weight^0.425 × height^0.725", value: dubois },
    ],
    assumptions: [
      "Mosteller and DuBois are both widely accepted formulas that generally agree within a few percent of each other — neither is considered definitively more accurate for a given individual",
      "BSA is used clinically for chemotherapy dosing, burn surface assessment, and cardiac index calculations — always among several inputs a clinician considers, not a standalone measurement",
      "This is an estimate for general reference, not a substitute for a clinical calculation used in an actual treatment decision",
    ],
    rulesVersion: "Mosteller (1987) / DuBois & DuBois (1916)",
  };
}
