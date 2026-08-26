"use client";

import { useId, useState } from "react";

type NumberListInputProps = {
  label: string;
  value: number[];
  onChange: (values: number[]) => void;
  helpText?: string;
};

function parseList(raw: string): number[] {
  return raw
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number)
    .filter((n) => Number.isFinite(n));
}

export function NumberListInput({ label, value, onChange, helpText }: NumberListInputProps) {
  const inputId = useId();
  const [draft, setDraft] = useState(value.join(", "));

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={() => onChange(parseList(draft))}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
      {helpText && <p className="text-xs text-muted">{helpText}</p>}
    </div>
  );
}
