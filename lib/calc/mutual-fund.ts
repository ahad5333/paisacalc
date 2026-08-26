import type { CalcResult } from "./types";

export type MutualFundInputs = {
  investmentAmount: number;
  expectedReturnPercent: number;
  expenseRatioPercent: number;
  years: number;
};

export type MutualFundValue = {
  netReturnPercent: number;
  maturityValueGross: number;
  maturityValueNet: number;
  costOfFees: number;
};

// A lumpsum mutual fund investment (SIP returns is the periodic-
// contribution version already live). The real India-specific angle
// here is the expense ratio — the annual fee SEBI requires every fund
// to disclose as a Total Expense Ratio (TER), typically 0.1-1% for
// index/passive funds and up to ~2.25% for actively managed equity
// funds under SEBI's TER slabs. Approximated as a straight subtraction
// from the gross annual return (the standard simplification — the fund's
// NAV already reflects fees deducted daily, so a fund's *quoted* returns
// are already net; this models the gap between a fund's gross portfolio
// performance and what an investor actually receives).
export function calculateMutualFund(inputs: MutualFundInputs): CalcResult<MutualFundValue> {
  const { investmentAmount, expectedReturnPercent, expenseRatioPercent, years } = inputs;

  const netReturnPercent = Math.round((expectedReturnPercent - expenseRatioPercent) * 100) / 100;
  const maturityValueGross = Math.round(investmentAmount * Math.pow(1 + expectedReturnPercent / 100, years));
  const maturityValueNet = Math.round(investmentAmount * Math.pow(1 + netReturnPercent / 100, years));
  const costOfFees = maturityValueGross - maturityValueNet;

  return {
    value: { netReturnPercent, maturityValueGross, maturityValueNet, costOfFees },
    steps: [
      { label: "Net return after expense ratio", formula: `${expectedReturnPercent}% − ${expenseRatioPercent}%`, value: netReturnPercent },
      { label: "Maturity value at the gross return", formula: `${investmentAmount} × (1+gross)ⁿ`, value: maturityValueGross },
      { label: "Maturity value at the net return", formula: `${investmentAmount} × (1+net)ⁿ`, value: maturityValueNet },
      { label: "Total cost of fees over the period", formula: "Gross maturity value − Net maturity value", value: costOfFees },
    ],
    assumptions: [
      "The expense ratio is applied as a straight annual subtraction from the return — a standard approximation, not a precisely compounding daily-NAV deduction",
      "SEBI's Total Expense Ratio (TER) caps run roughly 0.1-1% for passive/index funds and up to about 2.25% for actively managed equity funds, tapering down as fund size grows — check the specific fund's factsheet for its actual TER",
      "The expected return itself (before fees) is an assumption you set — markets don't return a fixed rate every year",
      "Ignores exit load, STT, and capital gains tax on withdrawal — see the capital gains calculator for the tax side",
    ],
    rulesVersion: "Lumpsum growth net of expense ratio (assumption-based)",
  };
}
