import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type CashbackVsLowRateInputs = {
  carPrice: number;
  cashbackAmount: number;
  regularRatePercent: number;
  lowRatePercent: number;
  tenureYears: number;
};

export type CashbackVsLowRateOption = "cashback" | "lowRate";

export type CashbackVsLowRateValue = {
  cashbackEmi: number;
  cashbackTotalCost: number;
  lowRateEmi: number;
  lowRateTotalCost: number;
  savings: number;
  better: CashbackVsLowRateOption;
};

// The classic dealer-financing choice: take a cash rebate and finance
// the rest at the regular market rate, or skip the rebate for a
// promotional low (sometimes 0%) rate on the full price. Both sides
// reuse calculateEmi from lib/calc/emi.ts — the cashback option finances
// a smaller principal at a higher rate, the low-rate option finances the
// full price at a lower rate — and the comparison is decided purely on
// total cost (down payment/trade-in are assumed identical either way, so
// they cancel out and don't need to be modelled).
export function calculateCashbackVsLowRate(inputs: CashbackVsLowRateInputs): CalcResult<CashbackVsLowRateValue> {
  const { carPrice, cashbackAmount, regularRatePercent, lowRatePercent, tenureYears } = inputs;
  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));

  const cashbackLoanAmount = Math.max(0, carPrice - cashbackAmount);
  const cashbackResult = calculateEmi({ principal: cashbackLoanAmount, annualRatePercent: regularRatePercent, tenureMonths });
  const cashbackTotalCost = cashbackResult.value.totalPayment;

  const lowRateResult = calculateEmi({ principal: carPrice, annualRatePercent: lowRatePercent, tenureMonths });
  const lowRateTotalCost = lowRateResult.value.totalPayment;

  const savings = lowRateTotalCost - cashbackTotalCost;

  return {
    value: {
      cashbackEmi: cashbackResult.value.emi,
      cashbackTotalCost,
      lowRateEmi: lowRateResult.value.emi,
      lowRateTotalCost,
      savings,
      better: savings > 0 ? "cashback" : "lowRate",
    },
    steps: [
      { label: "Loan amount with cashback", formula: `${carPrice} − ${cashbackAmount}`, value: cashbackLoanAmount },
      { label: "Total cost taking the cashback", formula: "EMI at the regular rate × months", value: cashbackTotalCost },
      { label: "Total cost taking the low rate", formula: "EMI at the low rate on the full price × months", value: lowRateTotalCost },
      { label: "Savings from the better option", formula: "Low-rate total cost − Cashback total cost", value: savings },
    ],
    assumptions: [
      "Down payment or trade-in value is assumed identical either way, so it's left out — only what's financed differs between the two options",
      "Both rates are fixed for the full tenure",
      "Ignores any difference in loan processing fees between the two offers, if the dealer or lender charges one",
      "Compares purely on total cost — doesn't factor in a lower EMI's cash-flow value if that matters more to your budget than the total",
    ],
    rulesVersion: "Cashback vs. low-rate comparison (assumption-based)",
  };
}
