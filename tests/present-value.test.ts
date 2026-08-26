import { describe, expect, it } from "vitest";
import { calculatePresentValue } from "@/lib/calc/present-value";

describe("calculatePresentValue — worked example", () => {
  it("₹10L future value, 8% discount rate, 10 years", () => {
    const result = calculatePresentValue({ futureValue: 1000000, discountRatePercent: 8, years: 10 });
    // 1,000,000 / 1.08^10 = 1,000,000 / 2.158925... = 463,193.49
    expect(result.value.presentValue).toBe(463193);
    expect(result.value.totalDiscount).toBe(536807);
  });
});

describe("calculatePresentValue — boundary cases", () => {
  it("zero discount rate leaves present value equal to future value", () => {
    const result = calculatePresentValue({ futureValue: 500000, discountRatePercent: 0, years: 5 });
    expect(result.value.presentValue).toBe(500000);
    expect(result.value.totalDiscount).toBe(0);
  });

  it("a higher discount rate produces a lower present value", () => {
    const low = calculatePresentValue({ futureValue: 1000000, discountRatePercent: 5, years: 10 });
    const high = calculatePresentValue({ futureValue: 1000000, discountRatePercent: 10, years: 10 });
    expect(high.value.presentValue).toBeLessThan(low.value.presentValue);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePresentValue({ futureValue: 1000000, discountRatePercent: 8, years: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
