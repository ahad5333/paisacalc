import type { CalcResult } from "./types";

export type PpfInputs = {
  annualInvestment: number;
  annualRatePercent: number;
  years: number;
};

export type PpfValue = {
  maturityAmount: number;
  totalInvested: number;
  interestEarned: number;
};

// Standard future-value-of-annuity-due formula, matching how real PPF
// calculators model it: a deposit at the start of each year, interest
// compounded annually. Verified against a widely-published reference
// figure (₹1,50,000/year for 15 years at 7.1% → ₹40,68,209) before use —
// see tests/ppf.test.ts. A second figure initially checked against
// (₹1,00,000/year → ₹31,17,276) turned out to use a stale 8.7% historical
// rate, not 7.1% as the source implied — rejected after the rate mismatch
// was found by solving for it, not trusted at face value.
export function calculatePpfMaturity(inputs: PpfInputs): CalcResult<PpfValue> {
  const { annualInvestment: P, annualRatePercent, years } = inputs;
  const r = annualRatePercent / 100;

  // At r = 0 the annuity-due formula divides by zero — no interest to
  // compound, so maturity is simply every year's contribution summed.
  const maturityAmountRaw =
    r === 0 ? P * years : P * ((Math.pow(1 + r, years) - 1) / r) * (1 + r);
  const maturityAmount = Math.round(maturityAmountRaw);
  const totalInvested = P * years;
  const interestEarned = maturityAmount - totalInvested;

  return {
    value: { maturityAmount, totalInvested, interestEarned },
    steps: [
      { label: "Annual rate", formula: `${annualRatePercent} ÷ 100`, value: r },
      {
        label: "Maturity amount",
        formula: "P × ((1+r)ⁿ − 1) ÷ r × (1+r)",
        value: maturityAmount,
      },
      { label: "Total invested", formula: `${P} × ${years} years`, value: totalInvested },
      { label: "Interest earned", formula: "Maturity amount − Total invested", value: interestEarned },
    ],
    assumptions: [
      "Deposit made at the start of each year — interest is calculated monthly on the lowest balance but credited (compounded) once a year",
      "The interest rate stays constant for the full tenure (the government reviews it every quarter — it has held at 7.1% since April 2020, but isn't guaranteed to)",
      "Interest and maturity amount are fully tax-exempt under Section 10(11) — not reduced here for any tax",
    ],
    rulesVersion: "PPF annual-compounding formula (standard)",
  };
}
