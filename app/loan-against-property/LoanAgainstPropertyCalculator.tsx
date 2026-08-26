"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateLoanAgainstProperty } from "@/lib/calc/loan-against-property";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { value: 8000000, ltv: 60, rate: 10.5, years: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function LoanAgainstPropertyCalculator({ content }: { content: ReactNode }) {
  const [propertyValue, setPropertyValue] = useState(() => initialParam("v", DEFAULTS.value));
  const [ltvPercent, setLtvPercent] = useState(() => initialParam("l", DEFAULTS.ltv));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ v: propertyValue, l: ltvPercent, r: ratePercent, y: tenureYears });
  }, [propertyValue, ltvPercent, ratePercent, tenureYears]);

  const result = calculateLoanAgainstProperty({ propertyValue, ltvPercent, ratePercent, tenureYears });
  const { emi, loanAmount } = result.value;

  return (
    <CalculatorPage
      title="Loan against property calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="45% 50%"
      description="EMI on a loan against a property you already own, using the loan-to-value cap lenders actually apply to LAP."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Property value"
            value={propertyValue}
            onChange={setPropertyValue}
            min={1000000}
            max={50000000}
            step={100000}
            slider
          />
          <NumericInput
            label="Loan-to-value (LTV)"
            value={ltvPercent}
            onChange={setLtvPercent}
            min={30}
            max={70}
            step={5}
            suffix="%"
            slider
            helpText="Lenders typically cap LAP at 50-70% of property value."
          />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={8}
            max={16}
            step={0.1}
            suffix="%"
            slider
          />
          <NumericInput
            label="Tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={15}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(emi)}
          caption={`Monthly EMI on an eligible loan amount of ${formatCurrency(loanAmount)}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
