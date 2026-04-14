import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture — Etrenzik L1",
  description:
    "Deep dive into the five-layer platform architecture powering the Etrenzik sovereign blockchain.",
};

const layers = [
  { num: 1, name: "Consensus", tech: "CometBFT", color: "from-purple-500 to-indigo-600" },
  { num: 2, name: "Application", tech: "Cosmos SDK", color: "from-indigo-500 to-blue-600" },
  { num: 3, name: "Contracts", tech: "CosmWasm", color: "from-blue-500 to-cyan-600" },
  { num: 4, name: "Services", tech: "Rust µservices", color: "from-cyan-500 to-teal-600" },
  { num: 5, name: "Intelligence", tech: "AI + MCP", color: "from-teal-500 to-emerald-600" },
];

const contracts = [
  "cw-namespace-marketplace",
  "cw-nft-factory",
  "cw-nft-base",
  "cw-nft-marketplace",
  "cw-stablecoin-controller",
  "cw-stablecoin-vault",
  "cw-token-factory",
  "cw-tokenization-engine",
  "cw-compliance-hooks",
  "cw-cap-table",
  "cw-governance-extended",
  "cw-bridge-adapter",
  "etrenzik-std",
  "etrenzik-testing",
];

const services = [
  { name: "etrenzik-gateway", desc: "API gateway built on Axum" },
  { name: "etrenzik-indexer", desc: "Chain event indexer" },
  { name: "etrenzik-event-streamer", desc: "NATS streaming bridge" },
  { name: "etrenzik-namespace-registry", desc: "Off-chain namespace cache" },
  { name: "etrenzik-nft-metadata", desc: "IPFS metadata service" },
  { name: "etrenzik-monitor", desc: "Health checks & metrics" },
  { name: "etrenzik-common", desc: "Shared types & utilities" },
];

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Platform Architecture
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Five integrated layers powering a sovereign blockchain with AI
            capabilities
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Architecture Overview</h2>
          <p className="mt-2 text-muted">
            Each layer builds on the one below it, creating a full-stack
            blockchain platform.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[...layers].reverse().map((layer) => (
              <div
                key={layer.num}
                className="flex items-center gap-4 rounded-lg bg-surface p-5"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${layer.color} text-lg font-bold text-white`}
                >
                  {layer.num}
                </div>
                <div
                  className={`h-12 w-1 rounded-full bg-gradient-to-b ${layer.color}`}
                />
                <div>
                  <h3 className="text-lg font-semibold">{layer.name}</h3>
                  <p className="text-sm text-muted">{layer.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 1 — Consensus */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">
            Layer 1 — Consensus (CometBFT)
          </h2>
          <p className="mt-2 text-muted">
            Byzantine Fault Tolerant consensus with instant finality.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold">Key Properties</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>• BFT consensus — tolerates up to ⅓ Byzantine validators</li>
                <li>• Instant finality — no probabilistic confirmation</li>
                <li>• ~6 second block time</li>
                <li>• Validator set secured by ETZ staking</li>
                <li>• IBC-enabled for cross-chain communication</li>
              </ul>
            </div>

            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold">Validator Setup</h3>
              <pre className="code-block mt-3 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`# Initialize the node
etrenzikd init my-validator --chain-id etrenzik-1

# Create validator transaction
etrenzikd tx staking create-validator \\
  --amount=1000000uetz \\
  --pubkey=$(etrenzikd tendermint show-validator) \\
  --moniker="my-validator" \\
  --commission-rate="0.10" \\
  --commission-max-rate="0.20" \\
  --min-self-delegation="1" \\
  --from=validator-key`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 2 — Application */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">
            Layer 2 — Application (Cosmos SDK Modules)
          </h2>
          <p className="mt-2 text-muted">
            Go modules that define on-chain state and business logic.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold text-accent-light">
                x/namespace
              </h3>
              <p className="mt-1 text-sm text-muted">
                On-chain human-readable naming system. Register names like
                &quot;alice.etz&quot;, resolve addresses, transfer ownership, and
                set metadata.
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold text-accent-light">
                x/stablecoin
              </h3>
              <p className="mt-1 text-sm text-muted">
                Collateral management, peg monitoring, and mint/burn mechanics
                for on-chain stablecoins.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-surface p-6">
            <h3 className="text-lg font-semibold">Standard Modules</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["bank", "staking", "gov", "auth", "distribution", "slashing", "ibc"].map(
                (mod) => (
                  <span
                    key={mod}
                    className="rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-muted"
                  >
                    {mod}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Module Interaction Diagram */}
          <div className="mt-8 rounded-lg bg-surface p-6">
            <h3 className="text-lg font-semibold">Module Interaction</h3>
            <div className="mt-4 flex flex-col items-center gap-2 text-sm">
              <div className="rounded-lg bg-surface-2 px-6 py-3 font-mono">
                x/namespace
              </div>
              <span className="text-muted">↕ queries</span>
              <div className="flex gap-4">
                <div className="rounded-lg bg-surface-2 px-6 py-3 font-mono">
                  x/bank
                </div>
                <div className="rounded-lg bg-surface-2 px-6 py-3 font-mono">
                  x/stablecoin
                </div>
              </div>
              <span className="text-muted">↕ delegation</span>
              <div className="flex gap-4">
                <div className="rounded-lg bg-surface-2 px-6 py-3 font-mono">
                  x/staking
                </div>
                <div className="rounded-lg bg-surface-2 px-6 py-3 font-mono">
                  x/gov
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 3 — Smart Contracts */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">
            Layer 3 — Smart Contracts (CosmWasm)
          </h2>
          <p className="mt-2 text-muted">
            14 production contracts written in Rust, compiled to WebAssembly.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contracts.map((c) => (
              <div
                key={c}
                className="rounded-lg bg-surface px-4 py-3 font-mono text-sm"
              >
                {c}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg bg-surface p-6">
            <h3 className="text-lg font-semibold">Example: Instantiate a Contract</h3>
            <pre className="code-block mt-3 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`use cosmwasm_std::{entry_point, DepsMut, Env, MessageInfo, Response};
use crate::msg::InstantiateMsg;
use crate::state::CONFIG;

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let config = Config {
        admin: info.sender.clone(),
        name: msg.name,
    };
    CONFIG.save(deps.storage, &config)?;

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("admin", info.sender))
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Layer 4 — Services */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">
            Layer 4 — Services (Rust Microservices)
          </h2>
          <p className="mt-2 text-muted">
            Off-chain Rust services that index, cache, and expose chain data.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc) => (
              <div
                key={svc.name}
                className="rounded-lg bg-surface p-5"
              >
                <h3 className="font-mono text-sm font-semibold text-accent-light">
                  {svc.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Layer 5 — Intelligence */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">
            Layer 5 — Intelligence (AI + MCP)
          </h2>
          <p className="mt-2 text-muted">
            The AI orchestration layer that manages autonomous agents and human
            oversight.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">60+</h3>
              <p className="mt-1 text-sm text-muted">
                Specialized agents across 18 domains
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">20</h3>
              <p className="mt-1 text-sm text-muted">
                Orchestrators coordinating agent workflows
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">9</h3>
              <p className="mt-1 text-sm text-muted">
                MCP servers exposing chain capabilities
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">10</h3>
              <p className="mt-1 text-sm text-muted">
                RAG pipeline crates for knowledge retrieval
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">x402</h3>
              <p className="mt-1 text-sm text-muted">
                Payment protocol for agent-to-agent transactions
              </p>
            </div>
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-2xl font-bold text-accent-light">Exec</h3>
              <p className="mt-1 text-sm text-muted">
                Executive interface for human oversight &amp; approval
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Infrastructure</h2>
          <p className="mt-2 text-muted">
            The backing services and deployment platform.
          </p>

          <div className="mt-8 rounded-lg bg-surface p-6">
            <div className="flex flex-col items-center gap-3 text-sm">
              <div className="rounded-lg bg-surface-2 px-8 py-3 font-mono font-semibold">
                Kubernetes
              </div>
              <span className="text-muted">orchestrates</span>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "PostgreSQL",
                  "Redis",
                  "NATS JetStream",
                  "Qdrant",
                  "S3 / MinIO",
                ].map((infra) => (
                  <div
                    key={infra}
                    className="rounded-lg bg-surface-2 px-4 py-2 font-mono"
                  >
                    {infra}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 text-right">
          <Link
            href="/learn/cosmos-sdk"
            className="text-accent-light hover:underline"
          >
            Next: Learn about Cosmos SDK →
          </Link>
        </div>
      </section>
    </main>
  );
}
