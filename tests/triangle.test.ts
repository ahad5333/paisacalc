import { describe, expect, it } from "vitest";
import { calculateTriangle } from "@/lib/calc/triangle";

describe("calculateTriangle — worked example", () => {
  it("a 3-4-5 right triangle", () => {
    const result = calculateTriangle({ a: 3, b: 4, c: 5 });
    expect(result.value.valid).toBe(true);
    expect(result.value.area).toBe(6);
    expect(result.value.angleC).toBeCloseTo(90, 0);
  });
});

describe("calculateTriangle — boundary cases", () => {
  it("angles sum to 180 degrees", () => {
    const result = calculateTriangle({ a: 5, b: 6, c: 7 });
    expect(result.value.angleA + result.value.angleB + result.value.angleC).toBeCloseTo(180, 1);
  });

  it("an invalid triangle (violates triangle inequality) is flagged", () => {
    const result = calculateTriangle({ a: 1, b: 1, c: 10 });
    expect(result.value.valid).toBe(false);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTriangle({ a: 3, b: 4, c: 5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
