import type { CalcResult } from "./types";

export type DewPointInputs = {
  tempC: number;
  humidityPct: number;
};

// The Magnus formula approximation — widely used for its accuracy across
// typical atmospheric conditions (0-60°C, 1-100% humidity) without
// needing a full psychrometric lookup table.
export function calculateDewPoint(inputs: DewPointInputs): CalcResult<{ dewPointC: number }> {
  const { tempC: T, humidityPct: RH } = inputs;
  const alpha = Math.log(RH / 100) + (17.27 * T) / (237.3 + T);
  const dewPointC = Math.round(((237.3 * alpha) / (17.27 - alpha)) * 10) / 10;

  return {
    value: { dewPointC },
    steps: [{ label: "Dew point", formula: "Magnus formula", value: dewPointC }],
    assumptions: ["Uses the Magnus formula approximation, accurate across typical atmospheric conditions without needing a full psychrometric table"],
    rulesVersion: "Magnus formula",
  };
}
