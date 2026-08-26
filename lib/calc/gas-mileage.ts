import type { CalcResult } from "./types";

export type GasMileageInputs = {
  distanceKm: number;
  fuelUsedLiters: number;
};

export function calculateGasMileage(inputs: GasMileageInputs): CalcResult<{ kmPerLiter: number; litersPer100km: number }> {
  const { distanceKm, fuelUsedLiters } = inputs;
  const kmPerLiter = Math.round((distanceKm / fuelUsedLiters) * 100) / 100;
  const litersPer100km = Math.round((fuelUsedLiters / distanceKm) * 100 * 100) / 100;

  return {
    value: { kmPerLiter, litersPer100km },
    steps: [
      { label: "Fuel efficiency", formula: `${distanceKm}km ÷ ${fuelUsedLiters}L`, value: `${kmPerLiter} km/L` },
      { label: "Consumption rate", formula: "fuel used ÷ distance × 100", value: `${litersPer100km} L/100km` },
    ],
    assumptions: ["Measures actual efficiency from a real trip — this is the reverse of the fuel cost calculator, which projects cost forward from an assumed efficiency figure"],
    rulesVersion: "Standard fuel efficiency measurement",
  };
}
