import { describe, expect, it } from "vitest";
import { calculateSipReturns } from "@/lib/calc/sip";

describe("calculateSipReturns — matches the standard annuity-due formula", () => {
  it("₹5,000/month at 12% for 10 years, no step-up", () => {
    // FV = P × ((1+r)^n − 1) ÷ r × (1+r), hand-computed and cross-checked
    // against a published worked example for the same inputs (₹11,61,695)
    // before trusting the month-by-month simulation this function actually
    // runs (needed for step-up SIPs, which have no closed form).
    const result = calculateSipReturns({
      monthlyAmount: 5000,
      annualReturnPercent: 12,
      years: 10,
      stepUpPercent: 0,
    });
    expect(result.value.totalInvested).toBe(600000);
    expect(result.value.finalValue).toBe(1161695);
    expect(result.value.wealthGained).toBe(561695);
  });
});

describe("calculateSipReturns — step-up SIP", () => {
  it("₹10,000/month at 12% for 20 years with a 10% annual step-up roughly doubles a flat SIP", () => {
    // Hand-verified against a published claim that this scenario yields
    // "approximately ₹2 crore" against "the ₹1 crore corpus of a regular
    // ₹10,000/month SIP" — both figures reproduced closely here.
    const stepped = calculateSipReturns({
      monthlyAmount: 10000,
      annualReturnPercent: 12,
      years: 20,
      stepUpPercent: 10,
    });
    const flat = calculateSipReturns({
      monthlyAmount: 10000,
      annualReturnPercent: 12,
      years: 20,
      stepUpPercent: 0,
    });
    expect(flat.value.finalValue).toBeGreaterThan(9900000);
    expect(flat.value.finalValue).toBeLessThan(10100000);
    expect(stepped.value.finalValue).toBeGreaterThan(19500000);
    expect(stepped.value.finalValue).toBeLessThan(20500000);
    expect(stepped.value.finalValue).toBeGreaterThan(flat.value.finalValue);
    expect(stepped.value.totalInvested).toBeGreaterThan(flat.value.totalInvested);
  });

  it("the contribution actually increases at each year boundary", () => {
    const result = calculateSipReturns({
      monthlyAmount: 10000,
      annualReturnPercent: 12,
      years: 3,
      stepUpPercent: 10,
    });
    // Year 1 invested = 10,000 × 12 = 1,20,000
    expect(result.value.yearly[0].invested).toBe(120000);
    // Year 2 invested = year 1 + 11,000 × 12 = 1,20,000 + 1,32,000
    expect(result.value.yearly[1].invested).toBe(252000);
    // Year 3 invested = year 2 + 12,100 × 12 = 2,52,000 + 1,45,200
    expect(result.value.yearly[2].invested).toBe(397200);
  });
});

describe("calculateSipReturns — boundaries", () => {
  it("0% return produces no growth — final value equals total invested", () => {
    const result = calculateSipReturns({
      monthlyAmount: 5000,
      annualReturnPercent: 0,
      years: 5,
      stepUpPercent: 0,
    });
    expect(result.value.finalValue).toBe(result.value.totalInvested);
    expect(result.value.wealthGained).toBe(0);
  });

  it("zero years invests and grows nothing", () => {
    const result = calculateSipReturns({
      monthlyAmount: 5000,
      annualReturnPercent: 12,
      years: 0,
      stepUpPercent: 0,
    });
    expect(result.value.totalInvested).toBe(0);
    expect(result.value.finalValue).toBe(0);
  });

  it("zero monthly amount invests and grows nothing, even with a step-up", () => {
    const result = calculateSipReturns({
      monthlyAmount: 0,
      annualReturnPercent: 12,
      years: 10,
      stepUpPercent: 10,
    });
    expect(result.value.finalValue).toBe(0);
  });

  it("a long duration at a high return does not lose precision or overflow", () => {
    const result = calculateSipReturns({
      monthlyAmount: 50000,
      annualReturnPercent: 15,
      years: 40,
      stepUpPercent: 10,
    });
    expect(Number.isFinite(result.value.finalValue)).toBe(true);
    expect(result.value.finalValue).toBeGreaterThan(result.value.totalInvested);
  });
});

describe("calculateSipReturns — yearly schedule", () => {
  it("produces one point per year, ending at the final value", () => {
    const result = calculateSipReturns({
      monthlyAmount: 5000,
      annualReturnPercent: 12,
      years: 10,
      stepUpPercent: 0,
    });
    expect(result.value.yearly).toHaveLength(10);
    expect(result.value.yearly.at(-1)?.value).toBe(result.value.finalValue);
    expect(result.value.yearly.at(-1)?.invested).toBe(result.value.totalInvested);
  });
});

describe("calculateSipReturns — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSipReturns({
      monthlyAmount: 5000,
      annualReturnPercent: 12,
      years: 10,
      stepUpPercent: 10,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
