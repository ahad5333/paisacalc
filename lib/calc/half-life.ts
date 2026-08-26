import type { CalcResult } from "./types";

export type HalfLifeInputs = {
  initialQuantity: number;
  halfLife: number;
  elapsedTime: number;
};

export type HalfLifeValue = {
  remainingQuantity: number;
  halfLivesElapsed: number;
  percentRemaining: number;
};

export function calculateHalfLife(inputs: HalfLifeInputs): CalcResult<HalfLifeValue> {
  const { initialQuantity, halfLife, elapsedTime } = inputs;
  const halfLivesElapsed = Math.round((elapsedTime / halfLife) * 10000) / 10000;
  const remainingQuantity = Math.round(initialQuantity * Math.pow(0.5, elapsedTime / halfLife) * 10000) / 10000;
  const percentRemaining = Math.round((remainingQuantity / initialQuantity) * 10000) / 100;

  return {
    value: { remainingQuantity, halfLivesElapsed, percentRemaining },
    steps: [
      { label: "Half-lives elapsed", formula: `${elapsedTime} ÷ ${halfLife}`, value: halfLivesElapsed },
      { label: "Remaining quantity", formula: `${initialQuantity} × (1/2)^${halfLivesElapsed}`, value: remainingQuantity },
      { label: "Percent remaining", formula: `${remainingQuantity} ÷ ${initialQuantity} × 100`, value: percentRemaining },
    ],
    assumptions: ["Assumes ideal exponential decay at a constant half-life, with no other factors affecting the decay rate"],
    rulesVersion: "Standard exponential decay",
  };
}
