"use client";

import { useId, useState } from "react";

type ChoiceInputProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: string }[];
  helpText?: string;
};

// The categorical counterpart to NumericInput — for sex, activity level,
// goal, and other choices that don't belong on a numeric slider. First
// needed once Fitness & Health calculators started requiring inputs that
// aren't points on a continuous scale.
export function ChoiceInput<T extends string>({ label, value, onChange, options, helpText }: ChoiceInputProps<T>) {
  const helpId = useId();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-muted">{label}</span>
        {helpText && (
          <span className="relative">
            <button
              type="button"
              aria-expanded={helpOpen}
              aria-controls={helpId}
              onClick={() => setHelpOpen((v) => !v)}
              onBlur={() => setHelpOpen(false)}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-rule text-[10px] leading-none text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
            >
              ?
            </button>
            <span
              id={helpId}
              role="tooltip"
              aria-hidden={!helpOpen}
              className={`absolute left-1/2 top-full z-10 mt-1.5 w-56 origin-top -translate-x-1/2 rounded border border-rule bg-paper p-2 text-xs text-ink shadow-sm transition duration-150 ease-out ${
                helpOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              {helpText}
            </span>
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure ${
              value === opt.value
                ? "border-figure bg-figure/10 text-figure"
                : "border-rule bg-paper/90 text-ink hover:border-figure/50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
