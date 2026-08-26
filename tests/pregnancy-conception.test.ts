import { describe, expect, it } from "vitest";
import { calculatePregnancyConception } from "@/lib/calc/pregnancy-conception";
import { toEpochDay } from "@/lib/date-utils";

describe("calculatePregnancyConception — worked example", () => {
  it("28-day cycle", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculatePregnancyConception({ lmpEpochDay: lmp, cycleLength: 28 });
    expect(result.value.conceptionEpochDay - lmp).toBe(14);
    expect(result.value.dueDateEpochDay - lmp).toBe(280);
  });
});

describe("calculatePregnancyConception — boundary cases", () => {
  it("conception window brackets the conception date", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculatePregnancyConception({ lmpEpochDay: lmp, cycleLength: 28 });
    expect(result.value.conceptionWindowStartEpochDay).toBeLessThan(result.value.conceptionEpochDay);
    expect(result.value.conceptionWindowEndEpochDay).toBeGreaterThan(result.value.conceptionEpochDay);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePregnancyConception({ lmpEpochDay: toEpochDay("2026-01-01"), cycleLength: 28 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
