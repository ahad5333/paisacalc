import { describe, expect, it } from "vitest";
import { calculateFdMaturity, calculateRdMaturity } from "@/lib/calc/deposits";

// FD is unambiguous, universally-agreed compound interest — these fixtures
// are hand-computed directly from A = P × (1 + r/4/100)^(4t), not sourced
// from a third-party worked example (there's no formula ambiguity here to
// cross-check against, unlike RD below).
describe("calculateFdMaturity — hand-computed worked examples", () => {
  it("₹1,00,000 @ 7% / 1 year", () => {
    const result = calculateFdMaturity({ principal: 100000, annualRatePercent: 7, years: 1 });
    expect(result.value.maturityAmount).toBe(107186);
    expect(result.value.interestEarned).toBe(7186);
  });

  it("₹5,00,000 @ 6.5% / 5 years", () => {
    const result = calculateFdMaturity({ principal: 500000, annualRatePercent: 6.5, years: 5 });
    expect(result.value.maturityAmount).toBe(690210);
    expect(result.value.interestEarned).toBe(190210);
  });

  it("₹2,00,000 @ 8% / 3 years", () => {
    const result = calculateFdMaturity({ principal: 200000, annualRatePercent: 8, years: 3 });
    expect(result.value.maturityAmount).toBe(253648);
  });

  it("zero interest: maturity equals principal", () => {
    const result = calculateFdMaturity({ principal: 100000, annualRatePercent: 0, years: 2 });
    expect(result.value.maturityAmount).toBe(100000);
    expect(result.value.interestEarned).toBe(0);
  });

  it("single quarter (0.25 years)", () => {
    const result = calculateFdMaturity({ principal: 100000, annualRatePercent: 7, years: 0.25 });
    expect(result.value.maturityAmount).toBe(101750);
  });
});

// RD's IBA-prescribed formula is specialised enough that a single source
// isn't trusted on its own (PRD §7.3 discipline). Every fixture here was
// verified two independent ways before being used: (1) the formula
// structure itself matches three independently published statements of it
// (Wikipedia's "Recurring deposit" article, Groww, ClearTax all state the
// same M = R[(1+i)ⁿ−1]/(1−(1+i)^(−⅓))), and (2) each specific number below
// was cross-checked against an algebraically equivalent
// future-value-of-annuity-due calculation (monthly-equivalent rate derived
// from the quarterly rate) — both derivations agree to the rupee on every
// case here.
describe("calculateRdMaturity — cross-verified worked examples", () => {
  it("₹5,000/month @ 7% / 12 months", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 5000, annualRatePercent: 7, months: 12 });
    expect(result.value.maturityAmount).toBe(62311);
    expect(result.value.totalDeposited).toBe(60000);
    expect(result.value.interestEarned).toBe(2311);
  });

  it("₹2,000/month @ 6.5% / 24 months", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 2000, annualRatePercent: 6.5, months: 24 });
    expect(result.value.maturityAmount).toBe(51370);
  });

  it("₹10,000/month @ 8% / 36 months", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 10000, annualRatePercent: 8, months: 36 });
    expect(result.value.maturityAmount).toBe(407716);
  });

  it("₹1,000/month @ 6% / 6 months (shortest realistic tenure)", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 1000, annualRatePercent: 6, months: 6 });
    expect(result.value.maturityAmount).toBe(6105);
  });

  it("zero interest: maturity equals total deposited", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 5000, annualRatePercent: 0, months: 12 });
    expect(result.value.maturityAmount).toBe(60000);
    expect(result.value.interestEarned).toBe(0);
  });
});

describe("calculateFdMaturity and calculateRdMaturity — derivation and metadata", () => {
  it("FD returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateFdMaturity({ principal: 100000, annualRatePercent: 7, years: 1 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });

  it("RD returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateRdMaturity({ monthlyDeposit: 5000, annualRatePercent: 7, months: 12 });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
