import { describe, expect, it } from "vitest";
import { calculateBandwidth } from "@/lib/calc/bandwidth";

describe("calculateBandwidth — worked example", () => {
  it("100MB file over 10 Mbps connection", () => {
    const result = calculateBandwidth({ fileSizeMB: 100, bandwidthMbps: 10 });
    expect(result.value.seconds).toBe(80);
  });
});

describe("calculateBandwidth — boundary cases", () => {
  it("faster bandwidth reduces transfer time", () => {
    const slow = calculateBandwidth({ fileSizeMB: 100, bandwidthMbps: 10 });
    const fast = calculateBandwidth({ fileSizeMB: 100, bandwidthMbps: 100 });
    expect(fast.value.seconds).toBeLessThan(slow.value.seconds);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBandwidth({ fileSizeMB: 100, bandwidthMbps: 10 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
