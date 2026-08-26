"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateEligibility } from "@/lib/calc/eligibility";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { income: 100000, existing: 0, foir: 50, rate: 8.5, years: 20 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function EligibilityCalculator({ content }: { content: ReactNode }) {
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(() => initialParam("i", DEFAULTS.income));
  const [existingMonthlyEmi, setExistingMonthlyEmi] = useState(() => initialParam("e", DEFAULTS.existing));
  const [foirPercent, setFoirPercent] = useState(() => initialParam("f", DEFAULTS.foir));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({
      i: netMonthlyIncome,
      e: existingMonthlyEmi,
      f: foirPercent,
      r: rate,
      y: years,
    });
  }, [netMonthlyIncome, existingMonthlyEmi, foirPercent, rate, years]);

  const tenureMonths = Math.max(1, Math.round(years * 12));
  const result = calculateEligibility({
    netMonthlyIncome,
    existingMonthlyEmi,
    foirPercent,
    annualRatePercent: rate,
    tenureMonths,
  });

  return (
    <CalculatorPage
      title="Home loan eligibility calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="40% 55%"
      description="How much home loan you can likely get, based on your income, existing EMIs, and the FOIR lenders actually use — not just the EMI on an amount you've already picked."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Net monthly income"
            value={netMonthlyIncome}
            onChange={setNetMonthlyIncome}
            min={10000}
            max={1000000}
            step={5000}
            slider
            helpText="Take-home pay after tax and deductions, not gross CTC."
          />
          <NumericInput
            label="Existing monthly EMIs"
            value={existingMonthlyEmi}
            onChange={setExistingMonthlyEmi}
            min={0}
            max={500000}
            step={1000}
            slider
            helpText="Any car loan, personal loan, or other EMI you're already paying."
          />
          <NumericInput
            label="FOIR cap"
            value={foirPercent}
            onChange={setFoirPercent}
            min={30}
            max={65}
            step={5}
            suffix="%"
            slider
            helpText="The share of net income lenders allow for all EMIs combined — 40-50% is typical, higher for higher earners."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={6}
            max={12}
            step={0.05}
            suffix="%"
            slider
            helpText="The annual home loan interest rate you'd expect to be offered."
          />
          <NumericInput
            label="Loan tenure"
            value={years}
            onChange={setYears}
            min={5}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="How many years you'd take to repay the loan."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(result.value.maxLoanAmount)}
          caption={`maximum loan, at an EMI of ${formatCurrency(result.value.maxAffordableEmi)}/month`}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Existing EMIs", value: existingMonthlyEmi },
            { name: "Room for new EMI", value: result.value.maxAffordableEmi },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
