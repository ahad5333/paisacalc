import { describe, expect, it } from "vitest";
import { calculateMulch } from "@/lib/calc/mulch";

describe("calculateMulch — worked example", () => {
  it("100 sq ft at 3in depth", () => {
    const result = calculateMulch({ areaSqft: 100, depthInches: 3 });
    expect(result.value.cubicFeet).toBe(25);
    expect(result.value.bags).toBe(13);
  });
});

describe("calculateMulch — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMulch({ areaSqft: 100, depthInches: 3 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
