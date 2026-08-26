import { describe, expect, it } from "vitest";
import { calculateRounding } from "@/lib/calc/rounding";

describe("calculateRounding — worked example", () => {
  it("2.567 rounded to 2 places, nearest", () => {
    const result = calculateRounding({ value: 2.567, decimalPlaces: 2, mode: "nearest" });
    expect(result.value.result).toBe(2.57);
  });
});

describe("calculateRounding — boundary cases", () => {
  it("rounds up (away from zero) for a positive value", () => {
    const result = calculateRounding({ value: 2.001, decimalPlaces: 0, mode: "up" });
    expect(result.value.result).toBe(3);
  });

  it("rounds down (toward zero) for a positive value", () => {
    const result = calculateRounding({ value: 2.999, decimalPlaces: 0, mode: "down" });
    expect(result.value.result).toBe(2);
  });

  it("negative decimal places round to tens/hundreds", () => {
    const result = calculateRounding({ value: 1234, decimalPlaces: -2, mode: "nearest" });
    expect(result.value.result).toBe(1200);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRounding({ value: 2.567, decimalPlaces: 2, mode: "nearest" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
