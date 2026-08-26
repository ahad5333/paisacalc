import type { CalcResult } from "./types";

export type RoofingInputs = {
  lengthFt: number;
  widthFt: number;
  pitchRise: number;
  pitchRun: number;
};

export type RoofingValue = {
  footprintSqft: number;
  roofSqft: number;
  squares: number;
  bundles: number;
};

// Roof pitch is conventionally written rise:run (e.g. 6:12) — a steeper
// roof has more actual surface area than its flat footprint suggests,
// captured here by the slope multiplier √(1 + (rise/run)²).
export function calculateRoofing(inputs: RoofingInputs): CalcResult<RoofingValue> {
  const { lengthFt, widthFt, pitchRise, pitchRun } = inputs;
  const footprintSqft = Math.round(lengthFt * widthFt * 100) / 100;
  const slopeMultiplier = Math.sqrt(1 + (pitchRise / pitchRun) ** 2);
  const roofSqft = Math.round(footprintSqft * slopeMultiplier * 100) / 100;
  const squares = Math.round((roofSqft / 100) * 100) / 100;
  const bundles = Math.ceil(squares * 3);

  return {
    value: { footprintSqft, roofSqft, squares, bundles },
    steps: [
      { label: "Footprint area", formula: `${lengthFt}ft × ${widthFt}ft`, value: `${footprintSqft} sq ft` },
      { label: "Roof surface area", formula: `footprint × √(1 + (${pitchRise}/${pitchRun})²)`, value: `${roofSqft} sq ft` },
      { label: "Roofing squares", formula: "roof area ÷ 100", value: squares },
      { label: "Shingle bundles", formula: "squares × 3 (standard bundles/square)", value: bundles },
    ],
    assumptions: ["Uses the standard 3-bundles-per-square shingle coverage rate; doesn't add extra for waste, hips, valleys, or ridge caps"],
    rulesVersion: "Standard roof area and shingle coverage",
  };
}
