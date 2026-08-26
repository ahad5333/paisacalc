import { describe, expect, it } from "vitest";
import { calculateMatrix } from "@/lib/calc/matrix";

describe("calculateMatrix — worked example", () => {
  it("adds two 2x2 matrices element-wise", () => {
    const result = calculateMatrix({
      a: [
        [1, 2],
        [3, 4],
      ],
      b: [
        [5, 6],
        [7, 8],
      ],
      operation: "add",
    });
    expect(result.value.result).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it("multiplies two 2x2 matrices via row-by-column", () => {
    const result = calculateMatrix({
      a: [
        [1, 2],
        [3, 4],
      ],
      b: [
        [5, 6],
        [7, 8],
      ],
      operation: "multiply",
    });
    expect(result.value.result).toEqual([
      [19, 22],
      [43, 50],
    ]);
  });
});

describe("calculateMatrix — boundary cases", () => {
  it("computes the determinant of each input matrix", () => {
    const result = calculateMatrix({
      a: [
        [1, 2],
        [3, 4],
      ],
      b: [
        [2, 0],
        [0, 2],
      ],
      operation: "add",
    });
    expect(result.value.determinantA).toBe(-2);
    expect(result.value.determinantB).toBe(4);
  });

  it("matrix multiplication is not commutative", () => {
    const ab = calculateMatrix({
      a: [
        [1, 2],
        [0, 1],
      ],
      b: [
        [1, 0],
        [3, 1],
      ],
      operation: "multiply",
    });
    const ba = calculateMatrix({
      a: [
        [1, 0],
        [3, 1],
      ],
      b: [
        [1, 2],
        [0, 1],
      ],
      operation: "multiply",
    });
    expect(ab.value.result).not.toEqual(ba.value.result);
  });

  it("returns a full CalcResult with steps, assumptions, and a rules version", () => {
    const result = calculateMatrix({
      a: [
        [1, 2],
        [3, 4],
      ],
      b: [
        [5, 6],
        [7, 8],
      ],
      operation: "add",
    });
    expect(result.steps.length).toBeGreaterThanOrEqual(2);
    expect(result.rulesVersion).toBeTruthy();
  });
});
