"use client";

import { useId, useState, type ReactNode } from "react";
import { ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateLove } from "@/lib/calc/love";

const LAST_VERIFIED = "19 Aug 2026";

function NameInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
    </div>
  );
}

export function LoveCalculatorPage({ content }: { content: ReactNode }) {
  const [name1, setName1] = useState("Alex");
  const [name2, setName2] = useState("Sam");

  const result = calculateLove({ name1, name2 });
  const { percentage } = result.value;

  return (
    <CalculatorPage
      title="Love calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="A fun, just-for-entertainment compatibility percentage between two names. Not scientific — don't take it seriously!"
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <NameInput label="First name" value={name1} onChange={setName1} />
          <NameInput label="Second name" value={name2} onChange={setName2} />
        </>
      }
      result={<ResultDisplay value={`${percentage}%`} caption="Purely for fun — not a real measurement of anything" />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
