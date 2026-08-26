import { describe, expect, it } from "vitest";
import { calculateFraction } from "@/lib/calc/fraction";

describe("calculateFraction — worked example", () => {
  it("1/2 + 1/3 = 5/6", () => {
    const result = calculateFraction({ num1: 1, den1: 2, num2: 1, den2: 3, operation: "add" });
    expect(result.value.resultNum).toBe(5);
    expect(result.value.resultDen).toBe(6);
    expect(result.value.decimal).toBeCloseTo(0.8333, 3);
  });
});

describe("calculateFraction — boundary cases", () => {
  it("simplifies 2/4 × 1/2 down to lowest terms", () => {
    const result = calculateFraction({ num1: 2, den1: 4, num2: 1, den2: 2, operation: "multiply" });
    expect(result.value.resultNum).toBe(1);
    expect(result.value.resultDen).toBe(4);
  });

  it("division keeps the denominator positive", () => {
    const result = calculateFraction({ num1: 1, den1: 2, num2: -1, den2: 3, operation: "divide" });
    expect(result.value.resultDen).toBeGreaterThan(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFraction({ num1: 1, den1: 2, num2: 1, den2: 3, operation: "add" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
