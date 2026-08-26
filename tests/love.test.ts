import { describe, expect, it } from "vitest";
import { calculateLove } from "@/lib/calc/love";

describe("calculateLove — worked example", () => {
  it("is deterministic for the same pair of names", () => {
    const a = calculateLove({ name1: "Alex", name2: "Sam" });
    const b = calculateLove({ name1: "Alex", name2: "Sam" });
    expect(a.value.percentage).toBe(b.value.percentage);
  });

  it("gives the same result regardless of name order", () => {
    const a = calculateLove({ name1: "Alex", name2: "Sam" });
    const b = calculateLove({ name1: "Sam", name2: "Alex" });
    expect(a.value.percentage).toBe(b.value.percentage);
  });
});

describe("calculateLove — boundary cases", () => {
  it("percentage stays within 0-100", () => {
    const result = calculateLove({ name1: "Priya", name2: "Rohan" });
    expect(result.value.percentage).toBeGreaterThanOrEqual(0);
    expect(result.value.percentage).toBeLessThanOrEqual(100);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateLove({ name1: "Alex", name2: "Sam" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
