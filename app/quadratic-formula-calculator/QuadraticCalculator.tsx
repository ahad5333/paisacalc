"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateQuadratic } from "@/lib/calc/quadratic";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function QuadraticCalculator({ content }: { content: ReactNode }) {
  const [a, setA] = useState(() => initialParam("a", 1));
  const [b, setB] = useState(() => initialParam("b", -5));
  const [c, setC] = useState(() => initialParam("c", 6));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculateQuadratic({ a, b, c });
  const { root1Display, root2Display, natureOfRoots } = result.value;

  return (
    <CalculatorPage
      title="Quadratic formula calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Solve ax² + bx + c = 0 for x, including complex roots when the discriminant is negative."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-3 gap-3">
          <NumericInput label="a" value={a} onChange={setA} step={0.5} />
          <NumericInput label="b" value={b} onChange={setB} step={0.5} />
          <NumericInput label="c" value={c} onChange={setC} step={0.5} />
        </div>
      }
      result={<ResultDisplay value={`x = ${root1Display}, ${root2Display}`} caption={natureOfRoots} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
