import type { CalcResult } from "./types";
import { simulateScheduleAtFixedEmi, type AmortisationRow } from "./emi";

export type CreditCardInputs = {
  balance: number;
  monthlyRatePercent: number;
  monthlyPayment: number;
};

export type CreditCardValue = {
  monthsToPayoff: number | null; // null = this payment never clears the balance
  totalPaid: number;
  totalInterest: number;
  schedule: AmortisationRow[];
  minInterestOnlyPayment: number;
};

// Reuses simulateScheduleAtFixedEmi from lib/calc/emi.ts verbatim — a
// credit card balance shrinking against a fixed monthly payment at a
// periodic interest rate is exactly the same math as the loan-prepayment
// "reduce tenure" scenario, just quoted differently: Indian card issuers
// publish a MONTHLY rate (typically 2.5-3.75%, i.e. 30-45% annualised —
// verified against BankBazaar and HDFC/ICICI's own published rates, 18 Aug
// 2026) rather than an annual one. Multiplying by 12 before handing it to
// the existing function, which divides by 12 internally, recovers exactly
// that monthly rate — see tests/credit-card.test.ts for the round-trip
// check.
export function calculateCreditCardPayoff(inputs: CreditCardInputs): CalcResult<CreditCardValue> {
  const { balance, monthlyRatePercent, monthlyPayment } = inputs;
  const pseudoAnnualRate = monthlyRatePercent * 12;
  const minInterestOnlyPayment = Math.round((balance * monthlyRatePercent) / 100);

  const schedule = simulateScheduleAtFixedEmi(balance, pseudoAnnualRate, monthlyPayment);
  const neverPaysOff = schedule.length === 0 && balance > 0;

  const totalPaid = schedule.reduce((sum, row) => sum + row.emi, 0);
  const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);

  return {
    value: {
      monthsToPayoff: neverPaysOff ? null : schedule.length,
      totalPaid,
      totalInterest,
      schedule,
      minInterestOnlyPayment,
    },
    steps: neverPaysOff
      ? [
          {
            label: "This month's interest alone",
            formula: `${balance} × ${monthlyRatePercent} ÷ 100`,
            value: minInterestOnlyPayment,
          },
        ]
      : [
          { label: "Monthly rate", formula: `${monthlyRatePercent} ÷ 100`, value: monthlyRatePercent / 100 },
          { label: "Months to pay off", formula: "simulated month by month", value: schedule.length },
          { label: "Total paid", formula: "sum of every monthly payment", value: totalPaid },
          { label: "Total interest", formula: "Total paid − Original balance", value: totalInterest },
        ],
    assumptions: neverPaysOff
      ? [
          `A payment of ${monthlyPayment} doesn't even cover this month's interest (${minInterestOnlyPayment}) — the balance would grow every month, never shrink`,
          "No new spending is added to the card while paying it down",
        ]
      : [
          "The interest rate stays constant for the full payoff period",
          "No new spending is added to the card while paying it down",
          "The payment is made in full, on time, every month",
        ],
    rulesVersion: "Fixed-payment payoff simulation",
  };
}
