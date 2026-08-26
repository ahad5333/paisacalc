import { describe, expect, it } from "vitest";
import { calculateMolecularWeight } from "@/lib/calc/molecular-weight";

describe("calculateMolecularWeight — worked example", () => {
  it("H2O", () => {
    const result = calculateMolecularWeight({ formula: "H2O" });
    expect(result.value.totalWeight).toBeCloseTo(18.015, 2);
    expect(result.value.error).toBeNull();
  });

  it("Ca(OH)2 handles parentheses correctly", () => {
    const result = calculateMolecularWeight({ formula: "Ca(OH)2" });
    // Ca: 40.078, O2: 31.998, H2: 2.016 -> total ~74.092
    expect(result.value.totalWeight).toBeCloseTo(74.09, 1);
  });
});

describe("calculateMolecularWeight — boundary cases", () => {
  it("NaCl", () => {
    const result = calculateMolecularWeight({ formula: "NaCl" });
    expect(result.value.totalWeight).toBeCloseTo(58.44, 1);
  });

  it("an unknown element reports an error instead of throwing", () => {
    const result = calculateMolecularWeight({ formula: "Xx2" });
    expect(result.value.error).not.toBeNull();
  });

  it("mismatched parentheses report an error", () => {
    const result = calculateMolecularWeight({ formula: "Ca(OH2" });
    expect(result.value.error).not.toBeNull();
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMolecularWeight({ formula: "H2O" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
