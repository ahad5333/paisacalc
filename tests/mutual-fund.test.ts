import { describe, expect, it } from "vitest";
import { calculateMutualFund } from "@/lib/calc/mutual-fund";

describe("calculateMutualFund — worked example", () => {
  it("₹5L lumpsum, 12% expected return, 1.5% expense ratio, 15 years", () => {
    const result = calculateMutualFund({
      investmentAmount: 500000,
      expectedReturnPercent: 12,
      expenseRatioPercent: 1.5,
      years: 15,
    });
    expect(result.value.netReturnPercent).toBe(10.5);
    expect(result.value.maturityValueGross).toBe(2736783);
    expect(result.value.maturityValueNet).toBe(2235652);
    expect(result.value.costOfFees).toBe(501131);
  });
});

describe("calculateMutualFund — boundary cases", () => {
  it("zero expense ratio makes net and gross maturity values identical", () => {
    const result = calculateMutualFund({
      investmentAmount: 200000,
      expectedReturnPercent: 10,
      expenseRatioPercent: 0,
      years: 10,
    });
    expect(result.value.maturityValueNet).toBe(result.value.maturityValueGross);
    expect(result.value.costOfFees).toBe(0);
  });

  it("a longer horizon increases the absolute cost of the same expense ratio", () => {
    const shortHorizon = calculateMutualFund({ investmentAmount: 500000, expectedReturnPercent: 12, expenseRatioPercent: 1.5, years: 5 });
    const longHorizon = calculateMutualFund({ investmentAmount: 500000, expectedReturnPercent: 12, expenseRatioPercent: 1.5, years: 20 });
    expect(longHorizon.value.costOfFees).toBeGreaterThan(shortHorizon.value.costOfFees);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMutualFund({
      investmentAmount: 500000,
      expectedReturnPercent: 12,
      expenseRatioPercent: 1.5,
      years: 15,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
