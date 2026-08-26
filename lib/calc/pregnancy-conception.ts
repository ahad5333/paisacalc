import type { CalcResult } from "./types";
import { calculateOvulation } from "./ovulation";
import { formatDateLong } from "@/lib/date-utils";

export type PregnancyConceptionInputs = {
  lmpEpochDay: number;
  cycleLength: number;
};

export type PregnancyConceptionValue = {
  conceptionEpochDay: number;
  conceptionWindowStartEpochDay: number;
  conceptionWindowEndEpochDay: number;
  dueDateEpochDay: number;
};

// For someone already confirmed pregnant, working out roughly when
// conception happened from the same LMP-based cycle math the Ovulation
// calculator uses forward-looking — reused here rather than duplicated
// (ticket-list convention: shared math lives in one place).
export function calculatePregnancyConception(inputs: PregnancyConceptionInputs): CalcResult<PregnancyConceptionValue> {
  const { lmpEpochDay, cycleLength } = inputs;
  const ovulation = calculateOvulation({ lmpEpochDay, cycleLength });
  const dueDateEpochDay = lmpEpochDay + 280 + (cycleLength - 28);

  return {
    value: {
      conceptionEpochDay: ovulation.value.ovulationEpochDay,
      conceptionWindowStartEpochDay: ovulation.value.fertileWindowStartEpochDay,
      conceptionWindowEndEpochDay: ovulation.value.fertileWindowEndEpochDay,
      dueDateEpochDay,
    },
    steps: [
      {
        label: "Most likely conception date",
        formula: "LMP + (cycle length − 14)",
        value: formatDateLong(ovulation.value.ovulationEpochDay),
      },
      {
        label: "Possible conception window",
        formula: "conception date − 5 to + 1 days",
        value: `${formatDateLong(ovulation.value.fertileWindowStartEpochDay)} – ${formatDateLong(ovulation.value.fertileWindowEndEpochDay)}`,
      },
      { label: "Due date from this LMP", formula: "LMP + 280 days, adjusted for cycle length", value: formatDateLong(dueDateEpochDay) },
    ],
    assumptions: [
      ...ovulation.assumptions,
      "This estimates when conception most likely happened for an already-confirmed pregnancy — to predict an upcoming fertile window instead, use the ovulation calculator",
    ],
    rulesVersion: ovulation.rulesVersion,
  };
}
