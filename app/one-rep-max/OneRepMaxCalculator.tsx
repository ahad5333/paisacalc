"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateOneRepMax } from "@/lib/calc/one-rep-max";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { weight: 100, reps: 5 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function OneRepMaxCalculator({ content }: { content: ReactNode }) {
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));
  const [reps, setReps] = useState(() => initialParam("r", DEFAULTS.reps));

  useEffect(() => {
    replaceUrlParams({ w: weightKg, r: reps });
  }, [weightKg, reps]);

  const result = calculateOneRepMax({ weightKg, reps });
  const { epley, brzycki, average } = result.value;
  const lowest = Math.min(epley, brzycki);
  const highest = Math.max(epley, brzycki);

  return (
    <CalculatorPage
      title="One rep max calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Estimated single-rep max from a sub-maximal set, using the Epley and Brzycki formulas shown side by side rather than picked one over the other."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Weight lifted" value={weightKg} onChange={setWeightKg} min={20} max={250} step={2.5} suffix="kg" slider />
          <NumericInput label="Reps performed" value={reps} onChange={setReps} min={1} max={12} step={1} suffix="reps" slider />
        </>
      }
      result={
        <ResultDisplay
          value={`${average} kg`}
          caption={`Average of both formulas — they range from ${lowest}kg to ${highest}kg`}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
