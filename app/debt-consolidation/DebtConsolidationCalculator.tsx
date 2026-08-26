"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDebtConsolidation } from "@/lib/calc/debt-consolidation";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = {
  d1Balance: 150000,
  d1Rate: 36,
  d1Emi: 8000,
  d2Balance: 250000,
  d2Rate: 15,
  d2Emi: 9500,
  newRate: 13,
  newYears: 3,
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function DebtConsolidationCalculator({ content }: { content: ReactNode }) {
  const [debt1Balance, setDebt1Balance] = useState(() => initialParam("b1", DEFAULTS.d1Balance));
  const [debt1RatePercent, setDebt1RatePercent] = useState(() => initialParam("r1", DEFAULTS.d1Rate));
  const [debt1Emi, setDebt1Emi] = useState(() => initialParam("e1", DEFAULTS.d1Emi));
  const [debt2Balance, setDebt2Balance] = useState(() => initialParam("b2", DEFAULTS.d2Balance));
  const [debt2RatePercent, setDebt2RatePercent] = useState(() => initialParam("r2", DEFAULTS.d2Rate));
  const [debt2Emi, setDebt2Emi] = useState(() => initialParam("e2", DEFAULTS.d2Emi));
  const [newLoanRatePercent, setNewLoanRatePercent] = useState(() => initialParam("nr", DEFAULTS.newRate));
  const [newLoanTenureYears, setNewLoanTenureYears] = useState(() => initialParam("ny", DEFAULTS.newYears));

  useEffect(() => {
    replaceUrlParams({
      b1: debt1Balance,
      r1: debt1RatePercent,
      e1: debt1Emi,
      b2: debt2Balance,
      r2: debt2RatePercent,
      e2: debt2Emi,
      nr: newLoanRatePercent,
      ny: newLoanTenureYears,
    });
  }, [debt1Balance, debt1RatePercent, debt1Emi, debt2Balance, debt2RatePercent, debt2Emi, newLoanRatePercent, newLoanTenureYears]);

  const result = calculateDebtConsolidation({
    debt1Balance,
    debt1RatePercent,
    debt1Emi,
    debt2Balance,
    debt2RatePercent,
    debt2Emi,
    newLoanRatePercent,
    newLoanTenureYears,
  });
  const { totalInterestChange, monthlyPaymentChange, better, currentTotalInterest, newLoanTotalInterest } = result.value;
  const interestMoves = totalInterestChange < 0 ? "saves" : "costs";
  const paymentMoves = monthlyPaymentChange < 0 ? "lower" : "higher";

  return (
    <CalculatorPage
      title="Debt consolidation calculator"
      heroImage="/images/hero-desk.webp"
      heroObjectPosition="center 45%"
      description="Whether rolling two debts into one new loan actually saves money — or just lowers the EMI while costing more overall."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Debt 1 balance"
            value={debt1Balance}
            onChange={setDebt1Balance}
            min={10000}
            max={2000000}
            step={10000}
            slider
            helpText="E.g. a credit card balance — usually the higher-rate debt."
          />
          <NumericInput
            label="Debt 1 interest rate"
            value={debt1RatePercent}
            onChange={setDebt1RatePercent}
            min={1}
            max={45}
            step={0.5}
            suffix="%"
            slider
            helpText="Annualised rate — a card's monthly rate × 12."
          />
          <NumericInput
            label="Debt 1 current EMI"
            value={debt1Emi}
            onChange={setDebt1Emi}
            min={500}
            max={100000}
            step={500}
            slider
          />
          <NumericInput
            label="Debt 2 balance"
            value={debt2Balance}
            onChange={setDebt2Balance}
            min={10000}
            max={2000000}
            step={10000}
            slider
            helpText="E.g. a personal loan or another EMI."
          />
          <NumericInput
            label="Debt 2 interest rate"
            value={debt2RatePercent}
            onChange={setDebt2RatePercent}
            min={1}
            max={45}
            step={0.5}
            suffix="%"
            slider
          />
          <NumericInput
            label="Debt 2 current EMI"
            value={debt2Emi}
            onChange={setDebt2Emi}
            min={500}
            max={100000}
            step={500}
            slider
          />
          <NumericInput
            label="New consolidated loan rate"
            value={newLoanRatePercent}
            onChange={setNewLoanRatePercent}
            min={1}
            max={30}
            step={0.25}
            suffix="%"
            slider
            helpText="The rate offered on the new loan that would replace both debts."
          />
          <NumericInput
            label="New consolidated loan tenure"
            value={newLoanTenureYears}
            onChange={setNewLoanTenureYears}
            min={1}
            max={10}
            step={1}
            suffix="years"
            slider
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(Math.abs(totalInterestChange))}
          caption={`Consolidating ${interestMoves} ${formatCurrency(Math.abs(totalInterestChange))} in total interest (${formatCurrency(currentTotalInterest)} → ${formatCurrency(newLoanTotalInterest)}) and makes the monthly payment ${formatCurrency(Math.abs(monthlyPaymentChange))} ${paymentMoves} — ${better === "consolidate" ? "worth it here" : "not worth it on total cost, even though the EMI drops"}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
