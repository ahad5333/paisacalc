import type { CalcResult } from "./types";

export type DistanceInputs = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export function calculateDistance(inputs: DistanceInputs): CalcResult<{ distance: number }> {
  const { x1, y1, x2, y2 } = inputs;
  const distance = Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 10000) / 10000;

  return {
    value: { distance },
    steps: [{ label: "Distance", formula: `√((${x2}−${x1})² + (${y2}−${y1})²)`, value: distance }],
    assumptions: ["This is the straight-line (Euclidean) distance between the two points, not a path along a grid"],
    rulesVersion: "Standard distance formula (Pythagorean theorem)",
  };
}
