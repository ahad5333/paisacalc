import type { CalcResult } from "./types";
import { mean, median, mode, range, variance, stdDev } from "./stats-utils";

export type StatisticsInputs = {
  values: number[];
};

export type StatisticsValue = {
  count: number;
  sum: number;
  meanValue: number;
  medianValue: number;
  modeValues: number[];
  rangeValue: number;
  sampleVariance: number;
  sampleStdDev: number;
  populationVariance: number;
  populationStdDev: number;
};

// The comprehensive "everything at once" report — the Standard Deviation
// and Mean/Median/Mode/Range calculators cover pieces of this in more
// depth with focused explanations, but this is the one-stop full summary
// calculator.net's own equivalent tool provides.
export function calculateStatistics(inputs: StatisticsInputs): CalcResult<StatisticsValue> {
  const { values } = inputs;
  const round = (n: number) => Math.round(n * 10000) / 10000;

  const meanValue = round(mean(values));
  const medianValue = round(median(values));
  const modeValues = mode(values);
  const rangeValue = round(range(values));
  const sum = round(values.reduce((a, b) => a + b, 0));
  const sampleVariance = round(variance(values, true));
  const sampleStdDev = round(stdDev(values, true));
  const populationVariance = round(variance(values, false));
  const populationStdDev = round(stdDev(values, false));

  return {
    value: {
      count: values.length,
      sum,
      meanValue,
      medianValue,
      modeValues,
      rangeValue,
      sampleVariance,
      sampleStdDev,
      populationVariance,
      populationStdDev,
    },
    steps: [
      { label: "Mean", formula: `sum ÷ ${values.length}`, value: meanValue },
      { label: "Median", formula: "middle value(s) when sorted", value: medianValue },
      { label: "Mode", formula: "most frequent value(s)", value: modeValues.length ? modeValues.join(", ") : "none (all values unique)" },
      { label: "Range", formula: "max − min", value: rangeValue },
      { label: "Sample standard deviation", formula: "√(Σ(x−mean)² ÷ (n−1))", value: sampleStdDev },
    ],
    assumptions: [
      "Both sample (n−1) and population (n) variance/standard deviation are shown, since which is correct depends on whether this data is the full population or a sample of it",
      values.length < 2 ? "Sample variance and standard deviation are undefined for fewer than 2 values" : "",
    ].filter(Boolean),
    rulesVersion: "Standard descriptive statistics",
  };
}
