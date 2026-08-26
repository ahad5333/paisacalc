"use client";

import { useEffect, useState } from "react";
import { getFavorites, toggleFavorite } from "@/lib/favorites";

// Starts false on every render (including the server-rendered shell this
// client component hydrates into) and corrects itself post-mount — same
// reasoning as useReducedMotion's SSR default: localStorage doesn't exist
// on the server, so there's nothing truthful to read until hydration.
export function FavoriteButton({ href }: { href: string }) {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    setFavorited(getFavorites().includes(href));
  }, [href]);

  function handleClick() {
    const next = toggleFavorite(href);
    setFavorited(next.includes(href));
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={favorited}
      className="inline-flex items-center gap-1.5 rounded border border-rule bg-paper px-3 py-1.5 text-xs font-medium text-muted transition hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill={favorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`shrink-0 ${favorited ? "text-figure" : ""}`}
      >
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0l-4.725 2.885a.562.562 0 0 1-.84-.61l1.285-5.385a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345l2.125-5.111Z" />
      </svg>
      <span>{favorited ? "Saved" : "Save"}</span>
    </button>
  );
}
