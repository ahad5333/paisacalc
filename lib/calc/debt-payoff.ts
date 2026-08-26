import type { CalcResult } from "./types";

export type DebtPayoffInputs = {
  debt1Balance: number;
  debt1RatePercent: number;
  debt1MinPayment: number;
  debt2Balance: number;
  debt2RatePercent: number;
  debt2MinPayment: number;
  debt3Balance: number;
  debt3RatePercent: number;
  debt3MinPayment: number;
  extraMonthlyBudget: number;
};

export type DebtPayoffValue = {
  avalancheMonths: number;
  avalancheTotalInterest: number;
  snowballMonths: number;
  snowballTotalInterest: number;
  interestSavedByAvalanche: number;
};

type DebtState = { balance: number; monthlyRate: number; minPayment: number };

const MAX_MONTHS = 600;

// Avalanche (highest rate first) always minimises total interest — it's
// mathematically the optimal order for where extra money goes. Snowball
// (smallest balance first) usually costs a bit more in interest but
// clears individual debts sooner, which is the whole reason it's
// popular: visible progress motivates people to stick with a payoff plan
// better than a lower total-interest number on paper does. Both
// strategies hold the TOTAL monthly budget fixed throughout — as a debt
// clears, its old minimum payment gets redirected as extra toward the
// next target, rather than pocketed.
function simulate(debts: DebtState[], totalBudget: number, strategy: "avalanche" | "snowball") {
  const state = debts.map((d) => ({ ...d }));
  let totalInterest = 0;
  let months = 0;

  while (state.some((d) => d.balance > 0) && months < MAX_MONTHS) {
    months++;
    for (const d of state) {
      if (d.balance <= 0) continue;
      const interest = Math.round(d.balance * d.monthlyRate);
      d.balance += interest;
      totalInterest += interest;
    }

    let remaining = totalBudget;
    for (const d of state) {
      if (d.balance <= 0) continue;
      const pay = Math.min(d.minPayment, d.balance, remaining);
      d.balance -= pay;
      remaining -= pay;
    }

    const order = [...state]
      .filter((d) => d.balance > 0)
      .sort((a, b) => (strategy === "avalanche" ? b.monthlyRate - a.monthlyRate : a.balance - b.balance));
    for (const d of order) {
      if (remaining <= 0) break;
      const pay = Math.min(remaining, d.balance);
      d.balance -= pay;
      remaining -= pay;
    }
  }

  return { months, totalInterest };
}

export function calculateDebtPayoff(inputs: DebtPayoffInputs): CalcResult<DebtPayoffValue> {
  const debts: DebtState[] = [
    { balance: inputs.debt1Balance, monthlyRate: inputs.debt1RatePercent / 12 / 100, minPayment: inputs.debt1MinPayment },
    { balance: inputs.debt2Balance, monthlyRate: inputs.debt2RatePercent / 12 / 100, minPayment: inputs.debt2MinPayment },
    { balance: inputs.debt3Balance, monthlyRate: inputs.debt3RatePercent / 12 / 100, minPayment: inputs.debt3MinPayment },
  ];
  const totalBudget = debts.reduce((sum, d) => sum + d.minPayment, 0) + inputs.extraMonthlyBudget;

  const avalanche = simulate(debts, totalBudget, "avalanche");
  const snowball = simulate(debts, totalBudget, "snowball");
  const interestSavedByAvalanche = snowball.totalInterest - avalanche.totalInterest;

  return {
    value: {
      avalancheMonths: avalanche.months,
      avalancheTotalInterest: avalanche.totalInterest,
      snowballMonths: snowball.months,
      snowballTotalInterest: snowball.totalInterest,
      interestSavedByAvalanche,
    },
    steps: [
      { label: "Total monthly budget (minimums + extra)", formula: "sum of 3 minimums + extra budget", value: totalBudget },
      { label: "Avalanche: months to clear all debts", formula: "simulated, highest rate paid first", value: avalanche.months },
      { label: "Avalanche: total interest", formula: "simulated month by month", value: avalanche.totalInterest },
      { label: "Snowball: months to clear all debts", formula: "simulated, smallest balance paid first", value: snowball.months },
      { label: "Snowball: total interest", formula: "simulated month by month", value: snowball.totalInterest },
      { label: "Interest avalanche saves over snowball", formula: "Snowball interest − Avalanche interest", value: interestSavedByAvalanche },
    ],
    assumptions: [
      "The total monthly budget stays fixed throughout — when a debt clears, its old minimum payment gets redirected as extra toward the next target, not pocketed",
      "Avalanche always minimises total interest paid — it's mathematically the optimal order for directing extra money",
      "Snowball usually costs somewhat more in interest but clears individual debts sooner, which is its actual appeal — visible progress rather than a lower total-interest number",
      "All rates stay fixed and no new debt is added while paying these down",
    ],
    rulesVersion: "Avalanche vs. snowball simulation (assumption-based)",
  };
}
