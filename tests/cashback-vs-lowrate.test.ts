import { describe, expect, it } from "vitest";
import { calculateCashbackVsLowRate } from "@/lib/calc/cashback-vs-lowrate";

describe("calculateCashbackVsLowRate — worked example", () => {
  it("₹10L car, ₹50,000 cashback at 10%, vs 5% low rate on full price, 5 years", () => {
    const result = calculateCashbackVsLowRate({
      carPrice: 1000000,
      cashbackAmount: 50000,
      regularRatePercent: 10,
      lowRatePercent: 5,
      tenureYears: 5,
    });
    expect(result.value.cashbackEmi).toBe(20185);
    expect(result.value.cashbackTotalCost).toBe(1211073);
    expect(result.value.lowRateEmi).toBe(18871);
    expect(result.value.lowRateTotalCost).toBe(1132274);
    expect(result.value.savings).toBe(-78799);
    expect(result.value.better).toBe("lowRate");
  });

  it("a bigger cashback can flip the decision toward taking it", () => {
    const result = calculateCashbackVsLowRate({
      carPrice: 1000000,
      cashbackAmount: 150000,
      regularRatePercent: 10,
      lowRatePercent: 5,
      tenureYears: 5,
    });
    expect(result.value.better).toBe("cashback");
  });
});

describe("calculateCashbackVsLowRate — boundary cases", () => {
  it("zero cashback with equal rates leaves the two options tied", () => {
    const result = calculateCashbackVsLowRate({
      carPrice: 800000,
      cashbackAmount: 0,
      regularRatePercent: 9,
      lowRatePercent: 9,
      tenureYears: 5,
    });
    expect(result.value.savings).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCashbackVsLowRate({
      carPrice: 1000000,
      cashbackAmount: 50000,
      regularRatePercent: 10,
      lowRatePercent: 5,
      tenureYears: 5,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
