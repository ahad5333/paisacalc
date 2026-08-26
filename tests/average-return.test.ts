import { describe, expect, it } from "vitest";
import { calculateAverageReturn } from "@/lib/calc/average-return";

describe("calculateAverageReturn — worked example", () => {
  it("30%, -20%, 25%, -10%, 15% over 5 years", () => {
    const result = calculateAverageReturn({ yearlyReturnsPercent: [30, -20, 25, -10, 15] });
    expect(result.value.arithmeticAveragePercent).toBe(8);
    expect(result.value.cumulativeGrowthPercent).toBe(34.55);
    expect(result.value.cagrPercent).toBe(6.11);
    expect(result.value.volatilityDragPercent).toBe(1.89);
  });
});

describe("calculateAverageReturn — boundary cases", () => {
  it("identical returns every year have zero volatility drag — CAGR equals the average exactly", () => {
    const result = calculateAverageReturn({ yearlyReturnsPercent: [10, 10, 10, 10, 10] });
    expect(result.value.arithmeticAveragePercent).toBe(10);
    expect(result.value.cagrPercent).toBe(10);
    expect(result.value.volatilityDragPercent).toBe(0);
  });

  it("CAGR is always less than or equal to the arithmetic average when returns vary", () => {
    const result = calculateAverageReturn({ yearlyReturnsPercent: [50, -40, 20, -5, 10] });
    expect(result.value.cagrPercent).toBeLessThanOrEqual(result.value.arithmeticAveragePercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateAverageReturn({ yearlyReturnsPercent: [30, -20, 25, -10, 15] });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
