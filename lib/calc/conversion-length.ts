import type { CalcResult } from "./types";

export type LengthUnit = "mm" | "cm" | "m" | "km" | "in" | "ft" | "yd" | "mi";

const TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

export type ConversionLengthInputs = {
  value: number;
  fromUnit: LengthUnit;
  toUnit: LengthUnit;
};

export function calculateConversionLength(inputs: ConversionLengthInputs): CalcResult<{ result: number }> {
  const { value, fromUnit, toUnit } = inputs;
  const meters = value * TO_METERS[fromUnit];
  const result = Math.round((meters / TO_METERS[toUnit]) * 1e8) / 1e8;

  return {
    value: { result },
    steps: [{ label: `${value} ${fromUnit} in ${toUnit}`, formula: `× ${TO_METERS[fromUnit]} ÷ ${TO_METERS[toUnit]}`, value: result }],
    assumptions: [],
    rulesVersion: "Standard length unit conversion",
  };
}
