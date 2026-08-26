import type { CalcResult } from "./types";

export type TargetHeartRateInputs = {
  age: number;
  restingHeartRate: number;
};

export type HeartRateZone = {
  label: string;
  lowPct: number;
  highPct: number;
  lowBpm: number;
  highBpm: number;
};

export type TargetHeartRateValue = {
  maxHeartRate: number;
  heartRateReserve: number;
  moderateLowBpm: number;
  moderateHighBpm: number;
  zones: HeartRateZone[];
};

const ZONE_DEFS: { label: string; lowPct: number; highPct: number }[] = [
  { label: "Warm up", lowPct: 0.5, highPct: 0.6 },
  { label: "Fat burn", lowPct: 0.6, highPct: 0.7 },
  { label: "Cardio", lowPct: 0.7, highPct: 0.8 },
  { label: "Peak", lowPct: 0.8, highPct: 0.9 },
];

// Karvonen formula (1957) — target HR = ((max HR − resting HR) × %intensity) +
// resting HR. Preferred over the simpler "max HR × %intensity" approach
// because it factors in resting heart rate (a proxy for cardiovascular
// fitness): two people of the same age with different resting heart rates
// get different, more individually-calibrated zones, rather than an
// identical one based on age alone. Max HR itself uses the 220 − age
// estimate, the most common formula in general fitness guidance — no
// single formula predicts individual max HR precisely, which is exactly
// why this is a training zone, not a diagnostic number.
export function calculateTargetHeartRate(inputs: TargetHeartRateInputs): CalcResult<TargetHeartRateValue> {
  const { age, restingHeartRate } = inputs;
  const maxHeartRate = Math.round(220 - age);
  const heartRateReserve = maxHeartRate - restingHeartRate;

  function atIntensity(pct: number): number {
    return Math.round(heartRateReserve * pct + restingHeartRate);
  }

  const zones: HeartRateZone[] = ZONE_DEFS.map((zone) => ({
    ...zone,
    lowBpm: atIntensity(zone.lowPct),
    highBpm: atIntensity(zone.highPct),
  }));

  const moderateLowBpm = atIntensity(0.5);
  const moderateHighBpm = atIntensity(0.85);

  return {
    value: { maxHeartRate, heartRateReserve, moderateLowBpm, moderateHighBpm, zones },
    steps: [
      { label: "Max heart rate", formula: "220 − age", value: maxHeartRate },
      { label: "Heart rate reserve", formula: "Max heart rate − resting heart rate", value: heartRateReserve },
      { label: "50% intensity (Karvonen)", formula: "(HRR × 0.50) + resting heart rate", value: moderateLowBpm },
      { label: "85% intensity (Karvonen)", formula: "(HRR × 0.85) + resting heart rate", value: moderateHighBpm },
    ],
    assumptions: [
      "Uses the Karvonen formula, which factors in resting heart rate — two people of the same age with different resting heart rates get different, more individually-calibrated zones than a formula based on age alone",
      "Max heart rate is estimated as 220 − age, the most common formula in general fitness guidance; individual max heart rate can vary by 10-15 bpm either way from this estimate",
      "These are general fitness training zones, not a medical diagnostic — anyone with a heart condition, or starting exercise after a long break, should get medical clearance first",
    ],
    rulesVersion: "220 − age max heart rate, Karvonen heart rate reserve formula (1957)",
  };
}
