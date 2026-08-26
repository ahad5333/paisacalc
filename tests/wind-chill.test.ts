import { describe, expect, it } from "vitest";
import { calculateWindChill } from "@/lib/calc/wind-chill";

describe("calculateWindChill — worked example", () => {
  it("20°F, 15 mph wind", () => {
    const result = calculateWindChill({ tempF: 20, windMph: 15 });
    expect(result.value.windChillF).toBe(6.2);
    expect(result.value.valid).toBe(true);
  });
});

describe("calculateWindChill — boundary cases", () => {
  it("flags conditions outside the formula's valid range", () => {
    const result = calculateWindChill({ tempF: 70, windMph: 15 });
    expect(result.value.valid).toBe(false);
  });

  it("higher wind speed makes wind chill colder for the same temperature", () => {
    const light = calculateWindChill({ tempF: 20, windMph: 5 });
    const strong = calculateWindChill({ tempF: 20, windMph: 30 });
    expect(strong.value.windChillF).toBeLessThan(light.value.windChillF);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateWindChill({ tempF: 20, windMph: 15 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
