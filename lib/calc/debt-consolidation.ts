import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";
import { simulateScheduleAtFixedEmi } from "./emi";

export type DebtConsolidationInputs = {
  debt1Balance: number;
  debt1RatePercent: number;
  debt1Emi: number;
  debt2Balance: number;
  debt2RatePercent: number;
  debt2Emi: number;
  newLoanRatePercent: number;
  newLoanTenureYears: number;
};

export type DebtConsolidationValue = {
  currentTotalBalance: number;
  currentMonthlyPayment: number;
  currentMonthsToPayoff: number;
  currentTotalInterest: number;
  newLoanEmi: number;
  newLoanMonths: number;
  newLoanTotalInterest: number;
  monthlyPaymentChange: number;
  totalInterestChange: number;
  better: "consolidate" | "keep separate";
};

// "Current path" simulates each debt separately at its own stated EMI and
// rate to payoff (reusing simulateScheduleAtFixedEmi from lib/calc/emi.ts —
// the same reducing-balance simulation the credit-card payoff calculator
// uses), then sums the interest. "Consolidated path" is a plain new-loan
// EMI on the combined balance. Comparing on total interest rather than
// just the new EMI on purpose: a longer consolidated tenure routinely
// lowers the monthly payment while costing MORE in total interest — the
// standard debt-consolidation trap this calculator exists to surface, not
// paper over. See tests/debt-consolidation.test.ts for the worked example.
export function calculateDebtConsolidation(inputs: DebtConsolidationInputs): CalcResult<DebtConsolidationValue> {
  const {
    debt1Balance,
    debt1RatePercent,
    debt1Emi,
    debt2Balance,
    debt2RatePercent,
    debt2Emi,
    newLoanRatePercent,
    newLoanTenureYears,
  } = inputs;

  const schedule1 = simulateScheduleAtFixedEmi(debt1Balance, debt1RatePercent, debt1Emi);
  const schedule2 = simulateScheduleAtFixedEmi(debt2Balance, debt2RatePercent, debt2Emi);

  const interest1 = schedule1.reduce((sum, row) => sum + row.interest, 0);
  const interest2 = schedule2.reduce((sum, row) => sum + row.interest, 0);
  const currentTotalInterest = interest1 + interest2;
  const currentMonthsToPayoff = Math.max(schedule1.length, schedule2.length);
  const currentMonthlyPayment = debt1Emi + debt2Emi;
  const currentTotalBalance = debt1Balance + debt2Balance;

  const newLoanTenureMonths = Math.max(1, Math.round(newLoanTenureYears * 12));
  const newLoan = calculateEmi({
    principal: currentTotalBalance,
    annualRatePercent: newLoanRatePercent,
    tenureMonths: newLoanTenureMonths,
  });

  const monthlyPaymentChange = newLoan.value.emi - currentMonthlyPayment;
  const totalInterestChange = newLoan.value.totalInterest - currentTotalInterest;

  return {
    value: {
      currentTotalBalance,
      currentMonthlyPayment,
      currentMonthsToPayoff,
      currentTotalInterest,
      newLoanEmi: newLoan.value.emi,
      newLoanMonths: newLoanTenureMonths,
      newLoanTotalInterest: newLoan.value.totalInterest,
      monthlyPaymentChange,
      totalInterestChange,
      better: totalInterestChange < 0 ? "consolidate" : "keep separate",
    },
    steps: [
      { label: "Total existing debt", formula: `${debt1Balance} + ${debt2Balance}`, value: currentTotalBalance },
      {
        label: "Current combined monthly payment",
        formula: `${debt1Emi} + ${debt2Emi}`,
        value: currentMonthlyPayment,
      },
      {
        label: "Current total interest (both debts to payoff)",
        formula: "simulated month by month, each debt at its own EMI and rate",
        value: currentTotalInterest,
      },
      { label: "New consolidated EMI", formula: "standard EMI on the combined balance", value: newLoan.value.emi },
      { label: "New loan total interest", formula: `New EMI × ${newLoanTenureMonths} months − Combined balance`, value: newLoan.value.totalInterest },
    ],
    assumptions: [
      "Both existing debts are paid at their stated fixed EMI and rate until cleared, with no missed payments",
      "The new loan replaces both existing debts entirely, disbursed for their full combined balance",
      "All interest rates stay constant for the full comparison period",
      "Ignores processing fees and foreclosure charges on the old debts, and any processing fee on the new loan — a pure interest-cost comparison",
      "A longer consolidated tenure can lower the monthly payment while still costing more in total interest — that trade-off is the whole point of comparing both numbers, not just the EMI",
    ],
    rulesVersion: "Two-debt consolidation comparison (assumption-based)",
  };
}
