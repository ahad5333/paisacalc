"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHex, type HexDirection } from "@/lib/calc/hex";
import { decodeNumber } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: HexDirection; label: string }[] = [
  { value: "toHex", label: "Decimal → Hex" },
  { value: "toDecimal", label: "Hex → Decimal" },
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

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function HexCalculator({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<HexDirection>("toHex");
  const [decimalValue, setDecimalValue] = useState(() => initialParam("v", 255));
  const [hexValue, setHexValue] = useState("FF");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("v", String(decimalValue));
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [decimalValue]);

  const result = calculateHex({ direction, decimalValue, hexValue });
  const { hex, decimal } = result.value;

  return (
    <CalculatorPage
      title="Hex calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert between decimal (base 10) and hexadecimal (base 16), in either direction."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          {direction === "toHex" ? (
            <NumericInput label="Decimal number" value={decimalValue} onChange={setDecimalValue} step={1} />
          ) : (
            <TextInput label="Hex number" value={hexValue} onChange={setHexValue} />
          )}
        </>
      }
      result={<ResultDisplay value={direction === "toHex" ? hex : `${decimal}`} caption={direction === "toHex" ? "Hexadecimal" : "Decimal"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
