"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateTimeCard, type TimeCardDay } from "@/lib/calc/time-card";

const LAST_VERIFIED = "19 Aug 2026";
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DEFAULT_DAY: TimeCardDay = { clockInH: 9, clockInM: 0, clockOutH: 17, clockOutM: 0, breakMinutes: 30 };
const OFF_DAY: TimeCardDay = { clockInH: 0, clockInM: 0, clockOutH: 0, clockOutM: 0, breakMinutes: 0 };

export function TimeCardCalculatorPage({ content }: { content: ReactNode }) {
  const [days, setDays] = useState<TimeCardDay[]>([
    DEFAULT_DAY,
    DEFAULT_DAY,
    DEFAULT_DAY,
    DEFAULT_DAY,
    DEFAULT_DAY,
    OFF_DAY,
    OFF_DAY,
  ]);
  const [overtimeThresholdHours, setOvertimeThresholdHours] = useState(40);

  function updateDay(index: number, patch: Partial<TimeCardDay>) {
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  }

  const result = calculateTimeCard({ days, overtimeThresholdHours });
  const { dailyHours, totalHours, regularHours, overtimeHours } = result.value;

  return (
    <CalculatorPage
      title="Time card calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Total hours worked across a full week, split into regular and overtime hours."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Overtime threshold"
            value={overtimeThresholdHours}
            onChange={setOvertimeThresholdHours}
            min={20}
            max={60}
            step={1}
            suffix="hrs/week"
            slider
          />
          <div className="flex flex-col gap-3">
            {DAY_LABELS.map((label, i) => (
              <div key={label} className="grid grid-cols-[3rem_1fr_1fr_1fr_1fr_1fr] items-end gap-2">
                <span className="pb-2 text-sm text-muted">{label}</span>
                <NumericInput label="In (h)" value={days[i].clockInH} onChange={(v) => updateDay(i, { clockInH: v })} min={0} max={23} step={1} />
                <NumericInput label="In (m)" value={days[i].clockInM} onChange={(v) => updateDay(i, { clockInM: v })} min={0} max={59} step={1} />
                <NumericInput label="Out (h)" value={days[i].clockOutH} onChange={(v) => updateDay(i, { clockOutH: v })} min={0} max={23} step={1} />
                <NumericInput label="Out (m)" value={days[i].clockOutM} onChange={(v) => updateDay(i, { clockOutM: v })} min={0} max={59} step={1} />
                <NumericInput label="Break" value={days[i].breakMinutes} onChange={(v) => updateDay(i, { breakMinutes: v })} min={0} max={240} step={5} />
              </div>
            ))}
          </div>
        </>
      }
      result={<ResultDisplay value={`${totalHours}h`} caption={`Total worked — ${regularHours}h regular, ${overtimeHours}h overtime`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Daily breakdown"
          columns={[
            { key: "day", label: "Day" },
            { key: "hours", label: "Hours", align: "right" },
          ]}
          rows={DAY_LABELS.map((label, i) => ({ day: label, hours: `${dailyHours[i]}h` }))}
        />
      }
      content={content}
    />
  );
}
