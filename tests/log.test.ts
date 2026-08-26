import { describe, expect, it } from "vitest";
import { calculateLog } from "@/lib/calc/log";

describe("calculateLog — worked example", () => {
  it("log base 10 of 1000 = 3", () => {
    const result = calculateLog({ base: 10, x: 1000 });
    expect(result.value.result).toBe(3);
  });

  it("log base 2 of 8 = 3", () => {
    const result = calculateLog({ base: 2, x: 8 });
    expect(result.value.result).toBe(3);
  });
});

describe("calculateLog — boundary cases", () => {
  it("a non-positive argument is undefined (NaN)", () => {
    const result = calculateLog({ base: 10, x: -5 });
    expect(Number.isNaN(result.value.result)).toBe(true);
  });

  it("a base of 1 is undefined (NaN)", () => {
    const result = calculateLog({ base: 1, x: 10 });
    expect(Number.isNaN(result.value.result)).toBe(true);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateLog({ base: 10, x: 1000 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
