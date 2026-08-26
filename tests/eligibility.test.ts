import { describe, expect, it } from "vitest";
import { calculateEligibility } from "@/lib/calc/eligibility";
import { calculateEmi } from "@/lib/calc/emi";

describe("calculateEligibility — hand-computed worked examples", () => {
  it("₹1,00,000 income, no existing EMI, 50% FOIR, 8.5% / 240 months", () => {
    const result = calculateEligibility({
      netMonthlyIncome: 100000,
      existingMonthlyEmi: 0,
      foirPercent: 50,
      annualRatePercent: 8.5,
      tenureMonths: 240,
    });
    expect(result.value.maxAffordableEmi).toBe(50000);
    expect(result.value.maxLoanAmount).toBe(5761542);
  });

  it("₹1,50,000 income, ₹15,000 existing EMI, 50% FOIR, 8.5% / 240 months", () => {
    const result = calculateEligibility({
      netMonthlyIncome: 150000,
      existingMonthlyEmi: 15000,
      foirPercent: 50,
      annualRatePercent: 8.5,
      tenureMonths: 240,
    });
    expect(result.value.maxAffordableEmi).toBe(60000);
    expect(result.value.maxLoanAmount).toBe(6913850);
  });

  it("existing EMIs exceeding the FOIR cap leave zero affordable EMI, not negative", () => {
    const result = calculateEligibility({
      netMonthlyIncome: 50000,
      existingMonthlyEmi: 40000,
      foirPercent: 40,
      annualRatePercent: 9,
      tenureMonths: 180,
    });
    expect(result.value.maxAffordableEmi).toBe(0);
    expect(result.value.maxLoanAmount).toBe(0);
  });

  it("zero interest rate: max loan is simply EMI × months, no division by zero", () => {
    const result = calculateEligibility({
      netMonthlyIncome: 100000,
      existingMonthlyEmi: 0,
      foirPercent: 50,
      annualRatePercent: 0,
      tenureMonths: 120,
    });
    expect(result.value.maxAffordableEmi).toBe(50000);
    expect(result.value.maxLoanAmount).toBe(6000000);
  });
});

// The max loan amount formula is the algebraic inverse of calculateEmi —
// feeding its own output back through calculateEmi should reproduce the
// original affordable EMI to within a rupee or two of Math.round noise.
describe("calculateEligibility — round-trip against calculateEmi", () => {
  it.each([
    { netMonthlyIncome: 100000, existingMonthlyEmi: 0, foirPercent: 50, annualRatePercent: 8.5, tenureMonths: 240 },
    { netMonthlyIncome: 150000, existingMonthlyEmi: 15000, foirPercent: 50, annualRatePercent: 9, tenureMonths: 180 },
    { netMonthlyIncome: 75000, existingMonthlyEmi: 5000, foirPercent: 45, annualRatePercent: 7.5, tenureMonths: 300 },
  ])("max loan amount, run back through calculateEmi, reproduces the max affordable EMI (%o)", (inputs) => {
    const result = calculateEligibility(inputs);
    const backEmi = calculateEmi({
      principal: result.value.maxLoanAmount,
      annualRatePercent: inputs.annualRatePercent,
      tenureMonths: inputs.tenureMonths,
    }).value.emi;
    expect(Math.abs(backEmi - result.value.maxAffordableEmi)).toBeLessThanOrEqual(2);
  });
});

describe("calculateEligibility — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateEligibility({
      netMonthlyIncome: 100000,
      existingMonthlyEmi: 0,
      foirPercent: 50,
      annualRatePercent: 8.5,
      tenureMonths: 240,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
