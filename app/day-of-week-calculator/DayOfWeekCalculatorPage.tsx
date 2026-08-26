"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DateInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDayOfWeek } from "@/lib/calc/day-of-week";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DayOfWeekCalculatorPage({ content }: { content: ReactNode }) {
  const [epochDay, setEpochDay] = useState(() => initialParam("d", todayEpochDay()));

  useEffect(() => {
    replaceUrlParams({ d: epochDay });
  }, [epochDay]);

  const result = calculateDayOfWeek({ epochDay });
  const { dayName } = result.value;

  return (
    <CalculatorPage
      title="Day of the week calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="What day of the week any date falls on — past, present, or future."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<DateInput label="Date" value={epochDay} onChange={setEpochDay} />}
      result={<ResultDisplay value={dayName} caption="Day of the week" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
