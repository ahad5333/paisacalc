import { describe, expect, it } from "vitest";
import { calculateScientific } from "@/lib/calc/scientific";

describe("calculateScientific — worked example", () => {
  it("respects operator precedence: 2+3*4 = 14", () => {
    const result = calculateScientific({ expression: "2+3*4", angleMode: "deg" });
    expect(result.value.result).toBe(14);
    expect(result.value.error).toBeNull();
  });

  it("parentheses override precedence: (2+3)*4 = 20", () => {
    const result = calculateScientific({ expression: "(2+3)*4", angleMode: "deg" });
    expect(result.value.result).toBe(20);
  });
});

describe("calculateScientific — boundary cases", () => {
  it("sqrt(16) = 4", () => {
    const result = calculateScientific({ expression: "sqrt(16)", angleMode: "deg" });
    expect(result.value.result).toBe(4);
  });

  it("sin(90) in degree mode is 1", () => {
    const result = calculateScientific({ expression: "sin(90)", angleMode: "deg" });
    expect(result.value.result).toBeCloseTo(1, 8);
  });

  it("an invalid expression reports an error instead of throwing", () => {
    const result = calculateScientific({ expression: "2+", angleMode: "deg" });
    expect(result.value.error).not.toBeNull();
    expect(Number.isNaN(result.value.result)).toBe(true);
  });

  it("unbalanced parentheses report an error", () => {
    const result = calculateScientific({ expression: "(2+3", angleMode: "deg" });
    expect(result.value.error).not.toBeNull();
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateScientific({ expression: "2+3*4", angleMode: "deg" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
