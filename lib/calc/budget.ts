import type { CalcResult } from "./types";

export type BudgetInputs = {
  monthlyIncome: number;
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
};

export type BudgetValue = {
  needsAmount: number;
  wantsAmount: number;
  savingsAmount: number;
};

// The 50/30/20 rule — popularised by Elizabeth Warren, not an Indian
// regulatory framework — as a starting split: 50% needs (rent, EMIs,
// groceries, utilities), 30% wants (everything discretionary), 20%
// savings and debt repayment beyond minimums. The three percentages are
// user-adjustable rather than hardcoded at 50/30/20, since it's a
// commonly cited starting point, not a rule this calculator enforces.
export function calculateBudget(inputs: BudgetInputs): CalcResult<BudgetValue> {
  const { monthlyIncome, needsPercent, wantsPercent, savingsPercent } = inputs;

  const needsAmount = Math.round((monthlyIncome * needsPercent) / 100);
  const wantsAmount = Math.round((monthlyIncome * wantsPercent) / 100);
  const savingsAmount = Math.round((monthlyIncome * savingsPercent) / 100);

  return {
    value: { needsAmount, wantsAmount, savingsAmount },
    steps: [
      { label: "Needs", formula: `${monthlyIncome} × ${needsPercent}%`, value: needsAmount },
      { label: "Wants", formula: `${monthlyIncome} × ${wantsPercent}%`, value: wantsAmount },
      { label: "Savings & extra debt repayment", formula: `${monthlyIncome} × ${savingsPercent}%`, value: savingsAmount },
    ],
    assumptions: [
      "50/30/20 (needs/wants/savings) is a commonly cited starting split, not a regulated or universal rule — adjust the three percentages to fit your own situation",
      "Needs covers rent, EMIs, groceries, utilities, and other genuinely fixed obligations; wants covers everything discretionary",
      "Savings here includes both building savings and any extra debt repayment beyond required minimums",
    ],
    rulesVersion: "50/30/20 budgeting convention",
  };
}
