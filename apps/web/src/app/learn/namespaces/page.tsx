import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Namespaces — Etrenzik L1",
};

export default function NamespacesPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Human-Readable Namespaces
          </h1>
          <p className="text-xl text-muted max-w-2xl">
            Register &lsquo;alice.etz&rsquo; and resolve it anywhere on-chain
          </p>
        </div>
      </section>

      {/* What Are Namespaces */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">What Are Namespaces?</h2>
          <p className="text-muted mb-4 max-w-3xl">
            Namespaces are DNS-style names for blockchain addresses. Instead of
            sharing <code className="text-accent-light">etz1q2w3e4r5t6y7u8i9...</code>,
            you register <strong className="text-foreground">alice.etz</strong>{" "}
            and anyone can send tokens, query balances, or reference your
            identity by name.
          </p>
          <p className="text-muted max-w-3xl">
            Unlike many naming systems, Etrenzik namespaces are built as a{" "}
            <strong className="text-foreground">native Cosmos SDK module</strong>{" "}
            (<code className="text-accent-light">x/namespace</code>), not a
            smart contract. This means namespace resolution is available at the
            consensus layer with zero contract-call overhead.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Registration */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Registration</h3>
              <p className="text-muted mb-3">
                Claim a namespace by submitting a registration transaction.
              </p>
              <pre className="code-block">
{`etrenzikd tx namespace register alice \\
  --from wallet \\
  --fees 100uetz`}
              </pre>
            </div>

            {/* Resolution */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Resolution</h3>
              <p className="text-muted mb-3">
                Resolve a name to its underlying address.
              </p>
              <pre className="code-block">
{`etrenzikd query namespace resolve alice

# Returns:
# address: etz1q2w3e4r5t6y7u8i9o0p...
# owner: etz1q2w3e4r5t6y7u8i9o0p...
# expires: 2027-04-14T00:00:00Z`}
              </pre>
            </div>

            {/* Transfer */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Transfer</h3>
              <p className="text-muted mb-3">
                Transfer ownership of a namespace to another address.
              </p>
              <pre className="code-block">
{`etrenzikd tx namespace transfer alice \\
  --to etz1newowner... \\
  --from wallet`}
              </pre>
            </div>

            {/* Metadata */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Metadata</h3>
              <p className="text-muted mb-3">
                Attach JSON metadata — avatar, bio, links — to any namespace.
              </p>
              <pre className="code-block">
{`etrenzikd tx namespace set-metadata alice \\
  --metadata '{
    "avatar": "ipfs://Qm...",
    "bio": "Builder on Etrenzik",
    "links": {
      "github": "https://github.com/alice",
      "twitter": "@alice"
    }
  }' \\
  --from wallet`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Architecture</h2>
          <p className="text-muted mb-6">
            Namespace resolution is a first-class operation at the chain level.
          </p>

          <div className="gradient-border rounded-lg p-8 bg-surface">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
              <div className="bg-surface-2 rounded-lg px-6 py-4 min-w-[140px]">
                <p className="text-accent-light font-semibold">User</p>
                <p className="text-xs text-muted mt-1">
                  Sends tx or query
                </p>
              </div>
              <div className="text-muted text-2xl hidden md:block">→</div>
              <div className="text-muted text-2xl md:hidden">↓</div>
              <div className="bg-surface-2 rounded-lg px-6 py-4 min-w-[140px]">
                <p className="text-accent-light font-semibold">
                  x/namespace Module
                </p>
                <p className="text-xs text-muted mt-1">
                  Keeper validates &amp; routes
                </p>
              </div>
              <div className="text-muted text-2xl hidden md:block">→</div>
              <div className="text-muted text-2xl md:hidden">↓</div>
              <div className="bg-surface-2 rounded-lg px-6 py-4 min-w-[140px]">
                <p className="text-accent-light font-semibold">KVStore</p>
                <p className="text-xs text-muted mt-1">
                  name → address mapping
                </p>
              </div>
              <div className="text-muted text-2xl hidden md:block">→</div>
              <div className="text-muted text-2xl md:hidden">↓</div>
              <div className="bg-surface-2 rounded-lg px-6 py-4 min-w-[140px]">
                <p className="text-accent-light font-semibold">Resolution</p>
                <p className="text-xs text-muted mt-1">
                  Returns resolved address
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Namespace Marketplace Contract */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Namespace Marketplace Contract
          </h2>
          <p className="text-muted mb-8 max-w-3xl">
            The <strong className="text-foreground">cw-namespace-marketplace</strong>{" "}
            contract adds secondary-market trading on top of the native module —
            list namespaces for sale, buy at a fixed price, or participate in
            auctions.
          </p>

          <h3 className="text-xl font-semibold mb-3">Listing a Namespace</h3>
          <pre className="code-block mb-8">
{`#[cw_serde]
pub enum ExecuteMsg {
    /// List a namespace for sale at a fixed price
    ListNamespace {
        name: String,
        price: Coin,
        expiry: Option<Timestamp>,
    },
    /// Buy a listed namespace
    BuyNamespace {
        name: String,
    },
    /// Start an auction for a namespace
    StartAuction {
        name: String,
        min_bid: Coin,
        duration_seconds: u64,
    },
    /// Place a bid on an active auction
    PlaceBid {
        name: String,
    },
    /// Finalize auction after duration ends
    FinalizeAuction {
        name: String,
    },
}

pub fn execute_list_namespace(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    name: String,
    price: Coin,
    expiry: Option<Timestamp>,
) -> Result<Response, ContractError> {
    // Verify the sender owns this namespace
    let namespace = deps.querier.query_wasm_smart::<NamespaceResponse>(
        &config.namespace_module,
        &NamespaceQuery::Resolve { name: name.clone() },
    )?;
    if namespace.owner != info.sender {
        return Err(ContractError::Unauthorized {});
    }

    let listing = Listing {
        seller: info.sender.clone(),
        price,
        expiry: expiry.unwrap_or(env.block.time.plus_seconds(604_800)), // 7 days
    };
    LISTINGS.save(deps.storage, &name, &listing)?;

    Ok(Response::new()
        .add_attribute("action", "list_namespace")
        .add_attribute("name", &name)
        .add_attribute("price", listing.price.to_string()))
}`}
          </pre>

          <h3 className="text-xl font-semibold mb-3">Buying a Namespace</h3>
          <pre className="code-block">
{`pub fn execute_buy_namespace(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    name: String,
) -> Result<Response, ContractError> {
    let listing = LISTINGS.load(deps.storage, &name)?;

    // Check listing hasn't expired
    if env.block.time > listing.expiry {
        return Err(ContractError::ListingExpired {});
    }

    // Verify payment
    check_funds(&info.funds, &listing.price)?;

    // Transfer namespace to buyer
    let transfer_msg = WasmMsg::Execute {
        contract_addr: config.namespace_module.to_string(),
        msg: to_json_binary(&NamespaceExecute::Transfer {
            name: name.clone(),
            to: info.sender.to_string(),
        })?,
        funds: vec![],
    };

    // Send payment to seller
    let payment_msg = BankMsg::Send {
        to_address: listing.seller.to_string(),
        amount: vec![listing.price],
    };

    LISTINGS.remove(deps.storage, &name);

    Ok(Response::new()
        .add_message(transfer_msg)
        .add_message(payment_msg)
        .add_attribute("action", "buy_namespace")
        .add_attribute("name", &name)
        .add_attribute("buyer", info.sender))
}`}
          </pre>
        </div>
      </section>

      {/* Integration Points */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Integration Points</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                Contract Resolution
              </h3>
              <p className="text-muted text-sm">
                All Etrenzik contracts can resolve namespaces instead of raw
                addresses. Send tokens to{" "}
                <code className="text-accent-light">alice.etz</code> directly in
                any ExecuteMsg.
              </p>
            </div>
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                Off-chain Cache
              </h3>
              <p className="text-muted text-sm">
                The <strong className="text-foreground">etrenzik-namespace-registry</strong>{" "}
                service caches namespace mappings off-chain for fast lookups,
                syncing with on-chain state via event subscriptions.
              </p>
            </div>
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-2">
                Future: DNS Integration
              </h3>
              <p className="text-muted text-sm">
                DNS TXT records will point to on-chain namespaces, enabling
                resolution from traditional DNS infrastructure into the Etrenzik
                namespace system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Namespace Rules */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Namespace Rules</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-border text-sm">
              <thead className="bg-surface-2">
                <tr>
                  <th className="text-left p-3 border-b border-border">Rule</th>
                  <th className="text-left p-3 border-b border-border">Value</th>
                  <th className="text-left p-3 border-b border-border">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Minimum length", "3 characters", "bob"],
                  ["Maximum length", "32 characters", "my-very-long-namespace-name"],
                  ["Allowed characters", "Alphanumeric + hyphens", "alice-dev"],
                  ["Leading/trailing hyphens", "Not allowed", "-alice- ✗"],
                  ["Suffix", "Auto-appended .etz", "alice → alice.etz"],
                  ["Case", "Lowercase only", "Alice → alice"],
                ].map(([rule, value, example]) => (
                  <tr key={rule} className="border-b border-border">
                    <td className="p-3 font-medium">{rule}</td>
                    <td className="p-3 text-accent-light">{value}</td>
                    <td className="p-3 text-muted">
                      <code>{example}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <Link
            href="/learn/smart-contracts"
            className="text-accent-light hover:underline"
          >
            ← Smart Contracts
          </Link>
          <Link
            href="/learn/nfts-tokens"
            className="text-accent-light hover:underline"
          >
            NFTs &amp; Tokens →
          </Link>
        </div>
      </section>
    </main>
  );
}
