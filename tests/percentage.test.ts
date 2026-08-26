import { describe, expect, it } from "vitest";
import { calculatePercentage } from "@/lib/calc/percentage";

describe("calculatePercentage — worked example", () => {
  it("25% of 200 = 50", () => {
    const result = calculatePercentage({ mode: "percentOf", x: 25, y: 200 });
    expect(result.value.result).toBe(50);
  });

  it("50 is what % of 200 -> 25%", () => {
    const result = calculatePercentage({ mode: "whatPercent", x: 50, y: 200 });
    expect(result.value.result).toBe(25);
  });
});

describe("calculatePercentage — boundary cases", () => {
  it("50 is 25% of what -> 200", () => {
    const result = calculatePercentage({ mode: "isPercentOfWhat", x: 50, y: 25 });
    expect(result.value.result).toBe(200);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculatePercentage({ mode: "percentOf", x: 25, y: 200 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
