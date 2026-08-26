"use client";

import { useMemo, useState, type ReactNode } from "react";
import { NumericInput, ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { generatePassword } from "@/lib/calc/password-generator";

const LAST_VERIFIED = "19 Aug 2026";

const TOGGLE_OPTIONS: { value: "true" | "false"; label: string }[] = [
  { value: "true", label: "On" },
  { value: "false", label: "Off" },
];

export function PasswordGeneratorPage({ content }: { content: ReactNode }) {
  const [length, setLength] = useState(16);
  const [upperStr, setUpperStr] = useState<"true" | "false">("true");
  const [lowerStr, setLowerStr] = useState<"true" | "false">("true");
  const [numbersStr, setNumbersStr] = useState<"true" | "false">("true");
  const [symbolsStr, setSymbolsStr] = useState<"true" | "false">("true");
  const [seed, setSeed] = useState(0);

  const useUppercase = upperStr === "true";
  const useLowercase = lowerStr === "true";
  const useNumbers = numbersStr === "true";
  const useSymbols = symbolsStr === "true";

  // Only regenerates when an option or the seed changes — otherwise an
  // unrelated re-render would silently swap the displayed password.
  const result = useMemo(
    () => generatePassword({ length, useUppercase, useLowercase, useNumbers, useSymbols }),
    [length, useUppercase, useLowercase, useNumbers, useSymbols, seed],
  );
  const { password, entropy } = result.value;

  return (
    <CalculatorPage
      title="Password generator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="A random password from your chosen character types, generated in your browser."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NumericInput label="Length" value={length} onChange={setLength} min={4} max={64} step={1} slider />
          <ChoiceInput label="Uppercase (A-Z)" value={upperStr} onChange={setUpperStr} options={TOGGLE_OPTIONS} />
          <ChoiceInput label="Lowercase (a-z)" value={lowerStr} onChange={setLowerStr} options={TOGGLE_OPTIONS} />
          <ChoiceInput label="Numbers (0-9)" value={numbersStr} onChange={setNumbersStr} options={TOGGLE_OPTIONS} />
          <ChoiceInput label="Symbols" value={symbolsStr} onChange={setSymbolsStr} options={TOGGLE_OPTIONS} />
          <button
            type="button"
            onClick={() => setSeed((s) => s + 1)}
            className="w-fit rounded border border-rule bg-paper/90 px-4 py-2 text-sm text-ink transition-colors hover:border-figure"
          >
            Generate new password
          </button>
        </>
      }
      result={<ResultDisplay key={seed} value={password || "—"} caption={password ? `${entropy} bits of entropy` : "Select at least one character type"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
