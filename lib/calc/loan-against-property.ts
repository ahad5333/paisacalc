import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type LoanAgainstPropertyInputs = {
  propertyValue: number;
  ltvPercent: number;
  ratePercent: number;
  tenureYears: number;
};

export type LoanAgainstPropertyValue = {
  loanAmount: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
};

// India's "Loan Against Property" (LAP) — borrowing against a property
// you already own, not financing a purchase (that's lib/calc/emi.ts's
// home loan). Same reducing-balance EMI math underneath, but the
// distinguishing feature LAP borrowers actually care about is the
// loan-to-value cap: lenders typically cap LAP at 50-70% of the
// property's market value (residential tends toward the higher end,
// commercial property lower), well below a fresh home purchase loan's
// LTV allowance — so LTV is the primary input here, not a hidden detail.
export function calculateLoanAgainstProperty(inputs: LoanAgainstPropertyInputs): CalcResult<LoanAgainstPropertyValue> {
  const { propertyValue, ltvPercent, ratePercent, tenureYears } = inputs;

  const loanAmount = Math.round((propertyValue * ltvPercent) / 100);
  const emiResult = calculateEmi({
    principal: loanAmount,
    annualRatePercent: ratePercent,
    tenureMonths: Math.max(1, Math.round(tenureYears * 12)),
  });

  return {
    value: {
      loanAmount,
      emi: emiResult.value.emi,
      totalInterest: emiResult.value.totalInterest,
      totalPayment: emiResult.value.totalPayment,
    },
    steps: [
      { label: "Eligible loan amount", formula: `${propertyValue} × ${ltvPercent}%`, value: loanAmount },
      { label: "Monthly rate", formula: `${ratePercent} ÷ 12 ÷ 100`, value: ratePercent / 12 / 100 },
      { label: "EMI", formula: "standard EMI on the eligible loan amount", value: emiResult.value.emi },
      { label: "Total interest", formula: "Total payment − Loan amount", value: emiResult.value.totalInterest },
    ],
    assumptions: [
      "Lenders typically cap LAP at 50-70% of the property's market value depending on the lender and property type — check the specific lender's LTV policy rather than assuming a fixed figure",
      "LAP rates usually run higher than a fresh home purchase loan's rate, since the lender is financing against an existing asset rather than the asset being purchased",
      "Fixed interest rate for the full tenure, and no prepayment — the same reducing-balance amortisation the home loan EMI calculator uses",
      "Ignores processing fees and the property valuation the lender will commission before sanctioning",
    ],
    rulesVersion: "Reducing-balance method (standard), LAP framing",
  };
}
