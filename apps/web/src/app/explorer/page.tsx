import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorer — Etrenzik L1",
};

export default function ExplorerPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Block Explorer</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Browse blocks, transactions, and validators on the Etrenzik network
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="gradient-border rounded-xl p-8 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              The Etrenzik Block Explorer is under development
            </h2>
            <p className="text-muted mb-6">
              The following features will be available:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
              {[
                "Block browsing",
                "Transaction search",
                "Validator list + uptime",
                "Namespace lookup",
                "Contract interactions",
                "Token balances",
                "Governance proposals",
              ].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-muted">
                  <span className="text-accent-light">&#x2713;</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Devnet Status */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Devnet Status</h2>
          <div className="bg-surface-2 rounded-xl border border-border p-8 max-w-xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted">Network</span>
                <span className="font-mono text-accent-light">
                  etrenzik-devnet-1
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Status</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  Active
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Block Time</span>
                <span className="font-mono">~6s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Validators</span>
                <span className="font-mono">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted">Chain</span>
                <span className="font-mono text-sm">
                  Cosmos SDK v0.50 + CometBFT v0.38
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In the Meantime */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            In the Meantime
          </h2>
          <p className="text-muted text-center mb-8">
            Use the CLI to explore the network:
          </p>
          <pre className="code-block max-w-2xl mx-auto">
            <code>{`etz query block latest
etz query tx $TXHASH
etz query staking validators
etz query namespace list`}</code>
          </pre>
          <div className="text-center mt-10">
            <Link
              href="/developers"
              className="inline-block bg-accent text-background font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Go to Developer Quick Start
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
