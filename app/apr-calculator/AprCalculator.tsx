"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateApr } from "@/lib/calc/apr";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { amount: 500000, rate: 12, years: 3, fee: 2 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function AprCalculator({ content }: { content: ReactNode }) {
  const [loanAmount, setLoanAmount] = useState(() => initialParam("a", DEFAULTS.amount));
  const [statedRatePercent, setStatedRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [processingFeePercent, setProcessingFeePercent] = useState(() => initialParam("f", DEFAULTS.fee));

  useEffect(() => {
    replaceUrlParams({ a: loanAmount, r: statedRatePercent, y: tenureYears, f: processingFeePercent });
  }, [loanAmount, statedRatePercent, tenureYears, processingFeePercent]);

  const result = calculateApr({ loanAmount, statedRatePercent, tenureYears, processingFeePercent });
  const { aprPercent } = result.value;

  return (
    <CalculatorPage
      title="APR calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 60%"
      description="The effective annual rate you're actually paying once the processing fee is factored in — not just the stated rate on the loan paperwork."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            min={50000}
            max={5000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Stated interest rate"
            value={statedRatePercent}
            onChange={setStatedRatePercent}
            min={5}
            max={24}
            step={0.25}
            suffix="%"
            slider
          />
          <NumericInput
            label="Tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={10}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="Processing fee"
            value={processingFeePercent}
            onChange={setProcessingFeePercent}
            min={0}
            max={5}
            step={0.25}
            suffix="%"
            slider
            helpText="Deducted upfront from what's actually disbursed to you."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatPercent(aprPercent, 2)}
          caption={`Effective APR — the real cost of borrowing, vs. the ${formatPercent(statedRatePercent, 2)} stated rate`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
