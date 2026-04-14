import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers — Etrenzik L1",
};

export default function DevelopersPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Developer Quick Start</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Set up your environment, deploy a contract, and register a namespace
            in under 10 minutes
          </p>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Prerequisites</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">Rust</h3>
              <p className="text-muted text-sm mb-3">Install via rustup</p>
              <pre className="code-block">
                <code>curl --proto &apos;=https&apos; --tlsv1.2 -sSf https://sh.rustup.rs | sh</code>
              </pre>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">Go 1.21+</h3>
              <p className="text-muted text-sm mb-3">Required for chain binary</p>
              <pre className="code-block">
                <code>brew install go{"\n"}# or download from go.dev/dl</code>
              </pre>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">Docker</h3>
              <p className="text-muted text-sm mb-3">For local devnet &amp; optimizer</p>
              <pre className="code-block">
                <code>brew install --cask docker{"\n"}# or docker.com/get-started</code>
              </pre>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">Node.js 20+</h3>
              <p className="text-muted text-sm mb-3">For TypeScript SDK &amp; tooling</p>
              <pre className="code-block">
                <code>nvm install 20{"\n"}nvm use 20</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Install the ETZ CLI */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent text-background text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              1
            </span>
            <h2 className="text-3xl font-bold">Install the ETZ CLI</h2>
          </div>
          <pre className="code-block">
            <code>{`# Install from source
git clone https://github.com/etrenzik/etrenzik-chain
cd etrenzik-chain/tools/etz-cli
cargo install --path .

# Verify
etz --version`}</code>
          </pre>
        </div>
      </section>

      {/* Step 2: Start Local Devnet */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent text-background text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              2
            </span>
            <h2 className="text-3xl font-bold">Start Local Devnet</h2>
          </div>
          <pre className="code-block">
            <code>{`# Using Docker Compose
cd etrenzik-chain
docker compose -f infra/docker-compose.yml up -d

# Or start the chain binary directly
etrenzikd init mynode --chain-id etrenzik-devnet-1
etrenzikd start`}</code>
          </pre>
        </div>
      </section>

      {/* Step 3: Create a Wallet */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent text-background text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              3
            </span>
            <h2 className="text-3xl font-bold">Create a Wallet</h2>
          </div>
          <pre className="code-block">
            <code>{`etz keys add mywallet
# Save the mnemonic!

# Fund from devnet faucet
etz tx bank send faucet $(etz keys show mywallet -a) 10000000uetz --chain-id etrenzik-devnet-1`}</code>
          </pre>
        </div>
      </section>

      {/* Step 4: Deploy Your First Contract */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent text-background text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              4
            </span>
            <h2 className="text-3xl font-bold">Deploy Your First Contract</h2>
          </div>
          <pre className="code-block">
            <code>{`# Scaffold a new contract
cargo generate --git https://github.com/etrenzik/cw-template --name my-contract
cd my-contract

# Build
cargo wasm

# Optimize
docker run --rm -v "$(pwd)":/code cosmwasm/optimizer:0.16.0

# Store & Instantiate
etz tx wasm store artifacts/my_contract.wasm --from mywallet --gas auto
etz tx wasm instantiate $CODE_ID '{}' --from mywallet --label "my-first-contract"`}</code>
          </pre>
        </div>
      </section>

      {/* Step 5: Register a Namespace */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-accent text-background text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
              5
            </span>
            <h2 className="text-3xl font-bold">Register a Namespace</h2>
          </div>
          <pre className="code-block">
            <code>{`etz tx namespace register myname --from mywallet --fees 100uetz
etz query namespace resolve myname`}</code>
          </pre>
        </div>
      </section>

      {/* SDK Libraries */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">SDK Libraries</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-1">Rust SDK</h3>
              <p className="text-muted text-sm mb-4">@etrenzik/sdk-rust</p>
              <pre className="code-block">
                <code>{`# Cargo.toml
[dependencies]
etrenzik-sdk = "0.1"`}</code>
              </pre>
              <pre className="code-block mt-3">
                <code>{`use etrenzik_sdk::Client;

let client = Client::new("http://localhost:26657");
let block = client.get_latest_block().await?;`}</code>
              </pre>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-1">TypeScript SDK</h3>
              <p className="text-muted text-sm mb-4">@etrenzik/sdk-ts</p>
              <pre className="code-block">
                <code>npm install @etrenzik/sdk-ts</code>
              </pre>
              <pre className="code-block mt-3">
                <code>{`import { EtrenzikClient } from "@etrenzik/sdk-ts";

const client = await EtrenzikClient.connect("http://localhost:26657");
const block = await client.getBlock();`}</code>
              </pre>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-1">Python SDK</h3>
              <p className="text-muted text-sm mb-4">etrenzik-sdk-python</p>
              <pre className="code-block">
                <code>pip install etrenzik-sdk</code>
              </pre>
              <pre className="code-block mt-3">
                <code>{`from etrenzik import Client

client = Client("http://localhost:26657")
block = client.get_latest_block()`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">API Reference</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">REST API</h3>
              <p className="text-muted text-sm mb-2">
                etrenzik-gateway on port <span className="text-accent-light font-mono">1317</span>
              </p>
              <p className="text-muted text-sm">
                Full Cosmos SDK REST interface for querying state, broadcasting
                transactions, and interacting with modules.
              </p>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">gRPC</h3>
              <p className="text-muted text-sm mb-2">
                Port <span className="text-accent-light font-mono">9090</span>
              </p>
              <p className="text-muted text-sm">
                High-performance gRPC endpoints for all chain modules. Ideal for
                backend integrations and service-to-service communication.
              </p>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">WebSocket Events</h3>
              <p className="text-muted text-sm mb-2">
                etrenzik-event-streamer
              </p>
              <p className="text-muted text-sm">
                Real-time event streaming for blocks, transactions, and contract
                events via WebSocket subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Useful Resources */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Useful Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/learn/architecture"
              className="bg-surface-2 rounded-xl p-5 border border-border hover:border-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Architecture</h3>
              <p className="text-muted text-sm">
                Understand the Etrenzik chain design
              </p>
            </Link>
            <Link
              href="/learn/smart-contracts"
              className="bg-surface-2 rounded-xl p-5 border border-border hover:border-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Smart Contracts</h3>
              <p className="text-muted text-sm">
                CosmWasm contract development guide
              </p>
            </Link>
            <Link
              href="/learn/namespaces"
              className="bg-surface-2 rounded-xl p-5 border border-border hover:border-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">Namespaces</h3>
              <p className="text-muted text-sm">
                Human-readable identity system
              </p>
            </Link>
            <a
              href="https://github.com/etrenzik/etrenzik-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-2 rounded-xl p-5 border border-border hover:border-accent transition-colors"
            >
              <h3 className="font-semibold mb-1">GitHub</h3>
              <p className="text-muted text-sm">
                Source code &amp; contributions
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
