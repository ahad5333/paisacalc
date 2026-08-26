import type { CalcResult } from "./types";

export type SquareFootageInputs = {
  lengthFt: number;
  widthFt: number;
  costPerSqft: number;
};

export type SquareFootageValue = {
  squareFeet: number;
  totalCost: number;
};

export function calculateSquareFootage(inputs: SquareFootageInputs): CalcResult<SquareFootageValue> {
  const { lengthFt, widthFt, costPerSqft } = inputs;
  const squareFeet = Math.round(lengthFt * widthFt * 100) / 100;
  const totalCost = Math.round(squareFeet * costPerSqft * 100) / 100;

  return {
    value: { squareFeet, totalCost },
    steps: [
      { label: "Area", formula: `${lengthFt}ft × ${widthFt}ft`, value: `${squareFeet} sq ft` },
      ...(costPerSqft > 0 ? [{ label: "Estimated cost", formula: `area × cost/sq ft`, value: totalCost }] : []),
    ],
    assumptions: ["Assumes a single rectangular area — for an L-shaped or irregular room, measure and sum each rectangular section separately"],
    rulesVersion: "Standard rectangular area",
  };
}
