import { describe, expect, it } from "vitest";
import { calculateNumberSequence } from "@/lib/calc/number-sequence";

describe("calculateNumberSequence — worked example", () => {
  it("arithmetic sequence starting at 2, difference 3, 5 terms", () => {
    const result = calculateNumberSequence({ firstTerm: 2, commonValue: 3, termCount: 5, type: "arithmetic" });
    expect(result.value.terms).toEqual([2, 5, 8, 11, 14]);
    expect(result.value.sum).toBe(40);
  });

  it("geometric sequence starting at 1, ratio 2, 5 terms", () => {
    const result = calculateNumberSequence({ firstTerm: 1, commonValue: 2, termCount: 5, type: "geometric" });
    expect(result.value.terms).toEqual([1, 2, 4, 8, 16]);
    expect(result.value.sum).toBe(31);
  });
});

describe("calculateNumberSequence — boundary cases", () => {
  it("a single-term sequence is just the first term", () => {
    const result = calculateNumberSequence({ firstTerm: 7, commonValue: 3, termCount: 1, type: "arithmetic" });
    expect(result.value.terms).toEqual([7]);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateNumberSequence({ firstTerm: 2, commonValue: 3, termCount: 5, type: "arithmetic" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
