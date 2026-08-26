"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePace } from "@/lib/calc/pace";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { distance: 10, time: 52 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PaceCalculator({ content }: { content: ReactNode }) {
  const [distanceKm, setDistanceKm] = useState(() => initialParam("d", DEFAULTS.distance));
  const [timeMinutes, setTimeMinutes] = useState(() => initialParam("t", DEFAULTS.time));

  useEffect(() => {
    replaceUrlParams({ d: distanceKm, t: timeMinutes });
  }, [distanceKm, timeMinutes]);

  const result = calculatePace({ distanceKm, timeMinutes });
  const { paceMinutesPart, paceSecondsPart, speedKmh } = result.value;

  return (
    <CalculatorPage
      title="Pace calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 60%"
      description="Running pace and speed from a distance and a finishing time — for planning a race or checking a training run."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Distance" value={distanceKm} onChange={setDistanceKm} min={0.5} max={100} step={0.5} suffix="km" slider />
          <NumericInput label="Time" value={timeMinutes} onChange={setTimeMinutes} min={1} max={600} step={1} suffix="minutes" slider />
        </>
      }
      result={
        <ResultDisplay
          value={`${paceMinutesPart}:${String(paceSecondsPart).padStart(2, "0")} /km`}
          caption={`Pace — ${speedKmh} km/h average speed`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
