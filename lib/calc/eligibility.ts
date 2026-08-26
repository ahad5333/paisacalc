import type { CalcResult } from "./types";

export type EligibilityInputs = {
  netMonthlyIncome: number;
  existingMonthlyEmi: number;
  foirPercent: number;
  annualRatePercent: number;
  tenureMonths: number;
};

export type EligibilityValue = {
  maxAffordableEmi: number;
  maxLoanAmount: number;
};

// FOIR (Fixed Obligation to Income Ratio) — the term Indian lenders
// actually use, not an invented one: (all EMIs incl. proposed loan) ÷ net
// monthly income. RBI doesn't mandate a specific FOIR; each lender sets
// its own, but 40-50% of net income is the de facto industry standard
// across most public and private banks (verified against ruloans.com and
// eligibilitytools.in, both accessed 18 Aug 2026) — kept here as a
// user-adjustable assumption, the same way interest rate is, rather than
// a fixed rule.
//
// Max loan amount is the algebraic inverse of the standard EMI formula
// (P = EMI × ((1+r)ⁿ − 1) ÷ (r × (1+r)ⁿ)) — round-trip verified against
// calculateEmi in lib/calc/emi.ts: feeding a loan amount through
// calculateEmi then through this inverse returns the original amount to
// within a few rupees of Math.round noise (see tests/eligibility.test.ts).
export function calculateEligibility(inputs: EligibilityInputs): CalcResult<EligibilityValue> {
  const { netMonthlyIncome, existingMonthlyEmi, foirPercent, annualRatePercent, tenureMonths } =
    inputs;

  const maxTotalEmi = Math.round((netMonthlyIncome * foirPercent) / 100);
  const maxAffordableEmi = Math.max(0, maxTotalEmi - existingMonthlyEmi);

  const r = annualRatePercent / 12 / 100;
  const n = tenureMonths;
  const maxLoanAmountRaw =
    r === 0
      ? maxAffordableEmi * n
      : (maxAffordableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  const maxLoanAmount = Math.max(0, Math.round(maxLoanAmountRaw));

  return {
    value: { maxAffordableEmi, maxLoanAmount },
    steps: [
      { label: "Max total EMI (FOIR)", formula: `${netMonthlyIncome} × ${foirPercent} ÷ 100`, value: maxTotalEmi },
      {
        label: "Max affordable EMI",
        formula: "Max total EMI − Existing EMIs",
        value: maxAffordableEmi,
      },
      {
        label: "Max loan amount",
        formula: "EMI × ((1+r)ⁿ − 1) ÷ (r × (1+r)ⁿ)",
        value: maxLoanAmount,
      },
    ],
    assumptions: [
      `FOIR (all EMIs combined, as a share of net monthly income) capped at ${foirPercent}% — a common lender assumption, not an RBI-mandated figure; your actual limit depends on the specific lender and your credit profile`,
      "Assumes the quoted interest rate and tenure are what you'd actually be offered — a lower credit score or shorter lender-preferred tenure would reduce this",
      "Existing EMIs are taken as a fixed monthly figure — any obligation ending partway through the new loan's tenure isn't accounted for",
    ],
    rulesVersion: "FOIR eligibility method (industry-standard, lender-set)",
  };
}
