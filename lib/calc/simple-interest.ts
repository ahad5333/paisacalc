import type { CalcResult } from "./types";

export type SimpleInterestInputs = {
  principal: number;
  ratePercent: number;
  years: number;
};

export type SimpleInterestValue = {
  interest: number;
  maturityValue: number;
};

// The one Indian financial product that genuinely still quotes simple
// (not compound) interest is a short-tenure, non-cumulative bank
// deposit, plus it's the basis of the standard loan-processing-fee and
// penalty-interest math many lenders use. Deliberately the plainest
// calculator on the site — I × T is the entire formula, no
// simulation needed — but distinct from every deposit/loan calculator
// here, all of which compound.
export function calculateSimpleInterest(inputs: SimpleInterestInputs): CalcResult<SimpleInterestValue> {
  const { principal, ratePercent, years } = inputs;

  const interest = Math.round((principal * ratePercent * years) / 100);
  const maturityValue = principal + interest;

  return {
    value: { interest, maturityValue },
    steps: [
      { label: "Simple interest", formula: `${principal} × ${ratePercent}% × ${years}`, value: interest },
      { label: "Maturity value", formula: `${principal} + ${interest}`, value: maturityValue },
    ],
    assumptions: [
      "Interest is calculated on the original principal only, for the entire period — unlike compound interest, it never earns interest on itself",
      "The rate is held constant for the full period",
    ],
    rulesVersion: "Simple interest (I = P × R × T)",
  };
}
