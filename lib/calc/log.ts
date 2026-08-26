import type { CalcResult } from "./types";

export type LogInputs = {
  base: number;
  x: number;
};

export function calculateLog(inputs: LogInputs): CalcResult<{ result: number }> {
  const { base, x } = inputs;
  const valid = base > 0 && base !== 1 && x > 0;
  const raw = valid ? Math.log(x) / Math.log(base) : NaN;
  const result = valid ? Math.round(raw * 1e8) / 1e8 : raw;

  return {
    value: { result },
    steps: [{ label: `log base ${base} of ${x}`, formula: `ln(${x}) ÷ ln(${base})`, value: valid ? result : "undefined" }],
    assumptions: [
      "The argument must be positive and the base must be positive and not equal to 1 — outside those bounds, a real logarithm doesn't exist",
      "Computed via the change-of-base formula: log_base(x) = ln(x) ÷ ln(base)",
    ],
    rulesVersion: "Standard logarithm, change-of-base formula",
  };
}
