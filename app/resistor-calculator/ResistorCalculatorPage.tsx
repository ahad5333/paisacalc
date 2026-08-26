"use client";

import { useState, type ReactNode } from "react";
import { ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateResistor, type ResistorColor } from "@/lib/calc/resistor";

const LAST_VERIFIED = "19 Aug 2026";

const DIGIT_OPTIONS: { value: ResistorColor; label: string }[] = [
  { value: "black", label: "Black" },
  { value: "brown", label: "Brown" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
  { value: "violet", label: "Violet" },
  { value: "grey", label: "Grey" },
  { value: "white", label: "White" },
];

const MULTIPLIER_OPTIONS: { value: ResistorColor; label: string }[] = [...DIGIT_OPTIONS, { value: "gold", label: "Gold" }, { value: "silver", label: "Silver" }];

const TOLERANCE_OPTIONS: { value: ResistorColor; label: string }[] = [
  { value: "brown", label: "Brown (±1%)" },
  { value: "red", label: "Red (±2%)" },
  { value: "green", label: "Green (±0.5%)" },
  { value: "blue", label: "Blue (±0.25%)" },
  { value: "violet", label: "Violet (±0.1%)" },
  { value: "gold", label: "Gold (±5%)" },
  { value: "silver", label: "Silver (±10%)" },
];

export function ResistorCalculatorPage({ content }: { content: ReactNode }) {
  const [band1, setBand1] = useState<ResistorColor>("brown");
  const [band2, setBand2] = useState<ResistorColor>("black");
  const [multiplier, setMultiplier] = useState<ResistorColor>("red");
  const [tolerance, setTolerance] = useState<ResistorColor>("gold");

  const result = calculateResistor({ band1, band2, multiplier, tolerance });
  const { formatted, tolerancePct } = result.value;

  return (
    <CalculatorPage
      title="Resistor calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Resistance value from a 4-band resistor color code."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Band 1 (1st digit)" value={band1} onChange={setBand1} options={DIGIT_OPTIONS} />
          <ChoiceInput label="Band 2 (2nd digit)" value={band2} onChange={setBand2} options={DIGIT_OPTIONS} />
          <ChoiceInput label="Band 3 (multiplier)" value={multiplier} onChange={setMultiplier} options={MULTIPLIER_OPTIONS} />
          <ChoiceInput label="Band 4 (tolerance)" value={tolerance} onChange={setTolerance} options={TOLERANCE_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={formatted} caption={`± ${tolerancePct}% tolerance`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
