"use client";

import { useEffect, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculatePermutationCombination } from "@/lib/calc/permutation-combination";
import { decodeNumber, replaceUrlParams } from "@/lib/url-state";

const LAST_VERIFIED = "19 Aug 2026";

function initialParam(key: string, fallback: number): number {
  return decodeNumber(new URLSearchParams(window.location.search), key, fallback);
}

export function PermutationCombinationCalculator({ content }: { content: ReactNode }) {
  const [n, setN] = useState(() => initialParam("n", 5));
  const [r, setR] = useState(() => initialParam("r", 2));

  useEffect(() => {
    replaceUrlParams({ n, r });
  }, [n, r]);

  const result = calculatePermutationCombination({ n, r });
  const { permutations, combinations } = result.value;

  return (
    <CalculatorPage
      title="Permutation and combination calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="nPr (order matters) and nCr (order doesn't) — the number of ways to choose r items from n."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <div className="grid grid-cols-2 gap-3">
          <NumericInput label="n (total items)" value={n} onChange={setN} min={0} max={170} step={1} />
          <NumericInput label="r (items chosen)" value={r} onChange={setR} min={0} max={170} step={1} />
        </div>
      }
      result={<ResultDisplay value={Number.isNaN(combinations) ? "invalid" : `${combinations}`} caption={`Combinations (nCr) — ${Number.isNaN(permutations) ? "invalid" : permutations} permutations (nPr)`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
