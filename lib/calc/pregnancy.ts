import type { CalcResult } from "./types";
import { formatDateLong } from "@/lib/date-utils";

export type PregnancyInputs = {
  lmpEpochDay: number;
  cycleLength: number;
  referenceEpochDay: number;
};

export type PregnancyValue = {
  dueDateEpochDay: number;
  gestationalWeeks: number;
  gestationalDays: number;
  trimester: 1 | 2 | 3;
  daysRemaining: number;
  conceptionEstimateEpochDay: number;
  trimester1EndEpochDay: number;
  trimester2EndEpochDay: number;
};

// Gestational age is conventionally measured from the first day of the
// last menstrual period (LMP), not from conception — about two weeks
// ahead of actual embryonic age, but the clinical standard everywhere
// from ultrasound dating to Naegele's rule. Due date = LMP + 280 days
// (40 weeks), adjusted for a cycle length other than the 28-day average
// Naegele's rule assumes, since a longer cycle delays ovulation and
// shifts the whole pregnancy later by the same number of days.
export function calculatePregnancy(inputs: PregnancyInputs): CalcResult<PregnancyValue> {
  const { lmpEpochDay, cycleLength, referenceEpochDay } = inputs;
  const cycleAdjustment = cycleLength - 28;
  const dueDateEpochDay = lmpEpochDay + 280 + cycleAdjustment;
  const conceptionEstimateEpochDay = lmpEpochDay + (cycleLength - 14);

  const gestationalAgeDays = Math.max(0, referenceEpochDay - lmpEpochDay);
  const gestationalWeeks = Math.floor(gestationalAgeDays / 7);
  const gestationalDays = gestationalAgeDays % 7;

  const trimester1EndEpochDay = lmpEpochDay + 13 * 7 - 1;
  const trimester2EndEpochDay = lmpEpochDay + 27 * 7 - 1;

  let trimester: 1 | 2 | 3 = 1;
  if (referenceEpochDay > trimester2EndEpochDay) trimester = 3;
  else if (referenceEpochDay > trimester1EndEpochDay) trimester = 2;

  const daysRemaining = dueDateEpochDay - referenceEpochDay;

  return {
    value: {
      dueDateEpochDay,
      gestationalWeeks,
      gestationalDays,
      trimester,
      daysRemaining,
      conceptionEstimateEpochDay,
      trimester1EndEpochDay,
      trimester2EndEpochDay,
    },
    steps: [
      {
        label: "Estimated due date",
        formula: "LMP + 280 days, adjusted for cycle length",
        value: formatDateLong(dueDateEpochDay),
      },
      { label: "Gestational age today", formula: "today − LMP", value: `${gestationalWeeks}w ${gestationalDays}d` },
      {
        label: "Estimated conception date",
        formula: "LMP + (cycle length − 14)",
        value: formatDateLong(conceptionEstimateEpochDay),
      },
    ],
    assumptions: [
      "Gestational age is measured from the first day of the last menstrual period (LMP), not from conception — the clinical convention, which runs about two weeks ahead of actual embryonic age",
      "Due date uses Naegele's rule (LMP + 280 days), adjusted for a cycle length other than the 28-day average it assumes — only about 5% of babies actually arrive on the estimated due date",
      "Assumes a regular cycle with ovulation occurring 14 days before the next period; irregular cycles make this estimate less reliable",
    ],
    rulesVersion: "Naegele's rule, cycle-length adjusted",
  };
}
