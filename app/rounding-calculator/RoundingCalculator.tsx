"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRounding, type RoundMode } from "@/lib/calc/rounding";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const MODE_OPTIONS: { value: RoundMode; label: string }[] = [
  { value: "nearest", label: "Nearest" },
  { value: "up", label: "Up" },
  { value: "down", label: "Down" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RoundingCalculator({ content }: { content: ReactNode }) {
  const [value, setValue] = useState(() => initialParam("v", 2.567));
  const [decimalPlaces, setDecimalPlaces] = useState(() => initialParam("p", 2));
  const [mode, setMode] = useState<RoundMode>("nearest");

  useEffect(() => {
    replaceUrlParams({ v: value, p: decimalPlaces });
  }, [value, decimalPlaces]);

  const result = calculateRounding({ value, decimalPlaces, mode });
  const { result: rounded } = result.value;

  return (
    <CalculatorPage
      title="Rounding calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Round any number to a chosen number of decimal places (or to the nearest 10, 100...), nearest, up, or down."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Number" value={value} onChange={setValue} step={0.001} />
          <NumericInput
            label="Decimal places"
            value={decimalPlaces}
            onChange={setDecimalPlaces}
            min={-4}
            max={10}
            step={1}
            slider
            helpText="Negative values round to the nearest 10, 100, 1000, etc."
          />
          <ChoiceInput label="Direction" value={mode} onChange={setMode} options={MODE_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${rounded}`} caption="Rounded result" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
