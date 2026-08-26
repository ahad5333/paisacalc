import { describe, expect, it } from "vitest";
import { calculateStair } from "@/lib/calc/stair";

describe("calculateStair — worked example", () => {
  it("108in rise, 120in run, 16 steps", () => {
    const result = calculateStair({ totalRiseInches: 108, totalRunInches: 120, numSteps: 16 });
    expect(result.value.riserHeight).toBe(6.75);
    expect(result.value.riserOk).toBe(true);
  });
});

describe("calculateStair — boundary cases", () => {
  it("flags a riser height outside the typical code range", () => {
    const result = calculateStair({ totalRiseInches: 108, totalRunInches: 120, numSteps: 8 });
    expect(result.value.riserOk).toBe(false);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateStair({ totalRiseInches: 108, totalRunInches: 120, numSteps: 16 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
