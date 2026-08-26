"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, DateInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateOvulation } from "@/lib/calc/ovulation";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function OvulationCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [lmpEpochDay, setLmpEpochDay] = useState(() => initialParam("lmp", today - 14));
  const [cycleLength, setCycleLength] = useState(() => initialParam("c", 28));

  useEffect(() => {
    replaceUrlParams({ lmp: lmpEpochDay, c: cycleLength });
  }, [lmpEpochDay, cycleLength]);

  const result = calculateOvulation({ lmpEpochDay, cycleLength });
  const { ovulationEpochDay, fertileWindowStartEpochDay, fertileWindowEndEpochDay, nextPeriodEpochDay } = result.value;

  return (
    <CalculatorPage
      title="Ovulation calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Predicted ovulation date and fertile window for the upcoming cycle, from the start of your last period."
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
        </>
      }
      result={
        <ResultDisplay
          value={`${formatDateLong(fertileWindowStartEpochDay)} – ${formatDateLong(fertileWindowEndEpochDay)}`}
          caption={`Fertile window — ovulation predicted ${formatDateLong(ovulationEpochDay)}, next period ${formatDateLong(nextPeriodEpochDay)} if not conceived`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
