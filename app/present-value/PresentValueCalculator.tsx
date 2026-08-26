"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePresentValue } from "@/lib/calc/present-value";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { futureValue: 1000000, rate: 8, years: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PresentValueCalculator({ content }: { content: ReactNode }) {
  const [futureValue, setFutureValue] = useState(() => initialParam("f", DEFAULTS.futureValue));
  const [discountRatePercent, setDiscountRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ f: futureValue, r: discountRatePercent, y: years });
  }, [futureValue, discountRatePercent, years]);

  const result = calculatePresentValue({ futureValue, discountRatePercent, years });
  const { presentValue } = result.value;

  return (
    <CalculatorPage
      title="Present value calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 40%"
      description="What a known future amount is worth today, discounted at a chosen rate — the inverse of compound growth."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Future value"
            value={futureValue}
            onChange={setFutureValue}
            min={10000}
            max={50000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Discount rate"
            value={discountRatePercent}
            onChange={setDiscountRatePercent}
            min={1}
            max={20}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput label="Years away" value={years} onChange={setYears} min={1} max={40} step={1} suffix="years" slider />
        </>
      }
      result={<ResultDisplay value={formatCurrency(presentValue)} caption="What this future amount is worth today" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
