import { describe, expect, it } from "vitest";
import { calculateRightTriangle } from "@/lib/calc/right-triangle";

describe("calculateRightTriangle — worked example", () => {
  it("legs 3 and 4 give hypotenuse 5", () => {
    const result = calculateRightTriangle({ legA: 3, legB: 4 });
    expect(result.value.hypotenuse).toBe(5);
    expect(result.value.area).toBe(6);
    expect(result.value.perimeter).toBe(12);
  });
});

describe("calculateRightTriangle — boundary cases", () => {
  it("the two non-right angles sum to 90 degrees", () => {
    const result = calculateRightTriangle({ legA: 5, legB: 8 });
    expect(result.value.angleA + result.value.angleB).toBeCloseTo(90, 5);
  });

  it("equal legs give a 45-45-90 triangle", () => {
    const result = calculateRightTriangle({ legA: 5, legB: 5 });
    expect(result.value.angleA).toBeCloseTo(45, 5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRightTriangle({ legA: 3, legB: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
