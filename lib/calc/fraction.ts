import type { CalcResult } from "./types";
import { gcd } from "./math-utils";

export type FractionOperation = "add" | "subtract" | "multiply" | "divide";

export type FractionInputs = {
  num1: number;
  den1: number;
  num2: number;
  den2: number;
  operation: FractionOperation;
};

export type FractionValue = {
  resultNum: number;
  resultDen: number;
  decimal: number;
};

const OPERATION_SYMBOLS: Record<FractionOperation, string> = { add: "+", subtract: "−", multiply: "×", divide: "÷" };

export function calculateFraction(inputs: FractionInputs): CalcResult<FractionValue> {
  const { num1, den1, num2, den2, operation } = inputs;

  let rawNum: number;
  let rawDen: number;
  switch (operation) {
    case "add":
      rawNum = num1 * den2 + num2 * den1;
      rawDen = den1 * den2;
      break;
    case "subtract":
      rawNum = num1 * den2 - num2 * den1;
      rawDen = den1 * den2;
      break;
    case "multiply":
      rawNum = num1 * num2;
      rawDen = den1 * den2;
      break;
    case "divide":
      rawNum = num1 * den2;
      rawDen = den1 * num2;
      break;
  }

  const divisor = gcd(rawNum, rawDen) || 1;
  let resultNum = rawNum / divisor;
  let resultDen = rawDen / divisor;
  if (resultDen < 0) {
    resultNum *= -1;
    resultDen *= -1;
  }
  const decimal = Math.round((resultNum / resultDen) * 10000) / 10000;

  return {
    value: { resultNum, resultDen, decimal },
    steps: [
      {
        label: "Result (unsimplified)",
        formula: `${num1}/${den1} ${OPERATION_SYMBOLS[operation]} ${num2}/${den2}`,
        value: `${rawNum}/${rawDen}`,
      },
      { label: "Simplified fraction", formula: `÷ GCD (${divisor})`, value: `${resultNum}/${resultDen}` },
      { label: "Decimal equivalent", formula: `${resultNum} ÷ ${resultDen}`, value: decimal },
    ],
    assumptions: [
      "The result is simplified by dividing both the numerator and denominator by their greatest common divisor",
      "The decimal equivalent is rounded to 4 decimal places for display — the exact fraction above is the precise result",
    ],
    rulesVersion: "Standard fraction arithmetic",
  };
}
