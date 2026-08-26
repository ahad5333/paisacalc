"use client";

import { useEffect, useRef, useState } from "react";

type ResultDisplayProps = {
  value: string; // pre-formatted, e.g. "₹34,713"
  caption?: string;
};

// Only the characters that actually changed animate, and only in place —
// the monospace figure face means no character shifts width, so the
// container never resizes (tech spec §B4, ticket S-05).
export function ResultDisplay({ value, caption }: ResultDisplayProps) {
  const [chars, setChars] = useState<string[]>(() => value.split(""));
  const [changed, setChanged] = useState<boolean[]>(() => value.split("").map(() => false));
  const prevValue = useRef(value);

  useEffect(() => {
    if (value === prevValue.current) return;
    const prevChars = prevValue.current.split("");
    const nextChars = value.split("");
    const maxLen = Math.max(prevChars.length, nextChars.length);
    setChars(nextChars);
    setChanged(Array.from({ length: maxLen }, (_, i) => prevChars[i] !== nextChars[i]));
    prevValue.current = value;
  }, [value]);

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {value}
        {caption ? ` ${caption}` : ""}
      </p>
      <div
        aria-hidden="true"
        className="font-mono text-[2.625rem] leading-none tabular-nums text-figure"
      >
        {chars.map((c, i) => (
          <span
            key={i}
            style={{ whiteSpace: "pre" }}
            className={`inline-block ${changed[i] ? "animate-digit-pop" : ""}`}
            onAnimationEnd={() =>
              setChanged((prev) => prev.map((v, idx) => (idx === i ? false : v)))
            }
          >
            {c}
          </span>
        ))}
      </div>
      {caption && <p className="mt-1 text-sm text-muted">{caption}</p>}
    </div>
  );
}
