import { describe, expect, it } from "vitest";
import { calculateHealthyWeight } from "@/lib/calc/healthy-weight";

describe("calculateHealthyWeight — worked example", () => {
  it("170cm", () => {
    const result = calculateHealthyWeight({ heightCm: 170 });
    // 18.5 * 1.7^2 = 53.465 -> 53.5; 22.9 * 1.7^2 = 66.181 -> 66.2
    expect(result.value.minWeightKg).toBe(53.5);
    expect(result.value.maxWeightKg).toBe(66.2);
  });
});

describe("calculateHealthyWeight — boundary cases", () => {
  it("is consistent with the BMI calculator's own cutoffs at the range boundaries", () => {
    const result = calculateHealthyWeight({ heightCm: 170 });
    const heightM = 1.7;
    const bmiAtMin = result.value.minWeightKg / (heightM * heightM);
    const bmiAtMax = result.value.maxWeightKg / (heightM * heightM);
    expect(bmiAtMin).toBeCloseTo(18.5, 1);
    expect(bmiAtMax).toBeCloseTo(22.9, 1);
  });

  it("a taller height produces a higher weight range", () => {
    const shorter = calculateHealthyWeight({ heightCm: 155 });
    const taller = calculateHealthyWeight({ heightCm: 185 });
    expect(taller.value.minWeightKg).toBeGreaterThan(shorter.value.minWeightKg);
    expect(taller.value.maxWeightKg).toBeGreaterThan(shorter.value.maxWeightKg);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHealthyWeight({ heightCm: 170 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
