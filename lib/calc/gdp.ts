import type { CalcResult } from "./types";

export type GdpInputs = {
  consumption: number;
  investment: number;
  governmentSpending: number;
  exports: number;
  imports: number;
};

// The expenditure approach — the most commonly taught method for
// computing GDP, summing every category of spending within an economy
// and netting out imports (which represent foreign, not domestic,
// production).
export function calculateGdp(inputs: GdpInputs): CalcResult<{ gdp: number; netExports: number }> {
  const { consumption, investment, governmentSpending, exports, imports } = inputs;
  const netExports = exports - imports;
  const gdp = consumption + investment + governmentSpending + netExports;

  return {
    value: { gdp, netExports },
    steps: [
      { label: "Net exports", formula: "exports − imports", value: netExports },
      { label: "GDP", formula: "C + I + G + (X − M)", value: gdp },
    ],
    assumptions: ["Uses the expenditure approach — GDP = Consumption + Investment + Government spending + Net exports"],
    rulesVersion: "GDP, expenditure approach",
  };
}
