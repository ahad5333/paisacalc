import { describe, expect, it } from "vitest";
import { generatePassword } from "@/lib/calc/password-generator";

describe("generatePassword — worked example", () => {
  it("generates a password of the requested length", () => {
    const result = generatePassword({ length: 16, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: true });
    expect(result.value.password).toHaveLength(16);
  });
});

describe("generatePassword — boundary cases", () => {
  it("respects character-type selection (numbers only)", () => {
    const result = generatePassword({ length: 20, useUppercase: false, useLowercase: false, useNumbers: true, useSymbols: false });
    expect(result.value.password).toMatch(/^[0-9]+$/);
  });

  it("with no character types selected, returns an empty password", () => {
    const result = generatePassword({ length: 12, useUppercase: false, useLowercase: false, useNumbers: false, useSymbols: false });
    expect(result.value.password).toBe("");
  });

  it("more character types increases entropy for the same length", () => {
    const narrow = generatePassword({ length: 12, useUppercase: false, useLowercase: true, useNumbers: false, useSymbols: false });
    const wide = generatePassword({ length: 12, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: true });
    expect(wide.value.entropy).toBeGreaterThan(narrow.value.entropy);
  });

  it("returns a full CalcResult with steps and a rules version", () => {
    const result = generatePassword({ length: 12, useUppercase: true, useLowercase: true, useNumbers: true, useSymbols: false });
    expect(result.steps.length).toBeGreaterThanOrEqual(1);
    expect(result.rulesVersion).toBeTruthy();
  });
});
