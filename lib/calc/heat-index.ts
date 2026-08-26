import type { CalcResult } from "./types";

export type HeatIndexInputs = {
  tempF: number;
  humidityPct: number;
};

// The Rothfusz regression, the US National Weather Service's standard
// heat index formula — most accurate for temperatures at or above 80°F
// and humidity at or above 40%, the range it was fitted to.
export function calculateHeatIndex(inputs: HeatIndexInputs): CalcResult<{ heatIndexF: number; valid: boolean }> {
  const { tempF: T, humidityPct: R } = inputs;
  const valid = T >= 80 && R >= 40;

  const heatIndexF =
    Math.round(
      (-42.379 +
        2.04901523 * T +
        10.14333127 * R -
        0.22475541 * T * R -
        0.00683783 * T * T -
        0.05481717 * R * R +
        0.00122874 * T * T * R +
        0.00085282 * T * R * R -
        0.00000199 * T * T * R * R) *
        10,
    ) / 10;

  return {
    value: { heatIndexF, valid },
    steps: [{ label: "Heat index", formula: "Rothfusz regression", value: valid ? heatIndexF : "outside formula's most accurate range" }],
    assumptions: [
      "Uses the Rothfusz regression, the US National Weather Service's standard heat index formula",
      "Most accurate for temperatures at or above 80°F and relative humidity at or above 40% — the conditions it was originally fitted to",
    ],
    rulesVersion: "NWS heat index (Rothfusz regression)",
  };
}
