import { describe, expect, it } from "vitest";
import { calculateHalfLife } from "@/lib/calc/half-life";

describe("calculateHalfLife — worked example", () => {
  it("100g, half-life 10 days, after 20 days -> 25g", () => {
    const result = calculateHalfLife({ initialQuantity: 100, halfLife: 10, elapsedTime: 20 });
    expect(result.value.halfLivesElapsed).toBe(2);
    expect(result.value.remainingQuantity).toBe(25);
    expect(result.value.percentRemaining).toBe(25);
  });
});

describe("calculateHalfLife — boundary cases", () => {
  it("zero elapsed time leaves the full quantity", () => {
    const result = calculateHalfLife({ initialQuantity: 100, halfLife: 10, elapsedTime: 0 });
    expect(result.value.remainingQuantity).toBe(100);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHalfLife({ initialQuantity: 100, halfLife: 10, elapsedTime: 20 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
