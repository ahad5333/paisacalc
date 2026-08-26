import type { CalcResult } from "./types";

export type HexDirection = "toHex" | "toDecimal";

export type HexInputs = {
  direction: HexDirection;
  decimalValue: number;
  hexValue: string;
};

function sanitizeHex(raw: string): string {
  const trimmed = raw.trim();
  return /^[0-9a-fA-F]+$/.test(trimmed) ? trimmed : "0";
}

export function calculateHex(inputs: HexInputs): CalcResult<{ hex: string; decimal: number }> {
  const { direction, decimalValue, hexValue } = inputs;

  if (direction === "toHex") {
    const decimal = Math.round(decimalValue);
    const hex = (decimal < 0 ? `-${Math.abs(decimal).toString(16)}` : decimal.toString(16)).toUpperCase();
    return {
      value: { hex, decimal },
      steps: [{ label: "Hexadecimal (base 16)", formula: `${decimal} in base 16`, value: hex }],
      assumptions: ["Negative numbers are shown as a minus sign plus the hex magnitude, not two's complement"],
      rulesVersion: "Standard base-10 to base-16 conversion",
    };
  }

  const hex = sanitizeHex(hexValue);
  const decimal = parseInt(hex, 16);
  return {
    value: { hex: hex.toUpperCase(), decimal },
    steps: [{ label: "Decimal (base 10)", formula: `${hex.toUpperCase()} in base 10`, value: decimal }],
    assumptions: ["Digits 0-9 and letters A-F (case-insensitive) are valid hex input; anything else is treated as 0"],
    rulesVersion: "Standard base-16 to base-10 conversion",
  };
}
