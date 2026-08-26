import { describe, expect, it } from "vitest";
import { calculateVolume } from "@/lib/calc/volume";

describe("calculateVolume — worked example", () => {
  it("cube side 3", () => {
    const result = calculateVolume({ shape: "cube", a: 3, b: 0, height: 0 });
    expect(result.value.volume).toBe(27);
  });

  it("box 2x3x4", () => {
    const result = calculateVolume({ shape: "box", a: 2, b: 3, height: 4 });
    expect(result.value.volume).toBe(24);
  });
});

describe("calculateVolume — boundary cases", () => {
  it("sphere radius 3", () => {
    const result = calculateVolume({ shape: "sphere", a: 3, b: 0, height: 0 });
    expect(result.value.volume).toBeCloseTo((4 / 3) * Math.PI * 27, 3);
  });

  it("cylinder radius 2, height 5", () => {
    const result = calculateVolume({ shape: "cylinder", a: 2, b: 0, height: 5 });
    expect(result.value.volume).toBeCloseTo(Math.PI * 4 * 5, 3);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = calculateVolume({ shape: "cube", a: 3, b: 0, height: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
