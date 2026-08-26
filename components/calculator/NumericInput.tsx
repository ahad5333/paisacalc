"use client";

import { useId, useState } from "react";
import { formatIndianNumber, toPlainDigits } from "@/lib/format";

type Preset = { label: string; value: number };

type NumericInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  helpText?: string;
  slider?: boolean;
  presets?: Preset[];
};

function clamp(value: number, min?: number, max?: number): number {
  let result = value;
  if (min !== undefined) result = Math.max(min, result);
  if (max !== undefined) result = Math.min(max, result);
  return result;
}

export function NumericInput({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
  helpText,
  slider = false,
  presets,
}: NumericInputProps) {
  const inputId = useId();
  const helpId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const [helpOpen, setHelpOpen] = useState(false);
  const [sliderActive, setSliderActive] = useState(false);

  const display = editing ? draft : formatIndianNumber(value);

  function commit(raw: string) {
    const plain = toPlainDigits(raw);
    const parsed = Number(plain);
    if (plain === "" || !Number.isFinite(parsed)) {
      onChange(clamp(min ?? 0, min, max));
      return;
    }
    onChange(clamp(parsed, min, max));
  }

  const sliderPct =
    slider && min !== undefined && max !== undefined
      ? ((clamp(value, min, max) - min) / (max - min)) * 100
      : 0;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <label htmlFor={inputId} className="text-sm text-muted">
          {label}
        </label>
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

      <div className="flex items-center gap-1 rounded border border-rule bg-paper/90 px-3 py-2 backdrop-blur-sm transition-colors focus-within:border-figure">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={display}
          onFocus={() => {
            setDraft(String(value));
            setEditing(true);
          }}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={(e) => {
            commit(e.target.value);
            setEditing(false);
          }}
          className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none"
        />
        {suffix && <span className="text-sm text-muted">{suffix}</span>}
      </div>

      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const active = value === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                onClick={() => onChange(preset.value)}
                aria-pressed={active}
                className={`rounded-full border px-2.5 py-1 font-mono text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure ${
                  active
                    ? "border-figure bg-figure/10 text-figure"
                    : "border-rule text-muted hover:border-figure hover:text-figure"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}

      {slider && min !== undefined && max !== undefined && (
        <div className="relative pt-5">
          <span
            aria-hidden="true"
            style={{ left: `${sliderPct}%` }}
            className={`pointer-events-none absolute top-0 -translate-x-1/2 rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper transition-opacity duration-150 ${
              sliderActive ? "opacity-100" : "opacity-0"
            }`}
          >
            {formatIndianNumber(value)}
            {suffix}
          </span>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={clamp(value, min, max)}
            onChange={(e) => onChange(Number(e.target.value))}
            onPointerDown={() => setSliderActive(true)}
            onPointerUp={() => setSliderActive(false)}
            onFocus={() => setSliderActive(true)}
            onBlur={() => setSliderActive(false)}
            aria-label={`${label} slider`}
            className="w-full accent-figure"
          />
        </div>
      )}
    </div>
  );
}
