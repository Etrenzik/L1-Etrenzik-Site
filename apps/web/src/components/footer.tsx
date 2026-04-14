import Link from "next/link";

const columns = [
  {
    title: "Learn",
    links: [
      { label: "Architecture", href: "/learn/architecture" },
      { label: "Cosmos SDK", href: "/learn/cosmos-sdk" },
      { label: "Smart Contracts", href: "/learn/smart-contracts" },
      { label: "Namespaces", href: "/learn/namespaces" },
      { label: "NFTs & Tokens", href: "/learn/nfts-tokens" },
      { label: "Stablecoins", href: "/learn/stablecoins" },
      { label: "AI Agents", href: "/learn/ai-agents" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Developer Quick Start", href: "/developers" },
      { label: "CLI Reference", href: "/developers/cli" },
      { label: "Contract Template", href: "/developers/contract-template" },
      { label: "API Docs", href: "/developers/api" },
    ],
  },
  {
    title: "Network",
    links: [
      { label: "Block Explorer", href: "/explorer" },
      { label: "Validator List", href: "/explorer/validators" },
      { label: "Governance", href: "/explorer/governance" },
      { label: "Staking", href: "/explorer/staking" },
    ],
  },
];

const communityLinks = [
  { label: "GitHub", href: "https://github.com/etrenzik", external: true },
  { label: "Discord", href: "/community/discord" },
  { label: "Twitter / X", href: "/community/twitter" },
  { label: "Blog", href: "/blog" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Community column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Community</h3>
            <ul className="flex flex-col gap-2">
              {communityLinks.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted">
          © 2026 Etrenzik. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
