import type { CalcResult } from "./types";

export type ExponentInputs = {
  base: number;
  exponent: number;
};

export function calculateExponent(inputs: ExponentInputs): CalcResult<{ result: number }> {
  const { base, exponent } = inputs;
  const raw = Math.pow(base, exponent);
  const result = Number.isFinite(raw) ? Math.round(raw * 1e10) / 1e10 : raw;

  return {
    value: { result },
    steps: [{ label: "Result", formula: `${base} ^ ${exponent}`, value: Number.isFinite(result) ? result : "undefined (not a real number)" }],
    assumptions: [
      "A negative base raised to a non-integer exponent has no real result (it requires complex numbers) and shows as undefined here",
      "Very large results may lose precision beyond about 15-17 significant digits, a limit of standard floating-point arithmetic",
    ],
    rulesVersion: "Standard exponentiation",
  };
}
