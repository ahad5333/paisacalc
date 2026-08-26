import { describe, expect, it } from "vitest";
import { calculateHeatIndex } from "@/lib/calc/heat-index";

describe("calculateHeatIndex — worked example", () => {
  it("90°F, 60% humidity", () => {
    const result = calculateHeatIndex({ tempF: 90, humidityPct: 60 });
    expect(result.value.heatIndexF).toBeCloseTo(99.7, 1);
    expect(result.value.valid).toBe(true);
  });
});

describe("calculateHeatIndex — boundary cases", () => {
  it("higher humidity increases the heat index for the same temperature", () => {
    const dry = calculateHeatIndex({ tempF: 90, humidityPct: 40 });
    const humid = calculateHeatIndex({ tempF: 90, humidityPct: 80 });
    expect(humid.value.heatIndexF).toBeGreaterThan(dry.value.heatIndexF);
  });

  it("flags conditions outside the formula's valid range", () => {
    const result = calculateHeatIndex({ tempF: 60, humidityPct: 30 });
    expect(result.value.valid).toBe(false);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHeatIndex({ tempF: 90, humidityPct: 60 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
