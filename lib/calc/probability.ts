import type { CalcResult } from "./types";

export type ProbabilityInputs = {
  probAPct: number;
  probBPct: number;
};

export type ProbabilityValue = {
  probAandB: number;
  probAorB: number;
  probNotA: number;
  probNotB: number;
};

export function calculateProbability(inputs: ProbabilityInputs): CalcResult<ProbabilityValue> {
  const { probAPct, probBPct } = inputs;
  const a = probAPct / 100;
  const b = probBPct / 100;

  const probAandB = Math.round(a * b * 10000) / 100;
  const probAorB = Math.round((a + b - a * b) * 10000) / 100;
  const probNotA = Math.round((1 - a) * 10000) / 100;
  const probNotB = Math.round((1 - b) * 10000) / 100;

  return {
    value: { probAandB, probAorB, probNotA, probNotB },
    steps: [
      { label: "P(A and B)", formula: "P(A) × P(B)", value: `${probAandB}%` },
      { label: "P(A or B)", formula: "P(A) + P(B) − P(A)×P(B)", value: `${probAorB}%` },
      { label: "P(not A)", formula: "1 − P(A)", value: `${probNotA}%` },
    ],
    assumptions: [
      "Assumes events A and B are independent — the outcome of one doesn't affect the probability of the other",
      "P(A and B) uses the multiplication rule, and P(A or B) uses the addition rule (subtracting the overlap counted twice)",
    ],
    rulesVersion: "Independent events, standard probability rules",
  };
}
