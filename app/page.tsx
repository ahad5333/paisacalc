import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { CalculatorDirectory } from "@/components/home/CalculatorDirectory";
import { CALCULATORS } from "@/lib/calculators";
import { CHANGELOG_ENTRIES } from "@/lib/changelog";

export default function Home() {
  const lastUpdated = CHANGELOG_ENTRIES[0].date;
  const lastUpdatedShort = lastUpdated.split(" ").slice(0, 2).join(" ");

  return (
    <main className="flex flex-1 flex-col">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-rupee.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="animate-hero-kenburns object-cover object-[30%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-paper/90 via-paper/55 to-paper/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </div>
        <div className="mx-auto flex min-h-[58vh] w-full max-w-2xl flex-col justify-center px-6 py-20 text-left sm:min-h-[64vh] sm:px-6">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-wide text-ink/70">
              PaisaCalc
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <h1 className="mt-4 max-w-xl font-serif text-3xl text-ink sm:text-4xl">
              Indian personal-finance calculators that show their working.
            </h1>
          </Reveal>
          <Reveal delayMs={200}>
            <p className="mt-4 max-w-md text-sm text-ink/80">
              Every result comes with a visual breakdown and the actual
              derivation — the assumptions behind the number, not just the
              number itself.
            </p>
          </Reveal>
          <Reveal delayMs={320}>
            <div className="mt-7 flex items-start gap-5 border-t border-ink/20 pt-5 sm:gap-8">
              <div className="flex flex-col">
                <span className="font-mono text-xl text-ink tabular-nums sm:text-2xl">
                  <CountUp target={CALCULATORS.length} />
                </span>
                <span className="mt-1 text-[0.6875rem] uppercase tracking-wide text-ink/60">
                  Calculators
                </span>
              </div>
              <div className="mt-0.5 h-9 w-px shrink-0 bg-ink/20" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-mono text-xl text-ink tabular-nums sm:text-2xl">100%</span>
                <span className="mt-1 text-[0.6875rem] uppercase tracking-wide text-ink/60">
                  Rates cited
                </span>
              </div>
              <div className="mt-0.5 h-9 w-px shrink-0 bg-ink/20" aria-hidden="true" />
              <Link href="/changelog/" className="group flex flex-col">
                <span className="font-mono text-xl text-ink tabular-nums transition-colors group-hover:text-ink/75 sm:text-2xl">
                  {lastUpdatedShort}
                </span>
                <span className="mt-1 text-[0.6875rem] uppercase tracking-wide text-ink/60 transition-colors group-hover:text-ink/80">
                  {`Last updated →`}
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-14 sm:px-6">
        <nav aria-label="Calculators">
          <CalculatorDirectory />
        </nav>
      </div>
    </main>
  );
}
