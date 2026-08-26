"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, DetailTable, CalculatorPage } from "@/components/calculator";
import { calculateBodySurfaceArea } from "@/lib/calc/body-surface-area";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";
const DEFAULTS = { height: 175, weight: 75 };

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function BodySurfaceAreaCalculator({ content }: { content: ReactNode }) {
  const [heightCm, setHeightCm] = useState(() => initialParam("h", DEFAULTS.height));
  const [weightKg, setWeightKg] = useState(() => initialParam("w", DEFAULTS.weight));

  useEffect(() => {
    replaceUrlParams({ h: heightCm, w: weightKg });
  }, [heightCm, weightKg]);

  const result = calculateBodySurfaceArea({ heightCm, weightKg });
  const { mosteller, dubois } = result.value;

  return (
    <CalculatorPage
      title="Body surface area calculator"
      heroImage="/images/hero-watch.webp"
      heroObjectPosition="center 50%"
      description="Body surface area (BSA) from height and weight, using both the Mosteller and DuBois formulas."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Height" value={heightCm} onChange={setHeightCm} min={100} max={220} step={1} suffix="cm" slider />
          <NumericInput label="Weight" value={weightKg} onChange={setWeightKg} min={20} max={180} step={0.5} suffix="kg" slider />
        </>
      }
      result={<ResultDisplay value={`${mosteller} m²`} caption={`Mosteller formula — DuBois gives ${dubois} m²`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      detailTable={
        <DetailTable
          caption="Both formulas"
          columns={[
            { key: "formula", label: "Formula" },
            { key: "bsa", label: "BSA", align: "right" },
          ]}
          rows={[
            { formula: "Mosteller (1987)", bsa: `${mosteller} m²` },
            { formula: "DuBois & DuBois (1916)", bsa: `${dubois} m²` },
          ]}
        />
      }
      content={content}
    />
  );
}
