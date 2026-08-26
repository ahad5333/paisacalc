import { describe, expect, it } from "vitest";
import { calculateInterest } from "@/lib/calc/interest-calculator";

describe("calculateInterest — worked example", () => {
  it("₹1L principal, 7%, 5 years, ₹5,000/month contribution, quarterly compounding", () => {
    const result = calculateInterest({
      principal: 100000,
      ratePercent: 7,
      years: 5,
      monthlyContribution: 5000,
      compoundingPerYear: 4,
    });
    expect(result.value.totalContributions).toBe(400000);
    expect(result.value.maturityValue).toBe(503224);
    expect(result.value.totalInterest).toBe(103224);
  });
});

describe("calculateInterest — boundary cases", () => {
  it("zero contribution matches the standard closed-form compound interest formula", () => {
    const result = calculateInterest({
      principal: 100000,
      ratePercent: 8,
      years: 3,
      monthlyContribution: 0,
      compoundingPerYear: 1,
    });
    // 100000 × 1.08^3 = 125971.2
    expect(result.value.maturityValue).toBe(125971);
  });

  it("more frequent compounding produces a higher maturity value at the same nominal rate", () => {
    const annual = calculateInterest({ principal: 100000, ratePercent: 8, years: 5, monthlyContribution: 0, compoundingPerYear: 1 });
    const quarterly = calculateInterest({ principal: 100000, ratePercent: 8, years: 5, monthlyContribution: 0, compoundingPerYear: 4 });
    expect(quarterly.value.maturityValue).toBeGreaterThan(annual.value.maturityValue);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateInterest({
      principal: 100000,
      ratePercent: 7,
      years: 5,
      monthlyContribution: 5000,
      compoundingPerYear: 4,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
