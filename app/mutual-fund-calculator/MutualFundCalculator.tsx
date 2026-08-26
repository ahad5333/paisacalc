"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateMutualFund } from "@/lib/calc/mutual-fund";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { amount: 500000, returnPct: 12, expenseRatio: 1.5, years: 15 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function MutualFundCalculator({ content }: { content: ReactNode }) {
  const [investmentAmount, setInvestmentAmount] = useState(() => initialParam("a", DEFAULTS.amount));
  const [expectedReturnPercent, setExpectedReturnPercent] = useState(() => initialParam("r", DEFAULTS.returnPct));
  const [expenseRatioPercent, setExpenseRatioPercent] = useState(() => initialParam("e", DEFAULTS.expenseRatio));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ a: investmentAmount, r: expectedReturnPercent, e: expenseRatioPercent, y: years });
  }, [investmentAmount, expectedReturnPercent, expenseRatioPercent, years]);

  const result = calculateMutualFund({ investmentAmount, expectedReturnPercent, expenseRatioPercent, years });
  const { maturityValueNet, costOfFees } = result.value;

  return (
    <CalculatorPage
      title="Mutual fund calculator"
      heroImage="/images/hero-chart.webp"
      heroObjectPosition="30% center"
      description="What a lumpsum mutual fund investment grows to — and exactly how much the fund's expense ratio costs you over the years, in rupees."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Investment amount"
            value={investmentAmount}
            onChange={setInvestmentAmount}
            min={10000}
            max={10000000}
            step={10000}
            slider
          />
          <NumericInput
            label="Expected annual return"
            value={expectedReturnPercent}
            onChange={setExpectedReturnPercent}
            min={4}
            max={18}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Expense ratio (TER)"
            value={expenseRatioPercent}
            onChange={setExpenseRatioPercent}
            min={0}
            max={2.5}
            step={0.1}
            suffix="%"
            slider
            helpText="Check the fund's factsheet — typically 0.1-1% for index funds, up to ~2.25% for active funds."
          />
          <NumericInput label="Investment period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="years" slider />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(maturityValueNet)}
          caption={`Maturity value after fees — the expense ratio costs ${formatCurrency(costOfFees)} over this period`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
