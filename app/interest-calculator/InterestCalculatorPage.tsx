"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateInterest } from "@/lib/calc/interest-calculator";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { principal: 100000, rate: 7, years: 5, contribution: 5000, compounding: 4 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function InterestCalculatorPage({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.principal));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [monthlyContribution, setMonthlyContribution] = useState(() => initialParam("m", DEFAULTS.contribution));
  const [compoundingPerYear, setCompoundingPerYear] = useState(() => initialParam("c", DEFAULTS.compounding));

  useEffect(() => {
    replaceUrlParams({ p: principal, r: ratePercent, y: years, m: monthlyContribution, c: compoundingPerYear });
  }, [principal, ratePercent, years, monthlyContribution, compoundingPerYear]);

  const result = calculateInterest({ principal, ratePercent, years, monthlyContribution, compoundingPerYear });
  const { maturityValue, totalInterest } = result.value;

  return (
    <CalculatorPage
      title="Interest calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="center 40%"
      description="Compound interest on any starting sum plus an optional monthly contribution, at any compounding frequency — the general-purpose version behind India's own FD and RD products."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Starting principal"
            value={principal}
            onChange={setPrincipal}
            min={0}
            max={5000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={1}
            max={15}
            step={0.1}
            suffix="%"
            slider
          />
          <NumericInput label="Duration" value={years} onChange={setYears} min={1} max={30} step={1} suffix="years" slider />
          <NumericInput
            label="Monthly contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min={0}
            max={200000}
            step={1000}
            slider
          />
          <NumericInput
            label="Compounding frequency"
            value={compoundingPerYear}
            onChange={setCompoundingPerYear}
            min={1}
            max={12}
            step={1}
            suffix="times/year"
            slider
            helpText="1 = yearly, 2 = half-yearly, 4 = quarterly, 12 = monthly."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(maturityValue)}
          caption={`Maturity value — ${formatCurrency(totalInterest)} of that is interest earned`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
