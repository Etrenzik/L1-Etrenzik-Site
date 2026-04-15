"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const caseLinks = [
  { label: "Overview", href: "/dashboard" },
  { label: "Evidence", href: "/dashboard/evidence" },
  { label: "Timeline", href: "/dashboard/timeline" },
  { label: "Invoices", href: "/dashboard/invoices" },
  { label: "Legal Issues", href: "/dashboard/legal-issues" },
  { label: "Witnesses", href: "/dashboard/witnesses" },
  { label: "Red Flags", href: "/dashboard/red-flags" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-purple-500 text-sm font-bold text-white">
            E
          </span>
          <span className="text-lg font-bold text-foreground">Etrenzik Case Portal</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {caseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {caseLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
