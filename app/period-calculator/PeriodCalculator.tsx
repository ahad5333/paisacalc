"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, DateInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculatePeriod } from "@/lib/calc/period";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";
const CYCLES_TO_SHOW = 6;

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PeriodCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [lmpEpochDay, setLmpEpochDay] = useState(() => initialParam("lmp", today - 14));
  const [cycleLength, setCycleLength] = useState(() => initialParam("c", 28));
  const [periodLength, setPeriodLength] = useState(() => initialParam("p", 5));

  useEffect(() => {
    replaceUrlParams({ lmp: lmpEpochDay, c: cycleLength, p: periodLength });
  }, [lmpEpochDay, cycleLength, periodLength]);

  const result = calculatePeriod({
    lmpEpochDay,
    cycleLength,
    periodLength,
    referenceEpochDay: today,
    cyclesToShow: CYCLES_TO_SHOW,
  });
  const { nextPeriodEpochDay, daysUntilNextPeriod, cycles } = result.value;

  return (
    <CalculatorPage
      title="Period calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Predicted dates for your next several periods, projected forward from your last one at your average cycle length."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="First day of last period" value={lmpEpochDay} onChange={setLmpEpochDay} max={today} />
          <NumericInput
            label="Average cycle length"
            value={cycleLength}
            onChange={setCycleLength}
            min={20}
            max={40}
            step={1}
            suffix="days"
            slider
          />
          <NumericInput label="Period length" value={periodLength} onChange={setPeriodLength} min={2} max={10} step={1} suffix="days" slider />
        </>
      }
      result={
        <ResultDisplay
          value={formatDateLong(nextPeriodEpochDay)}
          caption={`Next period — ${daysUntilNextPeriod} day${daysUntilNextPeriod === 1 ? "" : "s"} from today`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Upcoming cycles"
          columns={[
            { key: "period", label: "Period" },
            { key: "ovulation", label: "Predicted ovulation" },
          ]}
          rows={cycles.map((cycle) => ({
            period: `${formatDateLong(cycle.periodStartEpochDay)} – ${formatDateLong(cycle.periodEndEpochDay)}`,
            ovulation: formatDateLong(cycle.ovulationEpochDay),
          }))}
        />
      }
      content={content}
    />
  );
}
