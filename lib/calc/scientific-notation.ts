import type { CalcResult } from "./types";

export type ScientificNotationDirection = "toScientific" | "toDecimal";

export type ScientificNotationInputs = {
  direction: ScientificNotationDirection;
  decimalValue: number;
  mantissa: number;
  exponent: number;
};

export type ScientificNotationValue = {
  mantissa: number;
  exponent: number;
  decimal: number;
};

export function calculateScientificNotation(inputs: ScientificNotationInputs): CalcResult<ScientificNotationValue> {
  const { direction, decimalValue, mantissa: inMantissa, exponent: inExponent } = inputs;

  let mantissa: number;
  let exponent: number;
  let decimal: number;

  if (direction === "toScientific") {
    decimal = decimalValue;
    if (decimal === 0) {
      mantissa = 0;
      exponent = 0;
    } else {
      exponent = Math.floor(Math.log10(Math.abs(decimal)));
      mantissa = Math.round((decimal / Math.pow(10, exponent)) * 1e10) / 1e10;
      // Guard against log10 rounding putting the mantissa just outside [1, 10).
      if (Math.abs(mantissa) >= 10) {
        mantissa /= 10;
        exponent += 1;
      } else if (Math.abs(mantissa) < 1) {
        mantissa *= 10;
        exponent -= 1;
      }
    }
  } else {
    mantissa = inMantissa;
    exponent = inExponent;
    decimal = mantissa * Math.pow(10, exponent);
  }

  return {
    value: { mantissa, exponent, decimal },
    steps:
      direction === "toScientific"
        ? [{ label: "Scientific notation", formula: `${decimal} = mantissa × 10^exponent`, value: `${mantissa} × 10^${exponent}` }]
        : [{ label: "Decimal value", formula: `${mantissa} × 10^${exponent}`, value: decimal }],
    assumptions: ["The mantissa is normalised to have an absolute value between 1 and 10, the standard convention for scientific notation"],
    rulesVersion: "Standard scientific notation",
  };
}
