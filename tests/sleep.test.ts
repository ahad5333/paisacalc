import { describe, expect, it } from "vitest";
import { calculateSleep } from "@/lib/calc/sleep";

describe("calculateSleep — worked example", () => {
  it("wake up at 7:00, 15 min to fall asleep, 5 cycles -> bedtime", () => {
    const result = calculateSleep({ direction: "wakeUp", hour: 7, minute: 0, fallAsleepMinutes: 15 });
    const fiveCycles = result.value.options.find((o) => o.cycles === 5)!;
    // 5*90=450min=7h30m before 7:00, minus 15 min to fall asleep -> bed at 23:15
    expect(fiveCycles.hour).toBe(23);
    expect(fiveCycles.minute).toBe(15);
  });
});

describe("calculateSleep — boundary cases", () => {
  it("returns three cycle options (4, 5, 6)", () => {
    const result = calculateSleep({ direction: "bedtime", hour: 22, minute: 0, fallAsleepMinutes: 15 });
    expect(result.value.options.map((o) => o.cycles)).toEqual([4, 5, 6]);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSleep({ direction: "wakeUp", hour: 7, minute: 0, fallAsleepMinutes: 15 });
    expect(result.steps.length).toBe(3);
    expect(result.rulesVersion).toBeTruthy();
  });
});
