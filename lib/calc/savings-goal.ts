import type { CalcResult } from "./types";

export type SavingsGoalInputs = {
  goalAmount: number;
  annualReturnPercent: number;
  years: number;
};

export type SavingsGoalValue = {
  requiredMonthly: number;
  totalContributed: number;
  growthFromReturns: number;
};

// The algebraic inverse of the SIP future-value formula in lib/calc/sip.ts
// (same annuity-due assumption: contribution at the start of each month) —
// round-trip verified against calculateSipReturns before use: feeding the
// required monthly amount back through the forward formula reproduces the
// goal amount to within a rupee of rounding noise (see
// tests/savings-goal.test.ts).
export function calculateSavingsGoal(inputs: SavingsGoalInputs): CalcResult<SavingsGoalValue> {
  const { goalAmount, annualReturnPercent, years } = inputs;
  const r = annualReturnPercent / 12 / 100;
  const n = Math.max(1, Math.round(years * 12));

  const requiredMonthlyRaw =
    r === 0 ? goalAmount / n : goalAmount / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const requiredMonthly = Math.max(0, Math.round(requiredMonthlyRaw));
  const totalContributed = requiredMonthly * n;
  const growthFromReturns = goalAmount - totalContributed;

  return {
    value: { requiredMonthly, totalContributed, growthFromReturns },
    steps: [
      { label: "Monthly rate", formula: `${annualReturnPercent} ÷ 12 ÷ 100`, value: r },
      { label: "Total months", formula: `${years} × 12`, value: n },
      {
        label: "Required monthly saving",
        formula: "Goal ÷ (((1+r)ⁿ − 1) ÷ r × (1+r))",
        value: requiredMonthly,
      },
      { label: "Total contributed", formula: `${requiredMonthly} × ${n} months`, value: totalContributed },
      { label: "Growth from returns", formula: "Goal − Total contributed", value: growthFromReturns },
    ],
    assumptions: [
      "Assumes the return rate stays constant every month for the full period — a real investment's return varies and can be negative in some years",
      "Contribution is made at the start of each month, the same convention the SIP calculator uses",
      "Does not account for tax on any gains along the way",
    ],
    rulesVersion: "Reverse SIP (annuity-due) — algebraic inverse of the SIP formula",
  };
}
