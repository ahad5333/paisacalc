"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBalanceTransfer } from "@/lib/calc/balance-transfer";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";
import { formatCurrency } from "@/lib/format";

const LAST_VERIFIED = "18 Aug 2026";
const DEFAULTS = {
  balance: 3000000,
  currentRate: 9.5,
  remainingYears: 15,
  newRate: 8.3,
  newYears: 15,
  cost: 1,
};

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BalanceTransferCalculator({ content }: { content: ReactNode }) {
  const [outstandingBalance, setOutstandingBalance] = useState(() => initialParam("b", DEFAULTS.balance));
  const [currentRatePercent, setCurrentRatePercent] = useState(() => initialParam("cr", DEFAULTS.currentRate));
  const [remainingTenureYears, setRemainingTenureYears] = useState(() => initialParam("ry", DEFAULTS.remainingYears));
  const [newRatePercent, setNewRatePercent] = useState(() => initialParam("nr", DEFAULTS.newRate));
  const [newTenureYears, setNewTenureYears] = useState(() => initialParam("ny", DEFAULTS.newYears));
  const [transferCostPercent, setTransferCostPercent] = useState(() => initialParam("tc", DEFAULTS.cost));

  useEffect(() => {
    replaceUrlParams({
      b: outstandingBalance,
      cr: currentRatePercent,
      ry: remainingTenureYears,
      nr: newRatePercent,
      ny: newTenureYears,
      tc: transferCostPercent,
    });
  }, [outstandingBalance, currentRatePercent, remainingTenureYears, newRatePercent, newTenureYears, transferCostPercent]);

  const result = calculateBalanceTransfer({
    outstandingBalance,
    currentRatePercent,
    remainingTenureYears,
    newRatePercent,
    newTenureYears,
    transferCostPercent,
  });
  const { netSavings, worthIt, emiChange } = result.value;

  return (
    <CalculatorPage
      title="Home loan balance transfer calculator"
      heroImage="/images/hero-house.webp"
      heroObjectPosition="40% 55%"
      description="Whether moving your outstanding home loan to a new lender at a lower rate actually pays off, once the transfer cost is netted out."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput
            label="Outstanding loan balance"
            value={outstandingBalance}
            onChange={setOutstandingBalance}
            min={100000}
            max={20000000}
            step={50000}
            slider
          />
          <NumericInput
            label="Current interest rate"
            value={currentRatePercent}
            onChange={setCurrentRatePercent}
            min={6}
            max={14}
            step={0.05}
            suffix="%"
            slider
          />
          <NumericInput
            label="Remaining tenure"
            value={remainingTenureYears}
            onChange={setRemainingTenureYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
          />
          <NumericInput
            label="New lender's rate"
            value={newRatePercent}
            onChange={setNewRatePercent}
            min={6}
            max={14}
            step={0.05}
            suffix="%"
            slider
          />
          <NumericInput
            label="New tenure"
            value={newTenureYears}
            onChange={setNewTenureYears}
            min={1}
            max={30}
            step={1}
            suffix="years"
            slider
            helpText="Often kept the same as the remaining tenure, but can be reset."
          />
          <NumericInput
            label="Transfer cost"
            value={transferCostPercent}
            onChange={setTransferCostPercent}
            min={0}
            max={3}
            step={0.1}
            suffix="%"
            slider
            helpText="New lender's processing fee plus the old lender's foreclosure charge, as a % of the balance."
          />
        </>
      }
      result={
        <ResultDisplay
          value={formatCurrency(Math.abs(netSavings))}
          caption={`Net ${worthIt ? "savings" : "cost"} from transferring, after fees — EMI would be ${formatCurrency(Math.abs(emiChange))} ${emiChange < 0 ? "lower" : "higher"}`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
