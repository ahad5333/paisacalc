import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type BalanceTransferInputs = {
  outstandingBalance: number;
  currentRatePercent: number;
  remainingTenureYears: number;
  newRatePercent: number;
  newTenureYears: number;
  transferCostPercent: number;
};

export type BalanceTransferValue = {
  currentEmi: number;
  currentRemainingInterest: number;
  newEmi: number;
  newTotalInterest: number;
  transferCost: number;
  emiChange: number;
  netSavings: number;
  worthIt: boolean;
};

// India's actual term for this is "home loan balance transfer" — moving
// an outstanding loan to a new lender at a lower rate, not the US
// "refinance" (which usually implies a full re-underwriting/cash-out).
// Both sides reuse calculateEmi from lib/calc/emi.ts: the "stay put" side
// treats the outstanding balance and remaining tenure as a fresh loan at
// the CURRENT rate (mathematically identical to continuing the existing
// amortisation schedule), and the "transfer" side is the same balance at
// the new lender's rate and chosen tenure. Transfer cost (processing fee
// on the new loan, foreclosure charges on the old one) is netted out of
// the interest saved, not ignored — a common reason a transfer looks
// good on rate alone but doesn't actually pay off.
export function calculateBalanceTransfer(inputs: BalanceTransferInputs): CalcResult<BalanceTransferValue> {
  const { outstandingBalance, currentRatePercent, remainingTenureYears, newRatePercent, newTenureYears, transferCostPercent } =
    inputs;

  const current = calculateEmi({
    principal: outstandingBalance,
    annualRatePercent: currentRatePercent,
    tenureMonths: Math.max(1, Math.round(remainingTenureYears * 12)),
  });
  const next = calculateEmi({
    principal: outstandingBalance,
    annualRatePercent: newRatePercent,
    tenureMonths: Math.max(1, Math.round(newTenureYears * 12)),
  });

  const transferCost = Math.round((outstandingBalance * transferCostPercent) / 100);
  const emiChange = next.value.emi - current.value.emi;
  const interestSaved = current.value.totalInterest - next.value.totalInterest;
  const netSavings = interestSaved - transferCost;

  return {
    value: {
      currentEmi: current.value.emi,
      currentRemainingInterest: current.value.totalInterest,
      newEmi: next.value.emi,
      newTotalInterest: next.value.totalInterest,
      transferCost,
      emiChange,
      netSavings,
      worthIt: netSavings > 0,
    },
    steps: [
      { label: "Current EMI (continuing as-is)", formula: "EMI on outstanding balance at current rate", value: current.value.emi },
      { label: "Remaining interest if you stay", formula: "EMI × remaining months − balance", value: current.value.totalInterest },
      { label: "New EMI after transfer", formula: "EMI on outstanding balance at new rate/tenure", value: next.value.emi },
      { label: "Total interest after transfer", formula: "New EMI × new tenure − balance", value: next.value.totalInterest },
      { label: "Transfer cost", formula: `${outstandingBalance} × ${transferCostPercent}%`, value: transferCost },
      { label: "Net savings", formula: "Interest saved − Transfer cost", value: netSavings },
    ],
    assumptions: [
      "Both EMIs are computed fresh on the outstanding balance — mathematically identical to continuing the existing loan's own amortisation schedule",
      "Transfer cost bundles the new lender's processing fee and the old lender's foreclosure charge into one percentage of the outstanding balance",
      "Rates stay fixed for their full respective tenures — a floating-rate loan's actual rate can move either way over time",
      "Ignores any other fees — legal, valuation, or stamp duty on the new loan agreement in some states",
    ],
    rulesVersion: "Balance transfer comparison (assumption-based)",
  };
}
