"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const learnLinks = [
  { label: "Architecture", href: "/learn/architecture" },
  { label: "Cosmos SDK", href: "/learn/cosmos-sdk" },
  { label: "Smart Contracts", href: "/learn/smart-contracts" },
  { label: "Namespaces", href: "/learn/namespaces" },
  { label: "NFTs & Tokens", href: "/learn/nfts-tokens" },
  { label: "Stablecoins", href: "/learn/stablecoins" },
  { label: "AI Agents", href: "/learn/ai-agents" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple-500 text-sm font-bold text-white">
            E
          </span>
          <span className="text-lg font-bold text-foreground">Etrenzik</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-muted transition hover:text-foreground">
            Home
          </Link>

          {/* Learn dropdown */}
          <div className="group relative">
            <Link
              href="/learn"
              className="flex items-center gap-1 text-muted transition hover:text-foreground"
            >
              Learn
              <svg
                className="h-4 w-4 transition group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="min-w-[220px] rounded-lg border border-border bg-surface p-2 shadow-xl">
                {learnLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-sm text-muted transition hover:bg-surface-2 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/developers" className="text-muted transition hover:text-foreground">
            Developers
          </Link>
          <Link href="/explorer" className="text-muted transition hover:text-foreground">
            Explorer
          </Link>

          <Link
            href="/developers"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Start Building →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-muted transition hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <div className="flex flex-col gap-1">
              <Link
                href="/learn"
                className="font-medium text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Learn
              </Link>
              {learnLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="pl-4 text-sm text-muted transition hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/developers"
              className="text-muted transition hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Developers
            </Link>
            <Link
              href="/explorer"
              className="text-muted transition hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Explorer
            </Link>

            <Link
              href="/developers"
              className="inline-block rounded-lg bg-accent px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              Start Building →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
