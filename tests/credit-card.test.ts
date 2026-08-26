import { describe, expect, it } from "vitest";
import { calculateCreditCardPayoff } from "@/lib/calc/credit-card";

describe("calculateCreditCardPayoff — hand-computed worked examples", () => {
  it("₹1,00,000 balance @ 3.5%/month, ₹5,000/month payment", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 5000,
    });
    expect(result.value.monthsToPayoff).toBe(35);
    expect(result.value.totalPaid).toBe(174990);
    expect(result.value.totalInterest).toBe(74990);
  });

  it("every schedule row's interest + principal equals that row's payment", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 5000,
    });
    for (const row of result.value.schedule) {
      expect(row.interest + row.principal).toBe(row.emi);
    }
  });

  it("the schedule always closes to a zero balance when it pays off", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 5000,
    });
    expect(result.value.schedule.at(-1)?.balance).toBe(0);
  });
});

describe("calculateCreditCardPayoff — payment doesn't cover interest", () => {
  it("returns null months and an empty schedule when the payment can't even cover this month's interest", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 3000, // interest alone is 3500
    });
    expect(result.value.monthsToPayoff).toBeNull();
    expect(result.value.schedule).toHaveLength(0);
    expect(result.value.minInterestOnlyPayment).toBe(3500);
  });

  it("a payment exactly one rupee above interest-only does eventually pay off", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 3501,
    });
    expect(result.value.monthsToPayoff).not.toBeNull();
    expect(result.value.monthsToPayoff).toBeGreaterThan(0);
  });
});

describe("calculateCreditCardPayoff — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCreditCardPayoff({
      balance: 100000,
      monthlyRatePercent: 3.5,
      monthlyPayment: 5000,
    });
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
