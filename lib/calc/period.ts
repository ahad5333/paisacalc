import type { CalcResult } from "./types";
import { formatDateLong } from "@/lib/date-utils";

export type PeriodInputs = {
  lmpEpochDay: number;
  cycleLength: number;
  periodLength: number;
  referenceEpochDay: number;
  cyclesToShow: number;
};

export type PeriodCycle = {
  periodStartEpochDay: number;
  periodEndEpochDay: number;
  ovulationEpochDay: number;
};

export type PeriodValue = {
  nextPeriodEpochDay: number;
  daysUntilNextPeriod: number;
  cycles: PeriodCycle[];
};

// Forward projection only — no pregnancy involved. Walks the cycle
// forward from LMP in cycleLength-day steps until it passes today, then
// projects that many further cycles for the detail table. Each cycle's
// ovulation date uses the same LMP + (cycle length − 14) estimate as the
// Ovulation calculator, just applied to a future projected cycle instead
// of the most recent actual one.
export function calculatePeriod(inputs: PeriodInputs): CalcResult<PeriodValue> {
  const { lmpEpochDay, cycleLength, periodLength, referenceEpochDay, cyclesToShow } = inputs;

  let nextPeriodEpochDay = lmpEpochDay + cycleLength;
  while (nextPeriodEpochDay <= referenceEpochDay) {
    nextPeriodEpochDay += cycleLength;
  }

  const cycles: PeriodCycle[] = [];
  let cursor = nextPeriodEpochDay;
  for (let i = 0; i < cyclesToShow; i++) {
    cycles.push({
      periodStartEpochDay: cursor,
      periodEndEpochDay: cursor + periodLength - 1,
      ovulationEpochDay: cursor + (cycleLength - 14),
    });
    cursor += cycleLength;
  }

  const daysUntilNextPeriod = nextPeriodEpochDay - referenceEpochDay;

  return {
    value: { nextPeriodEpochDay, daysUntilNextPeriod, cycles },
    steps: [
      { label: "Next period", formula: "LMP + cycle length, projected past today", value: formatDateLong(nextPeriodEpochDay) },
      { label: "Days until next period", formula: "next period − today", value: daysUntilNextPeriod },
      {
        label: "Following period",
        formula: "next period + cycle length",
        value: formatDateLong(nextPeriodEpochDay + cycleLength),
      },
    ],
    assumptions: [
      "Projects forward assuming every future cycle matches the average cycle length exactly — real cycles vary, and this variance compounds the further out the projection goes",
      "Ovulation within each projected cycle is estimated 14 days before that cycle's following period, the same fixed-luteal-phase assumption the ovulation calculator uses",
    ],
    rulesVersion: "Fixed cycle-length projection, 14-day luteal phase",
  };
}
