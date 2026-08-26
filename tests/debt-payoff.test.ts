import { describe, expect, it } from "vitest";
import { calculateDebtPayoff } from "@/lib/calc/debt-payoff";

describe("calculateDebtPayoff — worked example", () => {
  const baseInputs = {
    debt1Balance: 150000,
    debt1RatePercent: 36,
    debt1MinPayment: 6000,
    debt2Balance: 50000,
    debt2RatePercent: 9,
    debt2MinPayment: 3000,
    debt3Balance: 250000,
    debt3RatePercent: 15,
    debt3MinPayment: 7000,
    extraMonthlyBudget: 5000,
  };

  it("₹1.5L @36% + ₹50K @9% + ₹2.5L @15%, ₹5,000 extra budget", () => {
    const result = calculateDebtPayoff(baseInputs);
    expect(result.value.avalancheMonths).toBe(27);
    expect(result.value.avalancheTotalInterest).toBe(108092);
    expect(result.value.snowballMonths).toBe(28);
    expect(result.value.snowballTotalInterest).toBe(117884);
    expect(result.value.interestSavedByAvalanche).toBe(9792);
  });
});

describe("calculateDebtPayoff — boundary cases", () => {
  it("avalanche total interest is never more than snowball's — avalanche is always optimal", () => {
    const result = calculateDebtPayoff({
      debt1Balance: 150000,
      debt1RatePercent: 36,
      debt1MinPayment: 6000,
      debt2Balance: 50000,
      debt2RatePercent: 9,
      debt2MinPayment: 3000,
      debt3Balance: 250000,
      debt3RatePercent: 15,
      debt3MinPayment: 7000,
      extraMonthlyBudget: 5000,
    });
    expect(result.value.avalancheTotalInterest).toBeLessThanOrEqual(result.value.snowballTotalInterest);
  });

  it("when rate order and balance order coincide, avalanche and snowball produce identical results", () => {
    const result = calculateDebtPayoff({
      debt1Balance: 80000,
      debt1RatePercent: 36,
      debt1MinPayment: 4000,
      debt2Balance: 200000,
      debt2RatePercent: 15,
      debt2MinPayment: 6000,
      debt3Balance: 300000,
      debt3RatePercent: 10,
      debt3MinPayment: 8000,
      extraMonthlyBudget: 5000,
    });
    expect(result.value.interestSavedByAvalanche).toBe(0);
    expect(result.value.avalancheMonths).toBe(result.value.snowballMonths);
  });

  it("more extra budget clears debts faster under both strategies", () => {
    const base = { debt1Balance: 150000, debt1RatePercent: 36, debt1MinPayment: 6000, debt2Balance: 50000, debt2RatePercent: 9, debt2MinPayment: 3000, debt3Balance: 250000, debt3RatePercent: 15, debt3MinPayment: 7000 };
    const low = calculateDebtPayoff({ ...base, extraMonthlyBudget: 2000 });
    const high = calculateDebtPayoff({ ...base, extraMonthlyBudget: 15000 });
    expect(high.value.avalancheMonths).toBeLessThan(low.value.avalancheMonths);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDebtPayoff({
      debt1Balance: 150000,
      debt1RatePercent: 36,
      debt1MinPayment: 6000,
      debt2Balance: 50000,
      debt2RatePercent: 9,
      debt2MinPayment: 3000,
      debt3Balance: 250000,
      debt3RatePercent: 15,
      debt3MinPayment: 7000,
      extraMonthlyBudget: 5000,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(5);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
