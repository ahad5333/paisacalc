import type { CalcResult } from "./types";

export type TimeDurationInputs = {
  startEpochDay: number;
  startH: number;
  startM: number;
  endEpochDay: number;
  endH: number;
  endM: number;
};

export type TimeDurationValue = {
  totalMinutes: number;
  days: number;
  hours: number;
  minutes: number;
};

export function calculateTimeDuration(inputs: TimeDurationInputs): CalcResult<TimeDurationValue> {
  const { startEpochDay, startH, startM, endEpochDay, endH, endM } = inputs;
  const startTotalMinutes = startEpochDay * 24 * 60 + startH * 60 + startM;
  const endTotalMinutes = endEpochDay * 24 * 60 + endH * 60 + endM;
  const totalMinutes = Math.max(0, endTotalMinutes - startTotalMinutes);

  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  return {
    value: { totalMinutes, days, hours, minutes },
    steps: [{ label: "Duration", formula: "end datetime − start datetime", value: `${days}d ${hours}h ${minutes}m` }],
    assumptions: ["Includes both calendar date and time of day, unlike the day counter, which only counts whole calendar days"],
    rulesVersion: "Precise datetime duration",
  };
}
