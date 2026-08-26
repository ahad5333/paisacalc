"use client";

import { useId, useState, type ReactNode } from "react";
import { ChoiceInput, ResultDisplay, DerivationPanel, CalculatorPage } from "@/components/calculator";
import { calculateBase64, type Base64Direction } from "@/lib/calc/base64";

const LAST_VERIFIED = "19 Aug 2026";

const DIRECTION_OPTIONS: { value: Base64Direction; label: string }[] = [
  { value: "encode", label: "Encode" },
  { value: "decode", label: "Decode" },
];

function TextAreaInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        {label}
      </label>
      <textarea
        id={inputId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full min-w-0 resize-y rounded border border-rule bg-paper/90 px-3 py-2 font-mono text-sm text-ink outline-none backdrop-blur-sm transition-colors focus:border-figure"
      />
    </div>
  );
}

export function Base64CalculatorPage({ content }: { content: ReactNode }) {
  const [direction, setDirection] = useState<Base64Direction>("encode");
  const [text, setText] = useState("Hello, world!");

  const result = calculateBase64({ direction, text });
  const { result: output, error } = result.value;

  return (
    <CalculatorPage
      title="Base64 encode / decode"
      heroImage="/images/hero-pen.webp"
      heroObjectPosition="center"
      description="Encode text to Base64, or decode Base64 back to text, entirely in your browser."
      rulesVersion={result.rulesVersion}
      lastVerified={LAST_VERIFIED}
      inputs={
        <>
          <ChoiceInput label="Direction" value={direction} onChange={setDirection} options={DIRECTION_OPTIONS} />
          <TextAreaInput label={direction === "encode" ? "Text" : "Base64"} value={text} onChange={setText} />
        </>
      }
      result={<ResultDisplay value={error ? "Error" : output || "—"} caption={error ?? (direction === "encode" ? "Base64" : "Decoded text")} />}
      derivation={<DerivationPanel result={result} lastVerified={LAST_VERIFIED} />}
      content={content}
    />
  );
}
