import type { CalcResult } from "./types";

export type SequenceType = "arithmetic" | "geometric";

export type NumberSequenceInputs = {
  firstTerm: number;
  commonValue: number;
  termCount: number;
  type: SequenceType;
};

export type NumberSequenceValue = {
  terms: number[];
  sum: number;
};

export function calculateNumberSequence(inputs: NumberSequenceInputs): CalcResult<NumberSequenceValue> {
  const { firstTerm, commonValue, termCount, type } = inputs;
  const terms: number[] = [];
  for (let i = 0; i < termCount; i++) {
    terms.push(type === "arithmetic" ? firstTerm + commonValue * i : firstTerm * Math.pow(commonValue, i));
  }
  const sum = Math.round(terms.reduce((a, b) => a + b, 0) * 10000) / 10000;

  return {
    value: { terms, sum },
    steps: [
      { label: `${type === "arithmetic" ? "Arithmetic" : "Geometric"} sequence`, formula: type === "arithmetic" ? `a + (n−1)d` : `a × r^(n−1)`, value: terms.join(", ") },
      { label: "Sum of terms", formula: `${terms.length} terms`, value: sum },
    ],
    assumptions: [
      type === "arithmetic"
        ? "Each term adds a fixed common difference to the previous one"
        : "Each term multiplies the previous one by a fixed common ratio",
    ],
    rulesVersion: type === "arithmetic" ? "Arithmetic sequence" : "Geometric sequence",
  };
}
