"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRatio } from "@/lib/calc/ratio";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RatioCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState(() => initialParam("a", 2));
  const [b, setB] = useState(() => initialParam("b", 4));
  const [c, setC] = useState(() => initialParam("c", 5));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculateRatio({ a, b, c });
  const { simplifiedA, simplifiedB, d } = result.value;

  return (
    <CalculatorPage
      title="Ratio calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Simplify a ratio to lowest terms, and solve a proportion a:b = c:d for the missing term."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="a" value={a} onChange={setA} step={1} />
            <NumericInput label="b" value={b} onChange={setB} step={1} />
          </div>
          <NumericInput label="c (for a:b = c:d)" value={c} onChange={setC} step={1} />
        </>
      }
      result={<ResultDisplay value={`${simplifiedA}:${simplifiedB}`} caption={`Simplified — and a:b = c:${d}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
