import { describe, expect, it } from "vitest";
import { calculateOneRepMax } from "@/lib/calc/one-rep-max";

describe("calculateOneRepMax — worked example", () => {
  it("100kg, 5 reps", () => {
    const result = calculateOneRepMax({ weightKg: 100, reps: 5 });
    // Epley: 100 * (1 + 5/30) = 116.666... -> 116.7
    // Brzycki: 100 * 36 / (37 - 5) = 3600/32 = 112.5
    // Average: (116.7 + 112.5) / 2 = 114.6
    expect(result.value.epley).toBe(116.7);
    expect(result.value.brzycki).toBe(112.5);
    expect(result.value.average).toBe(114.6);
  });
});

describe("calculateOneRepMax — boundary cases", () => {
  it("1 rep: Brzycki reduces to the lifted weight itself, Epley still adds its fixed increment", () => {
    const result = calculateOneRepMax({ weightKg: 100, reps: 1 });
    // Brzycki: 100 * 36 / (37 - 1) = 3600/36 = 100 — reduces to identity at 1 rep by construction.
    // Epley: 100 * (1 + 1/30) = 103.3 — always adds weight/30, even at 1 rep.
    expect(result.value.brzycki).toBe(100);
    expect(result.value.epley).toBe(103.3);
  });

  it("more reps at the same weight implies a higher estimated max", () => {
    const low = calculateOneRepMax({ weightKg: 80, reps: 3 });
    const high = calculateOneRepMax({ weightKg: 80, reps: 8 });
    expect(high.value.average).toBeGreaterThan(low.value.average);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateOneRepMax({ weightKg: 100, reps: 5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
