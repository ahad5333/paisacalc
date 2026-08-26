import type { CalcResult } from "./types";

export type SlopeInputs = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type SlopeValue = {
  slope: number | null;
  intercept: number | null;
  distance: number;
  angleDegrees: number;
};

export function calculateSlope(inputs: SlopeInputs): CalcResult<SlopeValue> {
  const { x1, y1, x2, y2 } = inputs;
  const vertical = x2 === x1;
  const slope = vertical ? null : Math.round(((y2 - y1) / (x2 - x1)) * 10000) / 10000;
  const intercept = vertical || slope === null ? null : Math.round((y1 - slope * x1) * 10000) / 10000;
  const distance = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 10000) / 10000;
  const angleDegrees = vertical ? 90 : Math.round((Math.atan(slope!) * 180) / Math.PI * 100) / 100;

  return {
    value: { slope, intercept, distance, angleDegrees },
    steps: [
      { label: "Slope (m)", formula: `(${y2} − ${y1}) ÷ (${x2} − ${x1})`, value: vertical ? "undefined (vertical line)" : slope! },
      ...(intercept !== null ? [{ label: "Line equation", formula: "y = mx + b", value: `y = ${slope}x ${intercept >= 0 ? "+" : "−"} ${Math.abs(intercept)}` }] : []),
      { label: "Distance between points", formula: "√((x₂−x₁)² + (y₂−y₁)²)", value: distance },
    ],
    assumptions: ["A vertical line (same x-coordinate for both points) has an undefined slope, since the standard slope formula would divide by zero"],
    rulesVersion: "Standard slope and distance formulas",
  };
}
