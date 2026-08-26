import { describe, expect, it } from "vitest";
import { calculateEducationLoan } from "@/lib/calc/education-loan";
import { calculateEmi } from "@/lib/calc/emi";

describe("calculateEducationLoan — hand-computed worked examples", () => {
  it("₹10,00,000 @ 9.5%, 54-month moratorium, 10-year repayment", () => {
    const result = calculateEducationLoan({
      principal: 1000000,
      annualRatePercent: 9.5,
      moratoriumMonths: 54,
      repaymentYears: 10,
    });
    expect(result.value.accruedInterest).toBe(427500);
    expect(result.value.capitalizedPrincipal).toBe(1427500);
    expect(result.value.emi).toBe(18472);
  });

  it("zero moratorium: capitalised principal equals the original loan amount", () => {
    const result = calculateEducationLoan({
      principal: 500000,
      annualRatePercent: 9,
      moratoriumMonths: 0,
      repaymentYears: 5,
    });
    expect(result.value.accruedInterest).toBe(0);
    expect(result.value.capitalizedPrincipal).toBe(500000);
  });
});

// The post-moratorium EMI phase reuses calculateEmi verbatim — confirm the
// capitalised amount run through it independently reproduces the same EMI.
describe("calculateEducationLoan — EMI-phase consistency with calculateEmi", () => {
  it("matches calculateEmi run directly on the capitalised principal", () => {
    const result = calculateEducationLoan({
      principal: 800000,
      annualRatePercent: 10,
      moratoriumMonths: 36,
      repaymentYears: 8,
    });
    const directEmi = calculateEmi({
      principal: result.value.capitalizedPrincipal,
      annualRatePercent: 10,
      tenureMonths: 96,
    });
    expect(result.value.emi).toBe(directEmi.value.emi);
  });
});

describe("calculateEducationLoan — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateEducationLoan({
      principal: 1000000,
      annualRatePercent: 9.5,
      moratoriumMonths: 54,
      repaymentYears: 10,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
