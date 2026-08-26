import Link from "next/link";
import { CalculatorMenu } from "./CalculatorMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper/90 shadow-sm backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm uppercase tracking-wide text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-figure"
        >
          PaisaCalc
        </Link>
        <CalculatorMenu />
      </div>
    </header>
  );
}
