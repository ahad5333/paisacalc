"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateLcm } from "@/lib/calc/lcm";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function LcmCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState(() => initialParam("a", 4));
  const [b, setB] = useState(() => initialParam("b", 6));
  const [c, setC] = useState(() => initialParam("c", 8));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculateLcm({ a, b, c });
  const { lcm } = result.value;

  return (
    <CalculatorPage
      title="Least common multiple calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="The smallest number that's a multiple of all three numbers, via prime factorisation."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumericInput label="a" value={a} onChange={setA} min={1} step={1} />
          <NumericInput label="b" value={b} onChange={setB} min={1} step={1} />
          <NumericInput label="c" value={c} onChange={setC} min={1} step={1} />
        </div>
      }
      result={<ResultDisplay value={`${lcm}`} caption={`lcm(${a}, ${b}, ${c})`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
