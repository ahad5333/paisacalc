import type { CalcResult } from "./types";

export type ResistorColor = "black" | "brown" | "red" | "orange" | "yellow" | "green" | "blue" | "violet" | "grey" | "white" | "gold" | "silver";

const DIGIT_VALUES: Partial<Record<ResistorColor, number>> = {
  black: 0, brown: 1, red: 2, orange: 3, yellow: 4, green: 5, blue: 6, violet: 7, grey: 8, white: 9,
};

const MULTIPLIER_VALUES: Partial<Record<ResistorColor, number>> = {
  black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000, green: 100000, blue: 1000000,
  gold: 0.1, silver: 0.01,
};

const TOLERANCE_VALUES: Partial<Record<ResistorColor, number>> = {
  brown: 1, red: 2, green: 0.5, blue: 0.25, violet: 0.1, gold: 5, silver: 10,
};

export type ResistorInputs = {
  band1: ResistorColor;
  band2: ResistorColor;
  multiplier: ResistorColor;
  tolerance: ResistorColor;
};

function formatOhms(value: number): string {
  if (value >= 1e6) return `${Math.round((value / 1e6) * 100) / 100} MΩ`;
  if (value >= 1e3) return `${Math.round((value / 1e3) * 100) / 100} kΩ`;
  return `${Math.round(value * 100) / 100} Ω`;
}

// Standard 4-band resistor color code — the two significant digits,
// times the multiplier band's power of ten, is the industry-standard
// convention printed on every resistor datasheet.
export function calculateResistor(inputs: ResistorInputs): CalcResult<{ resistanceOhms: number; formatted: string; tolerancePct: number }> {
  const { band1, band2, multiplier, tolerance } = inputs;
  const digit1 = DIGIT_VALUES[band1] ?? 0;
  const digit2 = DIGIT_VALUES[band2] ?? 0;
  const mult = MULTIPLIER_VALUES[multiplier] ?? 1;
  const tolerancePct = TOLERANCE_VALUES[tolerance] ?? 20;

  const resistanceOhms = (digit1 * 10 + digit2) * mult;
  const formatted = formatOhms(resistanceOhms);

  return {
    value: { resistanceOhms, formatted, tolerancePct },
    steps: [
      { label: "Base value", formula: `${digit1}${digit2} × ${mult}`, value: resistanceOhms },
      { label: "Resistance", formula: "", value: `${formatted} ± ${tolerancePct}%` },
    ],
    assumptions: ["Uses the standard 4-band color code (2 significant digits, ×10 multiplier, tolerance) — a 5-band resistor adds a third significant digit for higher precision"],
    rulesVersion: "Standard resistor color code",
  };
}
