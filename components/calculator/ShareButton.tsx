"use client";

import { useState } from "react";

// Reads window.location.href at click time rather than tracking it in
// state — the URL already reflects the current inputs via
// lib/url-state.ts's replaceUrlParams, called on every input change.
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard permission denied or unavailable — nothing useful to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 rounded border border-rule bg-paper px-3 py-1.5 text-xs font-medium text-muted transition hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0"
      >
        {copied ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <>
            <path d="M10 13a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1.5 1.5" />
            <path d="M14 11a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1.5-1.5" />
          </>
        )}
      </svg>
      <span
        aria-live="polite"
        className="grid"
      >
        <span
          className={`col-start-1 row-start-1 transition-opacity duration-150 ${copied ? "opacity-0" : "opacity-100"}`}
        >
          Copy link
        </span>
        <span
          className={`col-start-1 row-start-1 transition-opacity duration-150 ${copied ? "opacity-100" : "opacity-0"}`}
        >
          Copied
        </span>
      </span>
    </button>
  );
}
