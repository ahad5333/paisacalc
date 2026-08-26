"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGasMileage } from "@/lib/calc/gas-mileage";

const LAST_VERIFIED = "19 Aug 2026";

export function GasMileageCalculatorPage({ content }: { content: ReactNode }) {
  const [distanceKm, setDistanceKm] = useState(300);
  const [fuelUsedLiters, setFuelUsedLiters] = useState(20);

  const result = calculateGasMileage({ distanceKm, fuelUsedLiters });
  const { kmPerLiter, litersPer100km } = result.value;

  return (
    <CalculatorPage
      title="Gas mileage calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Your car's actual fuel efficiency, from distance driven and fuel used."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Distance driven" value={distanceKm} onChange={setDistanceKm} min={1} step={10} suffix="km" />
          <NumericInput label="Fuel used" value={fuelUsedLiters} onChange={setFuelUsedLiters} min={0.1} step={1} suffix="L" />
        </>
      }
      result={<ResultDisplay value={`${kmPerLiter} km/L`} caption={`${litersPer100km} L/100km`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
