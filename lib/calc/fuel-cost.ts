import type { CalcResult } from "./types";

export type FuelCostInputs = {
  distanceKm: number;
  kmPerLiter: number;
  pricePerLiter: number;
};

export function calculateFuelCost(inputs: FuelCostInputs): CalcResult<{ litersUsed: number; totalCost: number }> {
  const { distanceKm, kmPerLiter, pricePerLiter } = inputs;
  const litersUsed = Math.round((distanceKm / kmPerLiter) * 100) / 100;
  const totalCost = Math.round(litersUsed * pricePerLiter * 100) / 100;

  return {
    value: { litersUsed, totalCost },
    steps: [
      { label: "Fuel used", formula: `${distanceKm}km ÷ ${kmPerLiter}km/L`, value: `${litersUsed} L` },
      { label: "Total cost", formula: `${litersUsed}L × price/L`, value: totalCost },
    ],
    assumptions: ["Assumes constant fuel efficiency for the whole trip — actual mileage varies with driving style, traffic, load, and terrain"],
    rulesVersion: "Standard fuel cost calculation",
  };
}
