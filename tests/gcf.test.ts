import { describe, expect, it } from "vitest";
import { calculateGcf } from "@/lib/calc/gcf";

describe("calculateGcf — worked example", () => {
  it("gcf(12, 18, 24) = 6", () => {
    const result = calculateGcf({ a: 12, b: 18, c: 24 });
    expect(result.value.gcf).toBe(6);
  });
});

describe("calculateGcf — boundary cases", () => {
  it("gcf of coprime numbers is 1", () => {
    const result = calculateGcf({ a: 7, b: 9, c: 11 });
    expect(result.value.gcf).toBe(1);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGcf({ a: 12, b: 18, c: 24 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
