import type { CalcResult } from "./types";

export type RoundMode = "nearest" | "up" | "down";

export type RoundingInputs = {
  value: number;
  decimalPlaces: number;
  mode: RoundMode;
};

function roundTo(value: number, places: number, mode: RoundMode): number {
  const factor = Math.pow(10, places);
  const scaled = value * factor;
  let rounded: number;
  if (mode === "up") rounded = value >= 0 ? Math.ceil(scaled) : Math.floor(scaled);
  else if (mode === "down") rounded = value >= 0 ? Math.floor(scaled) : Math.ceil(scaled);
  else rounded = Math.round(scaled);
  return rounded / factor;
}

const MODE_LABELS: Record<RoundMode, string> = {
  nearest: "nearest",
  up: "up (away from zero)",
  down: "down (toward zero)",
};

export function calculateRounding(inputs: RoundingInputs): CalcResult<{ result: number }> {
  const { value, decimalPlaces, mode } = inputs;
  const result = roundTo(value, decimalPlaces, mode);
  const placeLabel = decimalPlaces === 0 ? "the nearest whole number" : `${decimalPlaces} decimal place${decimalPlaces === 1 ? "" : "s"}`;

  return {
    value: { result },
    steps: [{ label: `Rounded to ${placeLabel}, ${MODE_LABELS[mode]}`, formula: `${value} rounded`, value: result }],
    assumptions: [
      "\"Nearest\" uses standard round-half-away-from-zero rounding — a value exactly halfway rounds away from zero, not to the nearest even digit",
      "A negative number of decimal places rounds to the nearest 10, 100, and so on",
    ],
    rulesVersion: "Standard rounding (round-half-away-from-zero)",
  };
}
