import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted mb-8">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Devnet Live — Cosmos SDK v0.50 + CosmWasm 2.x
            </div>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight">
              Build on{" "}
              <span className="bg-gradient-to-r from-accent via-purple-400 to-accent-light bg-clip-text text-transparent animate-gradient">
                Etrenzik
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted leading-relaxed">
              A sovereign Layer 1 blockchain powered by Cosmos SDK, CometBFT consensus,
              and CosmWasm smart contracts — with built-in AI orchestration, human-readable
              namespaces, and a complete tokenization framework.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/learn/architecture"
                className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-light transition-all"
              >
                Explore the Architecture
              </Link>
              <Link
                href="/developers"
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition-all"
              >
                Developer Quick Start
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-surface/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 text-center">
            {[
              { label: "Smart Contracts", value: "14" },
              { label: "AI Agents", value: "60+" },
              { label: "MCP Servers", value: "9" },
              { label: "Rust Crates", value: "35+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-accent-light">{stat.value}</div>
                <div className="mt-1 text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">What Makes Etrenzik Different</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Not just another blockchain — a fully integrated platform combining chain, contracts, AI, and developer tools.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {concepts.map((c) => (
            <Link
              key={c.title}
              href={c.href}
              className="gradient-border p-6 hover:scale-[1.02] transition-transform"
            >
              <div className="text-3xl mb-4">{c.icon}</div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{c.desc}</p>
              <span className="inline-block mt-4 text-xs text-accent-light font-medium">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Code Preview */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold">Write Smart Contracts in Rust</h2>
              <p className="mt-4 text-muted leading-relaxed">
                Etrenzik uses CosmWasm 2.x for smart contracts. Write type-safe,
                memory-safe contracts in Rust that compile to WebAssembly. Deploy
                and interact via the <code className="text-accent-light font-mono text-sm">etz</code> CLI.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/learn/smart-contracts"
                  className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-light transition-colors"
                >
                  Contract Tutorial
                </Link>
                <Link
                  href="/developers"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-surface-2 transition-colors"
                >
                  CLI Reference
                </Link>
              </div>
            </div>
            <div className="code-block p-4 text-sm font-mono">
              <div className="flex gap-1.5 mb-4">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <pre className="text-muted leading-relaxed overflow-x-auto">
{`use cosmwasm_std::{entry_point, DepsMut, Env,
    MessageInfo, Response, StdResult};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    let state = State {
        owner: info.sender.clone(),
        name: msg.name,
    };
    STATE.save(deps.storage, &state)?;
    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Platform Architecture</h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Five major layers working together — from consensus to AI orchestration.
          </p>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {layers.map((layer, i) => (
            <div
              key={layer.name}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-accent/10 text-accent-light flex items-center justify-center font-bold text-sm">
                L{i}
              </div>
              <div>
                <h3 className="font-semibold">{layer.name}</h3>
                <p className="text-sm text-muted mt-1">{layer.desc}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {layer.tech.map((t) => (
                    <span key={t} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/learn/architecture" className="text-sm text-accent-light hover:underline">
            Deep dive into the architecture →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Ready to Build?</h2>
          <p className="mt-4 text-muted max-w-lg mx-auto">
            Set up your environment, deploy your first contract, and register a namespace in under 10 minutes.
          </p>
          <Link
            href="/developers"
            className="inline-block mt-8 rounded-lg bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-light transition-all"
          >
            Developer Quick Start →
          </Link>
        </div>
      </section>
    </>
  );
}

const concepts = [
  {
    icon: "⛓️",
    title: "Cosmos SDK Chain",
    desc: "Sovereign L1 built on Cosmos SDK v0.50 with CometBFT consensus. IBC-enabled for cross-chain communication.",
    href: "/learn/cosmos-sdk",
  },
  {
    icon: "📜",
    title: "CosmWasm Contracts",
    desc: "14 production-grade smart contracts written in Rust. NFT factory, stablecoin vaults, tokenization engine, and more.",
    href: "/learn/smart-contracts",
  },
  {
    icon: "🏷️",
    title: "Human-Readable Namespaces",
    desc: 'Register "alice.etz" and resolve it on-chain. DNS-style naming built into the chain as a native module.',
    href: "/learn/namespaces",
  },
  {
    icon: "🤖",
    title: "60+ AI Agents",
    desc: "Hierarchical AI orchestration — executive, master, and domain agents with confidence scoring and policy engines.",
    href: "/learn/ai-agents",
  },
  {
    icon: "💰",
    title: "Stablecoin & Tokenization",
    desc: "Collateral-backed stablecoin vaults, real-world asset tokenization, cap tables, and transfer restrictions.",
    href: "/learn/stablecoins",
  },
  {
    icon: "🖼️",
    title: "NFTs & Token Factory",
    desc: "Create collections, mint NFTs, set royalties, and trade on the built-in marketplace contract.",
    href: "/learn/nfts-tokens",
  },
];

const layers = [
  {
    name: "Consensus — CometBFT",
    desc: "Byzantine fault-tolerant consensus with instant finality. Validators stake ETZ to secure the network.",
    tech: ["CometBFT v0.38", "PoS", "IBC", "~6s blocks"],
  },
  {
    name: "Application — Cosmos SDK Modules",
    desc: "Custom modules for namespaces, stablecoin, governance. Standard bank, staking, and auth modules.",
    tech: ["Go", "x/namespace", "x/stablecoin", "x/gov"],
  },
  {
    name: "Smart Contracts — CosmWasm",
    desc: "Sandboxed WebAssembly execution. 14 contracts covering NFTs, tokenization, compliance, and bridges.",
    tech: ["Rust", "CosmWasm 2.x", "WASM", "cw-std"],
  },
  {
    name: "Services — Rust Microservices",
    desc: "Indexer, API gateway, event streaming, namespace registry, and monitoring services.",
    tech: ["Axum", "Tokio", "PostgreSQL", "NATS", "Redis"],
  },
  {
    name: "Intelligence — AI & MCP",
    desc: "60+ AI agents, 20 orchestrators, 9 MCP servers, RAG pipeline, and an executive command interface.",
    tech: ["AI Orchestration", "MCP Protocol", "RAG", "x402"],
  },
];
