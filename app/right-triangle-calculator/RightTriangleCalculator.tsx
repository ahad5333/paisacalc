"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateRightTriangle } from "@/lib/calc/right-triangle";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function RightTriangleCalculator({ content }: { content: ReactNode }) {
  const [legA, setLegA] = useState(() => initialParam("a", 3));
  const [legB, setLegB] = useState(() => initialParam("b", 4));

  useEffect(() => {
    replaceUrlParams({ a: legA, b: legB });
  }, [legA, legB]);

  const result = calculateRightTriangle({ legA, legB });
  const { hypotenuse, area, perimeter, angleA, angleB } = result.value;

  return (
    <CalculatorPage
      title="Right triangle calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Hypotenuse, area, perimeter, and both non-right angles of a right triangle, from its two legs."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-2 gap-3">
          <NumericInput label="Leg a" value={legA} onChange={setLegA} min={0.01} step={0.5} />
          <NumericInput label="Leg b" value={legB} onChange={setLegB} min={0.01} step={0.5} />
        </div>
      }
      result={<ResultDisplay value={`${hypotenuse}`} caption={`Hypotenuse — area ${area}, perimeter ${perimeter}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="All measurements"
          columns={[
            { key: "measure", label: "Measurement" },
            { key: "value", label: "Value", align: "right" },
          ]}
          rows={[
            { measure: "Hypotenuse", value: `${hypotenuse}` },
            { measure: "Area", value: `${area}` },
            { measure: "Perimeter", value: `${perimeter}` },
            { measure: "Angle opposite a", value: `${angleA}°` },
            { measure: "Angle opposite b", value: `${angleB}°` },
          ]}
        />
      }
      content={content}
    />
  );
}
