"use client";

import { useEffect, useState, type ReactNode } from "react";
import { DateInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateAge } from "@/lib/calc/age";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { todayEpochDay } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function AgeCalculator({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [birthEpochDay, setBirthEpochDay] = useState(() => initialParam("b", today - 365 * 25));
  const [asOfEpochDay, setAsOfEpochDay] = useState(() => initialParam("d", today));

  useEffect(() => {
    replaceUrlParams({ b: birthEpochDay, d: asOfEpochDay });
  }, [birthEpochDay, asOfEpochDay]);

  const result = calculateAge({ birthEpochDay, asOfEpochDay });
  const { years, months, days, totalDays, daysUntilNextBirthday } = result.value;

  return (
    <CalculatorPage
      title="Age calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Exact age in years, months, and days, plus days until the next birthday."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="Date of birth" value={birthEpochDay} onChange={setBirthEpochDay} max={today} />
          <DateInput label="As of date" value={asOfEpochDay} onChange={setAsOfEpochDay} />
        </>
      }
      result={
        <ResultDisplay
          value={`${years}y ${months}m ${days}d`}
          caption={`${totalDays.toLocaleString("en-IN")} days lived — ${daysUntilNextBirthday} days to next birthday`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
