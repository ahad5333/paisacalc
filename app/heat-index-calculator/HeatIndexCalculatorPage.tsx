"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHeatIndex } from "@/lib/calc/heat-index";

const LAST_VERIFIED = "19 Aug 2026";

export function HeatIndexCalculatorPage({ content }: { content: ReactNode }) {
  const [tempF, setTempF] = useState(90);
  const [humidityPct, setHumidityPct] = useState(60);

  const result = calculateHeatIndex({ tempF, humidityPct });
  const { heatIndexF, valid } = result.value;

  return (
    <CalculatorPage
      title="Heat index calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How hot it actually feels, from air temperature and relative humidity."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Air temperature" value={tempF} onChange={setTempF} min={50} max={120} step={1} suffix="°F" slider />
          <NumericInput label="Relative humidity" value={humidityPct} onChange={setHumidityPct} min={0} max={100} step={1} suffix="%" slider />
        </>
      }
      result={<ResultDisplay value={`${heatIndexF}°F`} caption={valid ? "Feels like" : "Outside the formula's most accurate range (≥80°F, ≥40%)"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
