"use client";

import { useMemo, useState, type ReactNode } from "react";
import { NumericInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { rollDice } from "@/lib/calc/dice-roller";

const LAST_VERIFIED = "19 Aug 2026";

export function DiceRollerPage({ content }: { content: ReactNode }) {
  const [numDice, setNumDice] = useState(2);
  const [sides, setSides] = useState(6);
  const [seed, setSeed] = useState(0);

  // Only re-rolls when the dice settings or the seed change — otherwise
  // an unrelated re-render would silently swap the displayed roll.
  const result = useMemo(() => rollDice({ numDice, sides }), [numDice, sides, seed]);
  const { rolls, total } = result.value;

  return (
    <CalculatorPage
      title="Dice roller"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Roll any number of dice with any number of sides."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Number of dice" value={numDice} onChange={setNumDice} min={1} max={20} step={1} slider />
          <NumericInput label="Sides per die" value={sides} onChange={setSides} min={2} max={100} step={1} slider />
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="w-fit rounded border border-rule bg-paper/90 px-4 py-2 text-sm text-ink transition-colors hover:border-figure"
          >
            Roll again
          </button>
        </>
      }
      result={<ResultDisplay key={seed} value={`${total}`} caption={`Rolls: ${rolls.join(", ")}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
