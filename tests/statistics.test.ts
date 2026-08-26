import { describe, expect, it } from "vitest";
import { calculateStatistics } from "@/lib/calc/statistics";

describe("calculateStatistics — worked example", () => {
  it("full descriptive summary of [2,4,4,4,5,5,7,9]", () => {
    const result = calculateStatistics({ values: [2, 4, 4, 4, 5, 5, 7, 9] });
    expect(result.value.count).toBe(8);
    expect(result.value.meanValue).toBe(5);
    expect(result.value.medianValue).toBe(4.5);
    expect(result.value.modeValues).toEqual([4]);
    expect(result.value.rangeValue).toBe(7);
    expect(result.value.populationStdDev).toBe(2);
  });
});

describe("calculateStatistics — boundary cases", () => {
  it("all-unique values report no mode", () => {
    const result = calculateStatistics({ values: [1, 2, 3, 4, 5] });
    expect(result.value.modeValues).toEqual([]);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateStatistics({ values: [2, 4, 4, 4, 5, 5, 7, 9] });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
