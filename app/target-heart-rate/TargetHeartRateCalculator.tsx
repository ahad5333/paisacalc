"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateTargetHeartRate } from "@/lib/calc/target-heart-rate";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { age: 30, resting: 70 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function TargetHeartRateCalculator({ content }: { content: ReactNode }) {
  const [age, setAge] = useState(() => initialParam("a", DEFAULTS.age));
  const [restingHeartRate, setRestingHeartRate] = useState(() => initialParam("r", DEFAULTS.resting));

  useEffect(() => {
    replaceUrlParams({ a: age, r: restingHeartRate });
  }, [age, restingHeartRate]);

  const result = calculateTargetHeartRate({ age, restingHeartRate });
  const { maxHeartRate, moderateLowBpm, moderateHighBpm, zones } = result.value;

  return (
    <CalculatorPage
      title="Target heart rate calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 55%"
      description="Training heart rate zones from age and resting heart rate, using the Karvonen formula rather than a simpler age-only estimate."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="years" slider />
          <NumericInput
            label="Resting heart rate"
            value={restingHeartRate}
            onChange={setRestingHeartRate}
            min={40}
            max={100}
            step={1}
            suffix="bpm"
            slider
            helpText="Measure first thing in the morning, before getting out of bed, for the most accurate reading."
          />
        </>
      }
      result={
        <ResultDisplay
          value={`${moderateLowBpm}–${moderateHighBpm} bpm`}
          caption={`Moderate-to-vigorous training zone — 50–85% heart rate reserve, max HR ${maxHeartRate} bpm`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Heart rate zones"
          columns={[
            { key: "zone", label: "Zone" },
            { key: "intensity", label: "Intensity" },
            { key: "range", label: "Range (bpm)", align: "right" },
          ]}
          rows={[
            ...zones.map((zone) => ({
              zone: zone.label,
              intensity: `${Math.round(zone.lowPct * 100)}–${Math.round(zone.highPct * 100)}%`,
              range: `${zone.lowBpm}–${zone.highBpm}`,
            })),
            { zone: "Maximum", intensity: "100%", range: `${maxHeartRate}` },
          ]}
        />
      }
      content={content}
    />
  );
}
