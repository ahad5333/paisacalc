"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateFutureValue } from "@/lib/calc/future-value";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { presentValue: 500000, rate: 10, years: 15 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function FutureValueCalculator({ content }: { content: ReactNode }) {
  const [presentValue, setPresentValue] = useState(() => initialParam("p", DEFAULTS.presentValue));
  const [growthRatePercent, setGrowthRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ p: presentValue, r: growthRatePercent, y: years });
  }, [presentValue, growthRatePercent, years]);

  const result = calculateFutureValue({ presentValue, growthRatePercent, years });
  const { futureValue } = result.value;

  return (
    <CalculatorPage
      title="Future value calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 60%"
      description="What a lump sum today grows to at a chosen rate — the plain FV = PV × (1+r)ⁿ, on its own."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Present value"
            value={presentValue}
            onChange={setPresentValue}
            min={10000}
            max={10000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Growth rate"
            value={growthRatePercent}
            onChange={setGrowthRatePercent}
            min={1}
            max={20}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput label="Years" value={years} onChange={setYears} min={1} max={40} step={1} suffix="years" slider />
        </>
      }
      result={<ResultDisplay value={formatCurrency(futureValue)} caption="What this amount grows to" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
