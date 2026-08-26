import { describe, expect, it } from "vitest";
import { calculateExponent } from "@/lib/calc/exponent";

describe("calculateExponent — worked example", () => {
  it("2^10 = 1024", () => {
    const result = calculateExponent({ base: 2, exponent: 10 });
    expect(result.value.result).toBe(1024);
  });
});

describe("calculateExponent — boundary cases", () => {
  it("negative exponent gives a fraction", () => {
    const result = calculateExponent({ base: 2, exponent: -2 });
    expect(result.value.result).toBe(0.25);
  });

  it("negative base with a non-integer exponent is NaN", () => {
    const result = calculateExponent({ base: -4, exponent: 0.5 });
    expect(Number.isNaN(result.value.result)).toBe(true);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateExponent({ base: 2, exponent: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
