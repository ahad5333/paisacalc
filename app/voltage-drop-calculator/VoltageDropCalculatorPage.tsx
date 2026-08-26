"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateVoltageDrop, type WireGauge } from "@/lib/calc/voltage-drop";

const LAST_VERIFIED = "19 Aug 2026";

const GAUGE_OPTIONS: { value: WireGauge; label: string }[] = [
  { value: "14", label: "14 AWG" },
  { value: "12", label: "12 AWG" },
  { value: "10", label: "10 AWG" },
  { value: "8", label: "8 AWG" },
  { value: "6", label: "6 AWG" },
  { value: "4", label: "4 AWG" },
  { value: "2", label: "2 AWG" },
  { value: "1/0", label: "1/0 AWG" },
];

export function VoltageDropCalculatorPage({ content }: { content: ReactNode }) {
  const [gauge, setGauge] = useState<WireGauge>("12");
  const [lengthFt, setLengthFt] = useState(100);
  const [currentAmps, setCurrentAmps] = useState(10);
  const [sourceVoltage, setSourceVoltage] = useState(120);

  const result = calculateVoltageDrop({ gauge, lengthFt, currentAmps, sourceVoltage });
  const { voltageDrop, voltageDropPct, voltageAtLoad } = result.value;

  return (
    <CalculatorPage
      title="Voltage drop calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Voltage lost over a copper wire run, from wire gauge, length, and current."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Wire gauge" value={gauge} onChange={setGauge} options={GAUGE_OPTIONS} />
          <NumericInput label="One-way length" value={lengthFt} onChange={setLengthFt} min={1} step={10} suffix="ft" />
          <NumericInput label="Current" value={currentAmps} onChange={setCurrentAmps} min={0.1} step={1} suffix="A" />
          <NumericInput label="Source voltage" value={sourceVoltage} onChange={setSourceVoltage} min={1} step={1} suffix="V" />
        </>
      }
      result={<ResultDisplay value={`${voltageDrop} V`} caption={`${voltageDropPct}% drop — ${voltageAtLoad}V at the load`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
