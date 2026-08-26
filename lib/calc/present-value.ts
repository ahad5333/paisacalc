import type { CalcResult } from "./types";

export type PresentValueInputs = {
  futureValue: number;
  discountRatePercent: number;
  years: number;
};

export type PresentValueValue = {
  presentValue: number;
  totalDiscount: number;
};

// What a known future amount is worth today, discounted at a chosen
// rate — the plain inverse of compound growth. Useful for a fixed future
// goal (a known payout, a maturity amount already promised) rather than
// projecting an unknown one forward, which is what the future value
// calculator does instead.
export function calculatePresentValue(inputs: PresentValueInputs): CalcResult<PresentValueValue> {
  const { futureValue, discountRatePercent, years } = inputs;

  const presentValue = Math.round(futureValue / Math.pow(1 + discountRatePercent / 100, years));
  const totalDiscount = futureValue - presentValue;

  return {
    value: { presentValue, totalDiscount },
    steps: [
      { label: "Present value", formula: `${futureValue} ÷ (1+${discountRatePercent}%)^${years}`, value: presentValue },
      { label: "Total discount applied", formula: `${futureValue} − ${presentValue}`, value: totalDiscount },
    ],
    assumptions: [
      "The discount rate is held constant for the entire period",
      "Assumes a single lump sum at a single future date — not a series of payments",
    ],
    rulesVersion: "Present value (PV = FV ÷ (1+r)ⁿ)",
  };
}
