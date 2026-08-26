"use client";

import { useState } from "react";

type Column = { key: string; label: string; align?: "left" | "right" };

type DetailTableProps = {
  columns: Column[];
  rows: Array<Record<string, string | number>>;
  caption: string;
};

// Collapsed by default under 768px, expandable, horizontally scrollable
// with a visible affordance (ticket S-08). A plain table handles 240+ rows
// fine without virtualisation at this row count.
export function DetailTable({ columns, rows, caption }: DetailTableProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-rule bg-paper/90 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-ink md:hidden"
      >
        <span>{caption}</span>
        <span aria-hidden="true" className="font-mono text-muted">
          {expanded ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse font-mono text-sm tabular-nums">
              <caption className="sr-only">{caption}</caption>
              <thead>
                <tr className="border-b border-rule text-left text-xs uppercase tracking-wide text-muted">
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      scope="col"
                      className={`px-4 py-2 font-normal ${c.align === "right" ? "text-right" : "text-left"}`}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className="border-b border-rule/60 last:border-0">
                    {columns.map((c) => (
                      <td
                        key={c.key}
                        className={`px-4 py-2 ${c.align === "right" ? "text-right" : "text-left"}`}
                      >
                        {row[c.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
