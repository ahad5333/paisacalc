import { describe, expect, it } from "vitest";
import { calculateDebtConsolidation } from "@/lib/calc/debt-consolidation";

// Both fixtures computed by running the implementation itself against
// hand-picked inputs and reading back the output (not independently
// hand-traced) — but the underlying simulateScheduleAtFixedEmi/calculateEmi
// building blocks are each independently verified elsewhere (see
// tests/credit-card.test.ts and tests/emi.test.ts), so this file's job is
// to lock in the combination logic — sum of two schedules vs. one new EMI
// — and specifically the trap scenario below, not to re-verify amortisation
// math that's already covered.
describe("calculateDebtConsolidation — worked example", () => {
  const baseInputs = {
    debt1Balance: 150000,
    debt1RatePercent: 36,
    debt1Emi: 8000,
    debt2Balance: 250000,
    debt2RatePercent: 15,
    debt2Emi: 9500,
  };

  it("₹1.5L credit card (36%) + ₹2.5L personal loan (15%) into a 13%/3yr consolidated loan", () => {
    const result = calculateDebtConsolidation({ ...baseInputs, newLoanRatePercent: 13, newLoanTenureYears: 3 });
    expect(result.value.currentTotalBalance).toBe(400000);
    expect(result.value.currentMonthlyPayment).toBe(17500);
    expect(result.value.currentMonthsToPayoff).toBe(33);
    expect(result.value.currentTotalInterest).toBe(128809);
    expect(result.value.newLoanEmi).toBe(13478);
    expect(result.value.newLoanMonths).toBe(36);
    expect(result.value.newLoanTotalInterest).toBe(85189);
    expect(result.value.monthlyPaymentChange).toBe(-4022);
    expect(result.value.totalInterestChange).toBe(-43620);
    expect(result.value.better).toBe("consolidate");
  });

  it("the same debts stretched into a 7-year consolidated loan lowers the EMI but costs more overall — the consolidation trap", () => {
    const result = calculateDebtConsolidation({ ...baseInputs, newLoanRatePercent: 13, newLoanTenureYears: 7 });
    expect(result.value.newLoanEmi).toBe(7277);
    expect(result.value.monthlyPaymentChange).toBe(-10223);
    expect(result.value.totalInterestChange).toBe(82429);
    expect(result.value.better).toBe("keep separate");
  });
});

describe("calculateDebtConsolidation — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDebtConsolidation({
      debt1Balance: 150000,
      debt1RatePercent: 36,
      debt1Emi: 8000,
      debt2Balance: 250000,
      debt2RatePercent: 15,
      debt2Emi: 9500,
      newLoanRatePercent: 13,
      newLoanTenureYears: 3,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });

  it("current monthly payment is always the sum of both stated EMIs, regardless of the new loan terms", () => {
    const result = calculateDebtConsolidation({
      debt1Balance: 100000,
      debt1RatePercent: 12,
      debt1Emi: 5000,
      debt2Balance: 100000,
      debt2RatePercent: 12,
      debt2Emi: 5000,
      newLoanRatePercent: 10,
      newLoanTenureYears: 5,
    });
    expect(result.value.currentMonthlyPayment).toBe(10000);
    expect(result.value.currentTotalBalance).toBe(200000);
  });
});
