import type { CalcResult } from "./types";
import { mean, median, mode, range } from "./stats-utils";

export type MeanMedianModeInputs = {
  values: number[];
};

export type MeanMedianModeValue = {
  meanValue: number;
  medianValue: number;
  modeValues: number[];
  rangeValue: number;
};

export function calculateMeanMedianMode(inputs: MeanMedianModeInputs): CalcResult<MeanMedianModeValue> {
  const { values } = inputs;
  const round = (n: number) => Math.round(n * 10000) / 10000;

  const meanValue = round(mean(values));
  const medianValue = round(median(values));
  const modeValues = mode(values);
  const rangeValue = round(range(values));

  return {
    value: { meanValue, medianValue, modeValues, rangeValue },
    steps: [
      { label: "Mean (average)", formula: `sum ÷ ${values.length}`, value: meanValue },
      { label: "Median (middle value)", formula: "sorted, middle value(s)", value: medianValue },
      { label: "Mode (most frequent)", formula: "value(s) appearing most often", value: modeValues.length ? modeValues.join(", ") : "none (all values unique)" },
      { label: "Range", formula: "max − min", value: rangeValue },
    ],
    assumptions: [
      "The median averages the two middle values when there's an even count of numbers",
      "\"No mode\" means every value appears exactly once — there's no most-frequent value to report",
    ],
    rulesVersion: "Standard descriptive statistics",
  };
}
