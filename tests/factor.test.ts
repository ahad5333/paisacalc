import { describe, expect, it } from "vitest";
import { calculateFactor } from "@/lib/calc/factor";

describe("calculateFactor — worked example", () => {
  it("factors of 36", () => {
    const result = calculateFactor({ n: 36 });
    expect(result.value.factors).toEqual([1, 2, 3, 4, 6, 9, 12, 18, 36]);
    expect(result.value.isPrime).toBe(false);
    expect(result.value.primeFactorization).toEqual([
      { prime: 2, exponent: 2 },
      { prime: 3, exponent: 2 },
    ]);
  });
});

describe("calculateFactor — boundary cases", () => {
  it("identifies a prime number correctly", () => {
    const result = calculateFactor({ n: 17 });
    expect(result.value.isPrime).toBe(true);
    expect(result.value.factors).toEqual([1, 17]);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFactor({ n: 36 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
