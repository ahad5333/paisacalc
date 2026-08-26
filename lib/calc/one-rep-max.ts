import type { CalcResult } from "./types";

export type OneRepMaxInputs = {
  weightKg: number;
  reps: number;
};

export type OneRepMaxValue = {
  epley: number;
  brzycki: number;
  average: number;
};

// Two formulas, both estimating the same thing from a sub-maximal set —
// Epley (1985) and Brzycki (1993) — since neither is universally more
// accurate and they can diverge noticeably at higher rep counts. Both
// break down well before rep counts of 15-20, where the underlying
// strength/endurance relationship they're built on stops holding.
export function calculateOneRepMax(inputs: OneRepMaxInputs): CalcResult<OneRepMaxValue> {
  const { weightKg, reps } = inputs;

  const epley = Math.round(weightKg * (1 + reps / 30) * 10) / 10;
  const brzycki = Math.round(((weightKg * 36) / (37 - reps)) * 10) / 10;
  const average = Math.round(((epley + brzycki) / 2) * 10) / 10;

  return {
    value: { epley, brzycki, average },
    steps: [
      { label: "Epley formula", formula: `${weightKg} × (1 + ${reps}÷30)`, value: epley },
      { label: "Brzycki formula", formula: `${weightKg} × 36 ÷ (37 − ${reps})`, value: brzycki },
      { label: "Average of both", formula: "(Epley + Brzycki) ÷ 2", value: average },
    ],
    assumptions: [
      "Both formulas estimate a single-rep max from a sub-maximal set — they're a prediction, not a substitute for actually testing your 1RM under proper form and supervision",
      "Accuracy degrades well before 15-20 reps, where the strength/endurance relationship these formulas assume stops holding",
      "Doesn't account for how close to failure the set was taken, which affects how reliable the estimate is",
    ],
    rulesVersion: "Epley (1985) and Brzycki (1993) formulas",
  };
}
