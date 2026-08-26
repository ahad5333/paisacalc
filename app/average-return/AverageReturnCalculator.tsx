"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateAverageReturn } from "@/lib/calc/average-return";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS: [number, number, number, number, number] = [30, -20, 25, -10, 15];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function AverageReturnCalculator({ content }: { content: ReactNode }) {
  const [year1, setYear1] = useState(() => initialParam("y1", DEFAULTS[0]));
  const [year2, setYear2] = useState(() => initialParam("y2", DEFAULTS[1]));
  const [year3, setYear3] = useState(() => initialParam("y3", DEFAULTS[2]));
  const [year4, setYear4] = useState(() => initialParam("y4", DEFAULTS[3]));
  const [year5, setYear5] = useState(() => initialParam("y5", DEFAULTS[4]));

  useEffect(() => {
    replaceUrlParams({ y1: year1, y2: year2, y3: year3, y4: year4, y5: year5 });
  }, [year1, year2, year3, year4, year5]);

  const result = calculateAverageReturn({ yearlyReturnsPercent: [year1, year2, year3, year4, year5] });
  const { arithmeticAveragePercent, cagrPercent, volatilityDragPercent } = result.value;

  return (
    <CalculatorPage
      title="Average return calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="70% center"
      description="The gap between a plain average of yearly returns and the CAGR you actually realise — a mathematical certainty whenever returns vary, not a rounding quirk."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Year 1 return" value={year1} onChange={setYear1} min={-50} max={60} step={1} suffix="%" slider />
          <NumericInput label="Year 2 return" value={year2} onChange={setYear2} min={-50} max={60} step={1} suffix="%" slider />
          <NumericInput label="Year 3 return" value={year3} onChange={setYear3} min={-50} max={60} step={1} suffix="%" slider />
          <NumericInput label="Year 4 return" value={year4} onChange={setYear4} min={-50} max={60} step={1} suffix="%" slider />
          <NumericInput label="Year 5 return" value={year5} onChange={setYear5} min={-50} max={60} step={1} suffix="%" slider />
        </>
      }
      result={
        <ResultDisplay
          value={formatPercent(cagrPercent, 2)}
          caption={`CAGR actually realised — ${formatPercent(arithmeticAveragePercent, 2)} arithmetic average, a ${formatPercent(volatilityDragPercent, 2)} volatility drag`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
