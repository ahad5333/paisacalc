import { describe, expect, it } from "vitest";
import { calculateMeanMedianMode } from "@/lib/calc/mean-median-mode";

describe("calculateMeanMedianMode — worked example", () => {
  it("[1,2,2,3,4]", () => {
    const result = calculateMeanMedianMode({ values: [1, 2, 2, 3, 4] });
    expect(result.value.meanValue).toBe(2.4);
    expect(result.value.medianValue).toBe(2);
    expect(result.value.modeValues).toEqual([2]);
    expect(result.value.rangeValue).toBe(3);
  });
});

describe("calculateMeanMedianMode — boundary cases", () => {
  it("median of an even-length list averages the two middle values", () => {
    const result = calculateMeanMedianMode({ values: [1, 2, 3, 4] });
    expect(result.value.medianValue).toBe(2.5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMeanMedianMode({ values: [1, 2, 2, 3, 4] });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
