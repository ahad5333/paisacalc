"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTimeZone } from "@/lib/calc/time-zone";

const LAST_VERIFIED = "19 Aug 2026";

export function TimeZoneCalculatorPage({ content }: { content: ReactNode }) {
  const [hour, setHour] = useState(14);
  const [minute, setMinute] = useState(30);
  const [fromOffsetHours, setFromOffsetHours] = useState(5.5);
  const [toOffsetHours, setToOffsetHours] = useState(0);

  const result = calculateTimeZone({ hour, minute, fromOffsetHours, toOffsetHours });
  const { resultHour, resultMinute, dayOffset } = result.value;

  return (
    <CalculatorPage
      title="Time zone calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert a time from one UTC offset to another."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Hour" value={hour} onChange={setHour} min={0} max={23} step={1} />
            <NumericInput label="Minute" value={minute} onChange={setMinute} min={0} max={59} step={1} />
          </div>
          <NumericInput label="From UTC offset" value={fromOffsetHours} onChange={setFromOffsetHours} min={-12} max={14} step={0.5} suffix="hrs" />
          <NumericInput label="To UTC offset" value={toOffsetHours} onChange={setToOffsetHours} min={-12} max={14} step={0.5} suffix="hrs" />
        </>
      }
      result={
        <ResultDisplay
          value={`${String(resultHour).padStart(2, "0")}:${String(resultMinute).padStart(2, "0")}`}
          caption={dayOffset !== 0 ? `${dayOffset > 0 ? "+" : ""}${dayOffset} day` : "Same day"}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
