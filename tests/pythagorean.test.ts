import { describe, expect, it } from "vitest";
import { calculatePythagorean } from "@/lib/calc/pythagorean";

describe("calculatePythagorean — worked example", () => {
  it("a=3, b=4 -> c=5", () => {
    const result = calculatePythagorean({ a: 3, b: 4, c: 0, unknown: "c" });
    expect(result.value.result).toBe(5);
  });

  it("c=5, a=3 -> b=4", () => {
    const result = calculatePythagorean({ a: 3, b: 0, c: 5, unknown: "b" });
    expect(result.value.result).toBe(4);
  });
});

describe("calculatePythagorean — boundary cases", () => {
  it("solving for c reproduces the exact same value as solving for a leg given that c", () => {
    const c = calculatePythagorean({ a: 6, b: 8, c: 0, unknown: "c" });
    const a = calculatePythagorean({ a: 0, b: 8, c: c.value.result, unknown: "a" });
    expect(a.value.result).toBe(6);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePythagorean({ a: 3, b: 4, c: 0, unknown: "c" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
