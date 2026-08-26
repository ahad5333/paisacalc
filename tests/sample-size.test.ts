import { describe, expect, it } from "vitest";
import { calculateSampleSize } from "@/lib/calc/sample-size";

describe("calculateSampleSize — worked example", () => {
  it("95% confidence, 5% margin, 50% proportion, unknown population", () => {
    const result = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 5, proportionPct: 50, populationSize: 0 });
    // n0 = (1.96^2 * 0.5 * 0.5) / 0.05^2 = 384.16 -> ceil 385
    expect(result.value.sampleSize).toBe(385);
  });
});

describe("calculateSampleSize — boundary cases", () => {
  it("a finite population size reduces the required sample size", () => {
    const infinite = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 5, proportionPct: 50, populationSize: 0 });
    const finite = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 5, proportionPct: 50, populationSize: 1000 });
    expect(finite.value.sampleSize).toBeLessThan(infinite.value.sampleSize);
  });

  it("a tighter margin of error requires a larger sample", () => {
    const loose = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 10, proportionPct: 50, populationSize: 0 });
    const tight = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 3, proportionPct: 50, populationSize: 0 });
    expect(tight.value.sampleSize).toBeGreaterThan(loose.value.sampleSize);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateSampleSize({ confidenceLevel: 95, marginOfErrorPct: 5, proportionPct: 50, populationSize: 0 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
