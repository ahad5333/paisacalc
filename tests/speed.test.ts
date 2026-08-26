import { describe, expect, it } from "vitest";
import { calculateSpeed } from "@/lib/calc/speed";

describe("calculateSpeed — worked example", () => {
  it("distance 100, time 4 -> speed 25", () => {
    const result = calculateSpeed({ speed: 0, distance: 100, time: 4, unknown: "speed" });
    expect(result.value.result).toBe(25);
  });
});

describe("calculateSpeed — boundary cases", () => {
  it("solving for time reverses solving for speed", () => {
    const speed = calculateSpeed({ speed: 0, distance: 100, time: 4, unknown: "speed" });
    const time = calculateSpeed({ speed: speed.value.result, distance: 100, time: 0, unknown: "time" });
    expect(time.value.result).toBe(4);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSpeed({ speed: 0, distance: 100, time: 4, unknown: "speed" });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
