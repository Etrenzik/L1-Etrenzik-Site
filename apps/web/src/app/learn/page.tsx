import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — Etrenzik L1",
  description:
    "The complete learning path for the Etrenzik blockchain — from consensus layer to AI agents.",
};

const topics = [
  {
    icon: "⛓️",
    title: "Architecture",
    href: "/learn/architecture",
    description:
      "Understand the 5-layer platform architecture from consensus to AI",
  },
  {
    icon: "🔧",
    title: "Cosmos SDK",
    href: "/learn/cosmos-sdk",
    description:
      "How the chain is built with Cosmos SDK v0.50 and custom modules",
  },
  {
    icon: "📜",
    title: "Smart Contracts",
    href: "/learn/smart-contracts",
    description: "Write and deploy CosmWasm contracts in Rust",
  },
  {
    icon: "🏷️",
    title: "Namespaces",
    href: "/learn/namespaces",
    description: "Human-readable naming system built into the chain",
  },
  {
    icon: "🖼️",
    title: "NFTs & Tokens",
    href: "/learn/nfts-tokens",
    description:
      "Create collections, mint NFTs, and build token factories",
  },
  {
    icon: "💰",
    title: "Stablecoins",
    href: "/learn/stablecoins",
    description:
      "Collateral-backed stablecoins and real-world asset tokenization",
  },
  {
    icon: "🤖",
    title: "AI Agents",
    href: "/learn/ai-agents",
    description: "60+ specialized agents with hierarchical orchestration",
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Learn Etrenzik
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            The complete learning path — from the consensus layer and Cosmos SDK
            modules through smart contracts, namespaces, NFTs, stablecoins, and
            the AI intelligence layer.
          </p>
        </div>
      </section>

      {/* Topic Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="gradient-border group rounded-xl bg-surface p-6 transition hover:bg-surface-2"
              >
                <span className="text-4xl">{topic.icon}</span>
                <h2 className="mt-4 text-xl font-semibold text-foreground">
                  {topic.title}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {topic.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent-light group-hover:underline">
                  Start learning →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
