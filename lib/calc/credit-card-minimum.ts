import type { CalcResult } from "./types";

export type CreditCardMinimumInputs = {
  balance: number;
  monthlyRatePercent: number;
  minPaymentPercent: number;
  minPaymentFloor: number;
};

export type CreditCardMinimumValue = {
  monthsToPayoff: number | null;
  totalPaid: number;
  totalInterest: number;
  firstMonthPayment: number;
};

// The "minimum payment trap": unlike the credit card payoff calculator
// (a FIXED payment every month), Indian card issuers set minimum due as
// a PERCENTAGE of the outstanding balance (commonly 5%, or a flat floor
// amount, whichever is higher) — so as the balance shrinks, the required
// payment shrinks with it, stretching payoff far longer than a fixed
// payment would and multiplying total interest. Simulated month by
// month since the payment itself changes every month, unlike a standard
// amortisation schedule.
export function calculateCreditCardMinimum(inputs: CreditCardMinimumInputs): CalcResult<CreditCardMinimumValue> {
  const { balance: startingBalance, monthlyRatePercent, minPaymentPercent, minPaymentFloor } = inputs;
  const MAX_MONTHS = 600;

  let balance = startingBalance;
  let totalPaid = 0;
  let totalInterest = 0;
  let months = 0;
  let firstMonthPayment = 0;
  let neverPaysOff = false;

  while (balance > 0 && months < MAX_MONTHS) {
    const interest = Math.round((balance * monthlyRatePercent) / 100);
    const payment = Math.max(Math.round((balance * minPaymentPercent) / 100), minPaymentFloor);
    if (months === 0) firstMonthPayment = payment;

    if (payment <= interest) {
      neverPaysOff = true;
      break;
    }

    const actualPayment = Math.min(payment, balance + interest);
    const principal = actualPayment - interest;
    balance -= principal;
    totalPaid += actualPayment;
    totalInterest += interest;
    months++;
  }

  return {
    value: {
      monthsToPayoff: neverPaysOff ? null : months,
      totalPaid: Math.round(totalPaid),
      totalInterest: Math.round(totalInterest),
      firstMonthPayment,
    },
    steps: neverPaysOff
      ? [
          {
            label: "First month's minimum payment",
            formula: `max(${startingBalance} × ${minPaymentPercent}%, ${minPaymentFloor})`,
            value: firstMonthPayment,
          },
        ]
      : [
          { label: "First month's minimum payment", formula: `max(${startingBalance} × ${minPaymentPercent}%, ${minPaymentFloor})`, value: firstMonthPayment },
          { label: "Months to clear the balance", formula: "simulated month by month, payment shrinks as balance shrinks", value: months },
          { label: "Total paid", formula: "sum of every month's minimum payment", value: Math.round(totalPaid) },
          { label: "Total interest", formula: "Total paid − Original balance", value: Math.round(totalInterest) },
        ],
    assumptions: neverPaysOff
      ? [
          `The minimum payment on the very first month (${firstMonthPayment}) doesn't even cover that month's interest — the balance would never shrink paying only the minimum`,
        ]
      : [
          "Minimum payment is the greater of a percentage of the current balance and a flat floor amount, recalculated fresh every month as the balance changes",
          "No new spending is added to the card while paying it down",
          "The interest rate stays constant for the full payoff period",
        ],
    rulesVersion: "Declining minimum-payment simulation",
  };
}
