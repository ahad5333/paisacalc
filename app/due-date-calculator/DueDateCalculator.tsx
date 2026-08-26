"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, DateInput, ChoiceInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateDueDate, type DueDateMethod } from "@/lib/calc/due-date";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

const METHOD_OPTIONS = [
  { value: "lmp" as DueDateMethod, label: "Last period" },
  { value: "conception" as DueDateMethod, label: "Conception date" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DueDateCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [method, setMethod] = useState<DueDateMethod>("lmp");
  const [lmpEpochDay, setLmpEpochDay] = useState(() => initialParam("lmp", today - 42));
  const [cycleLength, setCycleLength] = useState(() => initialParam("c", 28));
  const [conceptionEpochDay, setConceptionEpochDay] = useState(() => initialParam("conc", today - 28));

  useEffect(() => {
    replaceUrlParams({ lmp: lmpEpochDay, c: cycleLength, conc: conceptionEpochDay });
  }, [lmpEpochDay, cycleLength, conceptionEpochDay]);

  const result = calculateDueDate({ method, lmpEpochDay, cycleLength, conceptionEpochDay });
  const { dueDateEpochDay, effectiveConceptionEpochDay, viabilityEpochDay, fullTermStartEpochDay } = result.value;

  return (
    <CalculatorPage
      title="Due date calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 40%"
      description="Estimated due date from either your last period or a known conception date, plus the viability and full-term milestone dates."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Calculate from" value={method} onChange={setMethod} options={METHOD_OPTIONS} />
          {method === "lmp" ? (
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
          ) : (
            <DateInput label="Conception date" value={conceptionEpochDay} onChange={setConceptionEpochDay} max={today} />
          )}
        </>
      }
      result={
        <ResultDisplay
          value={formatDateLong(dueDateEpochDay)}
          caption={
            method === "lmp"
              ? `Estimated due date — conception around ${formatDateLong(effectiveConceptionEpochDay)}`
              : "Estimated due date, from your known conception date"
          }
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Key milestones"
          columns={[
            { key: "milestone", label: "Milestone" },
            { key: "date", label: "Date" },
          ]}
          rows={[
            { milestone: "Viability (24 weeks)", date: formatDateLong(viabilityEpochDay) },
            { milestone: "Full term begins (39 weeks)", date: formatDateLong(fullTermStartEpochDay) },
            { milestone: "Due date (40 weeks)", date: formatDateLong(dueDateEpochDay) },
          ]}
        />
      }
      content={content}
    />
  );
}
