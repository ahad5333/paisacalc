"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DateInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDayCounter } from "@/lib/calc/day-counter";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DayCounterPage({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [startEpochDay, setStartEpochDay] = useState(() => initialParam("s", today));
  const [endEpochDay, setEndEpochDay] = useState(() => initialParam("e", today + 30));

  useEffect(() => {
    replaceUrlParams({ s: startEpochDay, e: endEpochDay });
  }, [startEpochDay, endEpochDay]);

  const result = calculateDayCounter({ startEpochDay, endEpochDay });
  const { totalDays, weekdays, weekendDays, weeks } = result.value;

  return (
    <CalculatorPage
      title="Day counter"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The number of days between two dates, split into weekdays and weekend days."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="Start date" value={startEpochDay} onChange={setStartEpochDay} />
          <DateInput label="End date" value={endEpochDay} onChange={setEndEpochDay} />
        </>
      }
      result={<ResultDisplay value={`${totalDays}`} caption={`Total days — ${weekdays} weekdays, ${weekendDays} weekend days (${weeks} weeks)`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
