import type { CalcResult } from "./types";

export type StairInputs = {
  totalRiseInches: number;
  totalRunInches: number;
  numSteps: number;
};

export type StairValue = {
  riserHeight: number;
  treadDepth: number;
  stringerLength: number;
  riserOk: boolean;
};

export function calculateStair(inputs: StairInputs): CalcResult<StairValue> {
  const { totalRiseInches, totalRunInches, numSteps } = inputs;
  const riserHeight = Math.round((totalRiseInches / numSteps) * 100) / 100;
  const treadDepth = Math.round((totalRunInches / (numSteps - 1)) * 100) / 100;
  const stringerLength = Math.round(Math.sqrt(totalRiseInches ** 2 + totalRunInches ** 2) * 100) / 100;
  const riserOk = riserHeight >= 4 && riserHeight <= 7.75;

  return {
    value: { riserHeight, treadDepth, stringerLength, riserOk },
    steps: [
      { label: "Riser height", formula: `total rise ÷ ${numSteps} steps`, value: riserHeight },
      { label: "Tread depth", formula: `total run ÷ ${numSteps - 1} treads`, value: treadDepth },
      { label: "Stringer length", formula: "√(rise² + run²)", value: stringerLength },
    ],
    assumptions: [
      "The last step's \"tread\" is the landing floor itself, so treads are one fewer than the number of risers",
      riserOk
        ? "This riser height falls within the 4-7.75 inch range most residential building codes require"
        : "This riser height falls outside the 4-7.75 inch range most residential building codes require — check your local code before building",
    ],
    rulesVersion: "Standard stair geometry",
  };
}
