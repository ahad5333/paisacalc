"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateFuelCost } from "@/lib/calc/fuel-cost";

const LAST_VERIFIED = "19 Aug 2026";

export function FuelCostCalculatorPage({ content }: { content: ReactNode }) {
  const [distanceKm, setDistanceKm] = useState(300);
  const [kmPerLiter, setKmPerLiter] = useState(15);
  const [pricePerLiter, setPricePerLiter] = useState(100);

  const result = calculateFuelCost({ distanceKm, kmPerLiter, pricePerLiter });
  const { litersUsed, totalCost } = result.value;

  return (
    <CalculatorPage
      title="Fuel cost calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Total fuel cost for a trip, from distance, fuel efficiency, and fuel price."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Distance" value={distanceKm} onChange={setDistanceKm} min={1} step={10} suffix="km" />
          <NumericInput label="Fuel efficiency" value={kmPerLiter} onChange={setKmPerLiter} min={1} step={1} suffix="km/L" />
          <NumericInput label="Fuel price" value={pricePerLiter} onChange={setPricePerLiter} min={1} step={1} suffix="/L" />
        </>
      }
      result={<ResultDisplay value={`${totalCost}`} caption={`Total cost — ${litersUsed} litres`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
