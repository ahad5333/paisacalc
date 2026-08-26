"use client";

import dynamic from "next/dynamic";

export const LoanAgainstPropertyCalculatorLoader = dynamic(
  () => import("./LoanAgainstPropertyCalculator").then((m) => m.LoanAgainstPropertyCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="h-64 w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);
