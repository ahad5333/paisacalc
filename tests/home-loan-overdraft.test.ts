import { describe, expect, it } from "vitest";
import { calculateHomeLoanOverdraft } from "@/lib/calc/home-loan-overdraft";

describe("calculateHomeLoanOverdraft — worked example", () => {
  it("₹50L loan, 9%, 20 years, ₹5L parked surplus", () => {
    const result = calculateHomeLoanOverdraft({
      loanAmount: 5000000,
      ratePercent: 9,
      tenureYears: 20,
      parkedSurplus: 500000,
    });
    expect(result.value.regularEmi).toBe(44986);
    expect(result.value.regularTotalInterest).toBe(5796818);
    expect(result.value.odTotalInterest).toBe(3851971);
    expect(result.value.odMonthsToPayoff).toBe(197);
    expect(result.value.interestSaved).toBe(1944847);
    expect(result.value.tenureReductionMonths).toBe(43);
  });
});

describe("calculateHomeLoanOverdraft — boundary cases", () => {
  it("zero parked surplus behaves identically to a regular loan", () => {
    const result = calculateHomeLoanOverdraft({
      loanAmount: 3000000,
      ratePercent: 8.5,
      tenureYears: 15,
      parkedSurplus: 0,
    });
    expect(result.value.interestSaved).toBe(0);
    expect(result.value.tenureReductionMonths).toBe(0);
    expect(result.value.odMonthsToPayoff).toBe(180);
  });

  it("more parked surplus saves more interest and more tenure", () => {
    const lowSurplus = calculateHomeLoanOverdraft({ loanAmount: 4000000, ratePercent: 9, tenureYears: 15, parkedSurplus: 200000 });
    const highSurplus = calculateHomeLoanOverdraft({ loanAmount: 4000000, ratePercent: 9, tenureYears: 15, parkedSurplus: 800000 });
    expect(highSurplus.value.interestSaved).toBeGreaterThan(lowSurplus.value.interestSaved);
    expect(highSurplus.value.tenureReductionMonths).toBeGreaterThan(lowSurplus.value.tenureReductionMonths);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHomeLoanOverdraft({
      loanAmount: 5000000,
      ratePercent: 9,
      tenureYears: 20,
      parkedSurplus: 500000,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
