import type { CalcResult } from "./types";

export type SpeedUnknown = "speed" | "distance" | "time";

export type SpeedInputs = {
  speed: number;
  distance: number;
  time: number;
  unknown: SpeedUnknown;
};

export function calculateSpeed(inputs: SpeedInputs): CalcResult<{ result: number }> {
  const { speed, distance, time, unknown } = inputs;
  let result: number;
  let formula: string;

  if (unknown === "speed") {
    result = distance / time;
    formula = "distance ÷ time";
  } else if (unknown === "distance") {
    result = speed * time;
    formula = "speed × time";
  } else {
    result = distance / speed;
    formula = "distance ÷ speed";
  }
  result = Math.round(result * 10000) / 10000;

  return {
    value: { result },
    steps: [{ label: `Solve for ${unknown}`, formula, value: Number.isFinite(result) ? result : "undefined" }],
    assumptions: ["Assumes constant speed over the whole distance/time — real average speed varies if speed changes along the way"],
    rulesVersion: "Standard speed = distance ÷ time",
  };
}
