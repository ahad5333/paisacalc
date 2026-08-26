import type { CalcResult } from "./types";

export type MolarityUnknown = "molarity" | "moles" | "volume";

export type MolarityInputs = {
  molarity: number;
  moles: number;
  volumeLiters: number;
  unknown: MolarityUnknown;
};

export function calculateMolarity(inputs: MolarityInputs): CalcResult<{ result: number }> {
  const { molarity, moles, volumeLiters, unknown } = inputs;
  let result: number;
  let formula: string;

  if (unknown === "molarity") {
    result = moles / volumeLiters;
    formula = "moles ÷ volume (L)";
  } else if (unknown === "moles") {
    result = molarity * volumeLiters;
    formula = "molarity × volume (L)";
  } else {
    result = moles / molarity;
    formula = "moles ÷ molarity";
  }
  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label: `Solve for ${unknown}`, formula, value: Number.isFinite(result) ? result : "undefined" }],
    assumptions: ["Molarity (M) is moles of solute per litre of solution — not per litre of solvent added, which is a common mix-up"],
    rulesVersion: "Standard molarity formula",
  };
}
