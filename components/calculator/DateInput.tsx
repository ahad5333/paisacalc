"use client";

import { useId } from "react";
import { toIsoDate, toEpochDay } from "@/lib/date-utils";

type DateInputProps = {
  label: string;
  value: number; // epoch day
  onChange: (value: number) => void;
  min?: number; // epoch day
  max?: number; // epoch day
  helpText?: string;
};

export function DateInput({ label, value, onChange, min, max, helpText }: DateInputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm text-muted">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="date"
          value={toIsoDate(value)}
          min={min !== undefined ? toIsoDate(min) : undefined}
          max={max !== undefined ? toIsoDate(max) : undefined}
          onChange={(e) => {
            if (!e.target.value) return;
            onChange(toEpochDay(e.target.value));
          }}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
      </div>
      {helpText && <p className="text-xs text-muted">{helpText}</p>}
    </div>
  );
}
