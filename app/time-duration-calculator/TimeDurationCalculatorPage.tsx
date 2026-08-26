"use client";

import { useState, type ReactNode } from "react";
import { DateInput, NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTimeDuration } from "@/lib/calc/time-duration";
import { todayEpochDay } from "@/lib/date-utils";

const LAST_VERIFIED = "19 Aug 2026";

export function TimeDurationCalculatorPage({ content }: { content: ReactNode }) {
  const today = todayEpochDay();
  const [startEpochDay, setStartEpochDay] = useState(today);
  const [startH, setStartH] = useState(9);
  const [startM, setStartM] = useState(0);
  const [endEpochDay, setEndEpochDay] = useState(today + 2);
  const [endH, setEndH] = useState(17);
  const [endM, setEndM] = useState(30);

  const result = calculateTimeDuration({ startEpochDay, startH, startM, endEpochDay, endH, endM });
  const { days, hours, minutes } = result.value;

  return (
    <CalculatorPage
      title="Time duration calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Precise duration between two full dates and times, in days, hours, and minutes."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <DateInput label="Start date" value={startEpochDay} onChange={setStartEpochDay} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Start hour" value={startH} onChange={setStartH} min={0} max={23} step={1} />
            <NumericInput label="Start minute" value={startM} onChange={setStartM} min={0} max={59} step={1} />
          </div>
          <DateInput label="End date" value={endEpochDay} onChange={setEndEpochDay} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="End hour" value={endH} onChange={setEndH} min={0} max={23} step={1} />
            <NumericInput label="End minute" value={endM} onChange={setEndM} min={0} max={59} step={1} />
          </div>
        </>
      }
      result={<ResultDisplay value={`${days}d ${hours}h ${minutes}m`} caption="Total duration" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
