"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateScientific, type AngleMode } from "@/lib/calc/scientific";

const LAST_VERIFIED = "19 Aug 2026";

const ANGLE_OPTIONS: { value: AngleMode; label: string }[] = [
  { value: "deg", label: "Degrees" },
  { value: "rad", label: "Radians" },
];

function ExpressionInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        Expression
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. sqrt(16) + 2^3"
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
      <p className="text-xs text-muted">+ − × (as *) ÷ (as /) ^ % parentheses, sin cos tan sqrt log ln abs, pi, e</p>
    </div>
  );
}

export function ScientificCalculator({ content }: { content: ReactNode }) {
  const [expression, setExpression] = useState("sqrt(16) + 2^3");
  const [angleMode, setAngleMode] = useState<AngleMode>("deg");

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("expr", expression);
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [expression]);

  const result = calculateScientific({ expression, angleMode });
  const { result: value, error } = result.value;

  return (
    <CalculatorPage
      title="Scientific calculator"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Evaluate any expression with standard operators, trig functions, roots, and logarithms."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ExpressionInput value={expression} onChange={setExpression} />
          <ChoiceInput label="Angle mode (for sin, cos, tan)" value={angleMode} onChange={setAngleMode} options={ANGLE_OPTIONS} />
        </>
      }
      result={<ResultDisplay value={error ? "Error" : `${value}`} caption={error ?? "Result"} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
