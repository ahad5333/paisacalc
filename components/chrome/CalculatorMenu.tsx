"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CALCULATOR_CATEGORIES, CALCULATORS, type CalculatorCategory } from "@/lib/calculators";

// Split into two columns for the mega-menu — with 4 categories this pairs
// evenly (Loans & EMI + Tax = 11 items, Savings & Investments + Income &
// Planning = 11 items), so both columns come out close to the same height.
const COLUMN_SPLIT = Math.ceil(CALCULATOR_CATEGORIES.length / 2);
const MENU_COLUMNS = [
  CALCULATOR_CATEGORIES.slice(0, COLUMN_SPLIT),
  CALCULATOR_CATEGORIES.slice(COLUMN_SPLIT),
];

// The header's calculator index (ticket S-11 / I-01) — every calculator
// page needs to be one click from every other, not just from the
// homepage. A mega-menu rather than a single scrolling list: at 22
// calculators a narrow one-column dropdown no longer shows everything
// without scrolling, so all categories now sit side by side, visible at
// once. Closes on outside click, Escape, or picking an item.
export function CalculatorMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
      >
        Calculators
        <span className="font-mono text-xs text-muted/70">{CALCULATORS.length}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        role="menu"
        className={`absolute right-0 top-full z-20 mt-2 max-h-[85vh] w-[min(92vw,34rem)] origin-top-right overflow-y-auto rounded-lg border border-rule bg-paper shadow-md transition duration-150 ease-out ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 p-4 sm:grid-cols-2 sm:p-5">
          {MENU_COLUMNS.map((categories, i) => (
            <div key={i} className="flex flex-col gap-5">
              {categories.map((category: CalculatorCategory) => {
                const items = CALCULATORS.filter((calc) => calc.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <p className="px-1 pb-1.5 font-mono text-[0.6875rem] uppercase tracking-wide text-muted">
                      {category}
                    </p>
                    <ul className="flex flex-col gap-0.5">
                      {items.map((calc) => (
                        <li key={calc.href}>
                          <Link
                            href={calc.href}
                            role="menuitem"
                            prefetch={false}
                            onClick={() => setOpen(false)}
                            className="block rounded px-2.5 py-1.5 text-sm text-ink transition-colors hover:bg-figure/10 hover:text-figure"
                          >
                            {calc.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
