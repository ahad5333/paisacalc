import { describe, expect, it } from "vitest";
import { calculatePregnancyWeightGain } from "@/lib/calc/pregnancy-weight-gain";

describe("calculatePregnancyWeightGain — worked example", () => {
  it("normal-BMI singleton at 20 weeks", () => {
    const result = calculatePregnancyWeightGain({
      prePregnancyHeightCm: 165,
      prePregnancyWeightKg: 60,
      currentWeek: 20,
      twins: false,
    });
    // BMI = 60 / 1.65^2 = 22.04
    expect(result.value.prePregnancyBmi).toBeCloseTo(22.0, 1);
    expect(result.value.category).toBe("normal");
    expect(result.value.totalGainLowKg).toBe(11.5);
    expect(result.value.totalGainHighKg).toBe(16);
  });
});

describe("calculatePregnancyWeightGain — boundary cases", () => {
  it("categorises underweight, normal, overweight, and obese correctly", () => {
    const underweight = calculatePregnancyWeightGain({ prePregnancyHeightCm: 170, prePregnancyWeightKg: 50, currentWeek: 20, twins: false });
    const overweight = calculatePregnancyWeightGain({ prePregnancyHeightCm: 170, prePregnancyWeightKg: 78, currentWeek: 20, twins: false });
    const obese = calculatePregnancyWeightGain({ prePregnancyHeightCm: 170, prePregnancyWeightKg: 92, currentWeek: 20, twins: false });
    expect(underweight.value.category).toBe("underweight");
    expect(overweight.value.category).toBe("overweight");
    expect(obese.value.category).toBe("obese");
  });

  it("twin pregnancies get a higher total recommended gain than singletons in the same category", () => {
    const singleton = calculatePregnancyWeightGain({ prePregnancyHeightCm: 165, prePregnancyWeightKg: 60, currentWeek: 20, twins: false });
    const twins = calculatePregnancyWeightGain({ prePregnancyHeightCm: 165, prePregnancyWeightKg: 60, currentWeek: 20, twins: true });
    expect(twins.value.totalGainLowKg).toBeGreaterThan(singleton.value.totalGainLowKg);
  });

  it("recommended gain at week 40 reaches the full total range", () => {
    const result = calculatePregnancyWeightGain({ prePregnancyHeightCm: 165, prePregnancyWeightKg: 60, currentWeek: 40, twins: false });
    expect(result.value.recommendedAtWeekLowKg).toBe(result.value.totalGainLowKg);
    expect(result.value.recommendedAtWeekHighKg).toBe(result.value.totalGainHighKg);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculatePregnancyWeightGain({ prePregnancyHeightCm: 165, prePregnancyWeightKg: 60, currentWeek: 20, twins: false });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
