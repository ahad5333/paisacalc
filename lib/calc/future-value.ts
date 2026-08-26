import type { CalcResult } from "./types";

export type FutureValueInputs = {
  presentValue: number;
  growthRatePercent: number;
  years: number;
};

export type FutureValueValue = {
  futureValue: number;
  totalGrowth: number;
};

// What a lump sum today grows to at a chosen rate — the plain inverse of
// the present value calculator. A single-formula companion to the
// interest calculator (which also handles monthly contributions and
// arbitrary compounding frequency); this is the bare FV = PV × (1+r)ⁿ
// case on its own page for anyone specifically searching for it.
export function calculateFutureValue(inputs: FutureValueInputs): CalcResult<FutureValueValue> {
  const { presentValue, growthRatePercent, years } = inputs;

  const futureValue = Math.round(presentValue * Math.pow(1 + growthRatePercent / 100, years));
  const totalGrowth = futureValue - presentValue;

  return {
    value: { futureValue, totalGrowth },
    steps: [
      { label: "Future value", formula: `${presentValue} × (1+${growthRatePercent}%)^${years}`, value: futureValue },
      { label: "Total growth", formula: `${futureValue} − ${presentValue}`, value: totalGrowth },
    ],
    assumptions: ["The growth rate is held constant for the entire period", "Assumes a single lump sum with no further contributions"],
    rulesVersion: "Future value (FV = PV × (1+r)ⁿ)",
  };
}
