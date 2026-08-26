import type { CalcResult } from "./types";

export type DtiInputs = {
  monthlyIncome: number;
  monthlyDebtPayments: number;
};

export type DtiBand = "healthy" | "manageable" | "high";

export type DtiValue = {
  dtiPercent: number;
  band: DtiBand;
};

// Plain percentage arithmetic — the only thing worth citing is the
// assessment bands themselves, which come from how Indian lenders
// actually describe DTI risk tiers: under 36% is the commonly-cited
// "healthy" threshold, 36-43% is generally still workable but leaves
// little room for new credit, and above 43% is where most lenders turn
// cautious. Verified against ShriRam Finance and Jify's published DTI
// guidance, 18 Aug 2026 — these are lender conventions, not a regulated
// figure, so they're descriptive here, not something the calculator
// enforces.
export function calculateDti(inputs: DtiInputs): CalcResult<DtiValue> {
  const { monthlyIncome, monthlyDebtPayments } = inputs;
  const dtiPercent = monthlyIncome > 0 ? Math.round((monthlyDebtPayments / monthlyIncome) * 1000) / 10 : 0;

  const band: DtiBand = dtiPercent < 36 ? "healthy" : dtiPercent <= 43 ? "manageable" : "high";

  return {
    value: { dtiPercent, band },
    steps: [
      {
        label: "Debt-to-income ratio",
        formula: `${monthlyDebtPayments} ÷ ${monthlyIncome} × 100`,
        value: dtiPercent,
      },
    ],
    assumptions: [
      "Under 36% is generally considered healthy, 36-43% is workable but leaves little room for new credit, and above 43% is where most lenders turn cautious — these are common lender conventions, not a regulated threshold",
      "Only fixed monthly debt obligations count — rent, utilities, and everyday spending aren't debt and don't belong in this figure",
    ],
    rulesVersion: "DTI ratio (lender-convention bands)",
  };
}
