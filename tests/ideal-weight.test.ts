import { describe, expect, it } from "vitest";
import { calculateIdealWeight } from "@/lib/calc/ideal-weight";

describe("calculateIdealWeight — worked examples", () => {
  it("male, 175cm", () => {
    const result = calculateIdealWeight({ sex: "male", heightCm: 175 });
    expect(result.value.hamwi).toBe(72.3);
    expect(result.value.devine).toBe(70.5);
    expect(result.value.robinson).toBe(68.9);
    expect(result.value.miller).toBe(68.7);
    expect(result.value.average).toBe(70.1);
  });

  it("female, 162cm", () => {
    const result = calculateIdealWeight({ sex: "female", heightCm: 162 });
    expect(result.value.hamwi).toBe(53.9);
    expect(result.value.devine).toBe(54.2);
    expect(result.value.robinson).toBe(55.4);
    expect(result.value.miller).toBe(58.2);
    expect(result.value.average).toBe(55.4);
  });
});

describe("calculateIdealWeight — boundary cases", () => {
  it("exactly 5 feet (152.4cm) reduces every formula to its base weight", () => {
    const result = calculateIdealWeight({ sex: "male", heightCm: 152.4 });
    expect(result.value.hamwi).toBe(Math.round(106 * 0.453592 * 10) / 10);
    expect(result.value.devine).toBe(50);
    expect(result.value.robinson).toBe(52);
    expect(result.value.miller).toBe(56.2);
  });

  it("below 5 feet doesn't go negative on the per-inch term — clamped at the base weight", () => {
    const result = calculateIdealWeight({ sex: "female", heightCm: 140 });
    expect(result.value.devine).toBe(45.5);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateIdealWeight({ sex: "male", heightCm: 175 });
    expect(result.steps.length).toBeGreaterThanOrEqual(5);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
