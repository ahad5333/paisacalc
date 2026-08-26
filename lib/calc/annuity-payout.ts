import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type AnnuityPayoutInputs = {
  lumpSum: number;
  annualRatePercent: number;
  payoutYears: number;
};

export type AnnuityPayoutValue = {
  monthlyPayout: number;
  totalPayout: number;
  totalInterestEarned: number;
};

// How much a lump sum — an NPS annuity purchase, a retirement corpus, an
// insurer's payout — can sustain as a fixed monthly withdrawal over a
// chosen period, assuming the remaining balance keeps earning a return
// along the way. Mathematically this is exactly an EMI calculation run
// in reverse framing: the lump sum is "the loan," the monthly payout is
// "the EMI" that fully amortises it to zero over the payout period — so
// it reuses calculateEmi from lib/calc/emi.ts directly rather than
// re-deriving the same reducing-balance formula.
export function calculateAnnuityPayout(inputs: AnnuityPayoutInputs): CalcResult<AnnuityPayoutValue> {
  const { lumpSum, annualRatePercent, payoutYears } = inputs;
  const tenureMonths = Math.max(1, Math.round(payoutYears * 12));

  const emiResult = calculateEmi({ principal: lumpSum, annualRatePercent, tenureMonths });
  const monthlyPayout = emiResult.value.emi;
  const totalPayout = monthlyPayout * tenureMonths;
  const totalInterestEarned = totalPayout - lumpSum;

  return {
    value: { monthlyPayout, totalPayout, totalInterestEarned },
    steps: [
      { label: "Monthly payout", formula: "reverse-amortised over the payout period, same math as an EMI", value: monthlyPayout },
      { label: "Total paid out over the period", formula: `Monthly payout × ${tenureMonths} months`, value: totalPayout },
      { label: "Total interest earned along the way", formula: "Total paid out − Lump sum", value: totalInterestEarned },
    ],
    assumptions: [
      "The remaining balance keeps earning the stated rate throughout the payout period, the same way a loan balance keeps accruing interest",
      "Payouts are fixed and level for the entire period — not adjusted for inflation as time passes",
      "The lump sum reaches exactly zero at the end of the chosen period, by design — this doesn't model a payout that continues indefinitely (a true lifetime annuity needs mortality tables, which this doesn't attempt)",
      "Ignores any fees the annuity provider charges, and any tax on the payouts received",
    ],
    rulesVersion: "Reverse amortisation over a fixed payout period",
  };
}
