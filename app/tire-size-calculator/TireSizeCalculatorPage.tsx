"use client";

import { useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateTireSize } from "@/lib/calc/tire-size";

const LAST_VERIFIED = "19 Aug 2026";

export function TireSizeCalculatorPage({ content }: { content: ReactNode }) {
  const [widthMm, setWidthMm] = useState(225);
  const [aspectRatioPct, setAspectRatioPct] = useState(45);
  const [rimDiameterIn, setRimDiameterIn] = useState(17);

  const result = calculateTireSize({ widthMm, aspectRatioPct, rimDiameterIn });
  const { sidewallHeightMm, overallDiameterIn, circumferenceIn, revsPerMile } = result.value;

  return (
    <CalculatorPage
      title="Tire size calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Sidewall height, overall diameter, and revolutions per mile from a tire size."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Width" value={widthMm} onChange={setWidthMm} min={100} max={355} step={5} suffix="mm" />
          <NumericInput label="Aspect ratio" value={aspectRatioPct} onChange={setAspectRatioPct} min={25} max={85} step={1} suffix="%" slider />
          <NumericInput label="Rim diameter" value={rimDiameterIn} onChange={setRimDiameterIn} min={10} max={24} step={1} suffix="in" slider />
        </>
      }
      result={<ResultDisplay value={`${overallDiameterIn} in`} caption={`Overall diameter — ${widthMm}/${aspectRatioPct}R${rimDiameterIn}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Full measurements"
          columns={[
            { key: "measure", label: "Measurement" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={[
            { measure: "Sidewall height", value: `${sidewallHeightMm} mm` },
            { measure: "Overall diameter", value: `${overallDiameterIn} in` },
            { measure: "Circumference", value: `${circumferenceIn} in` },
            { measure: "Revolutions per mile", value: `${revsPerMile}` },
          ]}
        />
      }
      content={content}
    />
  );
}
