import { describe, expect, it } from "vitest";
import { calculateMileageReimbursement } from "@/lib/calc/mileage-reimbursement";

describe("calculateMileageReimbursement — worked example", () => {
  it("120 miles at $0.67/mile", () => {
    const result = calculateMileageReimbursement({ miles: 120, ratePerMile: 0.67 });
    expect(result.value.reimbursement).toBeCloseTo(80.4, 2);
  });
});

describe("calculateMileageReimbursement — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMileageReimbursement({ miles: 120, ratePerMile: 0.67 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
