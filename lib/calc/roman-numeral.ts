import type { CalcResult } from "./types";

export type RomanDirection = "toRoman" | "toDecimal";

export type RomanNumeralInputs = {
  direction: RomanDirection;
  decimalValue: number;
  romanValue: string;
};

const NUMERALS: [number, string][] = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
  [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
];

function toRoman(n: number): string {
  let remaining = n;
  let result = "";
  for (const [value, symbol] of NUMERALS) {
    while (remaining >= value) {
      result += symbol;
      remaining -= value;
    }
  }
  return result;
}

function fromRoman(roman: string): number | null {
  const upper = roman.toUpperCase();
  let i = 0;
  let total = 0;
  for (const [value, symbol] of NUMERALS) {
    while (upper.slice(i, i + symbol.length) === symbol) {
      total += value;
      i += symbol.length;
    }
  }
  if (i !== upper.length || total === 0) return null;
  // Round-trip check catches malformed input like "IIII" or "VV" that
  // greedily parses to a number but isn't the canonical Roman form.
  if (toRoman(total) !== upper) return null;
  return total;
}

export function calculateRomanNumeral(inputs: RomanNumeralInputs): CalcResult<{ roman: string; decimal: number; error: string | null }> {
  const { direction, decimalValue, romanValue } = inputs;

  if (direction === "toRoman") {
    const decimal = Math.round(decimalValue);
    if (decimal < 1 || decimal > 3999) {
      return {
        value: { roman: "", decimal, error: "Standard Roman numerals only represent 1 to 3999" },
        steps: [{ label: "Roman numeral", formula: `${decimal}`, value: "out of range" }],
        assumptions: ["Standard Roman numerals only represent whole numbers from 1 to 3999"],
        rulesVersion: "Standard Roman numeral system",
      };
    }
    const roman = toRoman(decimal);
    return {
      value: { roman, decimal, error: null },
      steps: [{ label: "Roman numeral", formula: `${decimal} in Roman numerals`, value: roman }],
      assumptions: ["Uses standard subtractive notation (e.g. IV for 4, IX for 9)"],
      rulesVersion: "Standard Roman numeral system",
    };
  }

  const decimal = fromRoman(romanValue);
  if (decimal === null) {
    return {
      value: { roman: romanValue, decimal: NaN, error: "Not a valid Roman numeral" },
      steps: [{ label: "Decimal value", formula: romanValue, value: "invalid" }],
      assumptions: ["Must be a well-formed Roman numeral using standard subtractive notation"],
      rulesVersion: "Standard Roman numeral system",
    };
  }
  return {
    value: { roman: romanValue.toUpperCase(), decimal, error: null },
    steps: [{ label: "Decimal value", formula: `${romanValue.toUpperCase()} in decimal`, value: decimal }],
    assumptions: ["Must be a well-formed Roman numeral using standard subtractive notation"],
    rulesVersion: "Standard Roman numeral system",
  };
}
