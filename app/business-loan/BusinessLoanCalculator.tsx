"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBusinessLoan } from "@/lib/calc/business-loan";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { amount: 1000000, rate: 14, years: 5, fee: 2 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BusinessLoanCalculator({ content }: { content: ReactNode }) {
  const [loanAmount, setLoanAmount] = useState(() => initialParam("a", DEFAULTS.amount));
  const [ratePercent, setRatePercent] = useState(() => initialParam("r", DEFAULTS.rate));
  const [tenureYears, setTenureYears] = useState(() => initialParam("y", DEFAULTS.years));
  const [processingFeePercent, setProcessingFeePercent] = useState(() => initialParam("f", DEFAULTS.fee));

  useEffect(() => {
    replaceUrlParams({ a: loanAmount, r: ratePercent, y: tenureYears, f: processingFeePercent });
  }, [loanAmount, ratePercent, tenureYears, processingFeePercent]);

  const result = calculateBusinessLoan({ loanAmount, ratePercent, tenureYears, processingFeePercent });
  const { emi, netDisbursement } = result.value;

  return (
    <CalculatorPage
      title="Business loan calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="30% 40%"
      description="EMI on a business or MSME loan, at the typically higher rates and shorter tenures these loans carry — plus what's actually disbursed after the processing fee."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Loan amount" value={loanAmount} onChange={setLoanAmount} min={100000} max={10000000} step={50000} slider />
          <NumericInput
            label="Interest rate"
            value={ratePercent}
            onChange={setRatePercent}
            min={9}
            max={24}
            step={0.25}
            suffix="%"
            slider
            helpText="Business/MSME loans commonly run 11-16%+, often unsecured."
          />
          <NumericInput label="Tenure" value={tenureYears} onChange={setTenureYears} min={1} max={7} step={1} suffix="years" slider />
          <NumericInput
            label="Processing fee"
            value={processingFeePercent}
            onChange={setProcessingFeePercent}
            min={0}
            max={4}
            step={0.25}
            suffix="%"
            slider
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(emi)} caption={`Monthly EMI — ${formatCurrency(netDisbursement)} actually disbursed after fees`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
