"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr:false must be called from a Client Component —
// this file exists solely to give page.tsx (a Server Component) a way to
// load CarLoanCalculator client-only, since it reads window.location.search
// directly (see the comment there).
export const CarLoanCalculatorLoader = dynamic(
  () => import("./CarLoanCalculator").then((m) => m.CarLoanCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="h-64 w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);
