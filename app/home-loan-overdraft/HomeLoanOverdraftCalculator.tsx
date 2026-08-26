"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHomeLoanOverdraft } from "@/lib/calc/home-loan-overdraft";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { loan: 5000000, rate: 9, years: 20, surplus: 500000 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function HomeLoanOverdraftCalculator({ content }: { content: ReactNode }) {
  const [loanAmount, setLoanAmount] = useState(() => initialParam("l", DEFAULTS.loan));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [parkedSurplus, setParkedSurplus] = useState(() => initialParam("s", DEFAULTS.surplus));

  useEffect(() => {
    replaceUrlParams({ l: loanAmount, r: ratePercent, y: tenureYears, s: parkedSurplus });
  }, [loanAmount, ratePercent, tenureYears, parkedSurplus]);

  const result = calculateHomeLoanOverdraft({ loanAmount, ratePercent, tenureYears, parkedSurplus });
  const { interestSaved, tenureReductionMonths } = result.value;
  const years = Math.floor(tenureReductionMonths / 12);
  const months = tenureReductionMonths % 12;

  return (
    <CalculatorPage
      title="Home loan overdraft calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="55% 45%"
      description="How much interest and tenure a home loan overdraft facility actually saves by parking surplus savings against the loan."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={500000}
            max={20000000}
            step={50000}
            slider
          />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={6}
            max={12}
            step={0.05}
            suffix="%"
            slider
          />
          <NumericInput
            label="Tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={5}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Surplus kept parked"
            value={parkedSurplus}
            onChange={setParkedSurplus}
            min={0}
            max={5000000}
            step={50000}
            slider
            helpText="Average balance you keep in the linked overdraft account."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(interestSaved)}
          caption={`Interest saved by parking surplus — the loan also clears ${years > 0 ? `${years}y ` : ""}${months}m sooner`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
