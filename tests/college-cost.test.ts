import { describe, expect, it } from "vitest";
import { calculateCollegeCost } from "@/lib/calc/college-cost";

describe("calculateCollegeCost — worked example", () => {
  it("₹2L current annual cost, 10 years out, 10% education inflation, 4-year course", () => {
    const result = calculateCollegeCost({
      currentAnnualCost: 200000,
      yearsUntilEnrollment: 10,
      educationInflationPercent: 10,
      courseDurationYears: 4,
    });
    expect(result.value.costAtEnrollment).toBe(518748);
    expect(result.value.totalCostOverCourse).toBe(2407511);
  });
});

describe("calculateCollegeCost — boundary cases", () => {
  it("zero years until enrollment leaves cost at enrollment equal to today's cost", () => {
    const result = calculateCollegeCost({
      currentAnnualCost: 300000,
      yearsUntilEnrollment: 0,
      educationInflationPercent: 10,
      courseDurationYears: 3,
    });
    expect(result.value.costAtEnrollment).toBe(300000);
  });

  it("a longer runway to enrollment increases the projected cost", () => {
    const soon = calculateCollegeCost({ currentAnnualCost: 200000, yearsUntilEnrollment: 2, educationInflationPercent: 10, courseDurationYears: 4 });
    const later = calculateCollegeCost({ currentAnnualCost: 200000, yearsUntilEnrollment: 15, educationInflationPercent: 10, courseDurationYears: 4 });
    expect(later.value.costAtEnrollment).toBeGreaterThan(soon.value.costAtEnrollment);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateCollegeCost({
      currentAnnualCost: 200000,
      yearsUntilEnrollment: 10,
      educationInflationPercent: 10,
      courseDurationYears: 4,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
