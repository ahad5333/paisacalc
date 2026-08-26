"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBinary, type BinaryDirection } from "@/lib/calc/binary";
import { decodeNumber } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: BinaryDirection; label: string }[] = [
  { value: "toBinary", label: "Decimal → Binary" },
  { value: "toDecimal", label: "Binary → Decimal" },
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
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
    </div>
  );
}

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BinaryCalculator({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<BinaryDirection>("toBinary");
  const [decimalValue, setDecimalValue] = useState(() => initialParam("v", 13));
  const [binaryValue, setBinaryValue] = useState("1101");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("v", String(decimalValue));
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [decimalValue]);

  const result = calculateBinary({ direction, decimalValue, binaryValue });
  const { binary, decimal } = result.value;

  return (
    <CalculatorPage
      title="Binary calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert between decimal (base 10) and binary (base 2), in either direction."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          {direction === "toBinary" ? (
            <NumericInput label="Decimal number" value={decimalValue} onChange={setDecimalValue} step={1} />
          ) : (
            <TextInput label="Binary number" value={binaryValue} onChange={setBinaryValue} />
          )}
        </>
      }
      result={<ResultDisplay value={direction === "toBinary" ? binary : `${decimal}`} caption={direction === "toBinary" ? "Binary" : "Decimal"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
