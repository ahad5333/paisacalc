import type { CalcResult } from "./types";
import { fromEpochDay } from "@/lib/date-utils";

export type DayCounterInputs = {
  startEpochDay: number;
  endEpochDay: number;
};

export type DayCounterValue = {
  totalDays: number;
  weekdays: number;
  weekendDays: number;
  weeks: number;
};

export function calculateDayCounter(inputs: DayCounterInputs): CalcResult<DayCounterValue> {
  const { startEpochDay, endEpochDay } = inputs;
  const totalDays = Math.abs(endEpochDay - startEpochDay);
  const lo = Math.min(startEpochDay, endEpochDay);

  let weekendDays = 0;
  for (let d = lo; d < lo + totalDays; d++) {
    const dow = fromEpochDay(d).getUTCDay();
    if (dow === 0 || dow === 6) weekendDays++;
  }
  const weekdays = totalDays - weekendDays;
  const weeks = Math.round((totalDays / 7) * 100) / 100;

  return {
    value: { totalDays, weekdays, weekendDays, weeks },
    steps: [
      { label: "Total days", formula: "end date − start date", value: totalDays },
      { label: "Weekdays / weekend days", formula: "Mon-Fri vs Sat-Sun", value: `${weekdays} / ${weekendDays}` },
      { label: "In weeks", formula: "total days ÷ 7", value: weeks },
    ],
    assumptions: ["Counts the number of calendar days between the two dates, not including time of day — for that, see the time duration calculator"],
    rulesVersion: "Calendar day count",
  };
}
