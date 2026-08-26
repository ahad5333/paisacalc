import { describe, expect, it } from "vitest";
import { calculateDueDate } from "@/lib/calc/due-date";
import { toEpochDay } from "@/lib/date-utils";

describe("calculateDueDate — worked example", () => {
  it("LMP method, 28-day cycle", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculateDueDate({ method: "lmp", lmpEpochDay: lmp, cycleLength: 28, conceptionEpochDay: 0 });
    expect(result.value.dueDateEpochDay - lmp).toBe(280);
  });

  it("conception method agrees with LMP method when conception falls 14 days after LMP", () => {
    const lmp = toEpochDay("2026-01-01");
    const conception = lmp + 14;
    const viaLmp = calculateDueDate({ method: "lmp", lmpEpochDay: lmp, cycleLength: 28, conceptionEpochDay: 0 });
    const viaConception = calculateDueDate({ method: "conception", lmpEpochDay: 0, cycleLength: 28, conceptionEpochDay: conception });
    expect(viaConception.value.dueDateEpochDay).toBe(viaLmp.value.dueDateEpochDay);
  });
});

describe("calculateDueDate — boundary cases", () => {
  it("a longer cycle pushes the LMP-method due date later", () => {
    const lmp = toEpochDay("2026-01-01");
    const cycle28 = calculateDueDate({ method: "lmp", lmpEpochDay: lmp, cycleLength: 28, conceptionEpochDay: 0 });
    const cycle35 = calculateDueDate({ method: "lmp", lmpEpochDay: lmp, cycleLength: 35, conceptionEpochDay: 0 });
    expect(cycle35.value.dueDateEpochDay - cycle28.value.dueDateEpochDay).toBe(7);
  });

  it("full term start (39 weeks) is 1 week before the LMP-method due date (40 weeks)", () => {
    const lmp = toEpochDay("2026-01-01");
    const result = calculateDueDate({ method: "lmp", lmpEpochDay: lmp, cycleLength: 28, conceptionEpochDay: 0 });
    expect(result.value.dueDateEpochDay - result.value.fullTermStartEpochDay).toBe(7);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateDueDate({
      method: "lmp",
      lmpEpochDay: toEpochDay("2026-01-01"),
      cycleLength: 28,
      conceptionEpochDay: 0,
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
