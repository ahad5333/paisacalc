import { describe, expect, it } from "vitest";
import { calculateAnnuityPayout } from "@/lib/calc/annuity-payout";

describe("calculateAnnuityPayout — worked example", () => {
  it("₹20L lump sum, 6% rate, 20-year payout", () => {
    const result = calculateAnnuityPayout({ lumpSum: 2000000, annualRatePercent: 6, payoutYears: 20 });
    expect(result.value.monthlyPayout).toBe(14329);
    expect(result.value.totalPayout).toBe(3438960);
    expect(result.value.totalInterestEarned).toBe(1438960);
  });
});

describe("calculateAnnuityPayout — boundary cases", () => {
  it("zero interest rate simply divides the lump sum evenly across the payout months", () => {
    const result = calculateAnnuityPayout({ lumpSum: 1200000, annualRatePercent: 0, payoutYears: 10 });
    expect(result.value.monthlyPayout).toBe(10000);
    expect(result.value.totalInterestEarned).toBe(0);
  });

  it("a longer payout period lowers the monthly payout", () => {
    const shorter = calculateAnnuityPayout({ lumpSum: 2000000, annualRatePercent: 6, payoutYears: 10 });
    const longer = calculateAnnuityPayout({ lumpSum: 2000000, annualRatePercent: 6, payoutYears: 25 });
    expect(longer.value.monthlyPayout).toBeLessThan(shorter.value.monthlyPayout);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateAnnuityPayout({ lumpSum: 2000000, annualRatePercent: 6, payoutYears: 20 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
