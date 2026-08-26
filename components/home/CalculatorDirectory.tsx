"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { Reveal } from "@/components/motion/Reveal";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { getFavorites } from "@/lib/favorites";
import { getRecentlyViewed } from "@/lib/recently-viewed";
import { CALCULATOR_CATEGORIES, CALCULATORS, categorySlug, type Calculator, type CalculatorCategory } from "@/lib/calculators";

function resolve(hrefs: string[]): (typeof CALCULATORS)[number][] {
  return hrefs
    .map((href) => CALCULATORS.find((c) => c.href === href))
    .filter((c): c is (typeof CALCULATORS)[number] => c !== undefined);
}

function matches(calc: Calculator, query: string): boolean {
  return calc.label.toLowerCase().includes(query) || calc.description.toLowerCase().includes(query);
}

// A handful of the most commonly reached-for calculators, one from each
// of the site's original core domains — spans the site's range (loans,
// tax, investing, fitness, math, everyday) rather than just repeating
// the first category alphabetically.
const POPULAR_HREFS = ["/home-loan-emi/", "/income-tax/", "/sip-returns/", "/bmi-calculator/", "/percentage-calculator/", "/tip-calculator/"];

// Every calculator in these categories was added in this session's
// single big expansion — cheaper and less error-prone to mark them by
// category than to hand-tag 100+ individual entries in the data file.
const NEW_CATEGORIES = new Set<CalculatorCategory>([
  "Math",
  "Date & Time",
  "Home & Construction",
  "Conversions & Science",
  "Tech Tools",
  "Everyday & Lifestyle",
  "Weather",
  "Automotive",
]);

// Fitness & Health mixes older and newer calculators in one category, so
// its new additions are listed explicitly instead (everything from One
// Rep Max onward — the first 9 in the category predate this batch).
const NEW_FITNESS_HREFS = new Set([
  "/one-rep-max/",
  "/target-heart-rate/",
  "/pregnancy-calculator/",
  "/pregnancy-weight-gain/",
  "/pregnancy-conception/",
  "/due-date-calculator/",
  "/ovulation-calculator/",
  "/conception-calculator/",
  "/period-calculator/",
  "/macro-calculator/",
  "/carbohydrate-calculator/",
  "/protein-calculator/",
  "/fat-intake-calculator/",
  "/tdee-calculator/",
  "/gfr-calculator/",
  "/body-type-calculator/",
  "/body-surface-area/",
  "/bac-calculator/",
]);

function isRecentlyAdded(calc: Calculator): boolean {
  return NEW_CATEGORIES.has(calc.category) || NEW_FITNESS_HREFS.has(calc.href);
}

function isTypingTarget(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (el as HTMLElement).isContentEditable;
}

// Grouped-by-category directory with a live search, replacing the old
// flat one-big-grid layout — at 170+ calculators a single list is no
// longer scannable. Thumbnails are dropped here too: the same handful of
// stock hero images repeat across dozens of cards once every calculator
// beyond the original financial set reuses them, so they stopped adding
// any distinguishing information and just took up space.
export function CalculatorDirectory() {
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<(typeof CALCULATORS)[number][]>([]);
  const [recent, setRecent] = useState<(typeof CALCULATORS)[number][]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const lenis = useLenis();
  const reducedMotion = useReducedMotion();

  // Both are per-browser (localStorage), read once after mount — nothing
  // to show during server rendering since neither exists there.
  useEffect(() => {
    setFavorites(resolve(getFavorites()));
    setRecent(resolve(getRecentlyViewed()));
  }, []);

  // "/" focuses search from anywhere on the page, unless the user is
  // already typing into something else — the same convention GitHub and
  // several other search-heavy sites use, so it's a shortcut some users
  // will already reach for instinctively.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(document.activeElement)) return;
      e.preventDefault();
      searchRef.current?.focus();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const grouped = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    return CALCULATOR_CATEGORIES.map((category) => ({
      category,
      items: CALCULATORS.filter((calc) => calc.category === category && (trimmed === "" || matches(calc, trimmed))),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  const totalMatches = grouped.reduce((sum, g) => sum + g.items.length, 0);
  const trimmedQuery = query.trim();
  const popular = resolve(POPULAR_HREFS);
  const newCount = useMemo(() => CALCULATORS.filter(isRecentlyAdded).length, []);

  function jumpToCategory(category: CalculatorCategory) {
    const id = categorySlug(category);
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -72, immediate: reducedMotion });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        {newCount > 0 && (
          <p className="text-xs text-muted">
            <span className="font-mono font-medium text-figure">{newCount}</span> calculators added in the
            latest batch — look for the <span className="rounded-full bg-figure/10 px-1.5 py-0.5 text-[0.6875rem] text-figure">New</span> tag below.
          </p>
        )}

        {favorites.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-wide text-muted">Favorites</span>
            {favorites.slice(0, 10).map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                prefetch={false}
                className="rounded-full border border-rule bg-paper/90 px-3 py-1 text-xs text-ink transition-colors hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
              >
                {calc.label}
              </Link>
            ))}
          </div>
        )}

        {recent.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-wide text-muted">Recently viewed</span>
            {recent.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                prefetch={false}
                className="rounded-full border border-rule bg-paper/90 px-3 py-1 text-xs text-ink transition-colors hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
              >
                {calc.label}
              </Link>
            ))}
          </div>
        )}

        {popular.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.6875rem] uppercase tracking-wide text-muted">Popular</span>
            {popular.map((calc) => (
              <Link
                key={calc.href}
                href={calc.href}
                prefetch={false}
                className="rounded-full border border-rule bg-paper/90 px-3 py-1 text-xs text-ink transition-colors hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
              >
                {calc.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="calculator-search" className="sr-only">
          Search calculators
        </label>
        <div className="flex items-center gap-2 rounded-lg border border-rule bg-paper/90 px-4 py-3 shadow-sm backdrop-blur-sm transition-colors focus-within:border-figure">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={searchRef}
            id="calculator-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${CALCULATORS.length} calculators…`}
            className="w-full min-w-0 bg-transparent font-mono text-base text-ink outline-none placeholder:text-muted"
          />
          {trimmedQuery === "" && (
            <kbd
              aria-hidden="true"
              className="hidden shrink-0 rounded border border-rule px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted sm:block"
            >
              /
            </kbd>
          )}
        </div>
        {trimmedQuery !== "" && (
          <p className="px-1 text-xs text-muted">
            {totalMatches} result{totalMatches === 1 ? "" : "s"} for &ldquo;{trimmedQuery}&rdquo;
          </p>
        )}
      </div>

      {trimmedQuery === "" && (
        <nav aria-label="Jump to category" className="flex flex-wrap gap-1.5">
          {CALCULATOR_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => jumpToCategory(category)}
              className="rounded-full border border-rule px-2.5 py-1 text-[0.6875rem] text-muted transition-colors hover:border-figure hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
            >
              {category}
            </button>
          ))}
        </nav>
      )}

      {grouped.length === 0 ? (
        <p className="text-sm text-muted">
          No calculators match &ldquo;{trimmedQuery}&rdquo;. Try a different search.
        </p>
      ) : (
        grouped.map(({ category, items }, i) => (
          <Reveal key={category} delayMs={Math.min(i, 4) * 60}>
            <section aria-labelledby={categorySlug(category)}>
              <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-2">
                <h2 id={categorySlug(category)} className="font-serif text-lg text-ink">
                  {category}
                </h2>
                <span className="font-mono text-xs text-muted">{items.length}</span>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {items.map((calc) => (
                  <li key={calc.href}>
                    <Link
                      href={calc.href}
                      prefetch={false}
                      className="group flex flex-col gap-0.5 rounded-lg border border-rule bg-paper/90 px-4 py-3 transition-colors hover:border-figure hover:bg-figure/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
                    >
                      <span className="flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-figure">
                        {calc.label}
                        {isRecentlyAdded(calc) && (
                          <span className="rounded-full bg-figure/10 px-1.5 py-0.5 text-[0.625rem] font-normal uppercase tracking-wide text-figure">
                            New
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted">{calc.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))
      )}
    </div>
  );
}
