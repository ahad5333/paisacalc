"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHours } from "@/lib/calc/hours-calculator";

const LAST_VERIFIED = "19 Aug 2026";

export function HoursCalculatorPage({ content }: { content: ReactNode }) {
  const [startH, setStartH] = useState(9);
  const [startM, setStartM] = useState(0);
  const [endH, setEndH] = useState(17);
  const [endM, setEndM] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(30);

  const result = calculateHours({ startH, startM, endH, endM, breakMinutes });
  const { hours, minutes, decimalHours } = result.value;

  return (
    <CalculatorPage
      title="Hours calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Total hours worked between a start and end time, minus any break."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Start hour" value={startH} onChange={setStartH} min={0} max={23} step={1} />
            <NumericInput label="Start minute" value={startM} onChange={setStartM} min={0} max={59} step={1} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="End hour" value={endH} onChange={setEndH} min={0} max={23} step={1} />
            <NumericInput label="End minute" value={endM} onChange={setEndM} min={0} max={59} step={1} />
          </div>
          <NumericInput label="Break" value={breakMinutes} onChange={setBreakMinutes} min={0} max={480} step={5} suffix="min" slider />
        </>
      }
      result={<ResultDisplay value={`${hours}h ${minutes}m`} caption={`Total worked — ${decimalHours} decimal hours`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
