import type { CalcResult } from "./types";

export type TimeZoneInputs = {
  hour: number;
  minute: number;
  fromOffsetHours: number;
  toOffsetHours: number;
};

export type TimeZoneValue = {
  resultHour: number;
  resultMinute: number;
  dayOffset: number;
};

export function calculateTimeZone(inputs: TimeZoneInputs): CalcResult<TimeZoneValue> {
  const { hour, minute, fromOffsetHours, toOffsetHours } = inputs;
  const startMinutes = hour * 60 + minute;
  const shiftMinutes = (toOffsetHours - fromOffsetHours) * 60;
  let totalMinutes = startMinutes + shiftMinutes;

  let dayOffset = 0;
  while (totalMinutes < 0) {
    totalMinutes += 24 * 60;
    dayOffset--;
  }
  while (totalMinutes >= 24 * 60) {
    totalMinutes -= 24 * 60;
    dayOffset++;
  }

  const resultHour = Math.floor(totalMinutes / 60);
  const resultMinute = totalMinutes % 60;

  return {
    value: { resultHour, resultMinute, dayOffset },
    steps: [
      {
        label: "Converted time",
        formula: `UTC${fromOffsetHours >= 0 ? "+" : ""}${fromOffsetHours} → UTC${toOffsetHours >= 0 ? "+" : ""}${toOffsetHours}`,
        value: `${String(resultHour).padStart(2, "0")}:${String(resultMinute).padStart(2, "0")}${dayOffset !== 0 ? ` (${dayOffset > 0 ? "+" : ""}${dayOffset} day)` : ""}`,
      },
    ],
    assumptions: ["Uses fixed UTC offsets only — this doesn't account for daylight saving time transitions, which shift some time zones' offsets by an hour for part of the year"],
    rulesVersion: "Fixed UTC-offset conversion",
  };
}
