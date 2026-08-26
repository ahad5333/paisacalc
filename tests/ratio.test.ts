import { describe, expect, it } from "vitest";
import { calculateRatio } from "@/lib/calc/ratio";

describe("calculateRatio — worked example", () => {
  it("2:4 simplifies to 1:2, and 2:4 = 5:d solves d=10", () => {
    const result = calculateRatio({ a: 2, b: 4, c: 5 });
    expect(result.value.simplifiedA).toBe(1);
    expect(result.value.simplifiedB).toBe(2);
    expect(result.value.d).toBe(10);
  });
});

describe("calculateRatio — boundary cases", () => {
  it("a ratio already in lowest terms stays unchanged", () => {
    const result = calculateRatio({ a: 3, b: 7, c: 9 });
    expect(result.value.simplifiedA).toBe(3);
    expect(result.value.simplifiedB).toBe(7);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRatio({ a: 2, b: 4, c: 5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
