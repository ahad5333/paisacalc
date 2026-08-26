import { describe, expect, it } from "vitest";
import { calculateResistor } from "@/lib/calc/resistor";

describe("calculateResistor — worked example", () => {
  it("brown-black-red-gold = 1000Ω ±5%", () => {
    const result = calculateResistor({ band1: "brown", band2: "black", multiplier: "red", tolerance: "gold" });
    expect(result.value.resistanceOhms).toBe(1000);
    expect(result.value.tolerancePct).toBe(5);
  });
});

describe("calculateResistor — boundary cases", () => {
  it("yellow-violet-orange = 47kΩ", () => {
    const result = calculateResistor({ band1: "yellow", band2: "violet", multiplier: "orange", tolerance: "gold" });
    expect(result.value.resistanceOhms).toBe(47000);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateResistor({ band1: "brown", band2: "black", multiplier: "red", tolerance: "gold" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
