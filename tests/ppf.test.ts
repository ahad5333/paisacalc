import { describe, expect, it } from "vitest";
import { calculatePpfMaturity } from "@/lib/calc/ppf";

// The ₹1,50,000/7.1%/15yr case is a widely-published reference figure
// (₹40,68,209) — verified against it directly. A second published figure
// initially checked against (₹1,00,000/year → ₹31,17,276) turned out to
// use a stale 8.7% historical rate rather than the current 7.1% as its
// source implied; found by solving for the rate that actually produces
// that number, not trusted at face value. See lib/calc/ppf.ts for detail.
describe("calculatePpfMaturity — worked examples", () => {
  it("₹1,50,000/year @ 7.1% / 15 years — matches the widely-published reference figure", () => {
    const result = calculatePpfMaturity({ annualInvestment: 150000, annualRatePercent: 7.1, years: 15 });
    expect(result.value.maturityAmount).toBe(4068209);
    expect(result.value.totalInvested).toBe(2250000);
    expect(result.value.interestEarned).toBe(1818209);
  });

  it("₹50,000/year @ 7.1% / 15 years", () => {
    const result = calculatePpfMaturity({ annualInvestment: 50000, annualRatePercent: 7.1, years: 15 });
    expect(result.value.maturityAmount).toBe(1356070);
  });

  it("₹1,50,000/year @ 7.1% / 20 years (extended tenure)", () => {
    const result = calculatePpfMaturity({ annualInvestment: 150000, annualRatePercent: 7.1, years: 20 });
    expect(result.value.maturityAmount).toBe(6658288);
  });

  it("zero interest: maturity equals total invested", () => {
    const result = calculatePpfMaturity({ annualInvestment: 100000, annualRatePercent: 0, years: 15 });
    expect(result.value.maturityAmount).toBe(1500000);
    expect(result.value.interestEarned).toBe(0);
  });
});

describe("calculatePpfMaturity — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePpfMaturity({ annualInvestment: 150000, annualRatePercent: 7.1, years: 15 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
