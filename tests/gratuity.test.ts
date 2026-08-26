import { describe, expect, it } from "vitest";
import { calculateGratuity } from "@/lib/calc/gratuity";

describe("calculateGratuity — the 15/26 formula", () => {
  it("₹50,000 monthly salary, 10 years, covered under the Act", () => {
    // (50,000 × 15 × 10) ÷ 26, hand-verified — the same formula already
    // sourced for lib/calc/in-hand-salary.ts's CTC gratuity provisioning
    // (Payment of Gratuity Act, 1972, Section 4(2)).
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 10,
      coveredUnderAct: true,
    });
    expect(result.value.isEligible).toBe(true);
    expect(result.value.computedGratuity).toBe(288462);
    expect(result.value.gratuityPayable).toBe(288462);
    expect(result.value.taxExempt).toBe(288462);
    expect(result.value.taxableGratuity).toBe(0);
  });

  it("employers not covered under the Act use a 30-day divisor instead of 26", () => {
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 10,
      coveredUnderAct: false,
    });
    expect(result.value.computedGratuity).toBe(250000);
  });
});

describe("calculateGratuity — the ₹20L ceiling", () => {
  it("caps the payable and exempt amount even when the formula computes more", () => {
    const result = calculateGratuity({
      monthlySalary: 500000,
      yearsOfService: 30,
      coveredUnderAct: true,
    });
    expect(result.value.computedGratuity).toBe(8653846);
    expect(result.value.gratuityPayable).toBe(2000000);
    expect(result.value.taxExempt).toBe(2000000);
    expect(result.value.taxableGratuity).toBe(0);
  });
});

describe("calculateGratuity — 5-year eligibility", () => {
  it("fewer than 5 years of service means no gratuity at all", () => {
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 4.9,
      coveredUnderAct: true,
    });
    expect(result.value.isEligible).toBe(false);
    expect(result.value.gratuityPayable).toBe(0);
    expect(result.value.taxExempt).toBe(0);
    // The formula still computes a value even when ineligible — the
    // derivation should show what was calculated, not hide it.
    expect(result.value.computedGratuity).toBeGreaterThan(0);
  });

  it("exactly 5 years is eligible", () => {
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 5,
      coveredUnderAct: true,
    });
    expect(result.value.isEligible).toBe(true);
    expect(result.value.gratuityPayable).toBeGreaterThan(0);
  });
});

describe("calculateGratuity — boundaries", () => {
  it("zero salary produces zero gratuity without crashing", () => {
    const result = calculateGratuity({
      monthlySalary: 0,
      yearsOfService: 10,
      coveredUnderAct: true,
    });
    expect(result.value.gratuityPayable).toBe(0);
  });

  it("zero years of service is ineligible, not a division error", () => {
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 0,
      coveredUnderAct: true,
    });
    expect(result.value.isEligible).toBe(false);
    expect(Number.isFinite(result.value.computedGratuity)).toBe(true);
  });

  it("a very long career at a high salary does not overflow", () => {
    const result = calculateGratuity({
      monthlySalary: 1000000,
      yearsOfService: 40,
      coveredUnderAct: true,
    });
    expect(Number.isFinite(result.value.gratuityPayable)).toBe(true);
    expect(result.value.gratuityPayable).toBe(2000000); // ceiling binds
  });
});

describe("calculateGratuity — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGratuity({
      monthlySalary: 50000,
      yearsOfService: 10,
      coveredUnderAct: true,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});
