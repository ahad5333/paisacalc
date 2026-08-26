"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHalfLife } from "@/lib/calc/half-life";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function HalfLifeCalculator({ content }: { content: ReactNode }) {
  const [initialQuantity, setInitialQuantity] = useState(() => initialParam("q", 100));
  const [halfLife, setHalfLife] = useState(() => initialParam("h", 10));
  const [elapsedTime, setElapsedTime] = useState(() => initialParam("t", 20));

  useEffect(() => {
    replaceUrlParams({ q: initialQuantity, h: halfLife, t: elapsedTime });
  }, [initialQuantity, halfLife, elapsedTime]);

  const result = calculateHalfLife({ initialQuantity, halfLife, elapsedTime });
  const { remainingQuantity, halfLivesElapsed, percentRemaining } = result.value;

  return (
    <CalculatorPage
      title="Half-life calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Remaining quantity of a substance after a given time, based on exponential decay at a fixed half-life."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Initial quantity" value={initialQuantity} onChange={setInitialQuantity} min={0} step={1} />
          <NumericInput label="Half-life" value={halfLife} onChange={setHalfLife} min={0.01} step={1} />
          <NumericInput label="Elapsed time (same units as half-life)" value={elapsedTime} onChange={setElapsedTime} min={0} step={1} />
        </>
      }
      result={<ResultDisplay value={`${remainingQuantity}`} caption={`Remaining — ${percentRemaining}% left after ${halfLivesElapsed} half-lives`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
