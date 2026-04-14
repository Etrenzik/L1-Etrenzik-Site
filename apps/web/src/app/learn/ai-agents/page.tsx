import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agents — Etrenzik L1",
};

export default function AiAgentsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            AI Agents &amp; Orchestration
          </h1>
          <p className="text-xl text-muted max-w-2xl">
            60+ specialized agents organized in a hierarchical orchestration
            framework
          </p>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Architecture Overview</h2>
          <p className="text-muted mb-8 max-w-3xl">
            A three-tier hierarchy ensures every autonomous action flows through
            proper oversight, routing, and domain-specific expertise.
          </p>

          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Orchestration Hierarchy
            </h4>
            <pre className="code-block text-sm overflow-x-auto">
{`                    ┌─────────────────────────────┐
                    │     Executive Interface      │  ◀── human oversight
                    │  (approval gates · overrides) │
                    └──────────────┬──────────────┘
                                   │
                    ┌──────────────▼──────────────┐
                    │     Master Orchestrator      │  ◀── task routing
                    │  (classifies · dispatches)   │
                    └──────────────┬──────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
┌─────────▼─────────┐  ┌─────────▼─────────┐  ┌─────────▼─────────┐
│ Domain Orchestrator│  │ Domain Orchestrator│  │ Domain Orchestrator│
│   (blockchain)     │  │   (contracts)      │  │   (security) ...   │
└────────┬──────────┘  └────────┬──────────┘  └────────┬──────────┘
         │                      │                      │
    ┌────▼────┐            ┌────▼────┐            ┌────▼────┐
    │ Agents  │            │ Agents  │            │ Agents  │
    └─────────┘            └─────────┘            └─────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Agent Domains */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Agent Domains</h2>
          <p className="text-muted mb-8">
            18 specialized domains, each with its own orchestrator and dedicated
            agents.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "blockchain", agents: 5 },
              { name: "contracts", agents: 4 },
              { name: "namespace", agents: 3 },
              { name: "nft", agents: 3 },
              { name: "stablecoin", agents: 3 },
              { name: "tokenization", agents: 3 },
              { name: "treasury", agents: 3 },
              { name: "governance", agents: 4 },
              { name: "validator", agents: 3 },
              { name: "devops", agents: 4 },
              { name: "security", agents: 4 },
              { name: "compliance", agents: 3 },
              { name: "mcp", agents: 3 },
              { name: "rag", agents: 3 },
              { name: "integrations", agents: 3 },
              { name: "analytics", agents: 3 },
              { name: "communications", agents: 3 },
              { name: "product", agents: 3 },
            ].map((d) => (
              <div
                key={d.name}
                className="bg-surface-2 rounded-lg p-4 border border-border text-center"
              >
                <p className="font-mono text-sm text-accent-light">
                  {d.name}
                </p>
                <p className="text-muted text-xs mt-1">
                  {d.agents} agents
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orchestration System */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Orchestration System</h2>

          <div className="space-y-6">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                etz-executive-interface
              </h3>
              <p className="text-muted text-sm">
                Human-in-the-loop control layer. Provides approval gates for
                high-impact actions, override capabilities for any agent
                decision, and a dashboard for real-time agent activity
                monitoring.
              </p>
            </div>

            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                etz-master-orchestrator
              </h3>
              <p className="text-muted text-sm">
                Central routing layer. Classifies incoming tasks, determines the
                appropriate domain orchestrator, and manages cross-domain
                coordination when a task spans multiple domains.
              </p>
            </div>

            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                20 Domain Orchestrators
              </h3>
              <p className="text-muted text-sm">
                Each domain has a dedicated orchestrator (YAML-defined) that
                manages its pool of agents, handles task decomposition within
                the domain, and reports status back to the master orchestrator.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-accent-light mb-2">
                  etz-workflow-engine
                </h3>
                <p className="text-muted text-sm">
                  Multi-step workflow state machines with branching, parallel
                  execution, retry policies, and compensating actions for
                  rollback.
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="text-lg font-semibold text-accent-light mb-2">
                  etz-policy-engine
                </h3>
                <p className="text-muted text-sm">
                  RBAC and ABAC authorization. Defines which agents can perform
                  which actions, approval requirements for sensitive operations,
                  and rate limiting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Infrastructure Crates */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            AI Infrastructure Crates
          </h2>
          <p className="text-muted mb-8">
            8 Rust crates in the <code className="text-accent-light">ai/</code>{" "}
            workspace provide the core runtime for agent orchestration.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "etz-orchestrator-core",
                desc: "Shared traits, message types, and orchestration primitives.",
              },
              {
                name: "etz-agent-runtime",
                desc: "Agent lifecycle management, sandbox execution, health checks.",
              },
              {
                name: "etz-master-orchestrator",
                desc: "Top-level task classification and domain routing logic.",
              },
              {
                name: "etz-executive-interface",
                desc: "Human approval gates, override API, activity dashboard.",
              },
              {
                name: "etz-workflow-engine",
                desc: "State machines, branching, retry, compensating actions.",
              },
              {
                name: "etz-policy-engine",
                desc: "RBAC/ABAC rules, approval matrices, rate limiting.",
              },
              {
                name: "etz-memory-service",
                desc: "Long-term agent memory, context persistence, retrieval.",
              },
              {
                name: "etz-confidence-scorer",
                desc: "Scores agent output confidence to trigger human review.",
              },
            ].map((c) => (
              <div
                key={c.name}
                className="bg-surface-2 rounded-lg p-4 border border-border"
              >
                <p className="font-mono text-sm text-accent-light mb-1">
                  {c.name}
                </p>
                <p className="text-muted text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MCP */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            MCP — Model Context Protocol
          </h2>
          <p className="text-muted mb-6 max-w-3xl">
            9 MCP tool servers expose blockchain operations to AI models via
            JSON-RPC 2.0. Each server registers its tools with the MCP router,
            which handles session management and request dispatch.
          </p>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3 mb-8">
            {[
              "chain",
              "contract",
              "namespace",
              "nft",
              "token",
              "governance",
              "analytics",
              "devops",
              "rag",
            ].map((s) => (
              <div
                key={s}
                className="bg-surface rounded-lg p-3 border border-border text-center"
              >
                <p className="font-mono text-xs text-accent-light">{s}</p>
              </div>
            ))}
          </div>

          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              MCP Request Flow
            </h4>
            <pre className="code-block text-sm overflow-x-auto">
{`AI Model  ──▶  JSON-RPC 2.0 request
                    │
             ┌──────▼──────┐
             │  MCP Router  │  (session mgmt · auth · rate limit)
             └──────┬──────┘
                    │
       ┌────────────┼────────────┐
       ▼            ▼            ▼
  chain-server  nft-server  governance-server  ...
       │            │            │
       ▼            ▼            ▼
   Etrenzik blockchain (via gRPC / LCD)`}
            </pre>
          </div>
        </div>
      </section>

      {/* RAG Pipeline */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">RAG Pipeline</h2>
          <p className="text-muted mb-6 max-w-3xl">
            10 Rust crates form a retrieval-augmented generation pipeline that
            gives agents access to documentation, code, and on-chain data.
          </p>

          <div className="bg-surface-2 rounded-xl p-8 border border-border mb-8">
            <pre className="code-block text-sm overflow-x-auto">
{`ingestor → parser → chunker → embedder → vector-store (Qdrant)
                                                │
                                          reranker → retriever → AI Agent
                                                │
                                          graph-store (knowledge graphs)
                                                │
                                          quality-scorer`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "ingestor", desc: "Crawls docs, repos, and chain state" },
              { name: "parser", desc: "Extracts text from Markdown, Rust, Go" },
              { name: "chunker", desc: "Splits content into semantic chunks" },
              { name: "embedder", desc: "Generates vector embeddings" },
              {
                name: "vector-store",
                desc: "Qdrant-backed similarity search",
              },
              { name: "reranker", desc: "Cross-encoder re-scoring" },
              { name: "retriever", desc: "Top-K selection with MMR" },
              {
                name: "graph-store",
                desc: "Knowledge graph for entity relations",
              },
              {
                name: "quality-scorer",
                desc: "Rates retrieval relevance",
              },
              { name: "rag-core", desc: "Shared types and pipeline traits" },
            ].map((c) => (
              <div
                key={c.name}
                className="bg-surface rounded-lg p-4 border border-border"
              >
                <p className="font-mono text-sm text-accent-light mb-1">
                  {c.name}
                </p>
                <p className="text-muted text-xs">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* x402 Payment Protocol */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">x402 Payment Protocol</h2>
          <p className="text-muted mb-6 max-w-3xl">
            AI resource metering and billing built into the chain. Every agent
            invocation, tool call, and model inference is tracked and billed
            through the x402 module.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">
                Entitlement Engine
              </h4>
              <p className="text-muted text-sm">
                Defines rate limits, quotas, and access tiers for AI services.
                Enforced on-chain so agents cannot exceed their budget.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">
                Usage Tracking
              </h4>
              <p className="text-muted text-sm">
                Granular metering of compute, tokens processed, tool calls, and
                storage. All usage events are recorded on-chain.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">
                Service Marketplace
              </h4>
              <p className="text-muted text-sm">
                Third-party AI capabilities can be listed, priced, and consumed
                through the marketplace with automated invoice generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <Link
            href="/learn/stablecoins"
            className="text-accent-light hover:underline"
          >
            ← Stablecoins
          </Link>
          <Link
            href="/developers"
            className="text-accent-light hover:underline"
          >
            Developer Quick Start →
          </Link>
        </div>
      </section>
    </main>
  );
}
