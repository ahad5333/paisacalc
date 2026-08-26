import type { CalcResult } from "./types";

export type GravelInputs = {
  areaSqft: number;
  depthInches: number;
};

export type GravelValue = {
  cubicFeet: number;
  cubicYards: number;
  tons: number;
};

// Standard gravel weighs roughly 1.4 tons per cubic yard — this varies
// somewhat by gravel type and moisture content, but 1.4 is the commonly
// cited planning figure.
const TONS_PER_CUBIC_YARD = 1.4;

export function calculateGravel(inputs: GravelInputs): CalcResult<GravelValue> {
  const { areaSqft, depthInches } = inputs;
  const cubicFeet = Math.round(areaSqft * (depthInches / 12) * 100) / 100;
  const cubicYards = Math.round((cubicFeet / 27) * 1000) / 1000;
  const tons = Math.round(cubicYards * TONS_PER_CUBIC_YARD * 100) / 100;

  return {
    value: { cubicFeet, cubicYards, tons },
    steps: [
      { label: "Volume needed", formula: `${areaSqft} sq ft × (${depthInches}in ÷ 12)`, value: `${cubicFeet} ft³ (${cubicYards} yd³)` },
      { label: "Weight", formula: `volume × ${TONS_PER_CUBIC_YARD} tons/yd³`, value: `${tons} tons` },
    ],
    assumptions: [`Uses ${TONS_PER_CUBIC_YARD} tons per cubic yard, the commonly cited planning figure for standard gravel — actual weight varies by gravel type and moisture`],
    rulesVersion: "Standard gravel volume and weight",
  };
}
