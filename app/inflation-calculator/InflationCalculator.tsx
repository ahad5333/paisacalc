"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateInflation } from "@/lib/calc/inflation";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { p: 100000, r: 5, y: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function InflationCalculator({ content }: { content: ReactNode }) {
  const [presentAmount, setPresentAmount] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.y));

  useEffect(() => {
    replaceUrlParams({ p: presentAmount, r: rate, y: years });
  }, [presentAmount, rate, years]);

  const result = calculateInflation({ presentAmount, inflationRatePercent: rate, years });

  return (
    <CalculatorPage
      title="Inflation calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 60%"
      description="What today's ₹ will actually cost in the future, at an inflation rate you choose — the arithmetic worked out step by step."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Present amount"
            value={presentAmount}
            onChange={setPresentAmount}
            min={1000}
            max={10000000}
            step={1000}
            slider
            helpText="What something costs today, or an amount whose future value you want to project."
          />
          <NumericInput
            label="Inflation rate"
            value={rate}
            onChange={setRate}
            min={1}
            max={10}
            step={0.1}
            suffix="%"
            slider
            helpText="India's CPI inflation has run roughly 3.5-4.5% through 2026 — this is an assumption you're testing, not a fixed rate."
          />
          <NumericInput
            label="Years"
            value={years}
            onChange={setYears}
            min={1}
            max={40}
            step={1}
            suffix="years"
            slider
            helpText="How far into the future you're projecting."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(result.value.futureCost)}
          caption={`in ${years} years — the same purchasing power as ${formatCurrency(presentAmount)} today`}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Present amount", value: presentAmount },
            { name: "Added by inflation", value: result.value.purchasingPowerLoss },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
