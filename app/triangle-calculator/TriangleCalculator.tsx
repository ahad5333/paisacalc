"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateTriangle } from "@/lib/calc/triangle";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function TriangleCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState(() => initialParam("a", 3));
  const [b, setB] = useState(() => initialParam("b", 4));
  const [c, setC] = useState(() => initialParam("c", 5));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculateTriangle({ a, b, c });
  const { valid, area, perimeter, angleA, angleB, angleC } = result.value;

  return (
    <CalculatorPage
      title="Triangle calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Area, perimeter, and all three angles of a triangle, from its three side lengths."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumericInput label="Side a" value={a} onChange={setA} min={0.01} step={0.5} />
          <NumericInput label="Side b" value={b} onChange={setB} min={0.01} step={0.5} />
          <NumericInput label="Side c" value={c} onChange={setC} min={0.01} step={0.5} />
        </div>
      }
      result={
        <ResultDisplay
          value={valid ? `${area}` : "Invalid"}
          caption={valid ? `Area — perimeter ${perimeter}, angles ${angleA}°/${angleB}°/${angleC}°` : "Not a valid triangle — each side must be shorter than the sum of the other two"}
        />
      }
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
