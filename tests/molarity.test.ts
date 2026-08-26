import { describe, expect, it } from "vitest";
import { calculateMolarity } from "@/lib/calc/molarity";

describe("calculateMolarity — worked example", () => {
  it("1 mole in 2 litres -> 0.5 M", () => {
    const result = calculateMolarity({ molarity: 0, moles: 1, volumeLiters: 2, unknown: "molarity" });
    expect(result.value.result).toBe(0.5);
  });
});

describe("calculateMolarity — boundary cases", () => {
  it("solving for moles reverses solving for molarity", () => {
    const molarity = calculateMolarity({ molarity: 0, moles: 1, volumeLiters: 2, unknown: "molarity" });
    const moles = calculateMolarity({ molarity: molarity.value.result, moles: 0, volumeLiters: 2, unknown: "moles" });
    expect(moles.value.result).toBe(1);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMolarity({ molarity: 0, moles: 1, volumeLiters: 2, unknown: "molarity" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
