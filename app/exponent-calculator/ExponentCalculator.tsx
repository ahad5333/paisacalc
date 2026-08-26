"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateExponent } from "@/lib/calc/exponent";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ExponentCalculator({ content }: { content: ReactNode }) {
  const [base, setBase] = useState(() => initialParam("b", 2));
  const [exponent, setExponent] = useState(() => initialParam("e", 10));

  useEffect(() => {
    replaceUrlParams({ b: base, e: exponent });
  }, [base, exponent]);

  const result = calculateExponent({ base, exponent });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Exponent calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Raise a base to any power — positive, negative, or fractional exponents."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Base" value={base} onChange={setBase} step={0.1} />
          <NumericInput label="Exponent" value={exponent} onChange={setExponent} step={0.1} />
        </>
      }
      result={<ResultDisplay value={Number.isNaN(value) ? "undefined" : `${value}`} caption={`${base} ^ ${exponent}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
