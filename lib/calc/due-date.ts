import type { CalcResult } from "./types";
import { formatDateLong } from "@/lib/date-utils";

export type DueDateMethod = "lmp" | "conception";

export type DueDateInputs = {
  method: DueDateMethod;
  lmpEpochDay: number;
  cycleLength: number;
  conceptionEpochDay: number;
};

export type DueDateValue = {
  dueDateEpochDay: number;
  effectiveLmpEpochDay: number;
  effectiveConceptionEpochDay: number;
  viabilityEpochDay: number;
  fullTermStartEpochDay: number;
};

// Two independent starting points, both converging on the same due date:
// LMP + 280 days (Naegele's rule, cycle-length adjusted) or conception +
// 266 days (38 weeks — pregnancy runs 40 weeks from LMP but only 38 from
// actual fertilisation, the ~2-week gap between LMP and typical ovulation).
// Milestones use the LMP-based week count throughout, since "24 weeks" /
// "39 weeks" in obstetric guidance always means weeks since LMP.
export function calculateDueDate(inputs: DueDateInputs): CalcResult<DueDateValue> {
  const { method, lmpEpochDay, cycleLength, conceptionEpochDay } = inputs;

  const effectiveLmpEpochDay = method === "lmp" ? lmpEpochDay : conceptionEpochDay - 14;
  const effectiveConceptionEpochDay = method === "lmp" ? lmpEpochDay + (cycleLength - 14) : conceptionEpochDay;
  const dueDateEpochDay =
    method === "lmp" ? lmpEpochDay + 280 + (cycleLength - 28) : conceptionEpochDay + 266;

  const viabilityEpochDay = effectiveLmpEpochDay + 24 * 7;
  const fullTermStartEpochDay = effectiveLmpEpochDay + 39 * 7;

  return {
    value: { dueDateEpochDay, effectiveLmpEpochDay, effectiveConceptionEpochDay, viabilityEpochDay, fullTermStartEpochDay },
    steps: [
      {
        label: "Estimated due date",
        formula: method === "lmp" ? "LMP + 280 days, adjusted for cycle length" : "conception date + 266 days",
        value: formatDateLong(dueDateEpochDay),
      },
      {
        label: method === "lmp" ? "Estimated conception date" : "Estimated LMP",
        formula: method === "lmp" ? "LMP + (cycle length − 14)" : "conception date − 14 days",
        value: formatDateLong(method === "lmp" ? effectiveConceptionEpochDay : effectiveLmpEpochDay),
      },
      { label: "Full term begins", formula: "LMP + 39 weeks", value: formatDateLong(fullTermStartEpochDay) },
    ],
    assumptions: [
      "Both methods land on the same due date when the underlying dates agree — LMP + 280 days equals conception + 266 days when conception falls 14 days after LMP",
      "Only about 5% of babies are actually born on their estimated due date; a week or two either side is normal",
      "\"Full term\" (39-40 weeks) and \"viability\" (around 24 weeks) are the thresholds used in obstetric guidance, not guarantees for any individual pregnancy",
    ],
    rulesVersion: "Naegele's rule / conception + 266 days",
  };
}
