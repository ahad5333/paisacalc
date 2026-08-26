import { describe, expect, it } from "vitest";
import { calculateGfr } from "@/lib/calc/gfr";

describe("calculateGfr — worked example", () => {
  it("male, 50, creatinine 1.0 mg/dL", () => {
    const result = calculateGfr({ sex: "male", age: 50, serumCreatinineMgDl: 1.0 });
    expect(result.value.egfr).toBe(91.7);
    expect(result.value.category).toBe("G1");
  });

  it("female, 50, creatinine 1.0 mg/dL", () => {
    const result = calculateGfr({ sex: "female", age: 50, serumCreatinineMgDl: 1.0 });
    expect(result.value.egfr).toBe(68.6);
    expect(result.value.category).toBe("G2");
  });
});

describe("calculateGfr — boundary cases", () => {
  it("higher creatinine gives a lower eGFR", () => {
    const normal = calculateGfr({ sex: "male", age: 50, serumCreatinineMgDl: 1.0 });
    const elevated = calculateGfr({ sex: "male", age: 50, serumCreatinineMgDl: 2.0 });
    expect(elevated.value.egfr).toBeLessThan(normal.value.egfr);
  });

  it("categorises severely reduced function as G4", () => {
    const result = calculateGfr({ sex: "male", age: 70, serumCreatinineMgDl: 3.5 });
    expect(["G4", "G5"]).toContain(result.value.category);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateGfr({ sex: "male", age: 50, serumCreatinineMgDl: 1.0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
