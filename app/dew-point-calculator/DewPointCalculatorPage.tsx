"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateDewPoint } from "@/lib/calc/dew-point";

const LAST_VERIFIED = "19 Aug 2026";

export function DewPointCalculatorPage({ content }: { content: ReactNode }) {
  const [tempC, setTempC] = useState(25);
  const [humidityPct, setHumidityPct] = useState(60);

  const result = calculateDewPoint({ tempC, humidityPct });
  const { dewPointC } = result.value;

  return (
    <CalculatorPage
      title="Dew point calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The temperature air would need to cool to for dew to form, from temperature and humidity."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Air temperature" value={tempC} onChange={setTempC} min={-20} max={50} step={1} suffix="°C" slider />
          <NumericInput label="Relative humidity" value={humidityPct} onChange={setHumidityPct} min={1} max={100} step={1} suffix="%" slider />
        </>
      }
      result={<ResultDisplay value={`${dewPointC}°C`} caption="Dew point" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
