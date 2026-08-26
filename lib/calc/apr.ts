import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type AprInputs = {
  loanAmount: number;
  statedRatePercent: number;
  tenureYears: number;
  processingFeePercent: number;
};

export type AprValue = {
  emi: number;
  netDisbursement: number;
  processingFee: number;
  aprPercent: number;
};

// The APR (annual percentage rate) is the single rate that would produce
// the SAME EMI if the fee had been rolled into the principal instead of
// deducted upfront — the honest "what am I actually paying" figure once
// a processing fee is factored in, since the borrower repays EMIs sized
// for the full loan amount but only receives the loan minus the fee.
// Solved numerically (binary search) rather than algebraically: there's
// no closed form for "rate given EMI, principal, and tenure" the way
// there is for "EMI given rate" — see tests/apr.test.ts for the
// convergence check against calculateEmi run in reverse.
export function calculateApr(inputs: AprInputs): CalcResult<AprValue> {
  const { loanAmount, statedRatePercent, tenureYears, processingFeePercent } = inputs;
  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));

  const emi = calculateEmi({ principal: loanAmount, annualRatePercent: statedRatePercent, tenureMonths }).value.emi;
  const processingFee = Math.round((loanAmount * processingFeePercent) / 100);
  const netDisbursement = loanAmount - processingFee;

  // Binary search for the rate that makes netDisbursement's own EMI equal
  // the actual EMI being paid (which was sized off the full loan amount).
  let lo = 0;
  let hi = 100;
  let aprPercent = statedRatePercent;
  for (let i = 0; i < 60; i++) {
    aprPercent = (lo + hi) / 2;
    const testEmi = calculateEmi({ principal: netDisbursement, annualRatePercent: aprPercent, tenureMonths }).value.emi;
    if (testEmi > emi) hi = aprPercent;
    else lo = aprPercent;
  }
  aprPercent = Math.round(aprPercent * 100) / 100;

  return {
    value: { emi, netDisbursement, processingFee, aprPercent },
    steps: [
      { label: "EMI at the stated rate", formula: "standard EMI on the full loan amount", value: emi },
      { label: "Processing fee", formula: `${loanAmount} × ${processingFeePercent}%`, value: processingFee },
      { label: "Net amount actually disbursed", formula: `${loanAmount} − ${processingFee}`, value: netDisbursement },
      {
        label: "APR (effective rate)",
        formula: "the rate whose EMI on the net disbursement matches the actual EMI",
        value: aprPercent,
      },
    ],
    assumptions: [
      "APR is solved numerically to match the EMI you actually pay against the amount you actually receive — not a simple fee-plus-rate addition",
      "Assumes the processing fee is deducted upfront from disbursement, not added to the loan principal or charged separately",
      "Ignores GST on the processing fee and any other one-time charges (documentation, insurance bundled with the loan)",
      "The EMI itself is still calculated on the full stated loan amount, exactly as the lender bills it — only the APR figure accounts for what you actually received",
    ],
    rulesVersion: "Effective APR (numerically solved)",
  };
}
