"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateLog } from "@/lib/calc/log";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function LogCalculator({ content }: { content: ReactNode }) {
  const [base, setBase] = useState(() => initialParam("b", 10));
  const [x, setX] = useState(() => initialParam("x", 1000));

  useEffect(() => {
    replaceUrlParams({ b: base, x });
  }, [base, x]);

  const result = calculateLog({ base, x });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Log calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The logarithm of a number to any base, via the change-of-base formula."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Base" value={base} onChange={setBase} min={0.01} step={1} />
          <NumericInput label="x" value={x} onChange={setX} min={0.01} step={1} />
        </>
      }
      result={<ResultDisplay value={Number.isNaN(value) ? "undefined" : `${value}`} caption={`log base ${base} of ${x}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
