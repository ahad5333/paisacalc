import type { CalcResult } from "./types";

export type DensityUnknown = "density" | "mass" | "volume";

export type DensityMassVolumeInputs = {
  density: number;
  mass: number;
  volume: number;
  unknown: DensityUnknown;
};

export type DensityMassVolumeValue = {
  result: number;
};

// density = mass ÷ volume — the same triangle relationship (like
// distance/speed/time) shared by the Density and Mass calculators, which
// each just default to solving for a different one of the three.
export function calculateDensityMassVolume(inputs: DensityMassVolumeInputs): CalcResult<DensityMassVolumeValue> {
  const { density, mass, volume, unknown } = inputs;
  let result: number;
  let formula: string;

  if (unknown === "density") {
    result = mass / volume;
    formula = "mass ÷ volume";
  } else if (unknown === "mass") {
    result = density * volume;
    formula = "density × volume";
  } else {
    result = mass / density;
    formula = "mass ÷ density";
  }
  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label: `Solve for ${unknown}`, formula, value: Number.isFinite(result) ? result : "undefined" }],
    assumptions: ["density = mass ÷ volume — use consistent units throughout (e.g. g and cm³, or kg and m³)"],
    rulesVersion: "Standard density formula",
  };
}
