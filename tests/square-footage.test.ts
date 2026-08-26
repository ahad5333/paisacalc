import { describe, expect, it } from "vitest";
import { calculateSquareFootage } from "@/lib/calc/square-footage";

describe("calculateSquareFootage — worked example", () => {
  it("12ft x 10ft at $5/sqft", () => {
    const result = calculateSquareFootage({ lengthFt: 12, widthFt: 10, costPerSqft: 5 });
    expect(result.value.squareFeet).toBe(120);
    expect(result.value.totalCost).toBe(600);
  });
});

describe("calculateSquareFootage — boundary cases", () => {
  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateSquareFootage({ lengthFt: 12, widthFt: 10, costPerSqft: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
