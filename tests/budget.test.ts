import { describe, expect, it } from "vitest";
import { calculateBudget } from "@/lib/calc/budget";

describe("calculateBudget — worked example", () => {
  it("₹60,000 income at the standard 50/30/20 split", () => {
    const result = calculateBudget({ monthlyIncome: 60000, needsPercent: 50, wantsPercent: 30, savingsPercent: 20 });
    expect(result.value.needsAmount).toBe(30000);
    expect(result.value.wantsAmount).toBe(18000);
    expect(result.value.savingsAmount).toBe(12000);
  });
});

describe("calculateBudget — boundary cases", () => {
  it("percentages are fully user-adjustable, not locked to 50/30/20", () => {
    const result = calculateBudget({ monthlyIncome: 60000, needsPercent: 60, wantsPercent: 20, savingsPercent: 20 });
    expect(result.value.needsAmount).toBe(36000);
    expect(result.value.wantsAmount).toBe(12000);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBudget({ monthlyIncome: 60000, needsPercent: 50, wantsPercent: 30, savingsPercent: 20 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
