import type { CalcResult } from "./types";

export type InterestCalculatorInputs = {
  principal: number;
  ratePercent: number;
  years: number;
  monthlyContribution: number;
  compoundingPerYear: number;
};

export type InterestCalculatorValue = {
  totalContributions: number;
  totalInterest: number;
  maturityValue: number;
};

// A general-purpose compounding calculator that also accepts an ongoing
// monthly contribution — where the FD/RD calculators are India-specific
// products with their own quoting conventions (quarterly compounding,
// the IBA-prescribed RD formula), this is the plain textbook version:
// pick any compounding frequency, add any starting sum, contribute any
// amount monthly, see the maturity value. Simulated month by month
// rather than closed-form, since an arbitrary compounding frequency
// combined with monthly contributions doesn't reduce to a single annuity
// formula the clean way a fixed-monthly-compounding SIP does.
export function calculateInterest(inputs: InterestCalculatorInputs): CalcResult<InterestCalculatorValue> {
  const { principal, ratePercent, years, monthlyContribution, compoundingPerYear } = inputs;
  const totalMonths = Math.max(1, Math.round(years * 12));
  const periodRate = ratePercent / 100 / compoundingPerYear;
  const monthsPerPeriod = 12 / compoundingPerYear;

  let balance = principal;
  let monthsSinceCompounding = 0;
  for (let month = 1; month <= totalMonths; month++) {
    balance += monthlyContribution;
    monthsSinceCompounding++;
    if (monthsSinceCompounding >= monthsPerPeriod) {
      balance *= 1 + periodRate;
      monthsSinceCompounding = 0;
    }
  }
  // Any partial period left at the very end still earns its pro-rated share.
  if (monthsSinceCompounding > 0) {
    balance *= 1 + periodRate * (monthsSinceCompounding / monthsPerPeriod);
  }

  const maturityValue = Math.round(balance);
  const totalContributions = principal + monthlyContribution * totalMonths;
  const totalInterest = maturityValue - totalContributions;

  return {
    value: { totalContributions, totalInterest, maturityValue },
    steps: [
      { label: "Total contributed", formula: `${principal} + (${monthlyContribution} × ${totalMonths})`, value: totalContributions },
      { label: "Maturity value", formula: "simulated compounding, period by period", value: maturityValue },
      { label: "Total interest earned", formula: "Maturity value − Total contributed", value: totalInterest },
    ],
    assumptions: [
      "The interest rate is held constant for the entire period",
      "Any monthly contribution is added at the start of each month, before that period's compounding is applied",
      "A partial compounding period at the very end earns a pro-rated share of that period's rate",
      "This is a plain compounding calculator, not tied to any specific product's rules — see the FD or RD calculators for India's actual deposit-product conventions",
    ],
    rulesVersion: "General compounding simulation (assumption-based)",
  };
}
