import type { CalcResult } from "./types";

export type SipInputs = {
  monthlyAmount: number;
  annualReturnPercent: number;
  years: number;
  stepUpPercent: number; // 0 for a regular (non-step-up) SIP
};

export type SipYearlyPoint = {
  year: number;
  invested: number;
  value: number;
};

export type SipValue = {
  totalInvested: number;
  finalValue: number;
  wealthGained: number;
  yearly: SipYearlyPoint[];
};

// Month-by-month simulation rather than a closed-form formula, because a
// step-up SIP (the monthly amount rising each year) has no clean closed
// form — this is the standard approach every step-up SIP calculator uses.
// For a regular SIP (stepUpPercent 0) this exactly reproduces the standard
// annuity-due formula FV = P × [((1+r)^n − 1) / r] × (1+r) — verified by
// hand for ₹5,000/month at 12% over 10 years (₹11,61,695) before trusting
// the simulation loop; see tests/sip.test.ts.
export function calculateSipReturns(inputs: SipInputs): CalcResult<SipValue> {
  const { monthlyAmount, annualReturnPercent, years, stepUpPercent } = inputs;
  const r = annualReturnPercent / 12 / 100;
  const months = Math.max(0, Math.round(years * 12));

  let balance = 0;
  let contribution = Math.max(0, monthlyAmount);
  let totalInvested = 0;
  const yearly: SipYearlyPoint[] = [];

  for (let month = 1; month <= months; month++) {
    // Contribution lands at the start of the month, then grows for that
    // month — the annuity-due convention, matching how an SIP debit
    // actually falls early in the month.
    balance += contribution;
    balance *= 1 + r;
    totalInvested += contribution;

    if (month % 12 === 0) {
      yearly.push({ year: month / 12, invested: Math.round(totalInvested), value: Math.round(balance) });
      if (stepUpPercent) {
        contribution = contribution * (1 + stepUpPercent / 100);
      }
    }
  }

  const finalValue = Math.round(balance);
  const totalInvestedRounded = Math.round(totalInvested);
  const wealthGained = finalValue - totalInvestedRounded;

  return {
    value: { totalInvested: totalInvestedRounded, finalValue, wealthGained, yearly },
    steps: [
      { label: "Monthly rate", formula: `${annualReturnPercent} ÷ 12 ÷ 100`, value: r },
      { label: "Total months", formula: `${years} × 12`, value: months },
      { label: "Total invested", formula: "sum of every monthly contribution", value: totalInvestedRounded },
      {
        label: "Final value",
        formula: stepUpPercent
          ? "simulated month by month, contribution rising each year"
          : "P × ((1+r)^n − 1) ÷ r × (1+r)",
        value: finalValue,
      },
      { label: "Wealth gained", formula: "final value − total invested", value: wealthGained },
    ],
    assumptions: [
      "Returns are assumed constant every month — real fund returns vary and can be negative in some years",
      "Contribution is made at the start of each month, in line with typical SIP debit dates",
      stepUpPercent
        ? `Monthly contribution rises ${stepUpPercent}% at the start of every year`
        : "Monthly contribution stays fixed for the full duration",
      "Does not account for expense ratios, exit load, or capital gains tax on withdrawal",
    ],
    rulesVersion: "Standard annuity-due compounding",
  };
}
