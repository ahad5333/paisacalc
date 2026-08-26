"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, DateInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePregnancyConception } from "@/lib/calc/pregnancy-conception";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PregnancyConceptionCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [lmpEpochDay, setLmpEpochDay] = useState(() => initialParam("lmp", today - 70));
  const [cycleLength, setCycleLength] = useState(() => initialParam("c", 28));

  useEffect(() => {
    replaceUrlParams({ lmp: lmpEpochDay, c: cycleLength });
  }, [lmpEpochDay, cycleLength]);

  const result = calculatePregnancyConception({ lmpEpochDay, cycleLength });
  const { conceptionEpochDay, conceptionWindowStartEpochDay, conceptionWindowEndEpochDay, dueDateEpochDay } = result.value;

  return (
    <CalculatorPage
      title="Pregnancy conception calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 45%"
      description="For a pregnancy already in progress — roughly when conception happened, worked back from the first day of your last period."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="First day of last period (LMP)" value={lmpEpochDay} onChange={setLmpEpochDay} max={today} />
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
          value={formatDateLong(conceptionEpochDay)}
          caption={`Most likely conception date — window ${formatDateLong(conceptionWindowStartEpochDay)} to ${formatDateLong(conceptionWindowEndEpochDay)}, due date ${formatDateLong(dueDateEpochDay)}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
