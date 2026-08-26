import { describe, expect, it } from "vitest";
import { calculateHorsepower } from "@/lib/calc/horsepower";

describe("calculateHorsepower — worked example", () => {
  it("300 lb-ft at 5252 RPM equals 300 HP (the crossover point)", () => {
    const result = calculateHorsepower({ torqueLbFt: 300, rpm: 5252 });
    expect(result.value.horsepower).toBe(300);
  });
});

describe("calculateHorsepower — boundary cases", () => {
  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHorsepower({ torqueLbFt: 300, rpm: 4000 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
