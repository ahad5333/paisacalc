import { describe, expect, it } from "vitest";
import { calculateFutureValue } from "@/lib/calc/future-value";

describe("calculateFutureValue — worked example", () => {
  it("₹5L present value, 10% growth, 15 years", () => {
    const result = calculateFutureValue({ presentValue: 500000, growthRatePercent: 10, years: 15 });
    // 500,000 × 1.1^15 = 500,000 × 4.177248... = 2,088,624.5
    expect(result.value.futureValue).toBe(2088624);
    expect(result.value.totalGrowth).toBe(1588624);
  });
});

describe("calculateFutureValue — boundary cases", () => {
  it("is the exact inverse of present value at the same rate and years", () => {
    const fv = calculateFutureValue({ presentValue: 500000, growthRatePercent: 8, years: 10 });
    // Present-valuing the resulting future value back at the same rate/years should recover close to the original 500,000.
    const recovered = Math.round(fv.value.futureValue / Math.pow(1.08, 10));
    expect(Math.abs(recovered - 500000)).toBeLessThanOrEqual(1);
  });

  it("zero growth rate leaves future value equal to present value", () => {
    const result = calculateFutureValue({ presentValue: 300000, growthRatePercent: 0, years: 10 });
    expect(result.value.futureValue).toBe(300000);
    expect(result.value.totalGrowth).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFutureValue({ presentValue: 500000, growthRatePercent: 10, years: 15 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
