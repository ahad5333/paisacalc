import type { CalcResult } from "./types";

export type WindChillInputs = {
  tempF: number;
  windMph: number;
};

// The US National Weather Service's 2001 wind chill formula — the
// current standard, replacing an older 1945 formula found to
// overestimate cooling. Only valid for temperatures at or below 50°F
// and wind speeds at or above 3 mph, where wind chill is meaningful.
export function calculateWindChill(inputs: WindChillInputs): CalcResult<{ windChillF: number; valid: boolean }> {
  const { tempF, windMph } = inputs;
  const valid = tempF <= 50 && windMph >= 3;

  const v016 = Math.pow(windMph, 0.16);
  const windChillF = Math.round((35.74 + 0.6215 * tempF - 35.75 * v016 + 0.4275 * tempF * v016) * 10) / 10;

  return {
    value: { windChillF, valid },
    steps: [{ label: "Wind chill", formula: "35.74 + 0.6215T − 35.75V^0.16 + 0.4275TV^0.16", value: valid ? windChillF : "outside formula's valid range" }],
    assumptions: [
      "Uses the US National Weather Service's 2001 formula, the current standard",
      "Only valid for temperatures at or below 50°F and wind speeds at or above 3 mph — outside that range wind chill isn't a meaningful concept",
    ],
    rulesVersion: "NWS wind chill formula (2001)",
  };
}
