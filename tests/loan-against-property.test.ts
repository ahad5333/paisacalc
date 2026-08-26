import { describe, expect, it } from "vitest";
import { calculateLoanAgainstProperty } from "@/lib/calc/loan-against-property";

describe("calculateLoanAgainstProperty — worked example", () => {
  it("₹80L property, 60% LTV, 10.5% rate, 10-year tenure", () => {
    const result = calculateLoanAgainstProperty({
      propertyValue: 8000000,
      ltvPercent: 60,
      ratePercent: 10.5,
      tenureYears: 10,
    });
    expect(result.value.loanAmount).toBe(4800000);
    expect(result.value.emi).toBe(64769);
    expect(result.value.totalInterest).toBe(2972233);
    expect(result.value.totalPayment).toBe(7772233);
  });
});

describe("calculateLoanAgainstProperty — boundary cases", () => {
  it("a higher LTV produces a proportionally larger loan amount", () => {
    const low = calculateLoanAgainstProperty({ propertyValue: 5000000, ltvPercent: 50, ratePercent: 10, tenureYears: 10 });
    const high = calculateLoanAgainstProperty({ propertyValue: 5000000, ltvPercent: 70, ratePercent: 10, tenureYears: 10 });
    expect(high.value.loanAmount).toBeGreaterThan(low.value.loanAmount);
    expect(high.value.emi).toBeGreaterThan(low.value.emi);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateLoanAgainstProperty({
      propertyValue: 8000000,
      ltvPercent: 60,
      ratePercent: 10.5,
      tenureYears: 10,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
