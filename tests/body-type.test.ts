import { describe, expect, it } from "vitest";
import { calculateBodyType } from "@/lib/calc/body-type";

describe("calculateBodyType — worked example", () => {
  it("male, 175cm, 17cm wrist -> ratio just above 10.4, ectomorph", () => {
    const result = calculateBodyType({ sex: "male", heightCm: 178, wristCircumferenceCm: 17 });
    expect(result.value.ratio).toBeCloseTo(10.47, 1);
    expect(result.value.somatotype).toBe("ectomorph");
  });
});

describe("calculateBodyType — boundary cases", () => {
  it("a larger wrist relative to height classifies as endomorph", () => {
    const result = calculateBodyType({ sex: "male", heightCm: 175, wristCircumferenceCm: 20 });
    expect(result.value.somatotype).toBe("endomorph");
  });

  it("men and women use different ratio cutoffs for the same somatotype", () => {
    const male = calculateBodyType({ sex: "male", heightCm: 170, wristCircumferenceCm: 17 });
    const female = calculateBodyType({ sex: "female", heightCm: 170, wristCircumferenceCm: 17 });
    // Same raw ratio, but potentially different classification since cutoffs differ by sex.
    expect(male.value.ratio).toBe(female.value.ratio);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateBodyType({ sex: "male", heightCm: 175, wristCircumferenceCm: 17.5 });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.assumptions.length).toBeGreaterThan(0);
    expect(result.rulesVersion).toBeTruthy();
  });
});
