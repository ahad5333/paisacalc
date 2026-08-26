"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateRentAffordability } from "@/lib/calc/rent-affordability";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { income: 80000, debt: 5000, ratio: 30 };

const LIMITING_FACTOR_CAPTION = {
  ratio: "the rent-to-income ratio is what's limiting this, not your existing debt",
  debt: "existing debt is what's limiting this — the ratio alone would allow more",
} as const;

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RentAffordabilityCalculator({ content }: { content: ReactNode }) {
  const [monthlyIncome, setMonthlyIncome] = useState(() => initialParam("i", DEFAULTS.income));
  const [existingMonthlyDebt, setExistingMonthlyDebt] = useState(() => initialParam("d", DEFAULTS.debt));
  const [rentToIncomeRatioPercent, setRentToIncomeRatioPercent] = useState(() => initialParam("r", DEFAULTS.ratio));

  useEffect(() => {
    replaceUrlParams({ i: monthlyIncome, d: existingMonthlyDebt, r: rentToIncomeRatioPercent });
  }, [monthlyIncome, existingMonthlyDebt, rentToIncomeRatioPercent]);

  const result = calculateRentAffordability({ monthlyIncome, existingMonthlyDebt, rentToIncomeRatioPercent });
  const { recommendedRent, limitingFactor } = result.value;
  const remainingIncome = Math.max(0, monthlyIncome - existingMonthlyDebt - recommendedRent);

  return (
    <CalculatorPage
      title="Rent affordability calculator"
      heroImage="/images/hero-skyline.webp"
      heroObjectPosition="center 50%"
      description="How much rent actually fits your budget, once existing EMIs and a sensible income ratio are both accounted for."
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
            label="Existing monthly debt"
            value={existingMonthlyDebt}
            onChange={setExistingMonthlyDebt}
            min={0}
            max={500000}
            step={1000}
            slider
            helpText="Every EMI and minimum credit card payment combined."
          />
          <NumericInput
            label="Target rent-to-income ratio"
            value={rentToIncomeRatioPercent}
            onChange={setRentToIncomeRatioPercent}
            min={15}
            max={45}
            step={1}
            suffix="%"
            slider
            helpText="30% is a commonly cited comfortable ceiling."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(recommendedRent)}
          caption={`Recommended maximum rent — ${LIMITING_FACTOR_CAPTION[limitingFactor]}`}
        />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Rent", value: recommendedRent },
            { name: "Existing debt", value: existingMonthlyDebt },
            { name: "Remaining income", value: remainingIncome },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
