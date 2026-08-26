import { describe, expect, it } from "vitest";
import { calculateSlope } from "@/lib/calc/slope";

describe("calculateSlope — worked example", () => {
  it("(1,2) to (4,8) has slope 2", () => {
    const result = calculateSlope({ x1: 1, y1: 2, x2: 4, y2: 8 });
    expect(result.value.slope).toBe(2);
    expect(result.value.intercept).toBe(0);
  });
});

describe("calculateSlope — boundary cases", () => {
  it("a vertical line has an undefined (null) slope", () => {
    const result = calculateSlope({ x1: 3, y1: 1, x2: 3, y2: 9 });
    expect(result.value.slope).toBeNull();
  });

  it("distance matches the Pythagorean theorem", () => {
    const result = calculateSlope({ x1: 0, y1: 0, x2: 3, y2: 4 });
    expect(result.value.distance).toBe(5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSlope({ x1: 1, y1: 2, x2: 4, y2: 8 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
