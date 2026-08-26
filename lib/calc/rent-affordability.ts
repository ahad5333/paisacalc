import type { CalcResult } from "./types";

export type RentAffordabilityInputs = {
  monthlyIncome: number;
  existingMonthlyDebt: number;
  rentToIncomeRatioPercent: number;
};

export type RentAffordabilityLimitingFactor = "ratio" | "debt";

export type RentAffordabilityValue = {
  affordableRentByRatio: number;
  affordableRentByDebtCap: number;
  recommendedRent: number;
  limitingFactor: RentAffordabilityLimitingFactor;
};

// Combined housing-plus-debt cap: the same style of convention the
// debt-to-income ratio calculator cites (see lib/calc/dti.ts) — 40% of
// income going to rent plus every existing EMI combined is a commonly
// cited ceiling before a budget gets genuinely tight, not a regulated
// figure. Two independent ceilings on purpose: a straight rent-to-income
// ratio ignores existing debt entirely, and someone with heavy EMIs
// already committed can afford less rent than the ratio alone suggests —
// the lower of the two is what actually fits the budget.
const MAX_COMBINED_OBLIGATION_RATIO = 0.4;

export function calculateRentAffordability(inputs: RentAffordabilityInputs): CalcResult<RentAffordabilityValue> {
  const { monthlyIncome, existingMonthlyDebt, rentToIncomeRatioPercent } = inputs;

  const affordableRentByRatio = Math.round((monthlyIncome * rentToIncomeRatioPercent) / 100);
  const maxCombinedObligation = Math.round(monthlyIncome * MAX_COMBINED_OBLIGATION_RATIO);
  const affordableRentByDebtCap = Math.max(0, maxCombinedObligation - existingMonthlyDebt);

  const recommendedRent = Math.min(affordableRentByRatio, affordableRentByDebtCap);
  const limitingFactor: RentAffordabilityLimitingFactor =
    affordableRentByDebtCap < affordableRentByRatio ? "debt" : "ratio";

  return {
    value: {
      affordableRentByRatio,
      affordableRentByDebtCap,
      recommendedRent,
      limitingFactor,
    },
    steps: [
      {
        label: "Affordable rent by income ratio",
        formula: `${monthlyIncome} × ${rentToIncomeRatioPercent} ÷ 100`,
        value: affordableRentByRatio,
      },
      {
        label: "Max combined rent + debt (40% of income)",
        formula: `${monthlyIncome} × 40 ÷ 100`,
        value: maxCombinedObligation,
      },
      {
        label: "Affordable rent after existing debt",
        formula: `${maxCombinedObligation} − ${existingMonthlyDebt}`,
        value: affordableRentByDebtCap,
      },
      {
        label: "Recommended rent (the lower of the two)",
        formula: "min(by ratio, after debt)",
        value: recommendedRent,
      },
    ],
    assumptions: [
      "A rent-to-income ratio around 30% is a commonly cited comfortable ceiling; some budgets can stretch higher, tighter ones should aim lower",
      "Rent plus every existing EMI and minimum payment combined staying under about 40% of income is a common budgeting convention, not a regulated limit",
      "Uses net (take-home) monthly income — the same basis the debt-to-income ratio calculator uses",
      "Doesn't account for a security deposit, brokerage, or maintenance charges layered on top of rent itself",
    ],
    rulesVersion: "Rent affordability (budgeting convention)",
  };
}
