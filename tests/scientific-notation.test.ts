import { describe, expect, it } from "vitest";
import { calculateScientificNotation } from "@/lib/calc/scientific-notation";

describe("calculateScientificNotation — worked example", () => {
  it("1,234,000 to scientific notation", () => {
    const result = calculateScientificNotation({ direction: "toScientific", decimalValue: 1234000, mantissa: 0, exponent: 0 });
    expect(result.value.mantissa).toBe(1.234);
    expect(result.value.exponent).toBe(6);
  });

  it("3.5 × 10^4 to decimal", () => {
    const result = calculateScientificNotation({ direction: "toDecimal", decimalValue: 0, mantissa: 3.5, exponent: 4 });
    expect(result.value.decimal).toBe(35000);
  });
});

describe("calculateScientificNotation — boundary cases", () => {
  it("handles a small decimal (negative exponent)", () => {
    const result = calculateScientificNotation({ direction: "toScientific", decimalValue: 0.00045, mantissa: 0, exponent: 0 });
    expect(result.value.mantissa).toBeCloseTo(4.5, 5);
    expect(result.value.exponent).toBe(-4);
  });

  it("zero maps to a zero mantissa", () => {
    const result = calculateScientificNotation({ direction: "toScientific", decimalValue: 0, mantissa: 0, exponent: 0 });
    expect(result.value.mantissa).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateScientificNotation({ direction: "toScientific", decimalValue: 1234000, mantissa: 0, exponent: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
