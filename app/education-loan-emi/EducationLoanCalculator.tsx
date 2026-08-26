"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateEducationLoan } from "@/lib/calc/education-loan";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { p: 1000000, r: 9.5, m: 54, y: 10 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function EducationLoanCalculator({ content }: { content: ReactNode }) {
  const [principal, setPrincipal] = useState(() => initialParam("p", DEFAULTS.p));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.r));
  const [moratoriumMonths, setMoratoriumMonths] = useState(() => initialParam("m", DEFAULTS.m));
  const [repaymentYears, setRepaymentYears] = useState(() => initialParam("y", DEFAULTS.y));

  useEffect(() => {
    replaceUrlParams({ p: principal, r: rate, m: moratoriumMonths, y: repaymentYears });
  }, [principal, rate, moratoriumMonths, repaymentYears]);

  const result = calculateEducationLoan({
    principal,
    annualRatePercent: rate,
    moratoriumMonths,
    repaymentYears,
  });

  return (
    <CalculatorPage
      title="Education loan EMI calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="70% 35%"
      description="Your EMI after the moratorium period — including the interest that accrues and gets added to your loan while you're still studying."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={5000000}
            step={50000}
            slider
            helpText="The total amount disbursed for your course."
          />
          <NumericInput
            label="Interest rate"
            value={rate}
            onChange={setRate}
            min={6.5}
            max={14}
            step={0.05}
            suffix="%"
            slider
            helpText="Rates vary a lot by institute tier — premier institutes and study-abroad programs often get better rates than others."
          />
          <NumericInput
            label="Moratorium period"
            value={moratoriumMonths}
            onChange={setMoratoriumMonths}
            min={0}
            max={84}
            step={1}
            suffix="months"
            slider
            helpText="Course duration plus the grace period after (typically 6-12 months) — interest keeps accruing this whole time."
          />
          <NumericInput
            label="Repayment tenure"
            value={repaymentYears}
            onChange={setRepaymentYears}
            min={1}
            max={15}
            step={1}
            suffix="years"
            slider
            helpText="How many years to repay once EMIs start, after the moratorium ends."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(result.value.emi)}
          caption={`per month, once repayment starts — moratorium interest of ${formatCurrency(result.value.accruedInterest)} already added in`}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Principal", value: principal },
            { name: "Total interest", value: result.value.totalInterest },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
