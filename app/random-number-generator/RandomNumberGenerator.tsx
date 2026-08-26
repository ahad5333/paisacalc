"use client";

import { useMemo, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { generateRandomNumbers } from "@/lib/calc/random-number";

const LAST_VERIFIED = "19 Aug 2026";

const TYPE_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "true", label: "Whole numbers" },
  { value: "false", label: "Decimals" },
];

const DUPLICATE_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "true", label: "Allow duplicates" },
  { value: "false", label: "No duplicates" },
];

export function RandomNumberGenerator({ content }: { content: ReactNode }) {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(5);
  const [wholeStr, setWholeStr] = useState<"true" | "false">("true");
  const [duplicatesStr, setDuplicatesStr] = useState<"true" | "false">("true");
  const [seed, setSeed] = useState(0);

  const wholeNumbers = wholeStr === "true";
  const allowDuplicates = duplicatesStr === "true";

  // Only redraws when an input or the "generate new numbers" seed changes —
  // otherwise an unrelated re-render would silently swap the displayed
  // numbers for a fresh random draw.
  const result = useMemo(
    () => generateRandomNumbers({ min, max, count, wholeNumbers, allowDuplicates }),
    [min, max, count, wholeNumbers, allowDuplicates, seed],
  );
  const { numbers } = result.value;

  return (
    <CalculatorPage
      title="Random number generator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Generate random whole numbers or decimals within a range, with or without duplicates."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <div className="grid grid-cols-2 gap-3">
            <NumericInput label="Minimum" value={min} onChange={setMin} step={1} />
            <NumericInput label="Maximum" value={max} onChange={setMax} step={1} />
          </div>
          <NumericInput label="How many numbers" value={count} onChange={setCount} min={1} max={50} step={1} slider />
          <ChoiceInput label="Type" value={wholeStr} onChange={setWholeStr} options={TYPE_OPTIONS} />
          {wholeNumbers && <ChoiceInput label="Duplicates" value={duplicatesStr} onChange={setDuplicatesStr} options={DUPLICATE_OPTIONS} />}
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="w-fit rounded border border-rule bg-paper/90 px-4 py-2 text-sm text-ink transition-colors hover:border-figure"
          >
            Generate new numbers
          </button>
        </>
      }
      result={<ResultDisplay key={seed} value={numbers.join(", ")} caption={`${count} random number${count === 1 ? "" : "s"} between ${min} and ${max}`} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
