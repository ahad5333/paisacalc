import { describe, expect, it } from "vitest";
import { calculateBusinessLoan } from "@/lib/calc/business-loan";

describe("calculateBusinessLoan — worked example", () => {
  it("₹10L loan, 14% rate, 5-year tenure, 2% processing fee", () => {
    const result = calculateBusinessLoan({
      loanAmount: 1000000,
      ratePercent: 14,
      tenureYears: 5,
      processingFeePercent: 2,
    });
    expect(result.value.emi).toBe(23268);
    expect(result.value.totalInterest).toBe(396104);
    expect(result.value.processingFee).toBe(20000);
    expect(result.value.netDisbursement).toBe(980000);
  });
});

describe("calculateBusinessLoan — boundary cases", () => {
  it("zero processing fee leaves net disbursement equal to the loan amount", () => {
    const result = calculateBusinessLoan({ loanAmount: 500000, ratePercent: 12, tenureYears: 3, processingFeePercent: 0 });
    expect(result.value.netDisbursement).toBe(500000);
    expect(result.value.processingFee).toBe(0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBusinessLoan({
      loanAmount: 1000000,
      ratePercent: 14,
      tenureYears: 5,
      processingFeePercent: 2,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
