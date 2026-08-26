"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, DateInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculatePregnancy } from "@/lib/calc/pregnancy";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PregnancyCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [lmpEpochDay, setLmpEpochDay] = useState(() => initialParam("lmp", today - 70));
  const [cycleLength, setCycleLength] = useState(() => initialParam("c", 28));

  useEffect(() => {
    replaceUrlParams({ lmp: lmpEpochDay, c: cycleLength });
  }, [lmpEpochDay, cycleLength]);

  const result = calculatePregnancy({ lmpEpochDay, cycleLength, referenceEpochDay: today });
  const { dueDateEpochDay, gestationalWeeks, gestationalDays, trimester, daysRemaining, trimester1EndEpochDay, trimester2EndEpochDay } =
    result.value;

  return (
    <CalculatorPage
      title="Pregnancy calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 45%"
      description="How far along you are and your estimated due date, from the first day of your last period — the same LMP-based dating clinicians use."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput
            label="First day of last period (LMP)"
            value={lmpEpochDay}
            onChange={setLmpEpochDay}
            max={today}
            helpText="The first day of bleeding, not the last."
          />
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
          value={formatDateLong(dueDateEpochDay)}
          caption={`Estimated due date — ${gestationalWeeks}w ${gestationalDays}d along, trimester ${trimester}, ${daysRemaining > 0 ? `${daysRemaining} days to go` : "due date has passed"}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Trimester dates"
          columns={[
            { key: "trimester", label: "Trimester" },
            { key: "range", label: "Date range" },
          ]}
          rows={[
            { trimester: "First (weeks 1–13)", range: `${formatDateLong(lmpEpochDay)} – ${formatDateLong(trimester1EndEpochDay)}` },
            {
              trimester: "Second (weeks 14–27)",
              range: `${formatDateLong(trimester1EndEpochDay + 1)} – ${formatDateLong(trimester2EndEpochDay)}`,
            },
            { trimester: "Third (weeks 28–40)", range: `${formatDateLong(trimester2EndEpochDay + 1)} – ${formatDateLong(dueDateEpochDay)}` },
          ]}
        />
      }
      content={content}
    />
  );
}
