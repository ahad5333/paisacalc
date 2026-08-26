"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateSlope } from "@/lib/calc/slope";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function SlopeCalculator({ content }: { content: ReactNode }) {
  const [x1, setX1] = useState(() => initialParam("x1", 1));
  const [y1, setY1] = useState(() => initialParam("y1", 2));
  const [x2, setX2] = useState(() => initialParam("x2", 4));
  const [y2, setY2] = useState(() => initialParam("y2", 8));

  useEffect(() => {
    replaceUrlParams({ x1, y1, x2, y2 });
  }, [x1, y1, x2, y2]);

  const result = calculateSlope({ x1, y1, x2, y2 });
  const { slope, distance } = result.value;

  return (
    <CalculatorPage
      title="Slope calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The slope, line equation, and distance between two points."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="x₁" value={x1} onChange={setX1} step={0.5} />
            <NumericInput label="y₁" value={y1} onChange={setY1} step={0.5} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="x₂" value={x2} onChange={setX2} step={0.5} />
            <NumericInput label="y₂" value={y2} onChange={setY2} step={0.5} />
          </div>
        </>
      }
      result={<ResultDisplay value={slope === null ? "undefined" : `${slope}`} caption={`Slope (m) — distance ${distance}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
