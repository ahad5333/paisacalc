import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type BusinessLoanInputs = {
  loanAmount: number;
  ratePercent: number;
  tenureYears: number;
  processingFeePercent: number;
};

export type BusinessLoanValue = {
  emi: number;
  totalInterest: number;
  processingFee: number;
  netDisbursement: number;
};

// Business/MSME loans run a distinct profile from the personal/home/
// car/education loan calculators already live: typically higher rates
// (11-16%+, often unsecured), shorter tenures (usually capped around
// 5-7 years), and a meaningfully larger processing fee (1-3%, versus a
// fraction of a percent on most retail loans) — worth surfacing
// separately since it materially changes what's actually disbursed.
export function calculateBusinessLoan(inputs: BusinessLoanInputs): CalcResult<BusinessLoanValue> {
  const { loanAmount, ratePercent, tenureYears, processingFeePercent } = inputs;

  const emiResult = calculateEmi({
    principal: loanAmount,
    annualRatePercent: ratePercent,
    tenureMonths: Math.max(1, Math.round(tenureYears * 12)),
  });
  const processingFee = Math.round((loanAmount * processingFeePercent) / 100);
  const netDisbursement = loanAmount - processingFee;

  return {
    value: {
      emi: emiResult.value.emi,
      totalInterest: emiResult.value.totalInterest,
      processingFee,
      netDisbursement,
    },
    steps: [
      { label: "EMI", formula: "standard EMI on the sanctioned loan amount", value: emiResult.value.emi },
      { label: "Total interest", formula: "Total payment − Loan amount", value: emiResult.value.totalInterest },
      { label: "Processing fee", formula: `${loanAmount} × ${processingFeePercent}%`, value: processingFee },
      { label: "Net amount actually disbursed", formula: `${loanAmount} − ${processingFee}`, value: netDisbursement },
    ],
    assumptions: [
      "EMI is calculated on the full sanctioned amount, exactly as the lender bills it — the processing fee is deducted from what's disbursed, not from the EMI",
      "Business/MSME loan rates commonly run higher than secured retail loans (personal, home, car), reflecting the typically unsecured nature and shorter tenure caps most lenders apply",
      "Fixed interest rate for the full tenure, and no prepayment",
      "Ignores GST on the processing fee, and any collateral-related costs if the loan is secured rather than unsecured",
    ],
    rulesVersion: "Reducing-balance method (standard), business-loan framing",
  };
}
