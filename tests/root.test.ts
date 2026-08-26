import { describe, expect, it } from "vitest";
import { calculateRoot } from "@/lib/calc/root";

describe("calculateRoot — worked example", () => {
  it("cube root of 27 = 3", () => {
    const result = calculateRoot({ value: 27, degree: 3 });
    expect(result.value.result).toBe(3);
  });
});

describe("calculateRoot — boundary cases", () => {
  it("cube root of -8 = -2", () => {
    const result = calculateRoot({ value: -8, degree: 3 });
    expect(result.value.result).toBe(-2);
  });

  it("square root of a negative number is NaN", () => {
    const result = calculateRoot({ value: -4, degree: 2 });
    expect(Number.isNaN(result.value.result)).toBe(true);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRoot({ value: 27, degree: 3 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
