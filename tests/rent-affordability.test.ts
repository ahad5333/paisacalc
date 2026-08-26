import { describe, expect, it } from "vitest";
import { calculateRentAffordability } from "@/lib/calc/rent-affordability";

describe("calculateRentAffordability — worked examples", () => {
  it("₹80,000 income, ₹5,000 existing debt, 30% ratio — the ratio is the binding limit", () => {
    const result = calculateRentAffordability({
      monthlyIncome: 80000,
      existingMonthlyDebt: 5000,
      rentToIncomeRatioPercent: 30,
    });
    expect(result.value.affordableRentByRatio).toBe(24000);
    expect(result.value.affordableRentByDebtCap).toBe(27000);
    expect(result.value.recommendedRent).toBe(24000);
    expect(result.value.limitingFactor).toBe("ratio");
  });

  it("same income and ratio but heavy existing debt — the debt cap becomes the binding limit", () => {
    const result = calculateRentAffordability({
      monthlyIncome: 80000,
      existingMonthlyDebt: 28000,
      rentToIncomeRatioPercent: 30,
    });
    expect(result.value.affordableRentByRatio).toBe(24000);
    expect(result.value.affordableRentByDebtCap).toBe(4000);
    expect(result.value.recommendedRent).toBe(4000);
    expect(result.value.limitingFactor).toBe("debt");
  });
});

describe("calculateRentAffordability — boundary cases", () => {
  it("zero existing debt leaves the full 40% headroom, well above a modest ratio", () => {
    const result = calculateRentAffordability({
      monthlyIncome: 50000,
      existingMonthlyDebt: 0,
      rentToIncomeRatioPercent: 25,
    });
    expect(result.value.affordableRentByDebtCap).toBe(20000);
    expect(result.value.affordableRentByRatio).toBe(12500);
    expect(result.value.limitingFactor).toBe("ratio");
  });

  it("debt cap never goes negative even when existing debt exceeds 40% of income", () => {
    const result = calculateRentAffordability({
      monthlyIncome: 40000,
      existingMonthlyDebt: 25000,
      rentToIncomeRatioPercent: 30,
    });
    expect(result.value.affordableRentByDebtCap).toBe(0);
    expect(result.value.recommendedRent).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRentAffordability({
      monthlyIncome: 80000,
      existingMonthlyDebt: 5000,
      rentToIncomeRatioPercent: 30,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
