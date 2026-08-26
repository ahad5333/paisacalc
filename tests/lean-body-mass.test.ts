import { describe, expect, it } from "vitest";
import { calculateLeanBodyMass } from "@/lib/calc/lean-body-mass";

describe("calculateLeanBodyMass — worked examples", () => {
  it("male, 175cm, 75kg", () => {
    const result = calculateLeanBodyMass({ sex: "male", heightCm: 175, weightKg: 75 });
    expect(result.value.leanMassKg).toBe(58.1);
    expect(result.value.fatMassKg).toBe(16.9);
    expect(result.value.leanMassPercent).toBe(77.5);
  });

  it("female, 162cm, 60kg", () => {
    const result = calculateLeanBodyMass({ sex: "female", heightCm: 162, weightKg: 60 });
    expect(result.value.leanMassKg).toBe(43.4);
    expect(result.value.fatMassKg).toBe(16.6);
    expect(result.value.leanMassPercent).toBe(72.3);
  });
});

describe("calculateLeanBodyMass — boundary cases", () => {
  it("fat mass and lean mass always sum to total weight", () => {
    const result = calculateLeanBodyMass({ sex: "male", heightCm: 180, weightKg: 90 });
    expect(Math.round((result.value.leanMassKg + result.value.fatMassKg) * 10) / 10).toBe(90);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateLeanBodyMass({ sex: "male", heightCm: 175, weightKg: 75 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
