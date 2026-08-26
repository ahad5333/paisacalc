"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateWindChill } from "@/lib/calc/wind-chill";

const LAST_VERIFIED = "19 Aug 2026";

export function WindChillCalculatorPage({ content }: { content: ReactNode }) {
  const [tempF, setTempF] = useState(20);
  const [windMph, setWindMph] = useState(15);

  const result = calculateWindChill({ tempF, windMph });
  const { windChillF, valid } = result.value;

  return (
    <CalculatorPage
      title="Wind chill calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="How cold it actually feels, from air temperature and wind speed."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Air temperature" value={tempF} onChange={setTempF} min={-50} max={90} step={1} suffix="°F" slider />
          <NumericInput label="Wind speed" value={windMph} onChange={setWindMph} min={0} max={80} step={1} suffix="mph" slider />
        </>
      }
      result={<ResultDisplay value={`${windChillF}°F`} caption={valid ? "Feels like" : "Outside the formula's valid range (≤50°F, ≥3mph)"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
