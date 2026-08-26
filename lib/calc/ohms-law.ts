import type { CalcResult } from "./types";

export type OhmsLawUnknown = "voltage" | "current" | "resistance";

export type OhmsLawInputs = {
  voltage: number;
  current: number;
  resistance: number;
  unknown: OhmsLawUnknown;
};

export function calculateOhmsLaw(inputs: OhmsLawInputs): CalcResult<{ result: number }> {
  const { voltage, current, resistance, unknown } = inputs;
  let result: number;
  let formula: string;

  if (unknown === "voltage") {
    result = current * resistance;
    formula = "I × R";
  } else if (unknown === "current") {
    result = voltage / resistance;
    formula = "V ÷ R";
  } else {
    result = voltage / current;
    formula = "V ÷ I";
  }
  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label: `Solve for ${unknown}`, formula, value: Number.isFinite(result) ? result : "undefined" }],
    assumptions: ["Ohm's law (V = I × R) applies to simple resistive circuits — it doesn't directly apply to components like capacitors or inductors under AC, where impedance replaces resistance"],
    rulesVersion: "Ohm's law",
  };
}
