import type { CalcResult } from "./types";
import { mean, variance, stdDev } from "./stats-utils";

export type StandardDeviationInputs = {
  values: number[];
  sample: boolean;
};

export type StandardDeviationValue = {
  meanValue: number;
  varianceValue: number;
  stdDevValue: number;
};

export function calculateStandardDeviation(inputs: StandardDeviationInputs): CalcResult<StandardDeviationValue> {
  const { values, sample } = inputs;
  const meanValue = Math.round(mean(values) * 10000) / 10000;
  const varianceValue = Math.round(variance(values, sample) * 10000) / 10000;
  const stdDevValue = Math.round(stdDev(values, sample) * 10000) / 10000;

  return {
    value: { meanValue, varianceValue, stdDevValue },
    steps: [
      { label: "Mean", formula: `sum ÷ ${values.length}`, value: meanValue },
      { label: `Variance (${sample ? "sample" : "population"})`, formula: `Σ(x − mean)² ÷ ${sample ? `(${values.length} − 1)` : values.length}`, value: varianceValue },
      { label: "Standard deviation", formula: "√variance", value: stdDevValue },
    ],
    assumptions: [
      sample
        ? "Sample standard deviation divides by (n − 1), Bessel's correction — the usual choice when the data is a sample used to estimate a larger population's spread"
        : "Population standard deviation divides by n — the correct choice when the data already represents the entire population, not a sample of it",
    ],
    rulesVersion: sample ? "Sample standard deviation (n−1)" : "Population standard deviation (n)",
  };
}
