import { describe, expect, it } from "vitest";
import { calculateRoi } from "@/lib/calc/roi";

describe("calculateRoi — worked example", () => {
  it("₹2L to ₹3.5L over 4 years", () => {
    const result = calculateRoi({ initialInvestment: 200000, finalValue: 350000, years: 4 });
    expect(result.value.gain).toBe(150000);
    expect(result.value.totalRoiPercent).toBe(75);
    expect(result.value.annualizedRoiPercent).toBe(15.02);
  });
});

describe("calculateRoi — boundary cases", () => {
  it("a loss produces a negative gain and negative ROI", () => {
    const result = calculateRoi({ initialInvestment: 100000, finalValue: 80000, years: 2 });
    expect(result.value.gain).toBe(-20000);
    expect(result.value.totalRoiPercent).toBe(-20);
    expect(result.value.annualizedRoiPercent).toBeLessThan(0);
  });

  it("the same total ROI over a longer period gives a lower annualised ROI", () => {
    const shortHold = calculateRoi({ initialInvestment: 100000, finalValue: 150000, years: 1 });
    const longHold = calculateRoi({ initialInvestment: 100000, finalValue: 150000, years: 5 });
    expect(shortHold.value.totalRoiPercent).toBe(longHold.value.totalRoiPercent);
    expect(shortHold.value.annualizedRoiPercent).toBeGreaterThan(longHold.value.annualizedRoiPercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRoi({ initialInvestment: 200000, finalValue: 350000, years: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
