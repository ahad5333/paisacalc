import { describe, expect, it } from "vitest";
import { calculateTimeCalculator } from "@/lib/calc/time-calculator";

describe("calculateTimeCalculator — worked example", () => {
  it("2:30:00 + 1:45:00 = 4:15:00", () => {
    const result = calculateTimeCalculator({ h1: 2, m1: 30, s1: 0, h2: 1, m2: 45, s2: 0, operation: "add" });
    expect(result.value.hours).toBe(4);
    expect(result.value.minutes).toBe(15);
    expect(result.value.negative).toBe(false);
  });
});

describe("calculateTimeCalculator — boundary cases", () => {
  it("subtracting a larger time gives a negative result", () => {
    const result = calculateTimeCalculator({ h1: 1, m1: 0, s1: 0, h2: 2, m2: 0, s2: 0, operation: "subtract" });
    expect(result.value.negative).toBe(true);
    expect(result.value.hours).toBe(1);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateTimeCalculator({ h1: 2, m1: 30, s1: 0, h2: 1, m2: 45, s2: 0, operation: "add" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
