import type { CalcResult } from "./types";
import { gcd } from "./math-utils";

export type RatioInputs = {
  a: number;
  b: number;
  c: number;
};

export type RatioValue = {
  simplifiedA: number;
  simplifiedB: number;
  d: number;
};

// Solves the proportion a:b = c:d for the missing term d, and separately
// shows a:b in simplified form — two distinct, commonly needed uses of a
// ratio calculator handled in one pass.
export function calculateRatio(inputs: RatioInputs): CalcResult<RatioValue> {
  const { a, b, c } = inputs;
  const divisor = gcd(a, b) || 1;
  const simplifiedA = a / divisor;
  const simplifiedB = b / divisor;
  const d = Math.round(((b * c) / a) * 10000) / 10000;

  return {
    value: { simplifiedA, simplifiedB, d },
    steps: [
      { label: "Simplified ratio", formula: `${a}:${b} ÷ GCD (${divisor})`, value: `${simplifiedA}:${simplifiedB}` },
      { label: "Missing term (d)", formula: `${a}:${b} = ${c}:d → d = (${b} × ${c}) ÷ ${a}`, value: d },
    ],
    assumptions: ["Solves the proportion a:b = c:d for d, assuming a is not zero"],
    rulesVersion: "Standard ratio and proportion",
  };
}
