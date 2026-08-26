import { describe, expect, it } from "vitest";
import { calculateTargetHeartRate } from "@/lib/calc/target-heart-rate";

describe("calculateTargetHeartRate — worked example", () => {
  it("age 30, resting heart rate 70", () => {
    const result = calculateTargetHeartRate({ age: 30, restingHeartRate: 70 });
    // Max HR = 220 - 30 = 190. HRR = 190 - 70 = 120.
    // 50%: 120*0.5 + 70 = 130. 85%: 120*0.85 + 70 = 172.
    expect(result.value.maxHeartRate).toBe(190);
    expect(result.value.heartRateReserve).toBe(120);
    expect(result.value.moderateLowBpm).toBe(130);
    expect(result.value.moderateHighBpm).toBe(172);
  });

  it("zones are chained: each zone's high matches the next zone's low", () => {
    const result = calculateTargetHeartRate({ age: 30, restingHeartRate: 70 });
    const { zones } = result.value;
    for (let i = 0; i < zones.length - 1; i++) {
      expect(zones[i].highBpm).toBe(zones[i + 1].lowBpm);
    }
  });
});

describe("calculateTargetHeartRate — boundary cases", () => {
  it("a lower resting heart rate lowers the whole target zone at the same age", () => {
    const fit = calculateTargetHeartRate({ age: 40, restingHeartRate: 55 });
    const unfit = calculateTargetHeartRate({ age: 40, restingHeartRate: 85 });
    expect(fit.value.moderateLowBpm).toBeLessThan(unfit.value.moderateLowBpm);
  });

  it("an older age lowers max heart rate", () => {
    const younger = calculateTargetHeartRate({ age: 25, restingHeartRate: 65 });
    const older = calculateTargetHeartRate({ age: 55, restingHeartRate: 65 });
    expect(older.value.maxHeartRate).toBeLessThan(younger.value.maxHeartRate);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateTargetHeartRate({ age: 30, restingHeartRate: 70 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
