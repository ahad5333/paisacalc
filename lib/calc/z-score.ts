import type { CalcResult } from "./types";
import { normalCdf } from "./stats-utils";

export type ZScoreInputs = {
  x: number;
  mean: number;
  stdDev: number;
};

export function calculateZScore(inputs: ZScoreInputs): CalcResult<{ z: number; percentile: number }> {
  const { x, mean, stdDev } = inputs;
  const z = Math.round(((x - mean) / stdDev) * 10000) / 10000;
  const percentile = Math.round(normalCdf(z) * 10000) / 100;

  return {
    value: { z, percentile },
    steps: [
      { label: "Z-score", formula: `(${x} − ${mean}) ÷ ${stdDev}`, value: z },
      { label: "Percentile", formula: "standard normal CDF at z", value: `${percentile}%` },
    ],
    assumptions: [
      "The percentile assumes the underlying data is normally distributed — for data that isn't, the z-score is still valid, but the percentile figure won't be accurate",
      "The percentile is computed via the Abramowitz-Stegun approximation of the standard normal cumulative distribution, accurate to about 7 decimal places",
    ],
    rulesVersion: "Standard z-score, normal distribution",
  };
}
