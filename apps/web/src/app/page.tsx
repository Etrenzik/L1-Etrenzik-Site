import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted mb-8">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Draft Work Product — Not Legal Advice
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-accent via-purple-400 to-accent-light bg-clip-text text-transparent">
              Etrenzik LLC
            </span>{" "}
            v.{" "}
            <span className="text-foreground">Inergy Solutions, LLC</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
            Litigation case workspace — evidence ingestion, timeline reconstruction,
            invoice reconciliation, legal issue spotting, and complaint drafting.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/dashboard"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-light transition-all"
            >
              Open Case Dashboard
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {[
            { title: "Evidence", desc: "Document ingestion, chain of custody, exhibit management", href: "/dashboard/evidence" },
            { title: "Timeline", desc: "Chronological reconstruction from Feb 2022 to present", href: "/dashboard/timeline" },
            { title: "Invoices", desc: "Invoice reconciliation, revenue split analysis, damages", href: "/dashboard/invoices" },
            { title: "Legal Issues", desc: "10 candidate claims with elements checklists", href: "/dashboard/legal-issues" },
            { title: "Witnesses", desc: "Witness list, deposition questions, contact status", href: "/dashboard/witnesses" },
            { title: "Red Flags", desc: "Risk assessment and evidence gap tracking", href: "/dashboard/red-flags" },
          ].map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-lg border border-border bg-surface p-6 hover:bg-surface-2 transition-colors"
            >
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
