"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateOhmsLaw, type OhmsLawUnknown } from "@/lib/calc/ohms-law";

const LAST_VERIFIED = "19 Aug 2026";

const UNKNOWN_OPTIONS: { value: OhmsLawUnknown; label: string }[] = [
  { value: "voltage", label: "Voltage (V)" },
  { value: "current", label: "Current (I)" },
  { value: "resistance", label: "Resistance (R)" },
];

export function OhmsLawCalculatorPage({ content }: { content: ReactNode }) {
  const [unknown, setUnknown] = useState<OhmsLawUnknown>("voltage");
  const [voltage, setVoltage] = useState(0);
  const [current, setCurrent] = useState(2);
  const [resistance, setResistance] = useState(5);

  const result = calculateOhmsLaw({ voltage, current, resistance, unknown });
  const { result: value } = result.value;

  const unit = unknown === "voltage" ? "V" : unknown === "current" ? "A" : "Ω";

  return (
    <CalculatorPage
      title="Ohm's law calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Solve for voltage, current, or resistance given the other two — V = I × R."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Solve for" value={unknown} onChange={setUnknown} options={UNKNOWN_OPTIONS} />
          {unknown !== "voltage" && <NumericInput label="Voltage (V)" value={voltage} onChange={setVoltage} min={0} step={1} />}
          {unknown !== "current" && <NumericInput label="Current (I, amps)" value={current} onChange={setCurrent} min={0} step={0.1} />}
          {unknown !== "resistance" && <NumericInput label="Resistance (R, ohms)" value={resistance} onChange={setResistance} min={0.01} step={1} />}
        </>
      }
      result={<ResultDisplay value={Number.isFinite(value) ? `${value} ${unit}` : "undefined"} caption={`Solved for ${unknown}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
