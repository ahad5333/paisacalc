import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type EducationLoanInputs = {
  principal: number;
  annualRatePercent: number;
  moratoriumMonths: number;
  repaymentYears: number;
};

export type EducationLoanValue = {
  accruedInterest: number;
  capitalizedPrincipal: number;
  emi: number;
  totalInterest: number;
  totalPayment: number;
};

// The one thing genuinely specific to an education loan: interest accrues
// during the moratorium (course duration + a grace period after, typically
// 6-12 months) as SIMPLE interest, then gets capitalised into the
// principal once, before EMI starts — not an interest-free period, and not
// monthly compounding either. Verified against Eduvouchers and Unifite's
// worked moratorium-interest explanations, and SBI/CredVeda's published
// rate ranges (roughly 7-12% depending on institute tier), both accessed
// 18 Aug 2026. The post-moratorium EMI reuses calculateEmi verbatim on the
// capitalised amount — standard amortisation from there on.
export function calculateEducationLoan(inputs: EducationLoanInputs): CalcResult<EducationLoanValue> {
  const { principal, annualRatePercent, moratoriumMonths, repaymentYears } = inputs;

  const accruedInterest = Math.round(
    principal * (annualRatePercent / 100) * (moratoriumMonths / 12),
  );
  const capitalizedPrincipal = principal + accruedInterest;

  const emiResult = calculateEmi({
    principal: capitalizedPrincipal,
    annualRatePercent,
    tenureMonths: Math.max(1, Math.round(repaymentYears * 12)),
  });

  return {
    value: {
      accruedInterest,
      capitalizedPrincipal,
      emi: emiResult.value.emi,
      totalInterest: accruedInterest + emiResult.value.totalInterest,
      totalPayment: emiResult.value.totalPayment,
    },
    steps: [
      {
        label: "Interest accrued during moratorium",
        formula: `${principal} × ${annualRatePercent}% × ${moratoriumMonths}/12`,
        value: accruedInterest,
      },
      {
        label: "Capitalised principal",
        formula: "Loan amount + Accrued interest",
        value: capitalizedPrincipal,
      },
      {
        label: "EMI after moratorium",
        formula: "standard EMI on the capitalised amount",
        value: emiResult.value.emi,
      },
      {
        label: "Total interest (moratorium + repayment)",
        formula: "Accrued interest + EMI-phase interest",
        value: accruedInterest + emiResult.value.totalInterest,
      },
    ],
    assumptions: [
      "Interest accrues as simple interest during the moratorium (course period plus grace period), then is added to the principal once, before EMI starts",
      "No partial interest payments are made during the moratorium — some borrowers choose to pay moratorium interest as it accrues, which avoids this capitalisation entirely",
      "Interest rate stays constant across both the moratorium and repayment phases",
      "Does not account for the government's Central Sector Interest Subsidy, which covers moratorium interest for eligible borrowers from families earning under ₹4.5 lakh a year",
    ],
    rulesVersion: "Moratorium capitalisation + standard EMI (industry-standard)",
  };
}
