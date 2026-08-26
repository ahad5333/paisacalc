import type { CalcResult } from "./types";
import { fromEpochDay } from "@/lib/date-utils";

export type DayOfWeekInputs = {
  epochDay: number;
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function calculateDayOfWeek(inputs: DayOfWeekInputs): CalcResult<{ dayName: string; dayIndex: number }> {
  const { epochDay } = inputs;
  const dayIndex = fromEpochDay(epochDay).getUTCDay();
  const dayName = DAY_NAMES[dayIndex];

  return {
    value: { dayName, dayIndex },
    steps: [{ label: "Day of the week", formula: "", value: dayName }],
    assumptions: [],
    rulesVersion: "Proleptic Gregorian calendar",
  };
}
