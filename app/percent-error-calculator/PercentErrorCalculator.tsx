"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePercentError } from "@/lib/calc/percent-error";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PercentErrorCalculator({ content }: { content: ReactNode }) {
  const [experimental, setExperimental] = useState(() => initialParam("e", 48));
  const [theoretical, setTheoretical] = useState(() => initialParam("t", 50));

  useEffect(() => {
    replaceUrlParams({ e: experimental, t: theoretical });
  }, [experimental, theoretical]);

  const result = calculatePercentError({ experimental, theoretical });
  const { percentError } = result.value;

  return (
    <CalculatorPage
      title="Percent error calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How far an experimental or measured value is from the theoretical or accepted value, as a percentage."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Experimental (measured) value" value={experimental} onChange={setExperimental} step={0.1} />
          <NumericInput label="Theoretical (accepted) value" value={theoretical} onChange={setTheoretical} step={0.1} />
        </>
      }
      result={<ResultDisplay value={`${percentError}%`} caption="Percent error" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
