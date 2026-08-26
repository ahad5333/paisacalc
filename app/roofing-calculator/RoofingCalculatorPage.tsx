"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateRoofing } from "@/lib/calc/roofing";

const LAST_VERIFIED = "19 Aug 2026";

export function RoofingCalculatorPage({ content }: { content: ReactNode }) {
  const [lengthFt, setLengthFt] = useState(30);
  const [widthFt, setWidthFt] = useState(40);
  const [pitchRise, setPitchRise] = useState(6);
  const [pitchRun, setPitchRun] = useState(12);

  const result = calculateRoofing({ lengthFt, widthFt, pitchRise, pitchRun });
  const { roofSqft, squares, bundles } = result.value;

  return (
    <CalculatorPage
      title="Roofing calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Actual roof surface area from the building footprint and pitch, plus shingle bundles needed."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Length" value={lengthFt} onChange={setLengthFt} min={1} step={1} suffix="ft" />
            <NumericInput label="Width" value={widthFt} onChange={setWidthFt} min={1} step={1} suffix="ft" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Pitch rise" value={pitchRise} onChange={setPitchRise} min={0} max={24} step={1} helpText="e.g. 6 in a 6:12 pitch" />
            <NumericInput label="Pitch run" value={pitchRun} onChange={setPitchRun} min={1} max={24} step={1} helpText="Usually 12" />
          </div>
        </>
      }
      result={<ResultDisplay value={`${roofSqft} sq ft`} caption={`${squares} squares — ${bundles} bundles of shingles`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
