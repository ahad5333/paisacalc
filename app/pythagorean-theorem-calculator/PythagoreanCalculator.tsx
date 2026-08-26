"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePythagorean, type PythagoreanUnknown } from "@/lib/calc/pythagorean";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

const UNKNOWN_OPTIONS: { value: PythagoreanUnknown; label: string }[] = [
  { value: "c", label: "Solve for c (hypotenuse)" },
  { value: "a", label: "Solve for a" },
  { value: "b", label: "Solve for b" },
];

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PythagoreanCalculator({ content }: { content: ReactNode }) {
  const [unknown, setUnknown] = useState<PythagoreanUnknown>("c");
  const [a, setA] = useState(() => initialParam("a", 3));
  const [b, setB] = useState(() => initialParam("b", 4));
  const [c, setC] = useState(() => initialParam("c", 5));

  useEffect(() => {
    replaceUrlParams({ a, b, c });
  }, [a, b, c]);

  const result = calculatePythagorean({ a, b, c, unknown });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Pythagorean theorem calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Solve a² + b² = c² for any one side of a right triangle, given the other two."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Solve for" value={unknown} onChange={setUnknown} options={UNKNOWN_OPTIONS} />
          {unknown !== "a" && <NumericInput label="a" value={a} onChange={setA} min={0.01} step={0.5} />}
          {unknown !== "b" && <NumericInput label="b" value={b} onChange={setB} min={0.01} step={0.5} />}
          {unknown !== "c" && <NumericInput label="c (hypotenuse)" value={c} onChange={setC} min={0.01} step={0.5} />}
        </>
      }
      result={<ResultDisplay value={Number.isNaN(value) ? "undefined" : `${value}`} caption={`Solved for ${unknown}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
