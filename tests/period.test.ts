import { describe, expect, it } from "vitest";
import { calculatePeriod } from "@/lib/calc/period";
import { toEpochDay } from "@/lib/date-utils";

describe("calculatePeriod — worked example", () => {
  it("28-day cycle, reference date shortly after LMP", () => {
    const lmp = toEpochDay("2026-01-01");
    const reference = lmp + 5;
    const result = calculatePeriod({ lmpEpochDay: lmp, cycleLength: 28, periodLength: 5, referenceEpochDay: reference, cyclesToShow: 3 });
    expect(result.value.nextPeriodEpochDay).toBe(lmp + 28);
    expect(result.value.daysUntilNextPeriod).toBe(28 - 5);
    expect(result.value.cycles).toHaveLength(3);
  });

  it("projects the next period past today even when several cycles have already elapsed", () => {
    const lmp = toEpochDay("2026-01-01");
    const reference = lmp + 28 * 3 + 10; // well into the 4th cycle
    const result = calculatePeriod({ lmpEpochDay: lmp, cycleLength: 28, periodLength: 5, referenceEpochDay: reference, cyclesToShow: 2 });
    expect(result.value.nextPeriodEpochDay).toBeGreaterThan(reference);
    expect(result.value.nextPeriodEpochDay).toBe(lmp + 28 * 4);
  });
});

describe("calculatePeriod — boundary cases", () => {
  it("each projected cycle starts exactly one cycle length after the previous", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculatePeriod({ lmpEpochDay: lmp, cycleLength: 30, periodLength: 4, referenceEpochDay: lmp, cyclesToShow: 4 });
    const { cycles } = result.value;
    for (let i = 0; i < cycles.length - 1; i++) {
      expect(cycles[i + 1].periodStartEpochDay - cycles[i].periodStartEpochDay).toBe(30);
    }
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculatePeriod({ lmpEpochDay: lmp, cycleLength: 28, periodLength: 5, referenceEpochDay: lmp, cyclesToShow: 3 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
