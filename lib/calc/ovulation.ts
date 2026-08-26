import type { CalcResult } from "./types";
import { formatDateLong } from "@/lib/date-utils";

export type OvulationInputs = {
  lmpEpochDay: number;
  cycleLength: number;
};

export type OvulationValue = {
  ovulationEpochDay: number;
  fertileWindowStartEpochDay: number;
  fertileWindowEndEpochDay: number;
  nextPeriodEpochDay: number;
};

// Shared by the Ovulation and Pregnancy Conception calculators — both ask
// "when does ovulation fall in this cycle," just for different audiences
// (planning ahead vs. explaining a pregnancy already in progress). The
// luteal phase (ovulation to next period) is consistently about 14 days
// across individuals; cycle-length variation almost entirely comes from
// the follicular phase before ovulation, which is why ovulation date is
// estimated backward from the next period rather than forward from LMP
// by a fixed offset.
export function calculateOvulation(inputs: OvulationInputs): CalcResult<OvulationValue> {
  const { lmpEpochDay, cycleLength } = inputs;
  const ovulationEpochDay = lmpEpochDay + (cycleLength - 14);
  const fertileWindowStartEpochDay = ovulationEpochDay - 5;
  const fertileWindowEndEpochDay = ovulationEpochDay + 1;
  const nextPeriodEpochDay = lmpEpochDay + cycleLength;

  return {
    value: { ovulationEpochDay, fertileWindowStartEpochDay, fertileWindowEndEpochDay, nextPeriodEpochDay },
    steps: [
      { label: "Estimated ovulation date", formula: "LMP + (cycle length − 14)", value: formatDateLong(ovulationEpochDay) },
      {
        label: "Fertile window",
        formula: "ovulation date − 5 to + 1 days",
        value: `${formatDateLong(fertileWindowStartEpochDay)} – ${formatDateLong(fertileWindowEndEpochDay)}`,
      },
      { label: "Next period (if not conceived)", formula: "LMP + cycle length", value: formatDateLong(nextPeriodEpochDay) },
    ],
    assumptions: [
      "Assumes a consistent 14-day luteal phase — the time from ovulation to the next period — which is far more stable across individuals than the days leading up to ovulation",
      "The fertile window accounts for sperm survival (up to ~5 days) and the egg's short viable window after ovulation (~24 hours); conception is most likely on the day of or day before ovulation itself, not spread evenly across the window",
      "Irregular cycles make this estimate less reliable — tracking basal body temperature or using ovulation predictor kits gives a more precise result for any individual cycle",
    ],
    rulesVersion: "14-day luteal phase estimate",
  };
}
