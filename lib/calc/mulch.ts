import type { CalcResult } from "./types";

export type MulchInputs = {
  areaSqft: number;
  depthInches: number;
};

export type MulchValue = {
  cubicFeet: number;
  cubicYards: number;
  bags: number;
};

const BAG_SIZE_CUFT = 2;

export function calculateMulch(inputs: MulchInputs): CalcResult<MulchValue> {
  const { areaSqft, depthInches } = inputs;
  const cubicFeet = Math.round(areaSqft * (depthInches / 12) * 100) / 100;
  const cubicYards = Math.round((cubicFeet / 27) * 1000) / 1000;
  const bags = Math.ceil(cubicFeet / BAG_SIZE_CUFT);

  return {
    value: { cubicFeet, cubicYards, bags },
    steps: [
      { label: "Volume needed", formula: `${areaSqft} sq ft × (${depthInches}in ÷ 12)`, value: `${cubicFeet} ft³ (${cubicYards} yd³)` },
      { label: "Bags needed", formula: `volume ÷ ${BAG_SIZE_CUFT} ft³/bag`, value: bags },
    ],
    assumptions: [`Assumes the standard ${BAG_SIZE_CUFT} cubic foot bag size — check your specific product, since bag sizes vary`],
    rulesVersion: "Standard mulch coverage",
  };
}
