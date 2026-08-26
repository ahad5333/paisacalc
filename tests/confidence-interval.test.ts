import { describe, expect, it } from "vitest";
import { calculateConfidenceInterval } from "@/lib/calc/confidence-interval";

describe("calculateConfidenceInterval — worked example", () => {
  it("mean=50, stdDev=10, n=100, 95% confidence", () => {
    const result = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 100, confidenceLevel: 95 });
    expect(result.value.marginOfError).toBe(1.96);
    expect(result.value.lowerBound).toBe(48.04);
    expect(result.value.upperBound).toBe(51.96);
  });
});

describe("calculateConfidenceInterval — boundary cases", () => {
  it("a larger sample size gives a tighter interval", () => {
    const small = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 30, confidenceLevel: 95 });
    const large = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 300, confidenceLevel: 95 });
    expect(large.value.marginOfError).toBeLessThan(small.value.marginOfError);
  });

  it("a higher confidence level gives a wider interval", () => {
    const c90 = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 100, confidenceLevel: 90 });
    const c99 = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 100, confidenceLevel: 99 });
    expect(c99.value.marginOfError).toBeGreaterThan(c90.value.marginOfError);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateConfidenceInterval({ sampleMean: 50, sampleStdDev: 10, sampleSize: 100, confidenceLevel: 95 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
