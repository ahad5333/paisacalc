"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRoi } from "@/lib/calc/roi";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { initial: 200000, final: 350000, years: 4 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RoiCalculator({ content }: { content: ReactNode }) {
  const [initialInvestment, setInitialInvestment] = useState(() => initialParam("i", DEFAULTS.initial));
  const [finalValue, setFinalValue] = useState(() => initialParam("f", DEFAULTS.final));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ i: initialInvestment, f: finalValue, y: years });
  }, [initialInvestment, finalValue, years]);

  const result = calculateRoi({ initialInvestment, finalValue, years });
  const { totalRoiPercent, annualizedRoiPercent } = result.value;

  return (
    <CalculatorPage
      title="ROI calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="center 45%"
      description="Total and annualised return on any investment — from a starting sum, an ending value, and how long it took."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Initial investment"
            value={initialInvestment}
            onChange={setInitialInvestment}
            min={1000}
            max={10000000}
            step={10000}
            slider
          />
          <NumericInput label="Final value" value={finalValue} onChange={setFinalValue} min={0} max={20000000} step={10000} slider />
          <NumericInput label="Holding period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="years" slider />
        </>
      }
      result={
        <ResultDisplay
          value={formatPercent(totalRoiPercent, 1)}
          caption={`Total ROI — ${formatPercent(annualizedRoiPercent, 2)} annualised`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
