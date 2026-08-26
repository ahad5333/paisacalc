"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateZScore } from "@/lib/calc/z-score";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function ZScoreCalculator({ content }: { content: ReactNode }) {
  const [x, setX] = useState(() => initialParam("x", 70));
  const [mean, setMean] = useState(() => initialParam("m", 60));
  const [stdDev, setStdDev] = useState(() => initialParam("s", 10));

  useEffect(() => {
    replaceUrlParams({ x, m: mean, s: stdDev });
  }, [x, mean, stdDev]);

  const result = calculateZScore({ x, mean, stdDev });
  const { z, percentile } = result.value;

  return (
    <CalculatorPage
      title="Z-score calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How many standard deviations a value is from the mean, and its percentile under a normal distribution."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Value (x)" value={x} onChange={setX} step={1} />
          <NumericInput label="Mean" value={mean} onChange={setMean} step={1} />
          <NumericInput label="Standard deviation" value={stdDev} onChange={setStdDev} min={0.01} step={1} />
        </>
      }
      result={<ResultDisplay value={`${z}`} caption={`Z-score — ${percentile}th percentile`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
