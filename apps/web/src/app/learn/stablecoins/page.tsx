import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stablecoins & Tokenization — Etrenzik L1",
};

export default function StablecoinsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Stablecoins &amp; Tokenization
          </h1>
          <p className="text-xl text-muted max-w-2xl">
            Collateral-backed stablecoins and real-world asset tokenization
            on-chain
          </p>
        </div>
      </section>

      {/* Stablecoin System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Stablecoin System</h2>
          <p className="text-muted mb-8 max-w-3xl">
            A two-contract architecture backed by a native chain module provides
            collateral-backed stablecoin issuance with continuous peg
            monitoring.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                cw-stablecoin-controller
              </h3>
              <p className="text-muted text-sm">
                Core peg management. Handles mint and burn operations, integrates
                with price oracles, and enforces collateral ratio requirements.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                cw-stablecoin-vault
              </h3>
              <p className="text-muted text-sm">
                Holds collateral assets deposited by users. Tracks individual
                vault positions, calculates collateral ratios, and triggers
                liquidation events.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                x/stablecoin Module
              </h3>
              <p className="text-muted text-sm">
                Native chain module for continuous peg monitoring. Provides
                system-level price feeds and can halt minting if the peg
                deviates beyond thresholds.
              </p>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Stablecoin Architecture
            </h4>
            <pre className="code-block text-sm overflow-x-auto">
{`                  ┌───────────────┐
                  │  Price Oracle  │
                  └───────┬───────┘
                          │
┌─────────────────────────▼─────────────────────────┐
│              cw-stablecoin-controller              │
│  (peg mgmt · mint/burn · collateral ratio check)  │
└──────────┬────────────────────────┬───────────────┘
           │                        │
    mint stablecoin          check collateral
           │                        │
           ▼                        ▼
   ┌──────────────┐      ┌─────────────────────┐
   │  User Wallet  │      │  cw-stablecoin-vault │
   └──────────────┘      │  (holds collateral)  │
                          └─────────────────────┘
                                    │
                            x/stablecoin module
                          (chain-level peg monitor)`}
            </pre>
          </div>
        </div>
      </section>

      {/* How Minting Works */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">How Minting Works</h2>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {[
              {
                step: "1",
                title: "Deposit Collateral",
                desc: "User deposits accepted collateral assets into the vault.",
              },
              {
                step: "2",
                title: "Calculate Ratio",
                desc: "Vault computes the collateral-to-debt ratio using oracle prices.",
              },
              {
                step: "3",
                title: "Mint Stablecoin",
                desc: "Controller issues stablecoins if the ratio meets the 150 % minimum.",
              },
              {
                step: "4",
                title: "Monitor Peg",
                desc: "x/stablecoin module continuously checks peg health.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-surface-2 rounded-xl p-5 border border-border"
              >
                <span className="text-accent-light font-bold text-2xl">
                  {s.step}
                </span>
                <h4 className="font-semibold mt-2 mb-1">{s.title}</h4>
                <p className="text-muted text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-2 rounded-xl p-6 border border-border mb-8">
            <h4 className="font-semibold mb-2">Liquidation Mechanism</h4>
            <p className="text-muted text-sm">
              When a vault&apos;s collateral ratio drops below the minimum
              threshold (e.g. 150&nbsp;%), anyone can trigger a liquidation. The
              vault&apos;s collateral is sold at a discount to repay the minted
              stablecoins, and a liquidation penalty is applied.
            </p>
          </div>

          <pre className="code-block rounded-xl text-sm overflow-x-auto">
{`#[cw_serde]
pub enum ExecuteMsg {
    DepositCollateral {
        vault_id: u64,
    },
    MintStablecoin {
        vault_id: u64,
        amount: Uint128,       // stablecoins to mint
    },
    Liquidate {
        vault_id: u64,
    },
    // ...
}`}
          </pre>
        </div>
      </section>

      {/* Tokenization Engine */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Tokenization Engine</h2>
          <p className="text-muted mb-6 max-w-3xl">
            <code className="text-accent-light">cw-tokenization-engine</code>{" "}
            enables real-world assets to be represented as on-chain tokens with
            built-in compliance controls.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Asset Types</h4>
              <ul className="text-muted text-sm space-y-1 list-disc list-inside">
                <li>Real estate — property deeds, REITs</li>
                <li>Securities — equity, debt instruments</li>
                <li>Commodities — gold, oil, carbon credits</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Fractional Ownership</h4>
              <p className="text-muted text-sm">
                Split a single asset into divisible token units. Holders receive
                proportional rights — dividends, votes, and liquidation
                proceeds.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Compliance Integration</h4>
              <p className="text-muted text-sm">
                Every transfer is routed through{" "}
                <code className="text-accent-light">cw-compliance-hooks</code>{" "}
                to enforce KYC/AML rules and jurisdictional restrictions.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Transfer Restrictions</h4>
              <p className="text-muted text-sm">
                Regulated assets can enforce holding periods, accredited-investor
                checks, and maximum holder counts at the contract level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance & Cap Table */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Compliance &amp; Cap Table
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="gradient-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                cw-compliance-hooks
              </h3>
              <ul className="text-muted text-sm space-y-2">
                <li>
                  <strong className="text-foreground">KYC/AML</strong> —
                  Verified-identity requirement per asset class
                </li>
                <li>
                  <strong className="text-foreground">
                    Whitelist / Blacklist
                  </strong>{" "}
                  — Granular address-level controls
                </li>
                <li>
                  <strong className="text-foreground">
                    Transfer Restrictions
                  </strong>{" "}
                  — Jurisdiction, holding period, investor type
                </li>
              </ul>
            </div>
            <div className="gradient-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                cw-cap-table
              </h3>
              <ul className="text-muted text-sm space-y-2">
                <li>
                  <strong className="text-foreground">Shareholders</strong> —
                  On-chain registry of holders and share classes
                </li>
                <li>
                  <strong className="text-foreground">
                    Ownership Percentages
                  </strong>{" "}
                  — Automatically updated on every transfer
                </li>
                <li>
                  <strong className="text-foreground">
                    Dividends &amp; Corporate Actions
                  </strong>{" "}
                  — Pro-rata distribution, stock splits, buybacks
                </li>
              </ul>
            </div>
          </div>

          {/* Compliance Flow */}
          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Compliance Check Flow
            </h4>
            <pre className="code-block text-sm overflow-x-auto">
{`User initiates transfer
        │
        ▼
┌───────────────────┐     fail     ┌────────────┐
│ cw-compliance-hooks│────────────▶│  TX Rejected │
│  ┌─ KYC verified? │              └────────────┘
│  ├─ Not blacklisted?
│  ├─ Jurisdiction ok?
│  └─ Holding period met?
└────────┬──────────┘
         │ pass
         ▼
┌─────────────────────┐
│  cw-tokenization-engine  │──▶  Transfer executed
│  (update balances)       │
└─────────────────────┘
         │
         ▼
┌──────────────┐
│  cw-cap-table │──▶  Ownership % recalculated
└──────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Real Estate",
                desc: "Tokenize property deeds for fractional investment. Automate rent distribution to token holders.",
              },
              {
                title: "Corporate Equity",
                desc: "Issue and manage company shares on-chain with automated cap-table tracking and dividend payments.",
              },
              {
                title: "Commodities Trading",
                desc: "Represent gold, oil, or carbon credits as transferable tokens with real-time price feeds.",
              },
              {
                title: "Regulated Securities",
                desc: "Issue compliant debt instruments with built-in transfer restrictions and investor verification.",
              },
            ].map((uc) => (
              <div
                key={uc.title}
                className="bg-surface rounded-xl p-6 border border-border"
              >
                <h4 className="font-semibold mb-2">{uc.title}</h4>
                <p className="text-muted text-sm">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <Link
            href="/learn/nfts-tokens"
            className="text-accent-light hover:underline"
          >
            ← NFTs &amp; Tokens
          </Link>
          <Link
            href="/learn/ai-agents"
            className="text-accent-light hover:underline"
          >
            AI Agents →
          </Link>
        </div>
      </section>
    </main>
  );
}
