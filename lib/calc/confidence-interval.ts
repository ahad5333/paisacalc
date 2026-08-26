import type { CalcResult } from "./types";
import { Z_SCORES } from "./stats-utils";

export type ConfidenceIntervalInputs = {
  sampleMean: number;
  sampleStdDev: number;
  sampleSize: number;
  confidenceLevel: 90 | 95 | 99;
};

export type ConfidenceIntervalValue = {
  marginOfError: number;
  lowerBound: number;
  upperBound: number;
};

export function calculateConfidenceInterval(inputs: ConfidenceIntervalInputs): CalcResult<ConfidenceIntervalValue> {
  const { sampleMean, sampleStdDev, sampleSize, confidenceLevel } = inputs;
  const z = Z_SCORES[confidenceLevel];
  const marginOfError = Math.round(z * (sampleStdDev / Math.sqrt(sampleSize)) * 10000) / 10000;
  const lowerBound = Math.round((sampleMean - marginOfError) * 10000) / 10000;
  const upperBound = Math.round((sampleMean + marginOfError) * 10000) / 10000;

  return {
    value: { marginOfError, lowerBound, upperBound },
    steps: [
      { label: "Margin of error", formula: `Z × (s ÷ √n)`, value: marginOfError },
      { label: `${confidenceLevel}% confidence interval`, formula: `mean ± margin of error`, value: `${lowerBound} to ${upperBound}` },
    ],
    assumptions: [
      `Uses Z = ${z} for ${confidenceLevel}% confidence`,
      "Assumes a large enough sample size for the sampling distribution of the mean to be approximately normal (the Central Limit Theorem) — for very small samples, a t-distribution would be more accurate than this Z-based interval",
    ],
    rulesVersion: "Z-based confidence interval for a mean",
  };
}
