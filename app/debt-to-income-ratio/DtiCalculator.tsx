"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateDti, type DtiBand } from "@/lib/calc/dti";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatPercent } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { income: 100000, debt: 25000 };

const BAND_CAPTIONS: Record<DtiBand, string> = {
  healthy: "healthy — plenty of room for a new EMI",
  manageable: "manageable — some room left, but lenders will watch it closely",
  high: "high — most lenders will be cautious about approving new credit",
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DtiCalculator({ content }: { content: ReactNode }) {
  const [monthlyIncome, setMonthlyIncome] = useState(() => initialParam("i", DEFAULTS.income));
  const [monthlyDebtPayments, setMonthlyDebtPayments] = useState(() => initialParam("d", DEFAULTS.debt));

  useEffect(() => {
    replaceUrlParams({ i: monthlyIncome, d: monthlyDebtPayments });
  }, [monthlyIncome, monthlyDebtPayments]);

  const result = calculateDti({ monthlyIncome, monthlyDebtPayments });
  const remainingIncome = Math.max(0, monthlyIncome - monthlyDebtPayments);

  return (
    <CalculatorPage
      title="Debt-to-income ratio calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 55%"
      description="What share of your income is already committed to debt — the same FOIR-style ratio lenders check before approving anything new."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Net monthly income"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            min={10000}
            max={1000000}
            step={5000}
            slider
            helpText="Take-home pay after tax and deductions."
          />
          <NumericInput
            label="Monthly debt payments"
            value={monthlyDebtPayments}
            onChange={setMonthlyDebtPayments}
            min={0}
            max={500000}
            step={1000}
            slider
            helpText="Every EMI and minimum credit card payment combined — not rent, utilities, or everyday spending."
          />
        </>
      }
      result={
        <ResultDisplay value={formatPercent(result.value.dtiPercent, 1)} caption={BAND_CAPTIONS[result.value.band]} />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Debt payments", value: monthlyDebtPayments },
            { name: "Remaining income", value: remainingIncome },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
