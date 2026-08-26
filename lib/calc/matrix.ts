import type { CalcResult } from "./types";

export type MatrixOperation = "add" | "subtract" | "multiply";
export type Matrix2x2 = [[number, number], [number, number]];

export type MatrixInputs = {
  a: Matrix2x2;
  b: Matrix2x2;
  operation: MatrixOperation;
};

export type MatrixValue = {
  result: Matrix2x2;
  determinantA: number;
  determinantB: number;
};

function determinant(m: Matrix2x2): number {
  return m[0][0] * m[1][1] - m[0][1] * m[1][0];
}

const OPERATION_SYMBOLS: Record<MatrixOperation, string> = { add: "+", subtract: "−", multiply: "×" };

// Scoped to 2×2 matrices — the size most introductory linear algebra
// starts with, and large enough to demonstrate every operation here
// (including that matrix multiplication isn't commutative) without the
// added complexity of an arbitrary-size grid input.
export function calculateMatrix(inputs: MatrixInputs): CalcResult<MatrixValue> {
  const { a, b, operation } = inputs;
  let result: Matrix2x2;

  if (operation === "add") {
    result = [
      [a[0][0] + b[0][0], a[0][1] + b[0][1]],
      [a[1][0] + b[1][0], a[1][1] + b[1][1]],
    ];
  } else if (operation === "subtract") {
    result = [
      [a[0][0] - b[0][0], a[0][1] - b[0][1]],
      [a[1][0] - b[1][0], a[1][1] - b[1][1]],
    ];
  } else {
    result = [
      [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
      [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
    ];
  }

  const determinantA = determinant(a);
  const determinantB = determinant(b);

  return {
    value: { result, determinantA, determinantB },
    steps: [
      {
        label: `Result (A ${OPERATION_SYMBOLS[operation]} B)`,
        formula: "element-wise" + (operation === "multiply" ? " row×column" : ""),
        value: `[${result[0][0]}, ${result[0][1]}; ${result[1][0]}, ${result[1][1]}]`,
      },
      { label: "det(A)", formula: `${a[0][0]}×${a[1][1]} − ${a[0][1]}×${a[1][0]}`, value: determinantA },
      { label: "det(B)", formula: `${b[0][0]}×${b[1][1]} − ${b[0][1]}×${b[1][0]}`, value: determinantB },
    ],
    assumptions: [
      "Scoped to 2×2 matrices, the standard starting point for introductory linear algebra",
      operation === "multiply" ? "Matrix multiplication is not commutative — A×B generally differs from B×A" : "Addition and subtraction are element-wise",
    ],
    rulesVersion: "Standard 2×2 matrix arithmetic",
  };
}
