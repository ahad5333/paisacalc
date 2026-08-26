import type { CalcResult } from "./types";

export type WireGauge = "14" | "12" | "10" | "8" | "6" | "4" | "2" | "1/0";

// Standard copper wire resistance, ohms per 1000 feet (NEC reference
// values) — the same table electricians use to size wire runs.
const OHMS_PER_1000FT: Record<WireGauge, number> = {
  "14": 2.525,
  "12": 1.588,
  "10": 0.9989,
  "8": 0.6282,
  "6": 0.3951,
  "4": 0.2485,
  "2": 0.1563,
  "1/0": 0.09827,
};

export type VoltageDropInputs = {
  gauge: WireGauge;
  lengthFt: number;
  currentAmps: number;
  sourceVoltage: number;
};

export type VoltageDropValue = {
  voltageDrop: number;
  voltageDropPct: number;
  voltageAtLoad: number;
};

export function calculateVoltageDrop(inputs: VoltageDropInputs): CalcResult<VoltageDropValue> {
  const { gauge, lengthFt, currentAmps, sourceVoltage } = inputs;
  const resistancePerFt = OHMS_PER_1000FT[gauge] / 1000;
  // ×2 accounts for the round trip — current flows out to the load and
  // back through the return conductor, so both legs of wire contribute
  // resistance to the drop.
  const voltageDrop = Math.round(2 * lengthFt * resistancePerFt * currentAmps * 1000) / 1000;
  const voltageDropPct = Math.round((voltageDrop / sourceVoltage) * 10000) / 100;
  const voltageAtLoad = Math.round((sourceVoltage - voltageDrop) * 1000) / 1000;

  return {
    value: { voltageDrop, voltageDropPct, voltageAtLoad },
    steps: [
      { label: "Voltage drop", formula: `2 × ${lengthFt}ft × ${OHMS_PER_1000FT[gauge]}Ω/kft ÷ 1000 × ${currentAmps}A`, value: voltageDrop },
      { label: "Drop as % of source", formula: `drop ÷ ${sourceVoltage}V`, value: `${voltageDropPct}%` },
      { label: "Voltage at load", formula: `${sourceVoltage}V − drop`, value: voltageAtLoad },
    ],
    assumptions: [
      "Uses standard copper wire resistance values (ohms per 1000ft) — aluminum wire has meaningfully higher resistance and would show a larger drop for the same gauge",
      "The ×2 factor accounts for the round-trip circuit (out and back) — most electrical codes recommend keeping voltage drop under 3% for branch circuits, 5% total",
    ],
    rulesVersion: "Standard copper wire voltage drop formula",
  };
}
