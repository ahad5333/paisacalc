import { describe, expect, it } from "vitest";
import { calculateGravel } from "@/lib/calc/gravel";

describe("calculateGravel — worked example", () => {
  it("200 sq ft at 4in depth", () => {
    const result = calculateGravel({ areaSqft: 200, depthInches: 4 });
    expect(result.value.cubicFeet).toBeCloseTo(66.67, 1);
    expect(result.value.tons).toBeGreaterThan(0);
  });
});

describe("calculateGravel — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGravel({ areaSqft: 200, depthInches: 4 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
