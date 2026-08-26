import { describe, expect, it } from "vitest";
import { calculateSimpleInterest } from "@/lib/calc/simple-interest";

describe("calculateSimpleInterest — worked example", () => {
  it("₹2,00,000 at 8% for 3 years", () => {
    const result = calculateSimpleInterest({ principal: 200000, ratePercent: 8, years: 3 });
    expect(result.value.interest).toBe(48000);
    expect(result.value.maturityValue).toBe(248000);
  });
});

describe("calculateSimpleInterest — boundary cases", () => {
  it("interest grows linearly with time, unlike compound interest", () => {
    const oneYear = calculateSimpleInterest({ principal: 100000, ratePercent: 10, years: 1 });
    const twoYears = calculateSimpleInterest({ principal: 100000, ratePercent: 10, years: 2 });
    expect(twoYears.value.interest).toBe(oneYear.value.interest * 2);
  });

  it("zero rate produces zero interest and maturity equal to principal", () => {
    const result = calculateSimpleInterest({ principal: 50000, ratePercent: 0, years: 5 });
    expect(result.value.interest).toBe(0);
    expect(result.value.maturityValue).toBe(50000);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSimpleInterest({ principal: 200000, ratePercent: 8, years: 3 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
