"use client";

import { useState } from "react";
import { Collapse } from "@/components/motion/Collapse";

export type FaqItem = { q: string; a: string };

// Independently-toggled items (not single-open) — these are reference
// answers people compare, not mutually exclusive choices, so closing one
// question shouldn't close another the reader already opened.
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(q: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });
  }

  return (
    <div className="mt-3 flex flex-col divide-y divide-rule/60 border-t border-rule/60">
      {items.map((item) => {
        const isOpen = open.has(item.q);
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => toggle(item.q)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
            >
              <span>{item.q}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`shrink-0 text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <Collapse open={isOpen}>
              <p className="pb-3 text-sm text-muted">{item.a}</p>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
}
