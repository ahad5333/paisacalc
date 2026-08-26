"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBtu, type ClimateZone } from "@/lib/calc/btu";

const LAST_VERIFIED = "19 Aug 2026";

const CLIMATE_OPTIONS: { value: ClimateZone; label: string }[] = [
  { value: "mild", label: "Mild" },
  { value: "moderate", label: "Moderate" },
  { value: "hot", label: "Hot" },
];

const SUN_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "false", label: "Not sunny" },
  { value: "true", label: "Sunny/west-facing" },
];

export function BtuCalculatorPage({ content }: { content: ReactNode }) {
  const [squareFeet, setSquareFeet] = useState(300);
  const [climateZone, setClimateZone] = useState<ClimateZone>("moderate");
  const [occupants, setOccupants] = useState(2);
  const [sunnyStr, setSunnyStr] = useState<"true" | "false">("false");

  const result = calculateBtu({ squareFeet, climateZone, occupants, sunnyRoom: sunnyStr === "true" });
  const { btu } = result.value;

  return (
    <CalculatorPage
      title="BTU calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Estimated air conditioner or heater BTU/hour sizing for a room."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Room area" value={squareFeet} onChange={setSquareFeet} min={50} max={2000} step={10} suffix="sq ft" slider />
          <ChoiceInput label="Climate" value={climateZone} onChange={setClimateZone} options={CLIMATE_OPTIONS} />
          <NumericInput label="Occupants" value={occupants} onChange={setOccupants} min={1} max={10} step={1} />
          <ChoiceInput label="Sun exposure" value={sunnyStr} onChange={setSunnyStr} options={SUN_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={`${btu.toLocaleString("en-IN")}`} caption="BTU/hour" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
