"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateConversionLength, type LengthUnit } from "@/lib/calc/conversion-length";

const LAST_VERIFIED = "19 Aug 2026";

const UNIT_OPTIONS: { value: LengthUnit; label: string }[] = [
  { value: "mm", label: "mm" },
  { value: "cm", label: "cm" },
  { value: "m", label: "m" },
  { value: "km", label: "km" },
  { value: "in", label: "in" },
  { value: "ft", label: "ft" },
  { value: "yd", label: "yd" },
  { value: "mi", label: "mi" },
];

export function ConversionCalculatorPage({ content }: { content: ReactNode }) {
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState<LengthUnit>("mi");
  const [toUnit, setToUnit] = useState<LengthUnit>("km");

  const result = calculateConversionLength({ value, fromUnit, toUnit });
  const { result: converted } = result.value;

  return (
    <CalculatorPage
      title="Conversion calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert a length between metric and imperial units."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Value" value={value} onChange={setValue} step={0.1} />
          <ChoiceInput label="From" value={fromUnit} onChange={setFromUnit} options={UNIT_OPTIONS} />
          <ChoiceInput label="To" value={toUnit} onChange={setToUnit} options={UNIT_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${converted} ${toUnit}`} caption={`${value} ${fromUnit}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
