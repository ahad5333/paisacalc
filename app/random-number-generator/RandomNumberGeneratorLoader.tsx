"use client";

import dynamic from "next/dynamic";

export const RandomNumberGeneratorLoader = dynamic(
  () => import("./RandomNumberGenerator").then((m) => m.RandomNumberGenerator),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6">
        <div className="min-h-[1200px] w-full animate-pulse rounded-lg border border-rule bg-paper/90" />
      </div>
    ),
  },
);
