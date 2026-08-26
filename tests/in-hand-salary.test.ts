import { describe, expect, it } from "vitest";
import { calculateInHandSalary } from "@/lib/calc/in-hand-salary";

describe("calculateInHandSalary — sourced example", () => {
  it("₹12,00,000 CTC, new regime, ₹200/month professional tax", () => {
    // Model (50% basic, 12% uncapped employer/employee PF, 4.81% gratuity,
    // new-regime tax) hand-verified against a published third-party
    // worked example for the same CTC (salaryinhand.in/examples/12-lpa-in-hand-salary,
    // ₹85,395/month) — this implementation lands at ₹85,396/month, a ₹1
    // rounding difference, before being trusted as a fixture.
    const result = calculateInHandSalary({
      annualCtc: 1200000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.basic).toBe(600000);
    expect(result.value.employerPf).toBe(72000);
    expect(result.value.gratuity).toBe(28846);
    expect(result.value.grossSalary).toBe(1099154);
    expect(result.value.newRegimeTax).toBe(0); // taxable income (10,24,154) is under the ₹12L rebate ceiling
    expect(result.value.inHandMonthly).toBe(85396);
  });
});

describe("calculateInHandSalary — structure math", () => {
  it("basic is 50% of CTC per the Code on Wages floor", () => {
    const result = calculateInHandSalary({
      annualCtc: 2000000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.basic).toBe(1000000);
  });

  it("employer and employee PF match, each 12% of basic", () => {
    const result = calculateInHandSalary({
      annualCtc: 1800000,
      ageCategory: "general",
      professionalTaxMonthly: 0,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.employeePf).toBe(result.value.employerPf);
    expect(result.value.employerPf).toBe(Math.round(1800000 * 0.5 * 0.12));
  });

  it("gross salary equals CTC minus employer PF and gratuity", () => {
    const result = calculateInHandSalary({
      annualCtc: 1500000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.grossSalary).toBe(1500000 - result.value.employerPf - result.value.gratuity);
  });

  it("picks whichever regime is actually cheaper, matching the underlying tax comparison", () => {
    const result = calculateInHandSalary({
      annualCtc: 3000000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 150000,
    });
    const expectedTax = Math.min(result.value.newRegimeTax, result.value.oldRegimeTax);
    const expectedRegime = result.value.newRegimeTax <= result.value.oldRegimeTax ? "new" : "old";
    expect(result.value.betterRegime).toBe(expectedRegime);
    expect(
      result.value.inHandAnnual,
    ).toBe(result.value.grossSalary - result.value.employeePf - result.value.professionalTaxAnnual - expectedTax);
  });
});

describe("calculateInHandSalary — boundaries", () => {
  it("zero CTC never produces negative or NaN in-hand pay", () => {
    const result = calculateInHandSalary({
      annualCtc: 0,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.inHandAnnual).toBe(0);
    expect(result.value.inHandMonthly).toBe(0);
    expect(Number.isFinite(result.value.inHandMonthly)).toBe(true);
  });

  it("zero professional tax is handled without affecting the tax deduction cap logic", () => {
    const result = calculateInHandSalary({
      annualCtc: 1000000,
      ageCategory: "general",
      professionalTaxMonthly: 0,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.value.professionalTaxAnnual).toBe(0);
    expect(Number.isFinite(result.value.inHandMonthly)).toBe(true);
  });

  it("a very high CTC does not lose precision or overflow", () => {
    const result = calculateInHandSalary({
      annualCtc: 100000000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(Number.isFinite(result.value.inHandMonthly)).toBe(true);
    expect(result.value.inHandMonthly).toBeGreaterThan(0);
  });
});

describe("calculateInHandSalary — derivation and metadata", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateInHandSalary({
      annualCtc: 1500000,
      ageCategory: "general",
      professionalTaxMonthly: 200,
      additionalOldRegimeDeductions: 0,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(4);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBe("FY 2026-27");
  });
});
