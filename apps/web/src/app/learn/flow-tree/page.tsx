import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flow Tree — Etrenzik L1",
  description:
    "A detailed walkthrough of how transactions, state changes, and data flow through every layer of the Etrenzik blockchain.",
};

const phases = [
  {
    num: 1,
    title: "User Action",
    subtitle: "Client Layer",
    color: "from-violet-500 to-purple-600",
    items: [
      "A user initiates an action — mint an NFT, register a namespace, deposit collateral, or call any smart contract.",
      "The action is constructed as a Cosmos SDK MsgExecuteContract (for CosmWasm) or a native module message (e.g. MsgRegisterNamespace).",
      "The transaction is signed with the user's private key and broadcast to a validator node via the etz CLI, REST API, or frontend SDK.",
    ],
  },
  {
    num: 2,
    title: "Transaction Broadcast",
    subtitle: "Network Layer",
    color: "from-purple-500 to-indigo-600",
    items: [
      "The signed transaction reaches a validator's RPC endpoint and enters the local mempool.",
      "CometBFT gossips the transaction to all connected peers across the validator set.",
      "Basic validity checks run immediately: signature verification, account sequence number, sufficient gas fees.",
      "Invalid transactions are rejected before consensus — no gas is consumed.",
    ],
  },
  {
    num: 3,
    title: "Consensus (CometBFT)",
    subtitle: "Layer 1 — Byzantine Agreement",
    color: "from-indigo-500 to-blue-600",
    items: [
      "The block proposer (rotated round-robin, weighted by stake) bundles pending mempool transactions into a candidate block.",
      "The proposer broadcasts the block proposal to all validators.",
      "Validators execute Prevote → Precommit → Commit (BFT two-phase commit). The block needs votes from >⅔ of staked power.",
      "Once committed, the block has instant finality — no confirmations needed, no chain reorganizations possible.",
      "Block time is ~6 seconds. The finalized block is appended to the chain and the next round begins.",
    ],
  },
  {
    num: 4,
    title: "ABCI Execution",
    subtitle: "Layer 2 — Cosmos SDK Application",
    color: "from-blue-500 to-cyan-600",
    items: [
      "CometBFT passes the finalized block to the Cosmos SDK application via ABCI (Application Blockchain Interface).",
      "The SDK calls BeginBlock → DeliverTx (for each tx) → EndBlock → Commit in sequence.",
      "Each DeliverTx routes the message to the appropriate handler: native module keeper (x/namespace, x/stablecoin, x/bank) or the CosmWasm VM.",
      "AnteHandlers run first: deduct gas fees, verify signatures, check account balances, enforce rate limits.",
      "If any check fails, the transaction is reverted atomically — state changes are rolled back, gas is still consumed.",
    ],
  },
  {
    num: 5,
    title: "Smart Contract Execution",
    subtitle: "Layer 3 — CosmWasm VM",
    color: "from-cyan-500 to-teal-600",
    items: [
      "If the message targets a CosmWasm contract, the SDK hands it to the Wasm VM runtime.",
      "The contract's execute() entry point runs inside a sandboxed WebAssembly instance with metered gas.",
      "The contract can read/write its own storage, query other contracts or native modules, and emit sub-messages.",
      "Sub-messages allow atomic cross-contract calls: e.g. cw-nft-factory calls cw-nft-base to mint, which calls cw-nft-marketplace to list.",
      "On success, all state changes are committed. On failure, everything rolls back — including sub-message side effects.",
    ],
  },
  {
    num: 6,
    title: "State Commit",
    subtitle: "IAVL Merkle Tree",
    color: "from-teal-500 to-emerald-600",
    items: [
      "After all transactions in the block execute, the Cosmos SDK commits the new state to the IAVL+ Merkle tree.",
      "Each module and contract has its own key-value store namespace within the tree.",
      "A new app hash (Merkle root) is computed — this hash is included in the next block header for cryptographic verification.",
      "Light clients can verify any piece of state by requesting a Merkle proof from any full node.",
    ],
  },
  {
    num: 7,
    title: "Event Emission",
    subtitle: "Layer 4 — Event System",
    color: "from-emerald-500 to-green-600",
    items: [
      "Every successful transaction emits structured events with typed attributes (e.g. wasm.action = \"mint_nft\", wasm.token_id = \"42\").",
      "CometBFT indexes these events for efficient querying via the /tx_search and /block_search RPC endpoints.",
      "The etrenzik-event-streamer service subscribes to new blocks via WebSocket and publishes events to NATS for real-time consumption.",
      "Events are the primary interface for off-chain services to react to on-chain activity.",
    ],
  },
  {
    num: 8,
    title: "Indexing & Services",
    subtitle: "Layer 4 — Off-Chain Infrastructure",
    color: "from-green-500 to-lime-600",
    items: [
      "The etrenzik-indexer consumes events from NATS and writes structured data to PostgreSQL for complex queries (e.g. \"all NFTs owned by address X\").",
      "The etrenzik-namespace-registry maintains an in-memory cache of namespace→address mappings for sub-millisecond lookups.",
      "The etrenzik-nft-metadata service pins NFT metadata to IPFS and resolves CIDs for frontend display.",
      "The etrenzik-gateway (Axum) exposes a unified REST/GraphQL API that aggregates data from the chain RPC, indexer DB, and metadata service.",
      "The etrenzik-monitor tracks node health, block production, and service uptime — exposing Prometheus metrics.",
    ],
  },
  {
    num: 9,
    title: "AI & Intelligence",
    subtitle: "Layer 5 — AI Orchestration",
    color: "from-lime-500 to-yellow-600",
    items: [
      "60+ specialized AI agents organized in a 3-tier hierarchy (Orchestrator → Domain → Task) analyze chain activity in real time.",
      "9 MCP (Model Context Protocol) servers expose chain data, contract state, and analytics as tool-callable context for LLMs.",
      "The RAG pipeline (10 Rust crates) indexes documentation, contract ABIs, and historical data for semantic retrieval.",
      "Agents can autonomously trigger on-chain actions via the x402 payment protocol — paying gas fees from their own wallets.",
      "Use cases: automated compliance monitoring, market-making strategies, governance analysis, anomaly detection, developer assistance.",
    ],
  },
  {
    num: 10,
    title: "User Interface",
    subtitle: "Full Circle",
    color: "from-yellow-500 to-orange-600",
    items: [
      "Frontend applications query the etrenzik-gateway API to display the results of the user's original action.",
      "The Explorer shows the transaction hash, block height, gas used, event logs, and state changes.",
      "Real-time WebSocket subscriptions push updates to the UI as soon as the next block is committed.",
      "The entire flow — from user action to visible result — completes in a single ~6-second block cycle.",
    ],
  },
];

export default function FlowTreePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Flow Tree
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            A step-by-step walkthrough of how a single action travels through
            every layer of the Etrenzik blockchain — from button click to
            finalized state.
          </p>
        </div>
      </section>

      {/* Full-Stack Diagram */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            End-to-End Transaction Flow
          </h2>
          <div className="bg-surface-2 rounded-xl p-8 border border-border overflow-x-auto">
            <pre className="code-block text-sm leading-relaxed">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER ACTION                                      │
│   CLI / SDK / Frontend  →  Sign Tx  →  Broadcast to Validator RPC          │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          MEMPOOL & GOSSIP                                   │
│   Signature check  →  Sequence check  →  Gossip to all validators          │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CONSENSUS  (CometBFT — BFT 2-Phase)                     │
│   Propose Block  →  Prevote  →  Precommit  →  Commit  (>⅔ stake)          │
│                         INSTANT FINALITY (~6s)                              │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   ABCI EXECUTION  (Cosmos SDK Application)                  │
│   BeginBlock → AnteHandler → DeliverTx → EndBlock → Commit                 │
│   Route to:  x/bank  x/namespace  x/stablecoin  ──or──  CosmWasm VM       │
└────────────┬───────────────────────────────────────────────┬────────────────┘
             │                                               │
             ▼                                               ▼
┌────────────────────────┐              ┌────────────────────────────────────┐
│   NATIVE MODULE        │              │   COSMWASM VM                      │
│   x/namespace keeper   │              │   instantiate / execute / query    │
│   x/stablecoin keeper  │              │   Sub-messages (cross-contract)    │
│   x/bank, x/staking    │              │   Sandboxed WASM + metered gas    │
└────────────┬───────────┘              └──────────────────┬─────────────────┘
             │                                             │
             └──────────────────┬──────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    STATE COMMIT  (IAVL+ Merkle Tree)                        │
│   Write k/v store  →  Compute new App Hash  →  Include in next block       │
│   Light-client Merkle proofs available for any state path                   │
└──────────────────────────────────┬──────────────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EVENT EMISSION & STREAMING                               │
│   Structured events  →  CometBFT index  →  etrenzik-event-streamer → NATS │
└────────────┬──────────────────────────────────────────────┬─────────────────┘
             │                                              │
             ▼                                              ▼
┌────────────────────────────┐     ┌─────────────────────────────────────────┐
│   INDEXER & SERVICES       │     │   AI & INTELLIGENCE LAYER               │
│   PostgreSQL (indexer)     │     │   60+ AI Agents (3-tier hierarchy)      │
│   Namespace cache          │     │   9 MCP Servers (tool-callable data)    │
│   NFT metadata (IPFS)      │     │   RAG Pipeline (semantic retrieval)     │
│   Axum gateway (REST/GQL)  │     │   x402 autonomous payments             │
│   Prometheus monitor       │     │   Compliance · Analytics · Anomalies   │
└────────────┬───────────────┘     └──────────────────┬──────────────────────┘
             │                                        │
             └───────────────────┬────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                                      │
│   Explorer · Frontend · CLI  ←  Gateway API  ←  WebSocket subscriptions    │
│                    Full cycle completes in ~6 seconds                        │
└─────────────────────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Detailed Phases */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Phase-by-Phase Breakdown
          </h2>
          <p className="text-muted text-center mb-12 max-w-2xl mx-auto">
            Each phase below explains exactly what happens at that stage, what
            components are involved, and how data moves to the next phase.
          </p>

          <div className="space-y-6">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="rounded-xl border border-border bg-surface overflow-hidden"
              >
                {/* Phase Header */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-border">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${phase.color} text-lg font-bold text-white`}
                  >
                    {phase.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{phase.title}</h3>
                    <p className="text-sm text-muted">{phase.subtitle}</p>
                  </div>
                </div>

                {/* Phase Details */}
                <div className="px-6 py-5">
                  <ul className="space-y-3">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-medium text-accent-light">
                          {String.fromCharCode(97 + i)}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concrete Example */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-6">
            Concrete Example: Minting an NFT
          </h2>
          <p className="text-muted mb-8">
            Here is the exact path a &quot;Mint NFT&quot; action takes through
            the flow tree, with the specific contracts and modules involved at
            each step.
          </p>

          <div className="space-y-4">
            {[
              {
                step: "1. User Action",
                detail:
                  "User calls `etz tx wasm execute <cw-nft-factory> '{\"mint\":{\"collection_id\":\"art-001\",\"token_uri\":\"ipfs://Qm...\"}}'` with gas fees attached.",
              },
              {
                step: "2. Broadcast",
                detail:
                  "Transaction is signed, serialized as Protobuf, and sent to the validator RPC. The mempool verifies the signature and sequence number.",
              },
              {
                step: "3. Consensus",
                detail:
                  "The next block proposer includes the tx. Validators vote through Prevote → Precommit. Block is committed with instant finality.",
              },
              {
                step: "4. ABCI Routing",
                detail:
                  "AnteHandler deducts gas. The MsgExecuteContract is routed to the CosmWasm module. The wasm VM loads the cw-nft-factory contract bytecode.",
              },
              {
                step: "5. Contract Execution",
                detail:
                  "cw-nft-factory::execute() validates the caller, checks supply limits, then sends a sub-message to cw-nft-base::execute(Mint{...}).",
              },
              {
                step: "6. Cross-Contract Call",
                detail:
                  "cw-nft-base stores the new token in its TOKENS map (token_id → owner, token_uri, attributes). Emits wasm events: action=mint, token_id=42.",
              },
              {
                step: "7. State Commit",
                detail:
                  "Both contracts' storage changes are committed to the IAVL tree. The new app hash includes the minted NFT state.",
              },
              {
                step: "8. Events & Indexing",
                detail:
                  "Events are streamed via NATS. The indexer writes a new row to the nft_tokens table. The metadata service pins the IPFS CID.",
              },
              {
                step: "9. UI Update",
                detail:
                  "The frontend receives a WebSocket push. The new NFT appears in the user's collection within the same ~6-second block cycle.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="flex gap-4 rounded-lg bg-surface-2 p-5 border border-border"
              >
                <div className="shrink-0">
                  <span className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-light whitespace-nowrap">
                    {s.step}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Design Decisions */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-8">
            Key Design Decisions
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl bg-surface p-6 border border-border">
              <h3 className="font-semibold text-accent-light mb-2">
                Instant Finality
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Unlike Ethereum&apos;s probabilistic finality (12+ confirmations),
                Etrenzik blocks are final the moment they are committed. No
                reorganizations, no waiting. This is critical for financial
                applications like stablecoin minting and RWA transfers.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-6 border border-border">
              <h3 className="font-semibold text-accent-light mb-2">
                Atomic Cross-Contract Calls
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                CosmWasm sub-messages provide atomicity across multiple contract
                invocations. If any step in a chain of calls fails, everything
                rolls back. This prevents partial state updates that plague
                Ethereum&apos;s delegate-call pattern.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-6 border border-border">
              <h3 className="font-semibold text-accent-light mb-2">
                Event-Driven Architecture
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Off-chain services never poll the chain. The event streamer
                pushes structured events via NATS in real time. This
                decouples on-chain logic from off-chain infrastructure and
                enables horizontal scaling of indexers and services.
              </p>
            </div>
            <div className="rounded-xl bg-surface p-6 border border-border">
              <h3 className="font-semibold text-accent-light mb-2">
                Sandboxed Execution
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Each CosmWasm contract runs in its own Wasm sandbox with
                metered gas. Contracts cannot access the filesystem, network,
                or other contracts&apos; storage directly — only through
                well-defined query and sub-message APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">Explore the Layers</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Dive deeper into each layer of the architecture.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/learn/architecture"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Architecture Deep Dive
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
