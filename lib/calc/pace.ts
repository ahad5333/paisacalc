import type { CalcResult } from "./types";

export type PaceInputs = {
  distanceKm: number;
  timeMinutes: number;
};

export type PaceValue = {
  paceMinPerKm: number;
  paceMinutesPart: number;
  paceSecondsPart: number;
  speedKmh: number;
};

export function calculatePace(inputs: PaceInputs): CalcResult<PaceValue> {
  const { distanceKm, timeMinutes } = inputs;

  const paceMinPerKm = Math.round((timeMinutes / distanceKm) * 100) / 100;
  const paceMinutesPart = Math.floor(paceMinPerKm);
  const paceSecondsPart = Math.round((paceMinPerKm - paceMinutesPart) * 60);
  const speedKmh = Math.round(((distanceKm / timeMinutes) * 60) * 100) / 100;

  return {
    value: { paceMinPerKm, paceMinutesPart, paceSecondsPart, speedKmh },
    steps: [
      { label: "Pace", formula: `${timeMinutes} ÷ ${distanceKm} minutes per km`, value: paceMinPerKm },
      { label: "Speed", formula: `${distanceKm} ÷ ${timeMinutes} × 60 km/h`, value: speedKmh },
    ],
    assumptions: ["Assumes an even pace across the whole distance — a real run's pace usually varies over splits, terrain, and fatigue"],
    rulesVersion: "Distance/time/pace relationship",
  };
}
