import { describe, expect, it } from "vitest";
import { calculateRentalYield } from "@/lib/calc/rental-yield";

describe("calculateRentalYield — worked example", () => {
  it("₹60L property, 25% down, 8.5%/15yr loan, ₹22,000 rent, 1.5% expenses, 5% vacancy", () => {
    const result = calculateRentalYield({
      propertyPrice: 6000000,
      downPaymentPercent: 25,
      loanRatePercent: 8.5,
      loanTenureYears: 15,
      monthlyRent: 22000,
      annualExpensesPercent: 1.5,
      vacancyPercent: 5,
    });
    expect(result.value.downPayment).toBe(1500000);
    expect(result.value.loanAmount).toBe(4500000);
    expect(result.value.emi).toBe(44313);
    expect(result.value.grossAnnualRent).toBe(264000);
    expect(result.value.effectiveAnnualRent).toBe(250800);
    expect(result.value.annualExpenses).toBe(90000);
    expect(result.value.netAnnualIncome).toBe(160800);
    expect(result.value.annualCashFlow).toBe(-370956);
    expect(result.value.monthlyCashFlow).toBe(-30913);
    expect(result.value.grossYieldPercent).toBe(4.4);
    expect(result.value.netYieldPercent).toBe(2.7);
    expect(result.value.cashOnCashReturnPercent).toBe(-24.7);
  });
});

describe("calculateRentalYield — boundary cases", () => {
  it("buying entirely in cash removes the EMI drag on cash flow", () => {
    const result = calculateRentalYield({
      propertyPrice: 6000000,
      downPaymentPercent: 100,
      loanRatePercent: 8.5,
      loanTenureYears: 15,
      monthlyRent: 22000,
      annualExpensesPercent: 1.5,
      vacancyPercent: 5,
    });
    expect(result.value.emi).toBe(0);
    expect(result.value.annualCashFlow).toBe(result.value.netAnnualIncome);
  });

  it("zero vacancy and zero expenses makes net yield equal gross yield", () => {
    const result = calculateRentalYield({
      propertyPrice: 5000000,
      downPaymentPercent: 100,
      loanRatePercent: 8,
      loanTenureYears: 15,
      monthlyRent: 25000,
      annualExpensesPercent: 0,
      vacancyPercent: 0,
    });
    expect(result.value.netYieldPercent).toBe(result.value.grossYieldPercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRentalYield({
      propertyPrice: 6000000,
      downPaymentPercent: 25,
      loanRatePercent: 8.5,
      loanTenureYears: 15,
      monthlyRent: 22000,
      annualExpensesPercent: 1.5,
      vacancyPercent: 5,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
