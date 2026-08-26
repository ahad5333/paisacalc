import { describe, expect, it } from "vitest";
import { calculateDensityMassVolume } from "@/lib/calc/density-mass-volume";

describe("calculateDensityMassVolume — worked example", () => {
  it("mass 100g, volume 10cm³ -> density 10 g/cm³", () => {
    const result = calculateDensityMassVolume({ density: 0, mass: 100, volume: 10, unknown: "density" });
    expect(result.value.result).toBe(10);
  });

  it("density 10, volume 10 -> mass 100", () => {
    const result = calculateDensityMassVolume({ density: 10, mass: 0, volume: 10, unknown: "mass" });
    expect(result.value.result).toBe(100);
  });
});

describe("calculateDensityMassVolume — boundary cases", () => {
  it("solving for volume reverses solving for density", () => {
    const density = calculateDensityMassVolume({ density: 0, mass: 100, volume: 10, unknown: "density" });
    const volume = calculateDensityMassVolume({ density: density.value.result, mass: 100, volume: 0, unknown: "volume" });
    expect(volume.value.result).toBe(10);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDensityMassVolume({ density: 0, mass: 100, volume: 10, unknown: "density" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
