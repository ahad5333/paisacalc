import { describe, expect, it } from "vitest";
import { calculateLcm } from "@/lib/calc/lcm";

describe("calculateLcm — worked example", () => {
  it("lcm(4, 6, 8) = 24", () => {
    const result = calculateLcm({ a: 4, b: 6, c: 8 });
    expect(result.value.lcm).toBe(24);
  });
});

describe("calculateLcm — boundary cases", () => {
  it("lcm of numbers that are all the same is that number", () => {
    const result = calculateLcm({ a: 5, b: 5, c: 5 });
    expect(result.value.lcm).toBe(5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateLcm({ a: 4, b: 6, c: 8 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
