import { describe, expect, it } from "vitest";
import { calculateHeightPrediction } from "@/lib/calc/height-prediction";

describe("calculateHeightPrediction — worked example", () => {
  it("father 180cm, mother 165cm, boy", () => {
    const result = calculateHeightPrediction({ fatherHeightCm: 180, motherHeightCm: 165, childSex: "male" });
    expect(result.value.predictedHeightCm).toBe(179);
  });

  it("father 180cm, mother 165cm, girl", () => {
    const result = calculateHeightPrediction({ fatherHeightCm: 180, motherHeightCm: 165, childSex: "female" });
    expect(result.value.predictedHeightCm).toBe(166);
  });
});

describe("calculateHeightPrediction — boundary cases", () => {
  it("the range brackets the predicted height", () => {
    const result = calculateHeightPrediction({ fatherHeightCm: 180, motherHeightCm: 165, childSex: "male" });
    expect(result.value.rangeLowCm).toBeLessThan(result.value.predictedHeightCm);
    expect(result.value.rangeHighCm).toBeGreaterThan(result.value.predictedHeightCm);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateHeightPrediction({ fatherHeightCm: 180, motherHeightCm: 165, childSex: "male" });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
