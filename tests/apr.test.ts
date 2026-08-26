import { describe, expect, it } from "vitest";
import { calculateApr } from "@/lib/calc/apr";
import { calculateEmi } from "@/lib/calc/emi";

describe("calculateApr — worked example", () => {
  it("₹5L loan, 12% stated rate, 3 years, 2% processing fee", () => {
    const result = calculateApr({
      loanAmount: 500000,
      statedRatePercent: 12,
      tenureYears: 3,
      processingFeePercent: 2,
    });
    expect(result.value.emi).toBe(16607);
    expect(result.value.processingFee).toBe(10000);
    expect(result.value.netDisbursement).toBe(490000);
    expect(result.value.aprPercent).toBe(13.41);
  });
});

describe("calculateApr — boundary cases", () => {
  it("zero processing fee makes APR converge on the stated rate", () => {
    const result = calculateApr({
      loanAmount: 500000,
      statedRatePercent: 10,
      tenureYears: 5,
      processingFeePercent: 0,
    });
    expect(result.value.aprPercent).toBeCloseTo(10, 1);
  });

  it("the solved APR's EMI-on-net-disbursement matches the actual EMI (internal consistency check)", () => {
    const result = calculateApr({
      loanAmount: 800000,
      statedRatePercent: 9,
      tenureYears: 4,
      processingFeePercent: 1.5,
    });
    const reconstructed = calculateEmi({
      principal: result.value.netDisbursement,
      annualRatePercent: result.value.aprPercent,
      tenureMonths: 48,
    });
    expect(Math.abs(reconstructed.value.emi - result.value.emi)).toBeLessThanOrEqual(5);
  });

  it("a higher processing fee produces a higher APR for the same stated rate", () => {
    const lowFee = calculateApr({ loanAmount: 500000, statedRatePercent: 11, tenureYears: 3, processingFeePercent: 1 });
    const highFee = calculateApr({ loanAmount: 500000, statedRatePercent: 11, tenureYears: 3, processingFeePercent: 3 });
    expect(highFee.value.aprPercent).toBeGreaterThan(lowFee.value.aprPercent);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateApr({
      loanAmount: 500000,
      statedRatePercent: 12,
      tenureYears: 3,
      processingFeePercent: 2,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
