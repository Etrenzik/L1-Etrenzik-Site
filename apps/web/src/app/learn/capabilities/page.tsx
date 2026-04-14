import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What You Can Build — Etrenzik L1",
  description:
    "A complete bracket of everything you can create on the Etrenzik blockchain — NFTs, tokenized assets, stablecoins, DeFi, AI agents, identity, and more.",
};

const categories = [
  {
    bracket: "A",
    title: "NFTs & Digital Collectibles",
    color: "from-purple-500 to-indigo-600",
    icon: "🖼️",
    contracts: ["cw-nft-factory", "cw-nft-base", "cw-nft-marketplace"],
    items: [
      {
        name: "Art & Media Collections",
        desc: "Create limited-edition digital art collections with configurable supply caps, royalty splits, and on-chain rarity attributes.",
      },
      {
        name: "Generative / PFP Collections",
        desc: "Deploy layered generative NFTs with on-chain trait systems. Each trait stored as an Attribute struct for programmatic composability.",
      },
      {
        name: "Music & Audio NFTs",
        desc: "Tokenize music tracks or albums. Attach audio files via IPFS URIs with metadata describing artist, duration, and licensing terms.",
      },
      {
        name: "Gaming Assets",
        desc: "In-game items, characters, and land parcels as CW721 NFTs. Cross-game interoperability through standardized attribute schemas.",
      },
      {
        name: "NFT Marketplace",
        desc: "Fixed-price listings and timed auctions with enforced royalty payments on every secondary sale. Built into cw-nft-marketplace.",
      },
      {
        name: "Soulbound Tokens (SBTs)",
        desc: "Non-transferable identity tokens for credentials, certifications, and reputation — mint with transfer restrictions enabled.",
      },
    ],
  },
  {
    bracket: "B",
    title: "Real-World Asset Tokenization",
    color: "from-indigo-500 to-blue-600",
    icon: "🏢",
    contracts: ["cw-tokenization-engine", "cw-compliance-hooks", "cw-cap-table"],
    items: [
      {
        name: "Real Estate",
        desc: "Tokenize property deeds and REIT shares. Fractional ownership with automatic dividend distribution and regulatory compliance.",
      },
      {
        name: "Securities & Equity",
        desc: "Issue equity tokens with cap table management, shareholder voting rights, stock splits, and buyback mechanics — all on-chain.",
      },
      {
        name: "Debt Instruments",
        desc: "Tokenize bonds, promissory notes, and loan agreements with automated interest payments and maturity enforcement.",
      },
      {
        name: "Commodities",
        desc: "Gold, oil, agricultural products, and carbon credits represented as fungible tokens backed by physical reserves.",
      },
      {
        name: "Intellectual Property",
        desc: "Patents, trademarks, and licensing agreements tokenized with programmable royalty streams and usage tracking.",
      },
      {
        name: "Revenue-Share Tokens",
        desc: "Tokens that entitle holders to a percentage of business revenue, with automated pro-rata distribution via smart contracts.",
      },
    ],
  },
  {
    bracket: "C",
    title: "Fungible Tokens & Stablecoins",
    color: "from-blue-500 to-cyan-600",
    icon: "💰",
    contracts: ["cw-token-factory", "cw-stablecoin-controller", "cw-stablecoin-vault"],
    items: [
      {
        name: "Custom Tokens",
        desc: "Launch fungible tokens that integrate with x/bank as first-class denominations. No wrapper contracts needed.",
      },
      {
        name: "Collateral-Backed Stablecoins",
        desc: "Mint stablecoins backed by deposited collateral with 150% minimum ratio, automatic liquidation, and continuous peg monitoring.",
      },
      {
        name: "Loyalty & Reward Points",
        desc: "Issue brand-specific reward tokens with configurable minting rules, expiration dates, and redemption mechanics.",
      },
      {
        name: "Governance Tokens",
        desc: "Tokens with built-in voting power for on-chain governance proposals, weighted by balance and staking duration.",
      },
      {
        name: "Wrapped Assets",
        desc: "Wrap external chain assets (via IBC bridge adapter) into Etrenzik-native tokens with 1:1 peg guarantees.",
      },
      {
        name: "Utility Tokens",
        desc: "Access-gated tokens for platform features — pay for compute, storage, API calls, or premium service tiers.",
      },
    ],
  },
  {
    bracket: "D",
    title: "Identity & Naming",
    color: "from-cyan-500 to-teal-600",
    icon: "🏷️",
    contracts: ["cw-namespace-marketplace"],
    items: [
      {
        name: "Human-Readable Names",
        desc: "Register names like \"alice.etz\" that resolve to wallet addresses, eliminating the need to share raw bech32 strings.",
      },
      {
        name: "Namespace Marketplace",
        desc: "Buy, sell, and auction premium namespace registrations. Transfer ownership seamlessly with on-chain escrow.",
      },
      {
        name: "Profile Metadata",
        desc: "Attach arbitrary metadata (avatar, bio, social links, public keys) to namespace registrations for on-chain identity profiles.",
      },
      {
        name: "Sub-Namespaces",
        desc: "Create hierarchical naming: \"payments.company.etz\", \"nfts.company.etz\" for organizational structures.",
      },
      {
        name: "Decentralized Identifiers (DIDs)",
        desc: "Build W3C-compatible DID documents anchored to namespace registrations for self-sovereign identity.",
      },
    ],
  },
  {
    bracket: "E",
    title: "DeFi & Financial Primitives",
    color: "from-teal-500 to-emerald-600",
    icon: "📊",
    contracts: ["cw-token-factory", "cw-stablecoin-controller", "cw-bridge-adapter"],
    items: [
      {
        name: "Decentralized Exchanges (DEX)",
        desc: "Build AMM pools or order-book exchanges using the token factory and cross-contract composability.",
      },
      {
        name: "Lending & Borrowing",
        desc: "Collateralized lending protocols using the stablecoin vault pattern with variable interest rates and liquidation auctions.",
      },
      {
        name: "Yield Aggregators",
        desc: "Automated strategies that compound staking rewards, liquidity provision returns, and governance incentives.",
      },
      {
        name: "Prediction Markets",
        desc: "Binary outcome markets with on-chain settlement. Tokens represent shares in outcomes resolved by oracle or governance vote.",
      },
      {
        name: "Insurance Protocols",
        desc: "Parametric insurance where claims are triggered by on-chain data (oracle-fed) and payouts execute automatically.",
      },
      {
        name: "Cross-Chain Bridges",
        desc: "IBC-native cross-chain transfers and the cw-bridge-adapter for bridging assets to/from external ecosystems.",
      },
    ],
  },
  {
    bracket: "F",
    title: "AI & Autonomous Systems",
    color: "from-emerald-500 to-green-600",
    icon: "🤖",
    contracts: [],
    items: [
      {
        name: "AI Agent Deployment",
        desc: "Deploy specialized AI agents across 18 domains (legal, finance, compliance, analytics, dev) with hierarchical orchestration.",
      },
      {
        name: "MCP Tool Servers",
        desc: "Build Model Context Protocol servers that expose your contract data as tool-callable context for any LLM integration.",
      },
      {
        name: "RAG Pipelines",
        desc: "Semantic search over documentation, contract ABIs, and chain history using the 10-crate RAG pipeline and vector embeddings.",
      },
      {
        name: "Autonomous Trading Bots",
        desc: "AI agents that analyze market data and autonomously execute trades, paying gas via the x402 payment protocol.",
      },
      {
        name: "Compliance Monitoring",
        desc: "Real-time AI-driven surveillance of on-chain activity for KYC/AML compliance, suspicious patterns, and regulatory reporting.",
      },
      {
        name: "Developer Assistants",
        desc: "AI agents that help developers write, test, and deploy smart contracts by querying the chain's documentation and ABIs.",
      },
    ],
  },
  {
    bracket: "G",
    title: "Governance & DAOs",
    color: "from-green-500 to-lime-600",
    icon: "🏛️",
    contracts: ["cw-governance-extended"],
    items: [
      {
        name: "On-Chain Proposals",
        desc: "Submit and vote on governance proposals with configurable quorum, threshold, and voting period parameters.",
      },
      {
        name: "DAO Treasuries",
        desc: "Multi-sig controlled treasuries with proposal-gated spending. Fund development, grants, and community initiatives.",
      },
      {
        name: "Delegated Voting",
        desc: "Delegate voting power to representatives while retaining token ownership. Override delegates on specific proposals.",
      },
      {
        name: "Parameter Changes",
        desc: "Modify chain parameters (gas prices, staking ratios, module configs) through on-chain governance without hard forks.",
      },
      {
        name: "Grants & Bounties",
        desc: "DAO-funded bounty programs with milestone-based payouts, reviewer committees, and automated escrow release.",
      },
    ],
  },
];

const shortlist = [
  { category: "NFTs", examples: "Art, PFPs, Music, Gaming, SBTs" },
  { category: "Tokenized Assets", examples: "Real Estate, Securities, Commodities, IP, Debt" },
  { category: "Tokens", examples: "Custom, Stablecoins, Loyalty, Governance, Utility" },
  { category: "Identity", examples: "Namespaces, DIDs, Profiles, Sub-Names" },
  { category: "DeFi", examples: "DEX, Lending, Yield, Prediction Markets, Insurance" },
  { category: "AI", examples: "Agents, MCP Servers, RAG, Trading Bots, Compliance" },
  { category: "Governance", examples: "Proposals, DAOs, Treasuries, Grants, Voting" },
];

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            What You Can Build
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            A complete bracket of everything you can create on the Etrenzik
            blockchain — from NFTs and tokenized real-world assets to
            autonomous AI agents and on-chain governance.
          </p>
        </div>
      </section>

      {/* Quick Reference Shortlist */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Quick Reference
          </h2>
          <p className="text-muted text-center mb-8">
            7 brackets, 40+ buildable primitives
          </p>

          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="px-5 py-3 text-left font-semibold">Bracket</th>
                  <th className="px-5 py-3 text-left font-semibold">Category</th>
                  <th className="px-5 py-3 text-left font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody>
                {shortlist.map((row, i) => (
                  <tr
                    key={row.category}
                    className={`border-b border-border last:border-0 ${
                      i % 2 === 0 ? "bg-surface/30" : "bg-surface-2/30"
                    }`}
                  >
                    <td className="px-5 py-3 font-mono font-bold text-accent-light">
                      {String.fromCharCode(65 + i)}
                    </td>
                    <td className="px-5 py-3 font-medium">{row.category}</td>
                    <td className="px-5 py-3 text-muted">{row.examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Full Bracket System */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Full Bracket Breakdown
          </h2>

          <div className="space-y-12">
            {categories.map((cat) => (
              <div key={cat.bracket} id={`bracket-${cat.bracket.toLowerCase()}`}>
                {/* Bracket Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-2xl font-bold text-white`}
                  >
                    {cat.bracket}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <span>{cat.icon}</span> {cat.title}
                    </h3>
                    {cat.contracts.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {cat.contracts.map((c) => (
                          <span
                            key={c}
                            className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-mono text-muted"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl bg-surface p-5 border border-border hover:bg-surface-2 transition-colors"
                    >
                      <h4 className="font-semibold text-foreground mb-2">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Brackets Connect */}
      <section className="py-20 bg-surface">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How Brackets Connect
          </h2>
          <p className="text-muted text-center mb-10 max-w-2xl mx-auto">
            Etrenzik&apos;s primitives are composable — combine capabilities
            from multiple brackets to build complex applications.
          </p>

          <div className="space-y-4">
            {[
              {
                combo: "A + B + D",
                title: "Tokenized Real Estate Marketplace",
                desc: "Fractional property ownership (B) represented as NFTs (A) with namespace-based identity verification (D). Compliance hooks enforce accredited-investor restrictions.",
              },
              {
                combo: "C + E + G",
                title: "DAO-Governed DeFi Protocol",
                desc: "Custom governance token (C) controls protocol parameters via on-chain proposals (G). The protocol runs a lending pool (E) with community-set interest rates.",
              },
              {
                combo: "A + F + C",
                title: "AI-Curated NFT Gallery",
                desc: "AI agents (F) analyze market trends and curate NFT collections (A). Users pay for premium curation with utility tokens (C).",
              },
              {
                combo: "B + D + F",
                title: "Automated Compliance Platform",
                desc: "Tokenized securities (B) with DID-verified investors (D) monitored by AI compliance agents (F) for real-time regulatory auditing.",
              },
              {
                combo: "E + C + G",
                title: "Community-Owned Insurance",
                desc: "DAO treasury (G) funds an insurance pool (E) denominated in stablecoins (C). Claims are resolved by governance vote.",
              },
            ].map((ex) => (
              <div
                key={ex.title}
                className="rounded-xl bg-surface-2 p-6 border border-border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent-light">
                    {ex.combo}
                  </span>
                  <h4 className="font-semibold">{ex.title}</h4>
                </div>
                <p className="text-sm text-muted leading-relaxed">{ex.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold">Start Building</h2>
          <p className="mt-3 text-muted max-w-lg mx-auto">
            Pick a bracket, explore the contracts, and deploy your first
            application.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/developers"
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-light transition-colors"
            >
              Developer Quick Start
            </Link>
            <Link
              href="/learn/ecosystem"
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold hover:bg-surface-2 transition-colors"
            >
              What&apos;s Been Built
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
