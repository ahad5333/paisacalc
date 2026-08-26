import type { CalcResult } from "./types";
import { fromEpochDay, toEpochDay, formatDateLong } from "@/lib/date-utils";

export type DateOperation = "add" | "subtract";

export type DateCalcInputs = {
  startEpochDay: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
  operation: DateOperation;
};

// Months and years are added calendar-aware (via Date's own month/year
// rollover), then days and weeks are added as flat day counts on top —
// mixing both correctly requires handling months first, since "a month"
// isn't a fixed number of days the way a week is.
export function calculateDateCalculator(inputs: DateCalcInputs): CalcResult<{ resultEpochDay: number }> {
  const { startEpochDay, days, weeks, months, years, operation } = inputs;
  const sign = operation === "add" ? 1 : -1;

  const start = fromEpochDay(startEpochDay);
  // Date.UTC overflows an out-of-range day into the following month
  // (31 Jan + 1 month would silently become 3 Mar) rather than clamping
  // to that month's last day — so the target month is resolved first,
  // then the day is clamped to whatever that month actually has.
  const totalMonthsToAdd = sign * (years * 12 + months);
  const targetMonthFirst = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + totalMonthsToAdd, 1));
  const daysInTargetMonth = new Date(Date.UTC(targetMonthFirst.getUTCFullYear(), targetMonthFirst.getUTCMonth() + 1, 0)).getUTCDate();
  const clampedDay = Math.min(start.getUTCDate(), daysInTargetMonth);
  const afterMonthsYears = new Date(Date.UTC(targetMonthFirst.getUTCFullYear(), targetMonthFirst.getUTCMonth(), clampedDay));
  const afterMonthsYearsEpochDay = toEpochDay(afterMonthsYears.toISOString().slice(0, 10));
  const resultEpochDay = afterMonthsYearsEpochDay + sign * (days + weeks * 7);

  return {
    value: { resultEpochDay },
    steps: [
      { label: `Result (${operation === "add" ? "+" : "−"} ${years}y ${months}m ${weeks}w ${days}d)`, formula: "", value: formatDateLong(resultEpochDay) },
    ],
    assumptions: ["Months and years are added calendar-aware (e.g. 31 Jan + 1 month = 28 or 29 Feb), then days and weeks are added as flat day counts"],
    rulesVersion: "Calendar-aware date arithmetic",
  };
}
