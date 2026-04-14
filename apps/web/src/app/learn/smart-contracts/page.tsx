import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Contracts — Etrenzik L1",
};

export default function SmartContractsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">CosmWasm Smart Contracts</h1>
          <p className="text-xl text-muted max-w-2xl">
            Write type-safe contracts in Rust, compile to WebAssembly, deploy to
            Etrenzik
          </p>
        </div>
      </section>

      {/* What is CosmWasm */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">What is CosmWasm?</h2>
          <p className="text-muted mb-6 max-w-3xl">
            CosmWasm 2.x is the smart-contract platform powering Etrenzik.
            Contracts are written in Rust, compiled to WebAssembly (Wasm), and
            executed inside a sandboxed VM on every validator node. The runtime
            follows the <strong className="text-foreground">Actor model</strong>
            &nbsp;— each contract is an isolated actor that communicates through
            messages, eliminating reentrancy bugs by design.
          </p>

          <h3 className="text-xl font-semibold mb-4">CosmWasm vs EVM</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-border text-sm">
              <thead className="bg-surface-2">
                <tr>
                  <th className="text-left p-3 border-b border-border">Feature</th>
                  <th className="text-left p-3 border-b border-border">CosmWasm (Etrenzik)</th>
                  <th className="text-left p-3 border-b border-border">EVM (Ethereum)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Language", "Rust", "Solidity / Vyper"],
                  ["Compilation target", "WebAssembly", "EVM bytecode"],
                  ["Execution model", "Actor model (message-passing)", "Synchronous call stack"],
                  ["Reentrancy", "Impossible by design", "Must guard manually"],
                  ["Upgradability", "Native migrate entry point", "Proxy patterns required"],
                  ["Type safety", "Full Rust type system", "Limited"],
                  ["Gas metering", "Wasm instruction metering", "Opcode-based gas"],
                ].map(([feature, cosm, evm]) => (
                  <tr key={feature} className="border-b border-border">
                    <td className="p-3 font-medium">{feature}</td>
                    <td className="p-3 text-accent-light">{cosm}</td>
                    <td className="p-3 text-muted">{evm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contract Lifecycle */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Contract Lifecycle</h2>
          <p className="text-muted mb-8">
            Every CosmWasm contract follows four stages:{" "}
            <strong className="text-foreground">Instantiate → Execute → Query → Migrate</strong>.
          </p>

          {/* Instantiate */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">1. Instantiate</h3>
            <p className="text-muted mb-3">
              Called once when deploying a contract. Sets up initial state.
            </p>
            <pre className="code-block">
{`#[cw_serde]
pub struct InstantiateMsg {
    pub name: String,
    pub admin: Option<String>,
}

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = State {
        name: msg.name,
        admin: msg.admin.unwrap_or(info.sender.to_string()),
    };
    STATE.save(deps.storage, &state)?;
    Ok(Response::new().add_attribute("action", "instantiate"))
}`}
            </pre>
          </div>

          {/* Execute */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">2. Execute</h3>
            <p className="text-muted mb-3">
              Handles state-changing transactions. Pattern-match on the message variant.
            </p>
            <pre className="code-block">
{`#[cw_serde]
pub enum ExecuteMsg {
    UpdateName { name: String },
    TransferOwnership { new_admin: String },
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::UpdateName { name } => execute_update_name(deps, info, name),
        ExecuteMsg::TransferOwnership { new_admin } => {
            execute_transfer_ownership(deps, info, new_admin)
        }
    }
}`}
            </pre>
          </div>

          {/* Query */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">3. Query</h3>
            <p className="text-muted mb-3">
              Read-only. Returns serialized data without modifying state.
            </p>
            <pre className="code-block">
{`#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(StateResponse)]
    GetState {},
    #[returns(AdminResponse)]
    GetAdmin {},
}

#[entry_point]
pub fn query(
    deps: Deps,
    _env: Env,
    msg: QueryMsg,
) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetState {} => to_json_binary(&query_state(deps)?),
        QueryMsg::GetAdmin {} => to_json_binary(&query_admin(deps)?),
    }
}`}
            </pre>
          </div>

          {/* Migrate */}
          <div>
            <h3 className="text-xl font-semibold mb-3">4. Migrate</h3>
            <p className="text-muted mb-3">
              Upgrade a contract to a new code version while preserving its address and state.
            </p>
            <pre className="code-block">
{`#[cw_serde]
pub struct MigrateMsg {
    pub version: String,
}

#[entry_point]
pub fn migrate(
    deps: DepsMut,
    _env: Env,
    msg: MigrateMsg,
) -> Result<Response, ContractError> {
    // Validate version, run state migrations
    set_contract_version(deps.storage, CONTRACT_NAME, &msg.version)?;
    Ok(Response::new().add_attribute("action", "migrate"))
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* The 14 Etrenzik Contracts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">The 14 Etrenzik Contracts</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Shared Libraries */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Shared Libraries
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">etrenzik-std</strong> —
                  Shared types, helpers, and message definitions used by all
                  contracts
                </li>
                <li>
                  <strong className="text-foreground">etrenzik-testing</strong>{" "}
                  — Test framework with mock environments and multi-test
                  utilities
                </li>
              </ul>
            </div>

            {/* Namespace */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Namespace
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">
                    cw-namespace-marketplace
                  </strong>{" "}
                  — Buy, sell, and auction human-readable namespace registrations
                </li>
              </ul>
            </div>

            {/* NFT Suite */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                NFT Suite
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">cw-nft-factory</strong> —
                  Create and configure new NFT collections
                </li>
                <li>
                  <strong className="text-foreground">cw-nft-base</strong> —
                  CW721-compatible NFT implementation with metadata extensions
                </li>
                <li>
                  <strong className="text-foreground">
                    cw-nft-marketplace
                  </strong>{" "}
                  — List, buy, and auction NFTs with escrow settlement
                </li>
              </ul>
            </div>

            {/* Stablecoin */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Stablecoin
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">
                    cw-stablecoin-controller
                  </strong>{" "}
                  — Peg management, mint/burn authority, and rate limiting
                </li>
                <li>
                  <strong className="text-foreground">
                    cw-stablecoin-vault
                  </strong>{" "}
                  — Collateral custody, deposit/withdrawal, and reserve proofs
                </li>
              </ul>
            </div>

            {/* Tokenization */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Tokenization
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">cw-token-factory</strong>{" "}
                  — Create and manage fungible tokens with configurable supply
                </li>
                <li>
                  <strong className="text-foreground">
                    cw-tokenization-engine
                  </strong>{" "}
                  — Real-world asset tokenization with fractional ownership
                </li>
                <li>
                  <strong className="text-foreground">
                    cw-compliance-hooks
                  </strong>{" "}
                  — KYC/AML enforcement hooks that gate token transfers
                </li>
                <li>
                  <strong className="text-foreground">cw-cap-table</strong> —
                  On-chain shareholder tracking with vesting and distribution
                </li>
              </ul>
            </div>

            {/* Governance */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Governance
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">
                    cw-governance-extended
                  </strong>{" "}
                  — Enhanced voting with delegation, quadratic options, and
                  time-locked execution
                </li>
              </ul>
            </div>

            {/* Cross-chain */}
            <div className="gradient-border rounded-lg p-6 bg-surface">
              <h3 className="text-lg font-semibold text-accent-light mb-3">
                Cross-chain
              </h3>
              <ul className="space-y-2 text-muted text-sm">
                <li>
                  <strong className="text-foreground">
                    cw-bridge-adapter
                  </strong>{" "}
                  — IBC bridge interface for cross-chain asset and message
                  transfers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contract Example — NFT Factory */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">
            Contract Example: NFT Factory
          </h2>
          <p className="text-muted mb-8">
            A full walkthrough of the{" "}
            <strong className="text-foreground">cw-nft-factory</strong> contract
            — from instantiation messages to collection queries.
          </p>

          <h3 className="text-xl font-semibold mb-3">InstantiateMsg</h3>
          <pre className="code-block mb-8">
{`#[cw_serde]
pub struct InstantiateMsg {
    /// Admin who can create collections
    pub admin: String,
    /// Code ID of the cw-nft-base contract
    pub nft_code_id: u64,
    /// Fee required to create a new collection
    pub creation_fee: Option<Coin>,
}`}
          </pre>

          <h3 className="text-xl font-semibold mb-3">
            ExecuteMsg::CreateCollection
          </h3>
          <pre className="code-block mb-8">
{`#[cw_serde]
pub enum ExecuteMsg {
    CreateCollection {
        name: String,
        symbol: String,
        max_supply: Option<u64>,
        royalty_percentage: Option<Decimal>,
        metadata_uri: Option<String>,
    },
    UpdateCollectionConfig {
        collection_id: u64,
        max_supply: Option<u64>,
    },
}

pub fn execute_create_collection(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    name: String,
    symbol: String,
    max_supply: Option<u64>,
    royalty_percentage: Option<Decimal>,
    metadata_uri: Option<String>,
) -> Result<Response, ContractError> {
    // Validate creation fee
    let config = CONFIG.load(deps.storage)?;
    if let Some(fee) = &config.creation_fee {
        check_funds(&info.funds, fee)?;
    }

    // Increment collection counter
    let id = NEXT_COLLECTION_ID.update(deps.storage, |id| -> StdResult<_> {
        Ok(id + 1)
    })?;

    // Instantiate a new cw-nft-base contract
    let instantiate_msg = WasmMsg::Instantiate {
        admin: Some(env.contract.address.to_string()),
        code_id: config.nft_code_id,
        msg: to_json_binary(&NftInstantiateMsg {
            name: name.clone(),
            symbol: symbol.clone(),
            minter: info.sender.to_string(),
        })?,
        funds: vec![],
        label: format!("nft-collection-{id}"),
    };

    Ok(Response::new()
        .add_message(instantiate_msg)
        .add_attribute("action", "create_collection")
        .add_attribute("collection_id", id.to_string()))
}`}
          </pre>

          <h3 className="text-xl font-semibold mb-3">
            QueryMsg::Collection
          </h3>
          <pre className="code-block">
{`#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(CollectionResponse)]
    Collection { id: u64 },
    #[returns(Vec<CollectionResponse>)]
    AllCollections {
        start_after: Option<u64>,
        limit: Option<u32>,
    },
}

#[cw_serde]
pub struct CollectionResponse {
    pub id: u64,
    pub name: String,
    pub symbol: String,
    pub nft_contract: Addr,
    pub creator: Addr,
    pub max_supply: Option<u64>,
    pub minted: u64,
}`}
          </pre>
        </div>
      </section>

      {/* Deploying Contracts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Deploying Contracts</h2>
          <p className="text-muted mb-6">
            Build, optimize, store, and instantiate — four commands from source
            to on-chain.
          </p>
          <pre className="code-block">
{`# Build
cargo wasm

# Optimize
docker run --rm -v "$(pwd)":/code cosmwasm/optimizer:0.16.0

# Store on chain
etz tx wasm store artifacts/cw_nft_factory.wasm --from wallet --gas auto

# Instantiate
etz tx wasm instantiate $CODE_ID '{"name":"My Collection"}' --from wallet --label "nft-factory"`}
          </pre>
        </div>
      </section>

      {/* Testing */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Testing</h2>
          <p className="text-muted mb-4">
            Run unit tests with <code className="text-accent-light">cargo test</code>.
            For integration tests spanning multiple contracts, use{" "}
            <strong className="text-foreground">cw-multi-test</strong>.
          </p>
          <pre className="code-block">
{`#[cfg(test)]
mod tests {
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cw_multi_test::{App, ContractWrapper, Executor};

    use super::*;

    #[test]
    fn test_create_collection() {
        let mut app = App::default();

        // Store the nft-base code
        let nft_code = ContractWrapper::new(
            cw_nft_base::execute,
            cw_nft_base::instantiate,
            cw_nft_base::query,
        );
        let nft_code_id = app.store_code(Box::new(nft_code));

        // Store the factory code
        let factory_code = ContractWrapper::new(execute, instantiate, query)
            .with_reply(reply);
        let factory_code_id = app.store_code(Box::new(factory_code));

        // Instantiate the factory
        let factory_addr = app
            .instantiate_contract(
                factory_code_id,
                Addr::unchecked("admin"),
                &InstantiateMsg {
                    admin: "admin".to_string(),
                    nft_code_id,
                    creation_fee: None,
                },
                &[],
                "nft-factory",
                None,
            )
            .unwrap();

        // Create a collection
        let res = app
            .execute_contract(
                Addr::unchecked("creator"),
                factory_addr.clone(),
                &ExecuteMsg::CreateCollection {
                    name: "Test NFTs".to_string(),
                    symbol: "TNFT".to_string(),
                    max_supply: Some(1000),
                    royalty_percentage: None,
                    metadata_uri: None,
                },
                &[],
            )
            .unwrap();

        assert!(res.events.iter().any(|e| e.ty == "wasm"
            && e.attributes.iter().any(|a| a.key == "action"
                && a.value == "create_collection")));
    }
}`}
          </pre>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 flex justify-between">
          <Link
            href="/learn/cosmos-sdk"
            className="text-accent-light hover:underline"
          >
            ← Cosmos SDK
          </Link>
          <Link
            href="/learn/namespaces"
            className="text-accent-light hover:underline"
          >
            Namespaces →
          </Link>
        </div>
      </section>
    </main>
  );
}
