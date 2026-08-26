"use client";

import { useId, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRomanNumeral, type RomanDirection } from "@/lib/calc/roman-numeral";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: RomanDirection; label: string }[] = [
  { value: "toRoman", label: "Decimal → Roman" },
  { value: "toDecimal", label: "Roman → Decimal" },
];

function TextInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent font-mono text-base uppercase text-ink outline-none"
        />
      </div>
    </div>
  );
}

export function RomanNumeralCalculatorPage({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<RomanDirection>("toRoman");
  const [decimalValue, setDecimalValue] = useState(1994);
  const [romanValue, setRomanValue] = useState("MCMXCIV");

  const result = calculateRomanNumeral({ direction, decimalValue, romanValue });
  const { roman, decimal, error } = result.value;

  return (
    <CalculatorPage
      title="Roman numeral converter"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert between decimal numbers and Roman numerals, in either direction."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          {direction === "toRoman" ? (
            <NumericInput label="Decimal number" value={decimalValue} onChange={setDecimalValue} min={1} max={3999} step={1} />
          ) : (
            <TextInput label="Roman numeral" value={romanValue} onChange={setRomanValue} />
          )}
        </>
      }
      result={<ResultDisplay value={error ? "Invalid" : direction === "toRoman" ? roman : `${decimal}`} caption={error ?? "Result"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
