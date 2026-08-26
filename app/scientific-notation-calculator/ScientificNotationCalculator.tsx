"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateScientificNotation, type ScientificNotationDirection } from "@/lib/calc/scientific-notation";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: ScientificNotationDirection; label: string }[] = [
  { value: "toScientific", label: "Decimal → Scientific" },
  { value: "toDecimal", label: "Scientific → Decimal" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ScientificNotationCalculator({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<ScientificNotationDirection>("toScientific");
  const [decimalValue, setDecimalValue] = useState(() => initialParam("v", 1234000));
  const [mantissa, setMantissa] = useState(() => initialParam("m", 1.234));
  const [exponent, setExponent] = useState(() => initialParam("e", 6));

  useEffect(() => {
    replaceUrlParams({ v: decimalValue, m: mantissa, e: exponent });
  }, [decimalValue, mantissa, exponent]);

  const result = calculateScientificNotation({ direction, decimalValue, mantissa, exponent });
  const { mantissa: outMantissa, exponent: outExponent, decimal } = result.value;

  return (
    <CalculatorPage
      title="Scientific notation calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Convert between decimal numbers and scientific notation, in either direction."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          {direction === "toScientific" ? (
            <NumericInput label="Decimal number" value={decimalValue} onChange={setDecimalValue} step={1} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <NumericInput label="Mantissa" value={mantissa} onChange={setMantissa} step={0.001} />
              <NumericInput label="Exponent" value={exponent} onChange={setExponent} step={1} />
            </div>
          )}
        </>
      }
      result={
        <ResultDisplay
          value={direction === "toScientific" ? `${outMantissa} × 10^${outExponent}` : `${decimal}`}
          caption={direction === "toScientific" ? "Scientific notation" : "Decimal value"}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
