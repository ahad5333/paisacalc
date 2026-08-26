import type { CalcResult } from "./types";

export type PaybackPeriodInputs = {
  initialCost: number;
  annualCashInflow: number;
};

export type PaybackPeriodValue = {
  paybackYears: number;
  paybackMonths: number;
};

// The simplest capital-budgeting question: how long until an investment
// pays for itself, from a uniform annual cash inflow. Plain division —
// it deliberately doesn't discount future cash flows the way NPV or IRR
// do, which is payback period's well-known limitation: two investments
// with the same payback period can have very different total returns
// once time value of money is factored in.
export function calculatePaybackPeriod(inputs: PaybackPeriodInputs): CalcResult<PaybackPeriodValue> {
  const { initialCost, annualCashInflow } = inputs;

  const paybackYearsExact = initialCost / annualCashInflow;
  const paybackYears = Math.floor(paybackYearsExact);
  const paybackMonths = Math.round((paybackYearsExact - paybackYears) * 12);

  return {
    value: { paybackYears, paybackMonths },
    steps: [{ label: "Payback period", formula: `${initialCost} ÷ ${annualCashInflow}`, value: Math.round(paybackYearsExact * 100) / 100 }],
    assumptions: [
      "Assumes a uniform annual cash inflow — an investment with uneven returns needs the cumulative cash flow tracked year by year instead",
      "Doesn't discount future cash flows to present value — a rupee received in year 5 is treated the same as a rupee received today, unlike NPV or IRR",
      "Says nothing about total return after the payback point — a fast payback with a short useful life afterward can be a worse investment than a slower one that keeps paying for years longer",
    ],
    rulesVersion: "Simple payback period (undiscounted)",
  };
}
