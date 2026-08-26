import type { CalcResult } from "./types";

export type RootInputs = {
  value: number;
  degree: number;
};

function nthRoot(value: number, degree: number): number {
  if (value < 0) {
    if (degree % 2 === 0) return NaN;
    return -Math.pow(-value, 1 / degree);
  }
  return Math.pow(value, 1 / degree);
}

export function calculateRoot(inputs: RootInputs): CalcResult<{ result: number }> {
  const { value, degree } = inputs;
  const raw = nthRoot(value, degree);
  const result = Number.isFinite(raw) ? Math.round(raw * 1e8) / 1e8 : raw;
  const ordinal = degree === 2 ? "square" : degree === 3 ? "cube" : `${degree}th`;

  return {
    value: { result },
    steps: [{ label: `${ordinal} root`, formula: `${value} ^ (1 ÷ ${degree})`, value: Number.isNaN(result) ? "undefined (not a real number)" : result }],
    assumptions: [
      "An even-degree root of a negative number has no real result (it requires complex numbers) and shows as undefined here",
      "An odd-degree root of a negative number is negative, e.g. the cube root of -8 is -2",
    ],
    rulesVersion: "Standard nth root",
  };
}
