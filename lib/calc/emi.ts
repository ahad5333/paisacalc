import type { CalcResult } from "./types";

export type EmiInputs = {
  principal: number;
  annualRatePercent: number;
  tenureMonths: number;
};

export type AmortisationRow = {
  month: number;
  emi: number;
  interest: number;
  principal: number;
  balance: number;
};

export type EmiValue = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: AmortisationRow[];
};

// Standard reducing-balance (amortising) formula, the same one every
// lender uses: EMI = P × r × (1+r)^n / ((1+r)^n − 1), r = monthly rate.
// Verified against five independently published worked examples — see
// tests/emi.test.ts for citations. No statutory rule applies to EMI (the
// rate is a lender/borrower term, not a Finance Act value), so this file
// has no dependency on /lib/rules.
export function calculateEmi(inputs: EmiInputs): CalcResult<EmiValue> {
  const { principal: P, annualRatePercent, tenureMonths: n } = inputs;
  const r = annualRatePercent / 12 / 100;

  const rawEmi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const emi = Math.round(rawEmi);

  // Whole-rupee ledger: every row rounds interest first, then derives that
  // row's principal as emi − interest, so interest + principal always equals
  // the displayed EMI exactly — the way a bank's own statement reads, and
  // the property this site's "check the arithmetic yourself" premise depends
  // on. The final month absorbs whatever rupee is left so the balance
  // closes to exactly zero, matching real amortisation tables (verified
  // against five published examples in tests/emi.test.ts).
  const schedule: AmortisationRow[] = [];
  let balance = P;
  let totalInterest = 0;

  for (let month = 1; month <= n; month++) {
    const opening = balance;
    const interest = Math.round(opening * r);
    const isLast = month === n;
    const principal = isLast ? opening : emi - interest;
    balance = opening - principal;
    totalInterest += interest;

    schedule.push({
      month,
      emi: isLast ? principal + interest : emi,
      interest,
      principal,
      balance,
    });
  }

  const totalPayment = totalInterest + P;

  return {
    value: { emi, totalInterest, totalPayment, schedule },
    steps: [
      { label: "Monthly rate", formula: `${annualRatePercent} ÷ 12 ÷ 100`, value: r },
      {
        label: "EMI",
        formula: "P × r × (1+r)^n ÷ ((1+r)^n − 1)",
        value: emi,
      },
      { label: "Total payment", formula: `EMI × ${n} months`, value: totalPayment },
      { label: "Total interest", formula: "Total payment − Principal", value: totalInterest },
    ],
    assumptions: [
      "Fixed interest rate for the full tenure",
      "No prepayment or part-payment",
      "EMI rounded to the nearest rupee; the final month absorbs any rounding difference so the balance closes to zero",
    ],
    rulesVersion: "Reducing-balance method (standard)",
  };
}

// Inverse of calculateEmi: given a FIXED emi (typically an already-agreed
// EMI the borrower wants to keep paying) rather than a derived one, works
// out how many months it takes to clear the principal — the "reduce
// tenure" prepayment strategy needs this; "reduce EMI" just calls
// calculateEmi again on the smaller balance, no new math required (ticket
// C5-01: "depends on C1 amortisation logic"). Mirrors calculateEmi's same
// whole-rupee ledger convention (round interest first, principal = emi −
// interest) so a spliced pre/post-prepayment schedule stays internally
// consistent.
export function simulateScheduleAtFixedEmi(
  principal: number,
  annualRatePercent: number,
  emi: number,
): AmortisationRow[] {
  const r = annualRatePercent / 12 / 100;
  const schedule: AmortisationRow[] = [];
  let balance = principal;
  const MAX_MONTHS = 720; // 60 years — a safety cap, not a realistic tenure

  for (let month = 1; balance > 0 && month <= MAX_MONTHS; month++) {
    const opening = balance;
    const interest = Math.round(opening * r);
    let principalPaid = emi - interest;

    // EMI doesn't even cover the interest — the balance would grow forever.
    if (principalPaid <= 0) break;

    let thisEmi = emi;
    if (principalPaid >= opening) {
      principalPaid = opening;
      thisEmi = principalPaid + interest;
    }

    balance = opening - principalPaid;
    schedule.push({ month, emi: thisEmi, interest, principal: principalPaid, balance });
  }

  return schedule;
}

export type YearlyAggregate = {
  year: number;
  principal: number;
  interest: number;
};

// Groups the monthly schedule into calendar years of the loan for the
// stacked-bar chart (ticket C1-03) — 240 monthly bars is unreadable, but
// principal vs interest composition shifting year over year is the whole
// point of the visual.
export function aggregateYearly(schedule: AmortisationRow[]): YearlyAggregate[] {
  const years: YearlyAggregate[] = [];
  for (let i = 0; i < schedule.length; i += 12) {
    const rows = schedule.slice(i, i + 12);
    years.push({
      year: years.length + 1,
      principal: rows.reduce((sum, r) => sum + r.principal, 0),
      interest: rows.reduce((sum, r) => sum + r.interest, 0),
    });
  }
  return years;
}
