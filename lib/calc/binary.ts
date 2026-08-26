import type { CalcResult } from "./types";

export type BinaryDirection = "toBinary" | "toDecimal";

export type BinaryInputs = {
  direction: BinaryDirection;
  decimalValue: number;
  binaryValue: string;
};

function sanitizeBinary(raw: string): string {
  const trimmed = raw.trim();
  return /^[01]+$/.test(trimmed) ? trimmed : "0";
}

export function calculateBinary(inputs: BinaryInputs): CalcResult<{ binary: string; decimal: number }> {
  const { direction, decimalValue, binaryValue } = inputs;

  if (direction === "toBinary") {
    const decimal = Math.round(decimalValue);
    const binary = decimal < 0 ? `-${Math.abs(decimal).toString(2)}` : decimal.toString(2);
    return {
      value: { binary, decimal },
      steps: [{ label: "Binary (base 2)", formula: `${decimal} in base 2`, value: binary }],
      assumptions: ["Negative numbers are shown as a minus sign plus the binary magnitude, not two's complement"],
      rulesVersion: "Standard base-10 to base-2 conversion",
    };
  }

  const binary = sanitizeBinary(binaryValue);
  const decimal = parseInt(binary, 2);
  return {
    value: { binary, decimal },
    steps: [{ label: "Decimal (base 10)", formula: `${binary} in base 10`, value: decimal }],
    assumptions: ["Only the digits 0 and 1 are valid binary input; anything else is treated as 0"],
    rulesVersion: "Standard base-2 to base-10 conversion",
  };
}
