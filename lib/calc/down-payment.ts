import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type DownPaymentInputs = {
  homePrice: number;
  downPaymentPercent: number;
  ratePercent: number;
  tenureYears: number;
  monthlySavingsCapacity: number;
};

export type DownPaymentValue = {
  downPaymentAmount: number;
  loanAmount: number;
  emi: number;
  monthsToSaveDownPayment: number;
};

// A companion to home loan eligibility (which starts from income and
// works out the maximum loan) — this starts from a target home price and
// works out both the down payment itself and how long it takes to save
// it at a stated monthly savings rate, plus the EMI that down payment
// unlocks. Reuses calculateEmi from lib/calc/emi.ts for the loan side;
// the savings-timeline side is plain division, since accumulating a
// lump sum by a fixed date is linear once a monthly rate is fixed (no
// compounding assumed — see lib/calc/savings-goal.ts for the version
// that does assume an investment return along the way).
export function calculateDownPayment(inputs: DownPaymentInputs): CalcResult<DownPaymentValue> {
  const { homePrice, downPaymentPercent, ratePercent, tenureYears, monthlySavingsCapacity } = inputs;

  const downPaymentAmount = Math.round((homePrice * downPaymentPercent) / 100);
  const loanAmount = homePrice - downPaymentAmount;
  const emiResult = calculateEmi({
    principal: loanAmount,
    annualRatePercent: ratePercent,
    tenureMonths: Math.max(1, Math.round(tenureYears * 12)),
  });
  const monthsToSaveDownPayment =
    monthlySavingsCapacity > 0 ? Math.ceil(downPaymentAmount / monthlySavingsCapacity) : Infinity;

  return {
    value: {
      downPaymentAmount,
      loanAmount,
      emi: emiResult.value.emi,
      monthsToSaveDownPayment,
    },
    steps: [
      { label: "Down payment required", formula: `${homePrice} × ${downPaymentPercent}%`, value: downPaymentAmount },
      { label: "Loan amount needed", formula: `${homePrice} − ${downPaymentAmount}`, value: loanAmount },
      { label: "EMI this down payment unlocks", formula: "standard EMI on the loan amount", value: emiResult.value.emi },
      {
        label: "Months to save the down payment",
        formula: `${downPaymentAmount} ÷ ${monthlySavingsCapacity}`,
        value: Number.isFinite(monthsToSaveDownPayment) ? monthsToSaveDownPayment : 0,
      },
    ],
    assumptions: [
      "The savings timeline is plain division against a fixed monthly amount — no investment return assumed along the way (see the savings goal calculator for that version)",
      "Most Indian lenders require at least 10-25% down payment depending on the loan amount, since regulations cap loan-to-value on home loans",
      "Home price is assumed fixed for the saving period — a rising market would need a larger down payment by the time it's actually saved",
      "Doesn't include registration, stamp duty, or other purchase costs on top of the down payment itself",
    ],
    rulesVersion: "Down payment and EMI (assumption-based)",
  };
}
