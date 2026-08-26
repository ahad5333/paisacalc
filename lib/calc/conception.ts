import type { CalcResult } from "./types";
import { formatDateLong } from "@/lib/date-utils";

export type ConceptionReferenceType = "dueDate" | "birthDate";

export type ConceptionInputs = {
  referenceEpochDay: number;
  referenceType: ConceptionReferenceType;
};

export type ConceptionValue = {
  conceptionEpochDay: number;
  conceptionWindowStartEpochDay: number;
  conceptionWindowEndEpochDay: number;
  lmpEstimateEpochDay: number;
};

// The reverse direction from every other calculator in this cluster: given
// a due date or an actual birth date, work backward to when conception
// likely happened — useful once a pregnancy is already over, rather than
// while it's in progress. Full-term gestation from conception averages
// 266 days regardless of which reference date is given.
export function calculateConception(inputs: ConceptionInputs): CalcResult<ConceptionValue> {
  const { referenceEpochDay, referenceType } = inputs;
  const conceptionEpochDay = referenceEpochDay - 266;
  const conceptionWindowStartEpochDay = conceptionEpochDay - 3;
  const conceptionWindowEndEpochDay = conceptionEpochDay + 3;
  const lmpEstimateEpochDay = conceptionEpochDay - 14;

  return {
    value: { conceptionEpochDay, conceptionWindowStartEpochDay, conceptionWindowEndEpochDay, lmpEstimateEpochDay },
    steps: [
      {
        label: "Estimated conception date",
        formula: `${referenceType === "dueDate" ? "due date" : "birth date"} − 266 days`,
        value: formatDateLong(conceptionEpochDay),
      },
      {
        label: "Likely conception window",
        formula: "conception date ± 3 days",
        value: `${formatDateLong(conceptionWindowStartEpochDay)} – ${formatDateLong(conceptionWindowEndEpochDay)}`,
      },
      { label: "Estimated LMP", formula: "conception date − 14 days", value: formatDateLong(lmpEstimateEpochDay) },
    ],
    assumptions: [
      "Assumes a full-term, 266-day gestation from conception to the reference date — normal full-term deliveries range from 37 to 42 weeks, so this is a single-point estimate, not a guarantee",
      referenceType === "birthDate"
        ? "Working back from an actual birth date carries more uncertainty than from a due date, since real gestation length varies by individual — an early or late delivery shifts the true conception date away from this estimate"
        : "Working back from a due date already assumes the average 266-day gestation used to compute that due date in the first place, so this simply reverses the same estimate",
    ],
    rulesVersion: "266-day gestation, reverse-calculated",
  };
}
