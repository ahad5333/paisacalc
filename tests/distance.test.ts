import { describe, expect, it } from "vitest";
import { calculateDistance } from "@/lib/calc/distance";

describe("calculateDistance — worked example", () => {
  it("(0,0) to (3,4) is distance 5", () => {
    const result = calculateDistance({ x1: 0, y1: 0, x2: 3, y2: 4 });
    expect(result.value.distance).toBe(5);
  });
});

describe("calculateDistance — boundary cases", () => {
  it("the same point twice has distance 0", () => {
    const result = calculateDistance({ x1: 5, y1: 5, x2: 5, y2: 5 });
    expect(result.value.distance).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDistance({ x1: 0, y1: 0, x2: 3, y2: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
