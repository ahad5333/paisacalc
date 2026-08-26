import { describe, expect, it } from "vitest";
import { calculateQuadratic } from "@/lib/calc/quadratic";

describe("calculateQuadratic — worked example", () => {
  it("x² - 5x + 6 = 0 has roots 3 and 2", () => {
    const result = calculateQuadratic({ a: 1, b: -5, c: 6 });
    expect(result.value.discriminant).toBe(1);
    expect([result.value.root1Display, result.value.root2Display].sort()).toEqual(["2", "3"]);
    expect(result.value.natureOfRoots).toBe("Two distinct real roots");
  });
});

describe("calculateQuadratic — boundary cases", () => {
  it("a perfect square gives one repeated root", () => {
    const result = calculateQuadratic({ a: 1, b: -4, c: 4 });
    expect(result.value.natureOfRoots).toBe("One repeated real root");
    expect(result.value.root1Display).toBe(result.value.root2Display);
  });

  it("a negative discriminant gives complex roots", () => {
    const result = calculateQuadratic({ a: 1, b: 2, c: 5 });
    expect(result.value.natureOfRoots).toBe("Two complex conjugate roots");
    expect(result.value.root1Display).toContain("i");
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateQuadratic({ a: 1, b: -5, c: 6 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
