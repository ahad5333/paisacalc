"use client";

import type { ReactNode } from "react";

// Smooth height animation for content whose height isn't known up front —
// plain CSS can't transition to `height: auto`, but a 0fr -> 1fr grid-row
// can, since the grid track sizes to content and the transition animates
// the fraction, not the pixel height. No JS measurement needed.
export function Collapse({
  open,
  children,
  className,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} ${className ?? ""}`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
