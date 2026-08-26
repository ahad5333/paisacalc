import type { CalcResult } from "@/lib/calc";

type DerivationPanelProps<T> = {
  result: CalcResult<T>;
  lastVerified: string; // e.g. "12 Aug 2026"
};

// The signature element (tech spec §B1, ticket S-06): the actual computation,
// laid out line by line with the user's own numbers substituted in — a
// worked example, not a debug dump. Renders any CalcResult with no
// calculator-specific code.
export function DerivationPanel<T>({ result, lastVerified }: DerivationPanelProps<T>) {
  return (
    <section
      aria-labelledby="derivation-heading"
      className="rounded-lg border border-rule bg-paper/90 p-6 backdrop-blur-sm"
    >
      <h2
        id="derivation-heading"
        className="font-mono text-xs uppercase tracking-wide text-muted"
      >
        Derivation
      </h2>

      <ol className="mt-4 space-y-2.5">
        {result.steps.map((step, i) => (
          <li key={i} className="flex gap-3 font-mono text-sm">
            <span className="text-muted">{i + 1}.</span>
            <span>
              <span className="text-ink">{step.label}</span>
              <span className="text-muted"> = {step.formula} = </span>
              <span className="text-figure">
                {typeof step.value === "number"
                  ? step.value.toLocaleString("en-IN", { maximumFractionDigits: 3 })
                  : step.value}
              </span>
            </span>
          </li>
        ))}
      </ol>

      {result.assumptions.length > 0 && (
        <div className="mt-5 border-t border-rule pt-4">
          <p className="text-xs font-medium text-ink">Assumptions</p>
          <ul className="mt-1.5 space-y-1 text-xs text-muted">
            {result.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Computed under {result.rulesVersion} rules · last verified {lastVerified}
      </p>
    </section>
  );
}
