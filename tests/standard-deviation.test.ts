import { describe, expect, it } from "vitest";
import { calculateStandardDeviation } from "@/lib/calc/standard-deviation";

describe("calculateStandardDeviation — worked example", () => {
  it("population std dev of [2,4,4,4,5,5,7,9]", () => {
    const result = calculateStandardDeviation({ values: [2, 4, 4, 4, 5, 5, 7, 9], sample: false });
    expect(result.value.meanValue).toBe(5);
    expect(result.value.stdDevValue).toBe(2);
  });
});

describe("calculateStandardDeviation — boundary cases", () => {
  it("sample std dev is larger than population std dev for the same data", () => {
    const values = [2, 4, 4, 4, 5, 5, 7, 9];
    const pop = calculateStandardDeviation({ values, sample: false });
    const sam = calculateStandardDeviation({ values, sample: true });
    expect(sam.value.stdDevValue).toBeGreaterThan(pop.value.stdDevValue);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateStandardDeviation({ values: [2, 4, 4, 4, 5, 5, 7, 9], sample: false });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
