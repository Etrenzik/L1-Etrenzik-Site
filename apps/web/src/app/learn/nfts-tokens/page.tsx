import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NFTs & Tokens — Etrenzik L1",
};

export default function NftsTokensPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-accent">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">NFTs &amp; Token Factory</h1>
          <p className="text-xl text-muted max-w-2xl">
            Create collections, mint NFTs, trade on marketplace, and build
            fungible tokens
          </p>
        </div>
      </section>

      {/* NFT Architecture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">NFT Architecture</h2>
          <p className="text-muted mb-8 max-w-3xl">
            Three CosmWasm contracts work together to provide a full NFT
            lifecycle — from collection creation through minting to marketplace
            trading.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                cw-nft-factory
              </h3>
              <p className="text-muted text-sm">
                Creates and manages NFT collections. Deploys new cw-nft-base
                instances with configurable royalty, supply, and minting rules.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                cw-nft-base
              </h3>
              <p className="text-muted text-sm">
                CW721-compatible individual NFT contract. Each collection is its
                own cw-nft-base instance holding token ownership, metadata URIs,
                and attributes.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                cw-nft-marketplace
              </h3>
              <p className="text-muted text-sm">
                Listing, buying, and auction logic. Enforces royalty payments on
                secondary sales and supports timed bidding.
              </p>
            </div>
          </div>

          {/* Relationship Diagram */}
          <div className="bg-surface-2 rounded-xl p-8 border border-border">
            <h4 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4">
              Contract Relationship
            </h4>
            <pre className="code-block text-sm overflow-x-auto">
{`┌─────────────────┐
│  cw-nft-factory  │───── deploys ────▶ ┌──────────────┐
│  (Collection Mgr)│                     │  cw-nft-base │  (per collection)
└─────────────────┘                     │  (CW721 NFTs)│
                                         └──────┬───────┘
                                                │
                                          approves transfer
                                                │
                                         ┌──────▼──────────────┐
                                         │  cw-nft-marketplace  │
                                         │  (List / Buy / Bid)  │
                                         └──────────────────────┘`}
            </pre>
          </div>
        </div>
      </section>

      {/* Creating a Collection */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Creating a Collection</h2>
          <p className="text-muted mb-4 max-w-3xl">
            Use <code className="text-accent-light">cw-nft-factory</code> to
            create a new NFT collection. The factory deploys a fresh cw-nft-base
            contract instance configured with your parameters.
          </p>

          <div className="bg-surface-2 rounded-xl p-6 border border-border mb-6">
            <h4 className="font-semibold mb-3">Collection Configuration</h4>
            <ul className="list-disc list-inside text-muted space-y-1 text-sm">
              <li>
                <strong className="text-foreground">name</strong> — Display name
                for the collection
              </li>
              <li>
                <strong className="text-foreground">symbol</strong> — Short
                ticker (e.g. ETZF)
              </li>
              <li>
                <strong className="text-foreground">max_supply</strong> — Hard
                cap on total tokens
              </li>
              <li>
                <strong className="text-foreground">royalty_percentage</strong> —
                Creator royalty on secondary sales (basis points)
              </li>
              <li>
                <strong className="text-foreground">minter</strong> — Address
                authorized to mint new tokens
              </li>
            </ul>
          </div>

          <pre className="code-block rounded-xl text-sm overflow-x-auto">
{`#[cw_serde]
pub enum ExecuteMsg {
    CreateCollection {
        name: String,
        symbol: String,
        max_supply: u64,
        royalty_percentage: u16,   // basis points, e.g. 500 = 5 %
        minter: String,
    },
    // ...
}`}
          </pre>
        </div>
      </section>

      {/* Minting NFTs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Minting NFTs</h2>
          <p className="text-muted mb-4 max-w-3xl">
            Mint tokens to the <code className="text-accent-light">cw-nft-base</code>{" "}
            contract for a collection. Each token carries a URI pointing to
            off-chain metadata (typically IPFS via the{" "}
            <code className="text-accent-light">etrenzik-nft-metadata</code>{" "}
            service) and an on-chain attributes/traits system.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-surface rounded-xl p-5 border border-border">
              <h4 className="font-semibold mb-2">Token URI</h4>
              <p className="text-muted text-sm">
                Points to JSON metadata on IPFS. The etrenzik-nft-metadata
                service handles pinning and CID resolution.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-5 border border-border">
              <h4 className="font-semibold mb-2">Attributes &amp; Traits</h4>
              <p className="text-muted text-sm">
                On-chain key/value pairs for rarity, properties, and
                programmatic composability.
              </p>
            </div>
            <div className="bg-surface rounded-xl p-5 border border-border">
              <h4 className="font-semibold mb-2">Minter Authorization</h4>
              <p className="text-muted text-sm">
                Only the address set as minter during collection creation can
                mint new tokens.
              </p>
            </div>
          </div>

          <pre className="code-block rounded-xl text-sm overflow-x-auto">
{`#[cw_serde]
pub enum ExecuteMsg {
    Mint {
        token_id: String,
        owner: String,
        token_uri: Option<String>,       // "ipfs://Qm..."
        attributes: Vec<Attribute>,       // on-chain traits
    },
    // ...
}

#[cw_serde]
pub struct Attribute {
    pub trait_type: String,
    pub value: String,
}`}
          </pre>
        </div>
      </section>

      {/* Marketplace */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Marketplace</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Fixed-Price Listings</h4>
              <p className="text-muted text-sm">
                List an NFT at a set price in uetz. Buyers execute a single
                BuyNft transaction that transfers the token and distributes
                funds (seller + royalty).
              </p>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Auctions &amp; Bidding</h4>
              <p className="text-muted text-sm">
                Time-limited auctions with minimum bid increments. When the
                auction ends the highest bidder receives the NFT automatically.
              </p>
            </div>
            <div className="bg-surface-2 rounded-xl p-6 border border-border md:col-span-2">
              <h4 className="font-semibold mb-2">Royalty Enforcement</h4>
              <p className="text-muted text-sm">
                Every secondary sale routes the configured royalty percentage
                back to the original creator. Enforced at the contract level —
                cannot be bypassed.
              </p>
            </div>
          </div>

          <pre className="code-block rounded-xl text-sm overflow-x-auto">
{`#[cw_serde]
pub enum ExecuteMsg {
    ListNft {
        collection: String,      // cw-nft-base contract address
        token_id: String,
        price: Uint128,          // in uetz
        auction: Option<AuctionConfig>,
    },
    BuyNft {
        listing_id: u64,
    },
    // ...
}

#[cw_serde]
pub struct AuctionConfig {
    pub min_bid: Uint128,
    pub end_time: Timestamp,
}`}
          </pre>
        </div>
      </section>

      {/* Token Factory */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Token Factory</h2>
          <p className="text-muted mb-6 max-w-3xl">
            <code className="text-accent-light">cw-token-factory</code> lets
            anyone create new fungible tokens on Etrenzik. Tokens integrate with
            the chain&apos;s native <code className="text-accent-light">x/bank</code>{" "}
            module so they appear as first-class denominations.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Create &amp; Configure</h4>
              <ul className="text-muted text-sm space-y-1 list-disc list-inside">
                <li>Set total supply and decimal precision</li>
                <li>Admin controls for minting / burning</li>
                <li>Transferable admin role</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <h4 className="font-semibold mb-2">Mint &amp; Burn</h4>
              <ul className="text-muted text-sm space-y-1 list-disc list-inside">
                <li>Admin can mint new supply up to cap</li>
                <li>Burn tokens to reduce circulating supply</li>
                <li>Events emitted for indexers</li>
              </ul>
            </div>
            <div className="bg-surface rounded-xl p-6 border border-border md:col-span-2">
              <h4 className="font-semibold mb-2">
                x/bank Module Integration
              </h4>
              <p className="text-muted text-sm">
                Factory-created tokens register as native denominations via
                Cosmos SDK&apos;s x/bank. This means standard bank sends, IBC
                transfers, and balance queries work out of the box — no CW20
                wrapper needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Commands */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">CLI Commands</h2>

          <pre className="code-block rounded-xl text-sm overflow-x-auto">
{`# Create collection
etz tx wasm execute $FACTORY '{"create_collection":{"name":"Etrenzik Founders","symbol":"ETZF","max_supply":1000}}' --from wallet

# Mint
etz tx wasm execute $NFT_BASE '{"mint":{"token_id":"1","owner":"etz1...","token_uri":"ipfs://..."}}' --from minter

# List on marketplace
etz tx wasm execute $MARKETPLACE '{"list_nft":{"collection":"etz1...","token_id":"1","price":"1000000uetz"}}' --from owner`}
          </pre>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <Link
            href="/learn/namespaces"
            className="text-accent-light hover:underline"
          >
            ← Namespaces
          </Link>
          <Link
            href="/learn/stablecoins"
            className="text-accent-light hover:underline"
          >
            Stablecoins →
          </Link>
        </div>
      </section>
    </main>
  );
}
