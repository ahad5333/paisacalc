import { describe, expect, it } from "vitest";
import { calculateEpsPension } from "@/lib/calc/eps-pension";

describe("calculateEpsPension — worked example", () => {
  it("₹15,000 pensionable salary, 25 years service (bonus applies)", () => {
    const result = calculateEpsPension({ pensionableSalary: 15000, pensionableServiceYears: 25 });
    // capped salary = 15000, effective service = 25+2 = 27, pension = 15000×27/70 = 5785.71 -> 5786
    expect(result.value.cappedPensionableSalary).toBe(15000);
    expect(result.value.effectiveServiceYears).toBe(27);
    expect(result.value.monthlyPension).toBe(5786);
  });

  it("a higher actual salary is still capped at the ₹15,000 statutory ceiling", () => {
    const result = calculateEpsPension({ pensionableSalary: 60000, pensionableServiceYears: 25 });
    expect(result.value.cappedPensionableSalary).toBe(15000);
  });
});

describe("calculateEpsPension — boundary cases", () => {
  it("exactly 20 years of service gets no bonus", () => {
    const result = calculateEpsPension({ pensionableSalary: 15000, pensionableServiceYears: 20 });
    expect(result.value.effectiveServiceYears).toBe(20);
  });

  it("21 years of service gets the 2-year bonus", () => {
    const result = calculateEpsPension({ pensionableSalary: 15000, pensionableServiceYears: 21 });
    expect(result.value.effectiveServiceYears).toBe(23);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateEpsPension({ pensionableSalary: 15000, pensionableServiceYears: 25 });
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
