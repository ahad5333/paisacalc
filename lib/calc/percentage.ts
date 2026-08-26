import type { CalcResult } from "./types";

export type PercentageMode = "percentOf" | "whatPercent" | "isPercentOfWhat";

export type PercentageInputs = {
  mode: PercentageMode;
  x: number;
  y: number;
};

export function calculatePercentage(inputs: PercentageInputs): CalcResult<{ result: number }> {
  const { mode, x, y } = inputs;
  let result: number;
  let label: string;
  let formula: string;

  if (mode === "percentOf") {
    result = (x * y) / 100;
    label = `${x}% of ${y}`;
    formula = `${y} × ${x} ÷ 100`;
  } else if (mode === "whatPercent") {
    result = (x / y) * 100;
    label = `${x} as a % of ${y}`;
    formula = `${x} ÷ ${y} × 100`;
  } else {
    result = (x / y) * 100;
    label = `${x} is ${y}% of`;
    formula = `${x} ÷ (${y} ÷ 100)`;
  }

  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label, formula, value: result }],
    assumptions: [],
    rulesVersion: "Standard percentage arithmetic",
  };
}
