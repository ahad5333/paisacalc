"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBigNumber, type BigNumberOperation } from "@/lib/calc/big-number";

const LAST_VERIFIED = "19 Aug 2026";

const OPERATION_OPTIONS: { value: BigNumberOperation; label: string }[] = [
  { value: "add", label: "+" },
  { value: "subtract", label: "−" },
  { value: "multiply", label: "×" },
];

function BigIntInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
    </div>
  );
}

export function BigNumberCalculator({ content }: { content: ReactNode }) {
  const [aStr, setAStr] = useState("99999999999999999999");
  const [bStr, setBStr] = useState("1");
  const [operation, setOperation] = useState<BigNumberOperation>("add");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("a", aStr);
    params.set("b", bStr);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [aStr, bStr]);

  const result = calculateBigNumber({ aStr, bStr, operation });
  const { result: value } = result.value;

  return (
    <CalculatorPage
      title="Big number calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Add, subtract, or multiply integers of any size, with exact precision beyond what ordinary numbers can hold."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <BigIntInput label="First number" value={aStr} onChange={setAStr} />
          <ChoiceInput label="Operation" value={operation} onChange={setOperation} options={OPERATION_OPTIONS} />
          <BigIntInput label="Second number" value={bStr} onChange={setBStr} />
        </>
      }
      result={<ResultDisplay value={value} caption="Exact result" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
