import { describe, expect, it } from "vitest";
import { calculateOvulation } from "@/lib/calc/ovulation";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateOvulation — worked example", () => {
  it("28-day cycle", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculateOvulation({ lmpEpochDay: lmp, cycleLength: 28 });
    expect(result.value.ovulationEpochDay - lmp).toBe(14);
    expect(result.value.fertileWindowStartEpochDay).toBe(result.value.ovulationEpochDay - 5);
    expect(result.value.fertileWindowEndEpochDay).toBe(result.value.ovulationEpochDay + 1);
    expect(result.value.nextPeriodEpochDay - lmp).toBe(28);
  });
});

describe("calculateOvulation — boundary cases", () => {
  it("a longer cycle pushes ovulation later by the same number of days", () => {
    const lmp = toEpochDay("2026-01-01");
    const cycle28 = calculateOvulation({ lmpEpochDay: lmp, cycleLength: 28 });
    const cycle35 = calculateOvulation({ lmpEpochDay: lmp, cycleLength: 35 });
    expect(cycle35.value.ovulationEpochDay - cycle28.value.ovulationEpochDay).toBe(7);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateOvulation({ lmpEpochDay: toEpochDay("2026-01-01"), cycleLength: 28 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
