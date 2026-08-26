import { describe, expect, it } from "vitest";
import { calculateHours } from "@/lib/calc/hours-calculator";

describe("calculateHours — worked example", () => {
  it("9:00 to 17:30 with a 30 minute break", () => {
    const result = calculateHours({ startH: 9, startM: 0, endH: 17, endM: 30, breakMinutes: 30 });
    expect(result.value.hours).toBe(8);
    expect(result.value.minutes).toBe(0);
  });
});

describe("calculateHours — boundary cases", () => {
  it("an overnight shift crossing midnight is handled correctly", () => {
    const result = calculateHours({ startH: 22, startM: 0, endH: 6, endM: 0, breakMinutes: 0 });
    expect(result.value.hours).toBe(8);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHours({ startH: 9, startM: 0, endH: 17, endM: 30, breakMinutes: 30 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
