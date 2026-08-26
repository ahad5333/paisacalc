import type { CalcResult } from "./types";
import { Z_SCORES } from "./stats-utils";

export type SampleSizeInputs = {
  confidenceLevel: 90 | 95 | 99;
  marginOfErrorPct: number;
  proportionPct: number;
  populationSize: number;
};

export type SampleSizeValue = {
  sampleSize: number;
  zScore: number;
};

// Standard survey sample-size formula, with the finite population
// correction applied whenever a population size is given (0 means
// "unknown/very large," where the correction has negligible effect
// anyway).
export function calculateSampleSize(inputs: SampleSizeInputs): CalcResult<SampleSizeValue> {
  const { confidenceLevel, marginOfErrorPct, proportionPct, populationSize } = inputs;
  const z = Z_SCORES[confidenceLevel];
  const p = proportionPct / 100;
  const e = marginOfErrorPct / 100;
  const n0 = (z * z * p * (1 - p)) / (e * e);
  const sampleSize = populationSize > 0 ? Math.ceil(n0 / (1 + (n0 - 1) / populationSize)) : Math.ceil(n0);

  return {
    value: { sampleSize, zScore: z },
    steps: [
      { label: "Base sample size", formula: `(Z² × p × (1−p)) ÷ E²`, value: Math.ceil(n0) },
      ...(populationSize > 0
        ? [{ label: "Adjusted for finite population", formula: `n₀ ÷ (1 + (n₀−1)/N)`, value: sampleSize }]
        : []),
    ],
    assumptions: [
      `Uses Z = ${z} for ${confidenceLevel}% confidence`,
      proportionPct === 50 ? "50% proportion is the most conservative assumption (gives the largest required sample) when the true proportion is unknown" : `Assumes the true proportion is around ${proportionPct}%`,
      populationSize > 0 ? "Applies the finite population correction, appropriate when sampling from a known, bounded population" : "No finite population correction applied — appropriate when the population is very large or unknown",
    ],
    rulesVersion: "Standard survey sample size formula",
  };
}
