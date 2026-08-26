import type { CalcResult } from "./types";

export type AverageReturnInputs = {
  yearlyReturnsPercent: [number, number, number, number, number];
};

export type AverageReturnValue = {
  arithmeticAveragePercent: number;
  cagrPercent: number;
  volatilityDragPercent: number;
  cumulativeGrowthPercent: number;
};

// The gap between a plain arithmetic average of yearly returns and the
// CAGR (the rate that actually reproduces the total growth) is "volatility
// drag" — a mathematical certainty (Jensen's inequality applied to
// compounding) that CAGR ≤ arithmetic mean whenever returns vary year to
// year, with equality only if every year returns exactly the same. Funds
// and pitches that quote "average annual return" without also showing
// CAGR are technically not lying, but the number investors actually
// realise is the CAGR, always the lower of the two once returns are
// volatile at all.
export function calculateAverageReturn(inputs: AverageReturnInputs): CalcResult<AverageReturnValue> {
  const { yearlyReturnsPercent } = inputs;
  const n = yearlyReturnsPercent.length;

  const arithmeticAveragePercent =
    Math.round((yearlyReturnsPercent.reduce((sum, r) => sum + r, 0) / n) * 100) / 100;

  const growthFactor = yearlyReturnsPercent.reduce((product, r) => product * (1 + r / 100), 1);
  const cagrPercent = Math.round((Math.pow(growthFactor, 1 / n) - 1) * 10000) / 100;
  const cumulativeGrowthPercent = Math.round((growthFactor - 1) * 10000) / 100;
  const volatilityDragPercent = Math.round((arithmeticAveragePercent - cagrPercent) * 100) / 100;

  return {
    value: { arithmeticAveragePercent, cagrPercent, volatilityDragPercent, cumulativeGrowthPercent },
    steps: [
      { label: "Arithmetic average return", formula: "sum of yearly returns ÷ number of years", value: arithmeticAveragePercent },
      { label: "Cumulative growth over the period", formula: "product of (1 + each year's return)", value: cumulativeGrowthPercent },
      { label: "CAGR (the rate actually realised)", formula: "cumulative growth^(1/years) − 1", value: cagrPercent },
      { label: "Volatility drag", formula: "Arithmetic average − CAGR", value: volatilityDragPercent },
    ],
    assumptions: [
      "CAGR is always less than or equal to the arithmetic average whenever returns vary year to year — they're only equal if every year returns exactly the same",
      "This uses a fixed 5-year series entered directly — it doesn't project or assume future returns",
      "A single large loss year drags CAGR down disproportionately, since a −50% year needs a +100% year just to recover to even, not another −50%'s worth of gain",
    ],
    rulesVersion: "Arithmetic mean vs. CAGR (volatility drag)",
  };
}
