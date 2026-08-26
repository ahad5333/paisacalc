"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr:false must be called from a Client Component —
// this file exists solely to give page.tsx (a Server Component) a way to
// load EmiCalculator client-only, since EmiCalculator reads
// window.location.search directly (see the comment in EmiCalculator.tsx).
export const EmiCalculatorLoader = dynamic(
  () => import("./EmiCalculator").then((m) => m.EmiCalculator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="min-h-[1200px] w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);
