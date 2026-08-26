"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateCircle } from "@/lib/calc/circle";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function CircleCalculator({ content }: { content: ReactNode }) {
  const [radius, setRadius] = useState(() => initialParam("r", 5));

  useEffect(() => {
    replaceUrlParams({ r: radius });
  }, [radius]);

  const result = calculateCircle({ radius });
  const { diameter, circumference, area } = result.value;

  return (
    <CalculatorPage
      title="Circle calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Diameter, circumference, and area of a circle, from its radius."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={<NumericInput label="Radius" value={radius} onChange={setRadius} min={0.01} step={0.5} />}
      result={<ResultDisplay value={`${area}`} caption={`Area — circumference ${circumference}, diameter ${diameter}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All measurements"
          columns={[
            { key: "measure", label: "Measurement" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={[
            { measure: "Radius", value: `${radius}` },
            { measure: "Diameter", value: `${diameter}` },
            { measure: "Circumference", value: `${circumference}` },
            { measure: "Area", value: `${area}` },
          ]}
        />
      }
      content={content}
    />
  );
}
