import type { CalcResult } from "./types";

export type RoiInputs = {
  initialInvestment: number;
  finalValue: number;
  years: number;
};

export type RoiValue = {
  gain: number;
  totalRoiPercent: number;
  annualizedRoiPercent: number;
};

// The quick, generic version — total ROI plus its annualised (CAGR)
// equivalent so a return can be compared fairly across investments held
// for different lengths of time. Deliberately simpler than the real
// estate returns or rental yield calculators, which model costs and
// income along the way; this just takes a starting and ending number.
export function calculateRoi(inputs: RoiInputs): CalcResult<RoiValue> {
  const { initialInvestment, finalValue, years } = inputs;

  const gain = finalValue - initialInvestment;
  const totalRoiPercent = Math.round((gain / initialInvestment) * 10000) / 100;
  const annualizedRoiPercent =
    Math.round((Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 10000) / 100;

  return {
    value: { gain, totalRoiPercent, annualizedRoiPercent },
    steps: [
      { label: "Gain", formula: `${finalValue} − ${initialInvestment}`, value: gain },
      { label: "Total ROI", formula: `${gain} ÷ ${initialInvestment} × 100`, value: totalRoiPercent },
      { label: "Annualised ROI (CAGR)", formula: "(Final ÷ Initial)^(1/years) − 1", value: annualizedRoiPercent },
    ],
    assumptions: [
      "Treats the investment as a single starting sum and a single ending value — no cash flows in between",
      "Annualised ROI assumes smooth, even growth across the period, the same way CAGR does",
      "Ignores any fees, taxes, or additional contributions along the way",
    ],
    rulesVersion: "Total and annualised ROI (assumption-based)",
  };
}
