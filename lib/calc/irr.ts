import type { CalcResult } from "./types";

export type IrrInputs = {
  initialInvestment: number;
  cashFlowYear1: number;
  cashFlowYear2: number;
  cashFlowYear3: number;
  cashFlowYear4: number;
  cashFlowYear5: number;
};

export type IrrValue = {
  irrPercent: number;
  totalCashReturned: number;
  netGain: number;
};

// IRR is the discount rate that makes the net present value of every
// cash flow — the initial outlay plus five years of (potentially
// uneven) returns — equal exactly zero. Unlike CAGR, which needs even
// growth, IRR handles cash flows of any shape: a rental property with
// growing rents and a lump sum at resale, a business investment with
// front-loaded costs and back-loaded returns. Solved by binary search
// on NPV(rate) rather than algebraically — there's no closed form for
// "rate" when more than two cash flows are involved. Assumes the usual
// single sign change (one outflow, then all inflows), which guarantees
// NPV(rate) is monotonically decreasing and binary search converges to
// the one real root.
export function calculateIrr(inputs: IrrInputs): CalcResult<IrrValue> {
  const { initialInvestment, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5 } = inputs;
  const flows = [-initialInvestment, cashFlowYear1, cashFlowYear2, cashFlowYear3, cashFlowYear4, cashFlowYear5];

  function npvAt(rate: number): number {
    return flows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + rate, t), 0);
  }

  let lo = -0.99;
  let hi = 10;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (npvAt(mid) > 0) lo = mid;
    else hi = mid;
  }
  const irrPercent = Math.round(((lo + hi) / 2) * 10000) / 100;

  const totalCashReturned = cashFlowYear1 + cashFlowYear2 + cashFlowYear3 + cashFlowYear4 + cashFlowYear5;
  const netGain = totalCashReturned - initialInvestment;

  return {
    value: { irrPercent, totalCashReturned, netGain },
    steps: [
      { label: "Total cash returned over 5 years", formula: "sum of all 5 years' cash flows", value: totalCashReturned },
      { label: "Net gain", formula: "Total cash returned − Initial investment", value: netGain },
      { label: "IRR", formula: "the rate at which NPV of all flows = 0", value: irrPercent },
    ],
    assumptions: [
      "Solved numerically assuming a single sign change (one initial outflow, then all inflows) — a cash flow pattern that switches sign more than once can have more than one mathematically valid IRR, which this doesn't attempt to detect",
      "Cash flows are assumed to land at the end of each year",
      "IRR implicitly assumes each year's cash inflow gets reinvested at the IRR itself for the rest of the period — a real-world portfolio may not have anywhere to reinvest at that same rate",
    ],
    rulesVersion: "IRR (numerically solved, single sign-change assumption)",
  };
}
