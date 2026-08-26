import { describe, expect, it } from "vitest";
import { calculateGpa } from "@/lib/calc/gpa";

describe("calculateGpa — worked example", () => {
  it("A (4 credits) + B (3 credits)", () => {
    const result = calculateGpa({ courses: [{ grade: "A", credits: 4 }, { grade: "B", credits: 3 }] });
    // (4*4 + 3*3) / 7 = 25/7 = 3.571
    expect(result.value.gpa).toBeCloseTo(3.571, 2);
    expect(result.value.totalCredits).toBe(7);
  });
});

describe("calculateGpa — boundary cases", () => {
  it("all A's gives a 4.0 GPA", () => {
    const result = calculateGpa({ courses: [{ grade: "A", credits: 3 }, { grade: "A", credits: 4 }] });
    expect(result.value.gpa).toBe(4.0);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGpa({ courses: [{ grade: "A", credits: 4 }] });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
