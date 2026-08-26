"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateBudget } from "@/lib/calc/budget";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { income: 60000, needs: 50, wants: 30, savings: 20 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BudgetCalculator({ content }: { content: ReactNode }) {
  const [monthlyIncome, setMonthlyIncome] = useState(() => initialParam("i", DEFAULTS.income));
  const [needsPercent, setNeedsPercent] = useState(() => initialParam("n", DEFAULTS.needs));
  const [wantsPercent, setWantsPercent] = useState(() => initialParam("w", DEFAULTS.wants));
  const [savingsPercent, setSavingsPercent] = useState(() => initialParam("s", DEFAULTS.savings));

  useEffect(() => {
    replaceUrlParams({ i: monthlyIncome, n: needsPercent, w: wantsPercent, s: savingsPercent });
  }, [monthlyIncome, needsPercent, wantsPercent, savingsPercent]);

  const result = calculateBudget({ monthlyIncome, needsPercent, wantsPercent, savingsPercent });
  const { needsAmount, wantsAmount, savingsAmount } = result.value;

  return (
    <CalculatorPage
      title="Budget calculator"
      heroImage="/images/hero-rupee.webp"
      heroObjectPosition="center 40%"
      description="Split your monthly income into needs, wants, and savings — the 50/30/20 rule as a starting point, fully adjustable to your own numbers."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Monthly income"
            value={monthlyIncome}
            onChange={setMonthlyIncome}
            min={10000}
            max={1000000}
            step={5000}
            slider
          />
          <NumericInput
            label="Needs"
            value={needsPercent}
            onChange={setNeedsPercent}
            min={0}
            max={100}
            step={5}
            suffix="%"
            slider
            helpText="Rent, EMIs, groceries, utilities — genuinely fixed obligations."
          />
          <NumericInput label="Wants" value={wantsPercent} onChange={setWantsPercent} min={0} max={100} step={5} suffix="%" slider />
          <NumericInput
            label="Savings & extra debt repayment"
            value={savingsPercent}
            onChange={setSavingsPercent}
            min={0}
            max={100}
            step={5}
            suffix="%"
            slider
          />
        </>
      }
      result={<ResultDisplay value={formatCurrency(needsAmount)} caption={`Needs — ${formatCurrency(wantsAmount)} wants, ${formatCurrency(savingsAmount)} savings`} />}
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Needs", value: needsAmount },
            { name: "Wants", value: wantsAmount },
            { name: "Savings", value: savingsAmount },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
