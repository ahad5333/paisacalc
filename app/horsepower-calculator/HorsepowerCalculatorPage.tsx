"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateHorsepower } from "@/lib/calc/horsepower";

const LAST_VERIFIED = "19 Aug 2026";

export function HorsepowerCalculatorPage({ content }: { content: ReactNode }) {
  const [torqueLbFt, setTorqueLbFt] = useState(300);
  const [rpm, setRpm] = useState(4000);

  const result = calculateHorsepower({ torqueLbFt, rpm });
  const { horsepower } = result.value;

  return (
    <CalculatorPage
      title="Horsepower calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Horsepower from torque and engine RPM."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Torque" value={torqueLbFt} onChange={setTorqueLbFt} min={1} step={5} suffix="lb-ft" />
          <NumericInput label="Engine speed" value={rpm} onChange={setRpm} min={100} max={10000} step={100} suffix="RPM" slider />
        </>
      }
      result={<ResultDisplay value={`${horsepower} HP`} caption="Horsepower" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
