"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDebtPayoff } from "@/lib/calc/debt-payoff";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = {
  d1Balance: 150000,
  d1Rate: 36,
  d1Min: 6000,
  d2Balance: 50000,
  d2Rate: 9,
  d2Min: 3000,
  d3Balance: 250000,
  d3Rate: 15,
  d3Min: 7000,
  extra: 5000,
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DebtPayoffCalculator({ content }: { content: ReactNode }) {
  const [debt1Balance, setDebt1Balance] = useState(() => initialParam("b1", DEFAULTS.d1Balance));
  const [debt1RatePercent, setDebt1RatePercent] = useState(() => initialParam("r1", DEFAULTS.d1Rate));
  const [debt1MinPayment, setDebt1MinPayment] = useState(() => initialParam("m1", DEFAULTS.d1Min));
  const [debt2Balance, setDebt2Balance] = useState(() => initialParam("b2", DEFAULTS.d2Balance));
  const [debt2RatePercent, setDebt2RatePercent] = useState(() => initialParam("r2", DEFAULTS.d2Rate));
  const [debt2MinPayment, setDebt2MinPayment] = useState(() => initialParam("m2", DEFAULTS.d2Min));
  const [debt3Balance, setDebt3Balance] = useState(() => initialParam("b3", DEFAULTS.d3Balance));
  const [debt3RatePercent, setDebt3RatePercent] = useState(() => initialParam("r3", DEFAULTS.d3Rate));
  const [debt3MinPayment, setDebt3MinPayment] = useState(() => initialParam("m3", DEFAULTS.d3Min));
  const [extraMonthlyBudget, setExtraMonthlyBudget] = useState(() => initialParam("e", DEFAULTS.extra));

  useEffect(() => {
    replaceUrlParams({
      b1: debt1Balance,
      r1: debt1RatePercent,
      m1: debt1MinPayment,
      b2: debt2Balance,
      r2: debt2RatePercent,
      m2: debt2MinPayment,
      b3: debt3Balance,
      r3: debt3RatePercent,
      m3: debt3MinPayment,
      e: extraMonthlyBudget,
    });
  }, [
    debt1Balance,
    debt1RatePercent,
    debt1MinPayment,
    debt2Balance,
    debt2RatePercent,
    debt2MinPayment,
    debt3Balance,
    debt3RatePercent,
    debt3MinPayment,
    extraMonthlyBudget,
  ]);

  const result = calculateDebtPayoff({
    debt1Balance,
    debt1RatePercent,
    debt1MinPayment,
    debt2Balance,
    debt2RatePercent,
    debt2MinPayment,
    debt3Balance,
    debt3RatePercent,
    debt3MinPayment,
    extraMonthlyBudget,
  });
  const { interestSavedByAvalanche, avalancheMonths, snowballMonths } = result.value;

  return (
    <CalculatorPage
      title="Debt payoff calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 35%"
      description="Avalanche (highest rate first) vs. snowball (smallest balance first) — which order to attack three debts in actually saves more interest."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Debt 1 balance" value={debt1Balance} onChange={setDebt1Balance} min={5000} max={2000000} step={5000} slider />
          <NumericInput label="Debt 1 rate" value={debt1RatePercent} onChange={setDebt1RatePercent} min={1} max={45} step={0.5} suffix="%" slider />
          <NumericInput label="Debt 1 minimum payment" value={debt1MinPayment} onChange={setDebt1MinPayment} min={500} max={100000} step={500} slider />
          <NumericInput label="Debt 2 balance" value={debt2Balance} onChange={setDebt2Balance} min={5000} max={2000000} step={5000} slider />
          <NumericInput label="Debt 2 rate" value={debt2RatePercent} onChange={setDebt2RatePercent} min={1} max={45} step={0.5} suffix="%" slider />
          <NumericInput label="Debt 2 minimum payment" value={debt2MinPayment} onChange={setDebt2MinPayment} min={500} max={100000} step={500} slider />
          <NumericInput label="Debt 3 balance" value={debt3Balance} onChange={setDebt3Balance} min={5000} max={2000000} step={5000} slider />
          <NumericInput label="Debt 3 rate" value={debt3RatePercent} onChange={setDebt3RatePercent} min={1} max={45} step={0.5} suffix="%" slider />
          <NumericInput label="Debt 3 minimum payment" value={debt3MinPayment} onChange={setDebt3MinPayment} min={500} max={100000} step={500} slider />
          <NumericInput
            label="Extra monthly budget"
            value={extraMonthlyBudget}
            onChange={setExtraMonthlyBudget}
            min={0}
            max={100000}
            step={500}
            slider
            helpText="On top of all three minimum payments combined."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(interestSavedByAvalanche)}
          caption={`Avalanche saves this much interest over snowball — ${avalancheMonths} months vs ${snowballMonths} months to clear everything`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
