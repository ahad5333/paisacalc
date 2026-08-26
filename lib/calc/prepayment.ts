import type { CalcResult } from "./types";
import { calculateEmi, simulateScheduleAtFixedEmi, type AmortisationRow } from "./emi";

export type PrepaymentStrategy = "reduceEmi" | "reduceTenure";

export type PrepaymentInputs = {
  principal: number;
  annualRatePercent: number;
  tenureMonths: number;
  prepaymentAmount: number;
  prepaymentMonth: number; // 1-indexed month the lump sum is applied
  strategy: PrepaymentStrategy;
};

export type PrepaymentValue = {
  originalEmi: number;
  originalTotalInterest: number;
  originalTenureMonths: number;
  newEmi: number;
  newTenureMonths: number;
  newTotalInterest: number;
  interestSaved: number;
  tenureSavedMonths: number;
  combinedSchedule: AmortisationRow[];
};

// Depends on the EMI calculator's amortisation logic rather than
// reimplementing it (ticket C5-01): the pre-prepayment portion and the
// "reduce EMI" strategy both call calculateEmi directly; only "reduce
// tenure" needs the one new helper (simulateScheduleAtFixedEmi) added to
// emi.ts alongside it.
export function calculatePrepaymentImpact(inputs: PrepaymentInputs): CalcResult<PrepaymentValue> {
  const { principal, annualRatePercent, tenureMonths, prepaymentAmount, strategy } = inputs;
  const prepaymentMonth = Math.min(Math.max(1, Math.round(inputs.prepaymentMonth)), tenureMonths);

  const original = calculateEmi({ principal, annualRatePercent, tenureMonths });
  const { emi: originalEmi, totalInterest: originalTotalInterest, schedule: originalSchedule } =
    original.value;

  const preSchedule = originalSchedule.slice(0, prepaymentMonth);
  const balanceBeforePrepayment = preSchedule[preSchedule.length - 1].balance;
  const balanceAfterPrepayment = Math.max(0, balanceBeforePrepayment - Math.max(0, prepaymentAmount));
  const remainingMonths = tenureMonths - prepaymentMonth;

  let postSchedule: AmortisationRow[];
  let newEmi: number;

  if (balanceAfterPrepayment <= 0 || remainingMonths <= 0) {
    postSchedule = [];
    newEmi = 0;
  } else if (strategy === "reduceEmi") {
    const reduced = calculateEmi({
      principal: balanceAfterPrepayment,
      annualRatePercent,
      tenureMonths: remainingMonths,
    });
    newEmi = reduced.value.emi;
    postSchedule = reduced.value.schedule;
  } else {
    newEmi = originalEmi;
    postSchedule = simulateScheduleAtFixedEmi(balanceAfterPrepayment, annualRatePercent, originalEmi);
  }

  const preInterest = preSchedule.reduce((sum, row) => sum + row.interest, 0);
  const postInterest = postSchedule.reduce((sum, row) => sum + row.interest, 0);
  const newTotalInterest = preInterest + postInterest;
  const interestSaved = originalTotalInterest - newTotalInterest;
  const newTenureMonths = prepaymentMonth + postSchedule.length;
  const tenureSavedMonths = tenureMonths - newTenureMonths;

  const combinedSchedule: AmortisationRow[] = [
    ...preSchedule,
    ...postSchedule.map((row) => ({ ...row, month: prepaymentMonth + row.month })),
  ];

  return {
    value: {
      originalEmi,
      originalTotalInterest,
      originalTenureMonths: tenureMonths,
      newEmi,
      newTenureMonths,
      newTotalInterest: Math.round(newTotalInterest),
      interestSaved: Math.round(interestSaved),
      tenureSavedMonths,
      combinedSchedule,
    },
    steps: [
      {
        label: "Balance at prepayment",
        formula: `outstanding balance after month ${prepaymentMonth}`,
        value: balanceBeforePrepayment,
      },
      {
        label: "Balance after prepayment",
        formula: `${balanceBeforePrepayment} − ${prepaymentAmount}`,
        value: balanceAfterPrepayment,
      },
      strategy === "reduceEmi"
        ? { label: "New EMI", formula: "recomputed over the same remaining tenure", value: newEmi }
        : {
            label: "New tenure",
            formula: "months to clear the reduced balance at the same EMI",
            value: newTenureMonths,
          },
      { label: "Total interest, with prepayment", formula: "pre-prepayment interest + post-prepayment interest", value: Math.round(newTotalInterest) },
      { label: "Interest saved", formula: "original total interest − new total interest", value: Math.round(interestSaved) },
    ],
    assumptions: [
      "Prepayment is a single lump sum, applied in full in the chosen month",
      "Interest rate stays fixed for the remaining tenure",
      strategy === "reduceEmi"
        ? "EMI is reduced; the loan still ends on its original date"
        : "EMI stays the same; the loan finishes early instead",
      "No prepayment penalty modelled — most floating-rate home loans in India don't charge one, but check your own loan terms",
    ],
    rulesVersion: "Reducing-balance method (standard)",
  };
}
