import { describe, expect, it } from "vitest";
import { calculateNpsCorpus } from "@/lib/calc/nps";

// Accumulation-phase corpus figures come from calculateSipReturns, already
// covered by tests/sip.test.ts — these tests focus on the NPS-specific
// exit-tier logic (PFRDA Exits and Withdrawals Regulations, 2025), each
// case picked to land in a specific tier.
describe("calculateNpsCorpus — exit-tier rules", () => {
  it("corpus at or below ₹8L: 100% lump sum, no annuity", () => {
    const result = calculateNpsCorpus({ monthlyContribution: 2000, annualReturnPercent: 8, years: 5 });
    expect(result.value.corpus).toBeLessThanOrEqual(800000);
    expect(result.value.lumpSum).toBe(result.value.corpus);
    expect(result.value.annuityAmount).toBe(0);
    expect(result.value.annuityPercent).toBe(0);
  });

  it("corpus between ₹8L and ₹12L: ₹6L lump sum, remainder to annuity", () => {
    const result = calculateNpsCorpus({ monthlyContribution: 6000, annualReturnPercent: 8, years: 10 });
    expect(result.value.corpus).toBeGreaterThan(800000);
    expect(result.value.corpus).toBeLessThanOrEqual(1200000);
    expect(result.value.lumpSum).toBe(600000);
    expect(result.value.annuityAmount).toBe(result.value.corpus - 600000);
  });

  it("corpus above ₹12L: 80% lump sum, 20% annuity", () => {
    const result = calculateNpsCorpus({ monthlyContribution: 5000, annualReturnPercent: 10, years: 25 });
    expect(result.value.corpus).toBeGreaterThan(1200000);
    expect(result.value.annuityPercent).toBe(20);
    expect(result.value.lumpSum).toBe(Math.round(result.value.corpus * 0.8));
    expect(result.value.lumpSum + result.value.annuityAmount).toBe(result.value.corpus);
  });

  it("lump sum plus annuity always sums to the full corpus, across all tiers", () => {
    const cases = [
      { monthlyContribution: 2000, annualReturnPercent: 8, years: 5 },
      { monthlyContribution: 6000, annualReturnPercent: 8, years: 10 },
      { monthlyContribution: 5000, annualReturnPercent: 10, years: 25 },
    ];
    for (const inputs of cases) {
      const result = calculateNpsCorpus(inputs);
      expect(result.value.lumpSum + result.value.annuityAmount).toBe(result.value.corpus);
    }
  });
});

describe("calculateNpsCorpus — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateNpsCorpus({ monthlyContribution: 5000, annualReturnPercent: 10, years: 25 });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
