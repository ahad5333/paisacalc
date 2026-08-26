import { describe, expect, it } from "vitest";
import { calculateDewPoint } from "@/lib/calc/dew-point";

describe("calculateDewPoint — worked example", () => {
  it("25°C, 60% humidity", () => {
    const result = calculateDewPoint({ tempC: 25, humidityPct: 60 });
    expect(result.value.dewPointC).toBeCloseTo(16.7, 1);
  });
});

describe("calculateDewPoint — boundary cases", () => {
  it("at 100% humidity, dew point equals air temperature", () => {
    const result = calculateDewPoint({ tempC: 25, humidityPct: 100 });
    expect(result.value.dewPointC).toBe(25);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDewPoint({ tempC: 25, humidityPct: 60 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
