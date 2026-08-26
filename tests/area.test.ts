import { describe, expect, it } from "vitest";
import { calculateArea } from "@/lib/calc/area";

describe("calculateArea — worked example", () => {
  it("rectangle 5x3", () => {
    const result = calculateArea({ shape: "rectangle", a: 5, b: 3, height: 0 });
    expect(result.value.area).toBe(15);
  });

  it("triangle base 6, height 4", () => {
    const result = calculateArea({ shape: "triangle", a: 6, b: 0, height: 4 });
    expect(result.value.area).toBe(12);
  });
});

describe("calculateArea — boundary cases", () => {
  it("square side 4", () => {
    const result = calculateArea({ shape: "square", a: 4, b: 0, height: 0 });
    expect(result.value.area).toBe(16);
  });

  it("trapezoid with parallel sides 4 and 6, height 3", () => {
    const result = calculateArea({ shape: "trapezoid", a: 4, b: 6, height: 3 });
    expect(result.value.area).toBe(15);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateArea({ shape: "circle", a: 2, b: 0, height: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
