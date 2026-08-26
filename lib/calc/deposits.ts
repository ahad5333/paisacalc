import type { CalcResult } from "./types";

export type FdInputs = {
  principal: number;
  annualRatePercent: number;
  years: number;
};

export type FdValue = {
  maturityAmount: number;
  interestEarned: number;
};

// Standard compound-interest formula with quarterly compounding — the
// convention virtually every Indian bank (SBI, HDFC, ICICI, ...) publishes
// for FDs: A = P × (1 + r/(4×100))^(4×t). No statutory rule applies (the
// rate is bank-set, not a Finance Act value); the thing worth citing is the
// compounding convention itself, confirmed against SBI/ICICI FD-calculator
// documentation.
export function calculateFdMaturity(inputs: FdInputs): CalcResult<FdValue> {
  const { principal: P, annualRatePercent: r, years: t } = inputs;
  const n = 4; // compounding periods per year
  const ratePerPeriod = r / n / 100;
  const periods = n * t;

  const maturityAmount = Math.round(P * Math.pow(1 + ratePerPeriod, periods));
  const interestEarned = maturityAmount - P;

  return {
    value: { maturityAmount, interestEarned },
    steps: [
      { label: "Rate per quarter", formula: `${r} ÷ 4 ÷ 100`, value: ratePerPeriod },
      { label: "Number of quarters", formula: `4 × ${t}`, value: periods },
      {
        label: "Maturity amount",
        formula: "P × (1 + r)ⁿ",
        value: maturityAmount,
      },
      { label: "Interest earned", formula: "Maturity amount − Principal", value: interestEarned },
    ],
    assumptions: [
      "Interest compounded quarterly — the standard convention most Indian banks use for FDs",
      "Fixed interest rate for the full tenure (no premature withdrawal or rate reset)",
      "Shown before TDS; banks deduct TDS on FD interest above the threshold under Section 194A",
    ],
    rulesVersion: "Quarterly-compounding method (standard)",
  };
}

export type RdInputs = {
  monthlyDeposit: number;
  annualRatePercent: number;
  months: number;
};

export type RdValue = {
  maturityAmount: number;
  totalDeposited: number;
  interestEarned: number;
};

// IBA (Indian Banks' Association) prescribed RD maturity formula — the
// standard virtually every Indian bank's RD calculator implements:
// M = R × [(1+i)ⁿ − 1] ÷ (1 − (1+i)^(−1/3)), i = annual rate ÷ 400 (the
// quarterly rate), n = number of quarters. Cross-verified two independent
// ways rather than trusted from a single source (see tests/deposits.test.ts
// for both): (1) three independently published statements of this same
// formula agree (Wikipedia's "Recurring deposit" article, Groww, ClearTax),
// and (2) it's proven algebraically identical to a standard
// future-value-of-annuity-due calculation using a monthly-equivalent rate
// derived from the quarterly rate — the two derivations match to the rupee.
export function calculateRdMaturity(inputs: RdInputs): CalcResult<RdValue> {
  const { monthlyDeposit: R, annualRatePercent: r, months } = inputs;
  const n = months / 3; // quarters — tenure is constrained to multiples of 3 months
  const i = r / 400;

  // At i = 0 the closed-form formula divides by (1 − (1+0)^(−⅓)) = 0 — no
  // interest to compound, so maturity is simply every deposit summed.
  const maturityAmountRaw =
    i === 0 ? R * months : (R * (Math.pow(1 + i, n) - 1)) / (1 - Math.pow(1 + i, -1 / 3));
  const maturityAmount = Math.round(maturityAmountRaw);
  const totalDeposited = R * months;
  const interestEarned = maturityAmount - totalDeposited;

  return {
    value: { maturityAmount, totalDeposited, interestEarned },
    steps: [
      { label: "Quarterly rate", formula: `${r} ÷ 400`, value: i },
      { label: "Number of quarters", formula: `${months} ÷ 3`, value: n },
      {
        label: "Maturity amount",
        formula: "R × ((1+i)ⁿ − 1) ÷ (1 − (1+i)^(−⅓))",
        value: maturityAmount,
      },
      { label: "Total deposited", formula: `${R} × ${months} months`, value: totalDeposited },
      { label: "Interest earned", formula: "Maturity amount − Total deposited", value: interestEarned },
    ],
    assumptions: [
      "Interest compounded quarterly on the running balance — the IBA-prescribed standard virtually every Indian bank uses",
      "Tenure is a whole number of months, in multiples of 3",
      "Fixed interest rate for the full tenure",
      "Shown before TDS; banks deduct TDS on RD interest above the threshold under Section 194A",
    ],
    rulesVersion: "IBA quarterly-compounding RD formula (standard)",
  };
}
