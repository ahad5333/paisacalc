import { describe, expect, it } from "vitest";
import { calculateZScore } from "@/lib/calc/z-score";

describe("calculateZScore — worked example", () => {
  it("x=70, mean=60, stdDev=10 -> z=1", () => {
    const result = calculateZScore({ x: 70, mean: 60, stdDev: 10 });
    expect(result.value.z).toBe(1);
    expect(result.value.percentile).toBeCloseTo(84.13, 1);
  });
});

describe("calculateZScore — boundary cases", () => {
  it("x equal to the mean gives z=0 and the 50th percentile", () => {
    const result = calculateZScore({ x: 60, mean: 60, stdDev: 10 });
    expect(result.value.z).toBe(0);
    expect(result.value.percentile).toBeCloseTo(50, 0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateZScore({ x: 70, mean: 60, stdDev: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
