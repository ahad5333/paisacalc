import type { CalcResult } from "./types";

export type BigNumberOperation = "add" | "subtract" | "multiply";

export type BigNumberInputs = {
  aStr: string;
  bStr: string;
  operation: BigNumberOperation;
};

function safeBigInt(raw: string): bigint {
  const trimmed = raw.trim();
  if (trimmed === "" || !/^-?\d+$/.test(trimmed)) return BigInt(0);
  return BigInt(trimmed);
}

function groupThousands(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatBigInt(value: bigint): string {
  const negative = value < BigInt(0);
  const digits = (negative ? -value : value).toString();
  return `${negative ? "-" : ""}${groupThousands(digits)}`;
}

const OPERATION_SYMBOLS: Record<BigNumberOperation, string> = { add: "+", subtract: "−", multiply: "×" };

// Uses BigInt rather than JS numbers, which silently lose precision past
// 2^53 (about 9 quadrillion) — the entire point of a "big number"
// calculator is operating past where ordinary floating-point arithmetic
// stays exact.
export function calculateBigNumber(inputs: BigNumberInputs): CalcResult<{ result: string }> {
  const { aStr, bStr, operation } = inputs;
  const a = safeBigInt(aStr);
  const b = safeBigInt(bStr);

  let result: bigint;
  if (operation === "add") result = a + b;
  else if (operation === "subtract") result = a - b;
  else result = a * b;

  return {
    value: { result: formatBigInt(result) },
    steps: [{ label: "Result", formula: `${formatBigInt(a)} ${OPERATION_SYMBOLS[operation]} ${formatBigInt(b)}`, value: formatBigInt(result) }],
    assumptions: [
      "Computed with arbitrary-precision integer arithmetic (BigInt), so results stay exact no matter how many digits long — unlike ordinary numbers, which lose precision beyond about 9 quadrillion",
      "Only whole numbers are supported — decimal input is not valid for this calculator",
    ],
    rulesVersion: "Arbitrary-precision integer arithmetic",
  };
}
