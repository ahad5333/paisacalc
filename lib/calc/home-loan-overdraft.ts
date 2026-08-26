import type { CalcResult } from "./types";
import { calculateEmi } from "./emi";

export type HomeLoanOverdraftInputs = {
  loanAmount: number;
  ratePercent: number;
  tenureYears: number;
  parkedSurplus: number;
};

export type HomeLoanOverdraftValue = {
  regularEmi: number;
  regularTotalInterest: number;
  odTotalInterest: number;
  odMonthsToPayoff: number;
  interestSaved: number;
  tenureReductionMonths: number;
};

// India doesn't really have a US-style revolving HELOC — the closest
// equivalent lenders actually offer is a home loan overdraft facility
// (SBI Maxgain, ICICI Home Overdraft, etc.): the loan account behaves
// like a current account, and any surplus parked in it reduces the
// balance interest is charged on that month, without reducing the EMI
// you keep paying — so the same EMI clears the loan faster and cheaper
// the more surplus stays parked. Simulated month by month (the OD
// balance changes what "effective principal" is each month, so there's
// no closed-form EMI/interest total the way a plain loan has) at the
// SAME EMI a regular loan of this amount/rate/tenure would carry, then
// compared against that regular loan's own totals.
export function calculateHomeLoanOverdraft(inputs: HomeLoanOverdraftInputs): CalcResult<HomeLoanOverdraftValue> {
  const { loanAmount, ratePercent, tenureYears, parkedSurplus } = inputs;
  const tenureMonths = Math.max(1, Math.round(tenureYears * 12));
  const r = ratePercent / 12 / 100;

  const regular = calculateEmi({ principal: loanAmount, annualRatePercent: ratePercent, tenureMonths });
  const regularEmi = regular.value.emi;
  const regularTotalInterest = regular.value.totalInterest;

  let balance = loanAmount;
  let odTotalInterest = 0;
  let month = 0;
  const MAX_MONTHS = tenureMonths;
  while (balance > 0 && month < MAX_MONTHS) {
    month++;
    const effectivePrincipal = Math.max(0, balance - parkedSurplus);
    const interest = Math.round(effectivePrincipal * r);
    const principalPaid = Math.min(balance, regularEmi - interest);
    balance -= principalPaid;
    odTotalInterest += interest;
  }

  const interestSaved = regularTotalInterest - odTotalInterest;
  const tenureReductionMonths = tenureMonths - month;

  return {
    value: {
      regularEmi,
      regularTotalInterest,
      odTotalInterest,
      odMonthsToPayoff: month,
      interestSaved,
      tenureReductionMonths,
    },
    steps: [
      { label: "EMI (same as a regular loan of this size)", formula: "standard EMI, unaffected by parked surplus", value: regularEmi },
      { label: "Total interest without an overdraft facility", formula: "standard amortisation", value: regularTotalInterest },
      {
        label: "Total interest with surplus parked every month",
        formula: "simulated month by month on (balance − parked surplus)",
        value: odTotalInterest,
      },
      { label: "Interest saved", formula: "Regular interest − OD interest", value: interestSaved },
      { label: "Months saved off the tenure", formula: `${tenureMonths} − ${month}`, value: tenureReductionMonths },
    ],
    assumptions: [
      "The parked surplus is assumed constant every month for the full comparison — a real balance would fluctuate as money moves in and out",
      "The EMI stays the same as a regular loan of this amount, rate, and tenure — parking surplus shortens how long it takes to clear the balance, it doesn't lower the EMI itself",
      "Interest is charged only on the loan balance minus whatever's parked that month, never less than zero",
      "Ignores the overdraft facility's typically higher processing fee and, at some lenders, a slightly higher interest rate than an equivalent plain home loan",
    ],
    rulesVersion: "Overdraft-linked simulation (assumption-based)",
  };
}
