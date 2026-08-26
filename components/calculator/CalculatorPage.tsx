"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { CALCULATORS, categorySlug } from "@/lib/calculators";
import { AdSlot } from "./AdSlot";
import { ShareButton } from "./ShareButton";

type CalculatorPageProps = {
  title: string;
  description: string;
  rulesVersion: string;
  lastVerified: string;
  heroImage: string;
  heroObjectPosition?: string;
  inputs: ReactNode;
  result: ReactNode;
  chart?: ReactNode;
  derivation: ReactNode;
  detailTable?: ReactNode;
  content: ReactNode;
};

// The full template from frontend spec §B2. A new calculator page requires
// only inputs, a calc function, MDX content, and a hero image (ticket S-10)
// — deviation from this order is a bug, not a design choice, since it's
// what makes calculators 2 through 8 fast to build.
export function CalculatorPage({
  title,
  description,
  rulesVersion,
  lastVerified,
  heroImage,
  heroObjectPosition = "center",
  inputs,
  result,
  chart,
  derivation,
  detailTable,
  content,
}: CalculatorPageProps) {
  const pathname = usePathname();
  // Static export's prerendered usePathname() omits the trailing slash
  // even though every href in CALCULATORS has one (per trailingSlash:
  // true), so normalize both sides before comparing.
  const normalizedPathname = pathname?.endsWith("/") ? pathname : `${pathname}/`;
  const current = CALCULATORS.find((c) => c.href === normalizedPathname);

  // "Next 4 in the same category, wrapping around" rather than always
  // the first 4 alphabetically — every calculator in a category gets a
  // different, still-deterministic set of neighbours instead of every
  // page in Math pointing at the same four.
  let related: typeof CALCULATORS[number][] = [];
  if (current) {
    const categoryItems = CALCULATORS.filter((c) => c.category === current.category);
    const currentIndex = categoryItems.findIndex((c) => c.href === current.href);
    const count = Math.min(4, categoryItems.length - 1);
    related = Array.from({ length: count }, (_, i) => categoryItems[(currentIndex + 1 + i) % categoryItems.length]);
  }

  return (
    <div className="flex w-full flex-col">
      {current && (
        <nav aria-label="Breadcrumb" className="border-b border-rule bg-paper/90 backdrop-blur-sm">
          <ol className="mx-auto flex w-full max-w-2xl items-center gap-1.5 px-4 py-2 text-xs text-muted sm:px-6">
            <li>
              <Link href="/" className="transition-colors hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/#${categorySlug(current.category)}`}
                className="transition-colors hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
              >
                {current.category}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-ink">
              {current.label}
            </li>
          </ol>
        </nav>
      )}

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: heroObjectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper/85 via-paper/45 to-paper/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </div>
        <div className="mx-auto flex min-h-[200px] w-full max-w-2xl flex-col justify-center px-4 py-10 text-left sm:min-h-[240px] sm:px-6">
          <h1 className="font-serif text-2xl text-ink sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-lg text-sm text-ink/85">{description}</p>
          <p className="mt-3 font-mono text-xs text-ink/60">
            Computed under {rulesVersion} rules · last verified {lastVerified}
          </p>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-10 sm:px-6">
        <Reveal>
          <section
            aria-label="Inputs"
            className="flex flex-col gap-4 rounded-lg border border-rule bg-paper/90 p-6 backdrop-blur-sm"
          >
            {inputs}
          </section>
        </Reveal>

        <Reveal delayMs={80}>
          <section
            aria-label="Result"
            className="rounded-lg border border-rule bg-paper/90 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">{result}</div>
              <ShareButton />
            </div>
            {chart && <div className="mt-6">{chart}</div>}
          </section>
        </Reveal>

        <Reveal>{derivation}</Reveal>

        {detailTable && <Reveal>{detailTable}</Reveal>}

        <Reveal>
          <AdSlot />
        </Reveal>

        <Reveal>
          <article className="prose-content rounded-lg border border-rule bg-paper/90 p-6 text-sm leading-relaxed text-ink backdrop-blur-sm">
            {content}
          </article>
        </Reveal>

        {current && related.length > 0 && (
          <Reveal>
            <section
              aria-label={`More in ${current.category}`}
              className="rounded-lg border border-rule bg-paper/90 p-6 backdrop-blur-sm"
            >
              <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-2">
                <h2 className="font-serif text-lg text-ink">More in {current.category}</h2>
                <Link
                  href={`/#${categorySlug(current.category)}`}
                  className="font-mono text-xs text-muted transition-colors hover:text-figure focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
                >
                  {`See all →`}
                </Link>
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {related.map((calc) => (
                  <li key={calc.href}>
                    <Link
                      href={calc.href}
                      prefetch={false}
                      className="group flex flex-col gap-0.5 rounded-lg border border-rule bg-paper/90 px-4 py-3 transition-colors hover:border-figure hover:bg-figure/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
                    >
                      <span className="text-sm font-medium text-ink group-hover:text-figure">{calc.label}</span>
                      <span className="text-xs text-muted">{calc.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        )}
      </div>
    </div>
  );
}
