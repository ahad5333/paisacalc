"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateGcf } from "@/lib/calc/gcf";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function GcfCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState(() => initialParam("a", 12));
  const [b, setB] = useState(() => initialParam("b", 18));
  const [c, setC] = useState(() => initialParam("c", 24));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculateGcf({ a, b, c });
  const { gcf } = result.value;

  return (
    <CalculatorPage
      title="Greatest common factor calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The largest number that divides all three numbers evenly, via prime factorisation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumericInput label="a" value={a} onChange={setA} min={1} step={1} />
          <NumericInput label="b" value={b} onChange={setB} min={1} step={1} />
          <NumericInput label="c" value={c} onChange={setC} min={1} step={1} />
        </div>
      }
      result={<ResultDisplay value={`${gcf}`} caption={`gcf(${a}, ${b}, ${c})`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
