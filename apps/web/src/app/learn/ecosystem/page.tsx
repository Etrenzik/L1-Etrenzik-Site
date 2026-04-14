import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecosystem — Etrenzik L1",
  description:
    "Everything that has been built on the Etrenzik L1 blockchain and the full scope of what can be developed.",
};

const builtContracts = [
  {
    name: "cw-namespace-marketplace",
    category: "Identity",
    desc: "On-chain human-readable naming system with registration, resolution, transfer, metadata, and marketplace trading.",
  },
  {
    name: "cw-nft-factory",
    category: "NFTs",
    desc: "Collection management contract. Deploys new cw-nft-base instances with configurable royalty, supply, and minting rules.",
  },
  {
    name: "cw-nft-base",
    category: "NFTs",
    desc: "CW721-compatible NFT contract. Each collection gets its own instance holding token ownership, metadata URIs, and on-chain attributes.",
  },
  {
    name: "cw-nft-marketplace",
    category: "NFTs",
    desc: "Fixed-price listing, timed auctions, and bidding with enforced creator royalties on every secondary sale.",
  },
  {
    name: "cw-stablecoin-controller",
    category: "Stablecoins",
    desc: "Core peg management — mint/burn operations, oracle integration, and collateral ratio enforcement.",
  },
  {
    name: "cw-stablecoin-vault",
    category: "Stablecoins",
    desc: "Collateral custody. Tracks individual vault positions, calculates ratios, and triggers liquidation events.",
  },
  {
    name: "cw-token-factory",
    category: "Tokens",
    desc: "Create fungible tokens that integrate with x/bank as first-class chain denominations — no wrapper contracts needed.",
  },
  {
    name: "cw-tokenization-engine",
    category: "RWA",
    desc: "Real-world asset tokenization with fractional ownership, compliance hooks, and configurable transfer restrictions.",
  },
  {
    name: "cw-compliance-hooks",
    category: "Compliance",
    desc: "KYC/AML enforcement, whitelist/blacklist controls, jurisdictional restrictions, and holding period requirements.",
  },
  {
    name: "cw-cap-table",
    category: "RWA",
    desc: "On-chain shareholder registry with share classes, ownership tracking, dividends, stock splits, and buyback mechanics.",
  },
  {
    name: "cw-governance-extended",
    category: "Governance",
    desc: "Advanced governance proposals with quorum, threshold, voting periods, delegation, and parameter change execution.",
  },
  {
    name: "cw-bridge-adapter",
    category: "Interop",
    desc: "Cross-chain bridge interface for wrapping external assets into Etrenzik-native tokens with 1:1 peg guarantees.",
  },
  {
    name: "etrenzik-std",
    category: "Library",
    desc: "Standard library crate shared by all contracts — common types, error definitions, response helpers, and testing utilities.",
  },
  {
    name: "etrenzik-testing",
    category: "Library",
    desc: "Multi-contract integration testing framework with mock chain state, account simulation, and assertion helpers.",
  },
];

const builtModules = [
  {
    name: "x/namespace",
    desc: "Go module for on-chain naming. Register, resolve, transfer, and set metadata for human-readable addresses. Integrated with x/bank for registration fees.",
  },
  {
    name: "x/stablecoin",
    desc: "Go module for continuous peg monitoring. System-level price feeds, automatic minting halts when deviations exceed thresholds, and collateral ratio enforcement.",
  },
];

const builtServices = [
  {
    name: "etrenzik-gateway",
    tech: "Axum",
    desc: "Unified REST and GraphQL API gateway that aggregates chain RPC, indexer database, and metadata service into a single endpoint.",
  },
  {
    name: "etrenzik-indexer",
    tech: "PostgreSQL",
    desc: "Consumes chain events via NATS and writes structured data for complex queries — NFT ownership, transaction history, namespace lookups.",
  },
  {
    name: "etrenzik-event-streamer",
    tech: "NATS",
    desc: "WebSocket subscriber that streams structured chain events to NATS for real-time consumption by all off-chain services.",
  },
  {
    name: "etrenzik-namespace-registry",
    tech: "In-Memory",
    desc: "High-speed namespace cache for sub-millisecond name→address resolution. Syncs with on-chain state via event stream.",
  },
  {
    name: "etrenzik-nft-metadata",
    tech: "IPFS",
    desc: "Pins NFT metadata to IPFS, resolves CIDs, and serves metadata JSON for frontend display and marketplace previews.",
  },
  {
    name: "etrenzik-monitor",
    tech: "Prometheus",
    desc: "Health checks, block production tracking, validator uptime monitoring, and Prometheus-compatible metrics export.",
  },
  {
    name: "etrenzik-common",
    tech: "Rust",
    desc: "Shared types, configuration, error handling, and utility functions used across all Rust microservices.",
  },
];

const aiCapabilities = [
  {
    metric: "60+",
    label: "AI Agents",
    desc: "Specialized across 18 domains: legal, finance, compliance, analytics, development, documentation, security, and more.",
  },
  {
    metric: "3",
    label: "Agent Tiers",
    desc: "Orchestrator agents coordinate domain agents, which delegate to task-specific agents — creating a hierarchical execution model.",
  },
  {
    metric: "9",
    label: "MCP Servers",
    desc: "Model Context Protocol servers that expose chain data, contract state, analytics, and documentation as tool-callable context for any LLM.",
  },
  {
    metric: "10",
    label: "RAG Crates",
    desc: "Rust crate pipeline for semantic retrieval — document ingestion, vector embedding, index building, and similarity search.",
  },
  {
    metric: "8",
    label: "AI Crates",
    desc: "Inference runtime, prompt management, embedding generation, model loading, and agent lifecycle management — all in Rust.",
  },
  {
    metric: "x402",
    label: "Payment Protocol",
    desc: "Enables AI agents to autonomously pay gas fees from their own wallets, allowing fully autonomous on-chain operations.",
  },
];

const rustCrates = [
  { group: "Smart Contracts", count: 14, examples: "cw-nft-factory, cw-stablecoin-controller, cw-tokenization-engine" },
  { group: "AI & ML", count: 8, examples: "etrenzik-inference, etrenzik-embeddings, etrenzik-prompt, etrenzik-agent" },
  { group: "RAG Pipeline", count: 10, examples: "etrenzik-rag-ingest, etrenzik-rag-index, etrenzik-rag-search, etrenzik-rag-embed" },
  { group: "Microservices", count: 7, examples: "etrenzik-gateway, etrenzik-indexer, etrenzik-event-streamer" },
  { group: "Shared Libraries", count: "3+", examples: "etrenzik-std, etrenzik-testing, etrenzik-common" },
];

const futureHorizons = [
  {
    title: "Layer 2 Rollups",
    desc: "Application-specific rollups that settle to Etrenzik L1 for high-throughput use cases — gaming, social media, micropayments.",
    status: "Planned",
  },
  {
    title: "Interchain Accounts",
    desc: "Control accounts on other Cosmos chains directly from Etrenzik — execute remote staking, trading, and governance from one interface.",
    status: "IBC v2",
  },
  {
    title: "Zero-Knowledge Proofs",
    desc: "ZK-SNARK verifier contracts enabling private transactions, anonymous voting, and confidential asset transfers.",
    status: "Research",
  },
  {
    title: "Oracle Network",
    desc: "Decentralized oracle infrastructure for price feeds, weather data, sports results, and any off-chain data needed by smart contracts.",
    status: "Planned",
  },
  {
    title: "Social Protocols",
    desc: "On-chain social graphs, content attestation, decentralized messaging, and reputation systems built on namespace identities.",
    status: "Design",
  },
  {
    title: "AI Model Marketplace",
    desc: "On-chain registry of AI models with tokenized access rights, usage metering, and creator royalties — a decentralized Hugging Face.",
    status: "Design",
  },
  {
    title: "Supply Chain Tracking",
    desc: "End-to-end provenance tracking with IoT data attestation, quality checkpoints, and compliance certification at every stage.",
    status: "Planned",
  },
  {
    title: "Decentralized Storage",
    desc: "IPFS pinning incentive layer and permanent storage commitments for NFT metadata, legal documents, and archival data.",
    status: "Design",
  },
];

export default function EcosystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Ecosystem Overview
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Everything that has been built on the Etrenzik L1 blockchain — and
            the full scope of what can be developed next.
          </p>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5 text-center">
            {[
              { value: "14", label: "Smart Contracts" },
              { value: "2", label: "SDK Modules" },
              { value: "7", label: "Microservices" },
              { value: "60+", label: "AI Agents" },
              { value: "35+", label: "Rust Crates" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-accent-light">{s.value}</div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Smart Contracts */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">14 Smart Contracts</h2>
          <p className="text-muted mb-8 max-w-3xl">
            Production CosmWasm contracts written in Rust, compiled to
            WebAssembly. Each contract is independently deployable and
            composable via sub-messages.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builtContracts.map((c) => (
              <div
                key={c.name}
                className="rounded-xl bg-surface p-5 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-semibold text-accent-light">
                    {c.name}
                  </h4>
                  <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                    {c.category}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK Modules */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">Custom Cosmos SDK Modules</h2>
          <p className="text-muted mb-8 max-w-3xl">
            Go modules compiled into the chain binary. These operate at the
            application layer with direct access to consensus state and native
            bank operations.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {builtModules.map((m) => (
              <div
                key={m.name}
                className="rounded-xl bg-surface-2 p-6 border border-border"
              >
                <h4 className="font-mono text-lg font-semibold text-accent-light mb-2">
                  {m.name}
                </h4>
                <p className="text-muted text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-surface-2 p-6 border border-border">
            <h4 className="font-semibold mb-3">Standard Cosmos Modules Included</h4>
            <div className="flex flex-wrap gap-2">
              {[
                "x/auth",
                "x/bank",
                "x/staking",
                "x/gov",
                "x/distribution",
                "x/slashing",
                "x/ibc",
                "x/wasm (CosmWasm)",
              ].map((mod) => (
                <span
                  key={mod}
                  className="rounded-full bg-surface px-3 py-1 text-sm text-muted font-mono"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Microservices */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">7 Rust Microservices</h2>
          <p className="text-muted mb-8 max-w-3xl">
            Off-chain infrastructure services written in Rust. These power
            indexing, caching, metadata storage, API access, and monitoring.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {builtServices.map((s) => (
              <div
                key={s.name}
                className="rounded-xl bg-surface p-5 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-mono text-sm font-semibold text-accent-light">
                    {s.name}
                  </h4>
                  <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                    {s.tech}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Intelligence */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">AI & Intelligence Layer</h2>
          <p className="text-muted mb-8 max-w-3xl">
            The most advanced AI integration in any L1 blockchain — agent
            orchestration, semantic retrieval, and autonomous on-chain
            operations.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {aiCapabilities.map((ai) => (
              <div
                key={ai.label}
                className="rounded-xl bg-surface-2 p-6 border border-border"
              >
                <div className="text-3xl font-bold text-accent-light mb-1">
                  {ai.metric}
                </div>
                <h4 className="font-semibold mb-2">{ai.label}</h4>
                <p className="text-sm text-muted leading-relaxed">{ai.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rust Crate Inventory */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">35+ Rust Crates</h2>
          <p className="text-muted mb-8 max-w-3xl">
            The entire platform is written in Rust (contracts, services, AI
            infrastructure) and Go (chain binary, SDK modules).
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold">Group</th>
                  <th className="px-5 py-3 text-left font-semibold">Count</th>
                  <th className="px-5 py-3 text-left font-semibold">Key Crates</th>
                </tr>
              </thead>
              <tbody>
                {rustCrates.map((row, i) => (
                  <tr
                    key={row.group}
                    className={`border-b border-border last:border-0 ${
                      i % 2 === 0 ? "bg-surface/30" : "bg-surface-2/30"
                    }`}
                  >
                    <td className="px-5 py-3 font-medium">{row.group}</td>
                    <td className="px-5 py-3 text-accent-light font-bold">
                      {row.count}
                    </td>
                    <td className="px-5 py-3 text-muted font-mono text-xs">
                      {row.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* What's Possible — Future Horizons */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold mb-2">
            Development Possibilities
          </h2>
          <p className="text-muted mb-8 max-w-3xl">
            Beyond what already exists, the Etrenzik platform enables an
            expansive range of future development. These are the horizons
            currently in planning, design, or research.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futureHorizons.map((h) => (
              <div
                key={h.title}
                className="rounded-xl bg-surface-2 p-6 border border-border"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{h.title}</h4>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      h.status === "Planned"
                        ? "bg-accent/10 text-accent-light"
                        : h.status === "Research"
                        ? "bg-purple-500/10 text-purple-400"
                        : h.status === "IBC v2"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {h.status}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Summary */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Platform Summary
          </h2>

          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <pre className="code-block text-sm overflow-x-auto leading-relaxed">
{`Etrenzik L1 — Platform Inventory
═════════════════════════════════════════════════════════

CONSENSUS          CometBFT (BFT, instant finality, ~6s blocks)
CHAIN BINARY       etrenzikd (Cosmos SDK v0.50, Go)
NATIVE TOKEN       ETZ (uetz = 1e-6 ETZ)

CUSTOM MODULES     x/namespace · x/stablecoin
STANDARD MODULES   auth · bank · staking · gov · distribution · slashing · ibc

SMART CONTRACTS    14 CosmWasm contracts (Rust → Wasm)
  ├── NFTs         cw-nft-factory · cw-nft-base · cw-nft-marketplace
  ├── Stablecoins  cw-stablecoin-controller · cw-stablecoin-vault
  ├── Tokens       cw-token-factory
  ├── RWA          cw-tokenization-engine · cw-compliance-hooks · cw-cap-table
  ├── Governance   cw-governance-extended
  ├── Interop      cw-bridge-adapter
  ├── Identity     cw-namespace-marketplace
  └── Libraries    etrenzik-std · etrenzik-testing

MICROSERVICES      7 Rust services
  ├── gateway      Axum REST/GraphQL API
  ├── indexer      PostgreSQL chain event indexer
  ├── streamer     NATS event bridge
  ├── namespace    In-memory name cache
  ├── nft-meta     IPFS metadata pinning
  ├── monitor      Prometheus health/metrics
  └── common       Shared types & config

AI LAYER           60+ agents · 9 MCP servers · 10 RAG crates · 8 AI crates
IBC                Cross-chain communication enabled
CROSS-CHAIN        cw-bridge-adapter for external ecosystems`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">Explore Further</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Learn how data flows through the platform or see what you can
            build.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/learn/flow-tree"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Flow Tree
            </Link>
            <Link
              href="/learn/capabilities"
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold hover:bg-surface-2 transition-colors"
            >
              What You Can Build
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
