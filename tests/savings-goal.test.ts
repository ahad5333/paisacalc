import { describe, expect, it } from "vitest";
import { calculateSavingsGoal } from "@/lib/calc/savings-goal";
import { calculateSipReturns } from "@/lib/calc/sip";

describe("calculateSavingsGoal — hand-computed worked examples", () => {
  it("₹20,00,000 goal @ 10% / 5 years", () => {
    const result = calculateSavingsGoal({ goalAmount: 2000000, annualReturnPercent: 10, years: 5 });
    expect(result.value.requiredMonthly).toBe(25614);
  });

  it("zero return: required monthly is simply goal ÷ months", () => {
    const result = calculateSavingsGoal({ goalAmount: 1200000, annualReturnPercent: 0, years: 5 });
    expect(result.value.requiredMonthly).toBe(20000);
    expect(result.value.growthFromReturns).toBe(0);
  });
});

// Round-trip against calculateSipReturns, the forward formula this
// inverts — feeding the required monthly amount back through it should
// reproduce the goal amount to within a few rupees of Math.round noise.
describe("calculateSavingsGoal — round-trip against calculateSipReturns", () => {
  it.each([
    { goalAmount: 2000000, annualReturnPercent: 10, years: 5 },
    { goalAmount: 5000000, annualReturnPercent: 12, years: 15 },
    { goalAmount: 1000000, annualReturnPercent: 8, years: 3 },
  ])("required monthly, run through calculateSipReturns, reproduces the goal (%o)", (inputs) => {
    const result = calculateSavingsGoal(inputs);
    const forward = calculateSipReturns({
      monthlyAmount: result.value.requiredMonthly,
      annualReturnPercent: inputs.annualReturnPercent,
      years: inputs.years,
      stepUpPercent: 0,
    });
    expect(Math.abs(forward.value.finalValue - inputs.goalAmount)).toBeLessThanOrEqual(
      Math.max(2, inputs.goalAmount * 0.0001),
    );
  });
});

describe("calculateSavingsGoal — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSavingsGoal({ goalAmount: 2000000, annualReturnPercent: 10, years: 5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
