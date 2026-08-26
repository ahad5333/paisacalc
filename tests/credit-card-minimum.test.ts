import { describe, expect, it } from "vitest";
import { calculateCreditCardMinimum } from "@/lib/calc/credit-card-minimum";

describe("calculateCreditCardMinimum — worked example", () => {
  it("₹1L balance, 3%/month rate, 5% minimum payment, ₹500 floor", () => {
    const result = calculateCreditCardMinimum({
      balance: 100000,
      monthlyRatePercent: 3,
      minPaymentPercent: 5,
      minPaymentFloor: 500,
    });
    expect(result.value.firstMonthPayment).toBe(5000);
    expect(result.value.monthsToPayoff).toBe(145);
    expect(result.value.totalPaid).toBe(240488);
    expect(result.value.totalInterest).toBe(140488);
  });

  it("total interest paid exceeds the original balance — the trap the calculator exists to show", () => {
    const result = calculateCreditCardMinimum({
      balance: 100000,
      monthlyRatePercent: 3,
      minPaymentPercent: 5,
      minPaymentFloor: 500,
    });
    expect(result.value.totalInterest).toBeGreaterThan(100000);
  });
});

describe("calculateCreditCardMinimum — boundary cases", () => {
  it("a minimum payment that doesn't cover interest never pays off", () => {
    const result = calculateCreditCardMinimum({
      balance: 100000,
      monthlyRatePercent: 3,
      minPaymentPercent: 1,
      minPaymentFloor: 100,
    });
    expect(result.value.monthsToPayoff).toBeNull();
  });

  it("a higher minimum payment percentage clears the balance faster with less total interest", () => {
    const slow = calculateCreditCardMinimum({ balance: 100000, monthlyRatePercent: 3, minPaymentPercent: 4, minPaymentFloor: 500 });
    const fast = calculateCreditCardMinimum({ balance: 100000, monthlyRatePercent: 3, minPaymentPercent: 10, minPaymentFloor: 500 });
    expect(fast.value.monthsToPayoff).toBeLessThan(slow.value.monthsToPayoff ?? Infinity);
    expect(fast.value.totalInterest).toBeLessThan(slow.value.totalInterest);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCreditCardMinimum({
      balance: 100000,
      monthlyRatePercent: 3,
      minPaymentPercent: 5,
      minPaymentFloor: 500,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
