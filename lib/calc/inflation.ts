import type { CalcResult } from "./types";

export type InflationInputs = {
  presentAmount: number;
  inflationRatePercent: number;
  years: number;
};

export type InflationValue = {
  futureCost: number;
  purchasingPowerLoss: number;
};

// Standard compound-growth formula applied to cost rather than money
// growing: what costs P today costs P × (1+r)^n in n years' time, if
// prices rise at r% a year. India's CPI inflation has run roughly 3.5-4.5%
// through the first half of 2026 per MOSPI's official releases (accessed
// 18 Aug 2026) — the default here is a round, illustrative assumption in
// that range, not a fixed rule; unlike a bank rate or statutory figure,
// inflation is inherently something to project under an assumption you
// choose, so it stays a fully adjustable input.
export function calculateInflation(inputs: InflationInputs): CalcResult<InflationValue> {
  const { presentAmount: P, inflationRatePercent: r, years: t } = inputs;
  const rate = r / 100;

  const futureCost = Math.round(P * Math.pow(1 + rate, t));
  const purchasingPowerLoss = futureCost - P;

  return {
    value: { futureCost, purchasingPowerLoss },
    steps: [
      { label: "Inflation rate", formula: `${r} ÷ 100`, value: rate },
      { label: "Future cost", formula: "P × (1+r)ⁿ", value: futureCost },
      {
        label: "Extra amount needed",
        formula: "Future cost − Present amount",
        value: purchasingPowerLoss,
      },
    ],
    assumptions: [
      "Inflation is assumed constant every year — real inflation varies year to year and by what you're actually buying (food, fuel, and education have historically run hotter than the headline CPI figure)",
      "This is the cost of the same goods or services in the future, not what a specific investment would grow to",
    ],
    rulesVersion: "Compound inflation projection (assumption-based)",
  };
}
