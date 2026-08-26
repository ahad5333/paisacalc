"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSimpleInterest } from "@/lib/calc/simple-interest";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { principal: 200000, rate: 8, years: 3 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function SimpleInterestCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.principal));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ p: principal, r: ratePercent, y: years });
  }, [principal, ratePercent, years]);

  const result = calculateSimpleInterest({ principal, ratePercent, years });
  const { interest, maturityValue } = result.value;

  return (
    <CalculatorPage
      title="Simple interest calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="center 55%"
      description="Interest on the original principal alone — I = P × R × T, no compounding, the basis of most non-cumulative deposits and loan penalty charges."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Principal"
            value={principal}
            onChange={setPrincipal}
            min={1000}
            max={5000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={1}
            max={20}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput label="Duration" value={years} onChange={setYears} min={1} max={20} step={1} suffix="years" slider />
        </>
      }
      result={
        <ResultDisplay value={formatCurrency(interest)} caption={`Interest earned — maturity value of ${formatCurrency(maturityValue)}`} />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
