"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DateInput, NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDateCalculator, type DateOperation } from "@/lib/calc/date-calculator";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay, formatDateLong } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

const OPERATION_OPTIONS: { value: DateOperation; label: string }[] = [
  { value: "add", label: "Add" },
  { value: "subtract", label: "Subtract" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DateCalculatorPage({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [startEpochDay, setStartEpochDay] = useState(() => initialParam("s", today));
  const [operation, setOperation] = useState<DateOperation>("add");
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(1);
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    replaceUrlParams({ s: startEpochDay });
  }, [startEpochDay]);

  const result = calculateDateCalculator({ startEpochDay, days, weeks, months, years, operation });
  const { resultEpochDay } = result.value;

  return (
    <CalculatorPage
      title="Date calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Add or subtract years, months, weeks, and days from a date, calendar-aware."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="Start date" value={startEpochDay} onChange={setStartEpochDay} />
          <ChoiceInput label="Operation" value={operation} onChange={setOperation} options={OPERATION_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Years" value={years} onChange={setYears} min={0} step={1} />
            <NumericInput label="Months" value={months} onChange={setMonths} min={0} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Weeks" value={weeks} onChange={setWeeks} min={0} step={1} />
            <NumericInput label="Days" value={days} onChange={setDays} min={0} step={1} />
          </div>
        </>
      }
      result={<ResultDisplay value={formatDateLong(resultEpochDay)} caption="Resulting date" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
