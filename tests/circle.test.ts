import { describe, expect, it } from "vitest";
import { calculateCircle } from "@/lib/calc/circle";

describe("calculateCircle — worked example", () => {
  it("radius 5", () => {
    const result = calculateCircle({ radius: 5 });
    expect(result.value.diameter).toBe(10);
    expect(result.value.circumference).toBeCloseTo(31.4159, 3);
    expect(result.value.area).toBeCloseTo(78.5398, 3);
  });
});

describe("calculateCircle — boundary cases", () => {
  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateCircle({ radius: 5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
