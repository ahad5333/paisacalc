import { describe, expect, it } from "vitest";
import { calculateConversionLength } from "@/lib/calc/conversion-length";

describe("calculateConversionLength — worked example", () => {
  it("1 mile in km", () => {
    const result = calculateConversionLength({ value: 1, fromUnit: "mi", toUnit: "km" });
    expect(result.value.result).toBeCloseTo(1.609344, 5);
  });

  it("100 cm in m", () => {
    const result = calculateConversionLength({ value: 100, fromUnit: "cm", toUnit: "m" });
    expect(result.value.result).toBe(1);
  });
});

describe("calculateConversionLength — boundary cases", () => {
  it("converting to the same unit is a no-op", () => {
    const result = calculateConversionLength({ value: 42, fromUnit: "ft", toUnit: "ft" });
    expect(result.value.result).toBe(42);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateConversionLength({ value: 1, fromUnit: "mi", toUnit: "km" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
