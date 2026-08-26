import { describe, expect, it } from "vitest";
import { calculateDownPayment } from "@/lib/calc/down-payment";

describe("calculateDownPayment — worked example", () => {
  it("₹60L home, 20% down, 8.5%/20yr loan, ₹30,000/month savings", () => {
    const result = calculateDownPayment({
      homePrice: 6000000,
      downPaymentPercent: 20,
      ratePercent: 8.5,
      tenureYears: 20,
      monthlySavingsCapacity: 30000,
    });
    expect(result.value.downPaymentAmount).toBe(1200000);
    expect(result.value.loanAmount).toBe(4800000);
    expect(result.value.emi).toBe(41656);
    expect(result.value.monthsToSaveDownPayment).toBe(40);
  });
});

describe("calculateDownPayment — boundary cases", () => {
  it("a higher down payment percent shrinks the loan and the EMI", () => {
    const low = calculateDownPayment({ homePrice: 5000000, downPaymentPercent: 10, ratePercent: 9, tenureYears: 20, monthlySavingsCapacity: 20000 });
    const high = calculateDownPayment({ homePrice: 5000000, downPaymentPercent: 30, ratePercent: 9, tenureYears: 20, monthlySavingsCapacity: 20000 });
    expect(high.value.loanAmount).toBeLessThan(low.value.loanAmount);
    expect(high.value.emi).toBeLessThan(low.value.emi);
    expect(high.value.monthsToSaveDownPayment).toBeGreaterThan(low.value.monthsToSaveDownPayment);
  });

  it("zero monthly savings capacity is treated as never — an infinite timeline, not a crash", () => {
    const result = calculateDownPayment({
      homePrice: 5000000,
      downPaymentPercent: 20,
      ratePercent: 9,
      tenureYears: 20,
      monthlySavingsCapacity: 0,
    });
    expect(result.value.monthsToSaveDownPayment).toBe(Infinity);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDownPayment({
      homePrice: 6000000,
      downPaymentPercent: 20,
      ratePercent: 8.5,
      tenureYears: 20,
      monthlySavingsCapacity: 30000,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
