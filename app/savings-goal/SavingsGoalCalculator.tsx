"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalcChart, CalculatorPage } from "@/components/calculator";
import { calculateSavingsGoal } from "@/lib/calc/savings-goal";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = { goal: 2000000, rate: 10, years: 5 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function SavingsGoalCalculator({ content }: { content: ReactNode }) {
  const [goalAmount, setGoalAmount] = useState(() => initialParam("g", DEFAULTS.goal));
  const [rate, setRate] = useState(() => initialParam("r", DEFAULTS.rate));
  const [years, setYears] = useState(() => initialParam("y", DEFAULTS.years));

  useEffect(() => {
    replaceUrlParams({ g: goalAmount, r: rate, y: years });
  }, [goalAmount, rate, years]);

  const result = calculateSavingsGoal({ goalAmount, annualReturnPercent: rate, years });

  return (
    <CalculatorPage
      title="Savings goal calculator"
      heroImage="/images/hero-coins.webp"
      heroObjectPosition="40% 40%"
      description="How much to save every month to reach a target amount — a down payment, a big purchase, any fixed goal — by a date you choose."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Goal amount"
            value={goalAmount}
            onChange={setGoalAmount}
            min={50000}
            max={20000000}
            step={50000}
            slider
            helpText="What you're saving up for — a home down payment, a wedding, anything with a target number."
          />
          <NumericInput
            label="Expected annual return"
            value={rate}
            onChange={setRate}
            min={0}
            max={14}
            step={0.5}
            suffix="%"
            slider
            helpText="What you expect your savings to earn while you build them up — 0% if it's just sitting in a savings account."
          />
          <NumericInput
            label="Time to goal"
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="How long you have to reach the goal."
          />
        </>
      }
      result={
        <ResultDisplay value={formatCurrency(result.value.requiredMonthly)} caption="needed every month" />
      }
      chart={
        <CalcChart
          variant="donut"
          data={[
            { name: "Your contributions", value: result.value.totalContributed },
            { name: "Growth from returns", value: Math.max(0, result.value.growthFromReturns) },
          ]}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
