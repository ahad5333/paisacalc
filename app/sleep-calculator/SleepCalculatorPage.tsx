"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateSleep, type SleepDirection } from "@/lib/calc/sleep";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: SleepDirection; label: string }[] = [
  { value: "wakeUp", label: "I want to wake up at..." },
  { value: "bedtime", label: "I'm going to bed at..." },
];

export function SleepCalculatorPage({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<SleepDirection>("wakeUp");
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [fallAsleepMinutes, setFallAsleepMinutes] = useState(15);

  const result = calculateSleep({ direction, hour, minute, fallAsleepMinutes });
  const { options } = result.value;
  const recommended = options.find((o) => o.cycles === 5)!;

  return (
    <CalculatorPage
      title="Sleep calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Optimal bedtime or wake-up time based on 90-minute sleep cycles."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Hour" value={hour} onChange={setHour} min={0} max={23} step={1} />
            <NumericInput label="Minute" value={minute} onChange={setMinute} min={0} max={59} step={1} />
          </div>
          <NumericInput label="Time to fall asleep" value={fallAsleepMinutes} onChange={setFallAsleepMinutes} min={0} max={60} step={5} suffix="min" slider />
        </>
      }
      result={
        <ResultDisplay
          value={`${String(recommended.hour).padStart(2, "0")}:${String(recommended.minute).padStart(2, "0")}`}
          caption={`${direction === "wakeUp" ? "Bedtime" : "Wake up"} for 5 full cycles (${recommended.totalHours}h)`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All cycle options"
          columns={[
            { key: "cycles", label: "Cycles" },
            { key: "hours", label: "Sleep duration" },
            { key: "time", label: "Time", align: "right" },
          ]}
          rows={options.map((o) => ({
            cycles: `${o.cycles}`,
            hours: `${o.totalHours}h`,
            time: `${String(o.hour).padStart(2, "0")}:${String(o.minute).padStart(2, "0")}`,
          }))}
        />
      }
      content={content}
    />
  );
}
