"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTimeCalculator, type TimeOperation } from "@/lib/calc/time-calculator";

const LAST_VERIFIED = "19 Aug 2026";

const OPERATION_OPTIONS: { value: TimeOperation; label: string }[] = [
  { value: "add", label: "+" },
  { value: "subtract", label: "−" },
];

export function TimeCalculatorPage({ content }: { content: ReactNode }) {
  const [h1, setH1] = useState(2);
  const [m1, setM1] = useState(30);
  const [s1, setS1] = useState(0);
  const [operation, setOperation] = useState<TimeOperation>("add");
  const [h2, setH2] = useState(1);
  const [m2, setM2] = useState(45);
  const [s2, setS2] = useState(0);

  const result = calculateTimeCalculator({ h1, m1, s1, h2, m2, s2, operation });
  const { hours, minutes, seconds, negative } = result.value;

  return (
    <CalculatorPage
      title="Time calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Add or subtract two clock-time durations (hours, minutes, seconds)."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-3 gap-3">
            <NumericInput label="Hours" value={h1} onChange={setH1} min={0} step={1} />
            <NumericInput label="Minutes" value={m1} onChange={setM1} min={0} max={59} step={1} />
            <NumericInput label="Seconds" value={s1} onChange={setS1} min={0} max={59} step={1} />
          </div>
          <ChoiceInput label="Operation" value={operation} onChange={setOperation} options={OPERATION_OPTIONS} />
          <div className="grid grid-cols-3 gap-3">
            <NumericInput label="Hours" value={h2} onChange={setH2} min={0} step={1} />
            <NumericInput label="Minutes" value={m2} onChange={setM2} min={0} max={59} step={1} />
            <NumericInput label="Seconds" value={s2} onChange={setS2} min={0} max={59} step={1} />
          </div>
        </>
      }
      result={
        <ResultDisplay
          value={`${negative ? "−" : ""}${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
          caption="Result"
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
