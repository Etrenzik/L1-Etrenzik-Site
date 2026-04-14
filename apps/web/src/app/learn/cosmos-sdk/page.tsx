import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cosmos SDK — Etrenzik L1",
  description:
    "How the Etrenzik chain is built with Cosmos SDK v0.50, custom modules, and CometBFT consensus.",
};

const standardModules = [
  { name: "bank", desc: "Token transfers and balance queries" },
  { name: "staking", desc: "Validator delegation and rewards" },
  { name: "gov", desc: "On-chain governance proposals and voting" },
  { name: "auth", desc: "Account management and authentication" },
  { name: "distribution", desc: "Reward distribution to delegators" },
  { name: "slashing", desc: "Validator penalties for misbehavior" },
  { name: "ibc", desc: "Cross-chain communication protocol" },
];

export default function CosmosSDKPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold tracking-tight">
            Building with Cosmos SDK
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Etrenzik is built on Cosmos SDK v0.50 — a modular framework for
            building application-specific blockchains powered by CometBFT
            consensus.
          </p>
        </div>
      </section>

      {/* What is Cosmos SDK */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">What is Cosmos SDK?</h2>
          <p className="mt-4 text-muted">
            The Cosmos SDK is an open-source framework for building
            multi-asset public Proof-of-Stake blockchains and permissioned
            Proof-of-Authority blockchains. It provides a modular architecture
            where each feature is encapsulated in its own module, communicating
            through a well-defined keeper interface.
          </p>
          <p className="mt-3 text-muted">
            Etrenzik uses <strong className="text-foreground">Cosmos SDK v0.50</strong> with
            the <strong className="text-foreground">CometBFT</strong> consensus
            engine (formerly Tendermint Core). The chain binary communicates with
            CometBFT through the ABCI (Application BlockChain Interface).
          </p>

          {/* ABCI Diagram */}
          <div className="mt-8 rounded-lg bg-surface p-6">
            <h3 className="text-lg font-semibold">ABCI Interface</h3>
            <div className="mt-4 flex flex-col items-center gap-3 text-sm">
              <div className="rounded-lg bg-surface-2 px-8 py-3 font-mono font-semibold">
                CometBFT (Consensus + Networking)
              </div>
              <div className="flex flex-col items-center text-muted">
                <span>↕ ABCI</span>
                <span className="text-xs">(CheckTx · FinalizeBlock · Commit)</span>
              </div>
              <div className="rounded-lg bg-surface-2 px-8 py-3 font-mono font-semibold">
                Cosmos SDK Application (etrenzikd)
              </div>
              <span className="text-muted">↕ Keeper calls</span>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="rounded-lg bg-surface-2 px-4 py-2 font-mono">
                  x/namespace
                </div>
                <div className="rounded-lg bg-surface-2 px-4 py-2 font-mono">
                  x/stablecoin
                </div>
                <div className="rounded-lg bg-surface-2 px-4 py-2 font-mono">
                  x/bank
                </div>
                <div className="rounded-lg bg-surface-2 px-4 py-2 font-mono">
                  x/staking
                </div>
                <div className="rounded-lg bg-surface-2 px-4 py-2 font-mono">
                  x/gov
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Modules */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Etrenzik Custom Modules</h2>

          {/* x/namespace */}
          <div className="mt-10 rounded-lg bg-surface p-6">
            <h3 className="text-xl font-semibold text-accent-light">
              x/namespace
            </h3>
            <p className="mt-2 text-muted">
              Register human-readable names like &quot;alice.etz&quot;, resolve
              names to addresses, transfer ownership, and set arbitrary metadata.
              Names are first-class chain objects stored in module state.
            </p>

            <pre className="code-block mt-4 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`// MsgRegisterNamespace — registers a new namespace on-chain
type MsgRegisterNamespace struct {
    Owner    string \`protobuf:"bytes,1,opt,name=owner,proto3"    json:"owner,omitempty"\`
    Name     string \`protobuf:"bytes,2,opt,name=name,proto3"     json:"name,omitempty"\`
    Metadata string \`protobuf:"bytes,3,opt,name=metadata,proto3" json:"metadata,omitempty"\`
}

func (k Keeper) RegisterNamespace(
    ctx sdk.Context,
    msg *types.MsgRegisterNamespace,
) (*types.MsgRegisterNamespaceResponse, error) {
    // Validate name format (alphanumeric + hyphens, 3-64 chars)
    if err := types.ValidateName(msg.Name); err != nil {
        return nil, err
    }

    // Check name is not already taken
    if k.HasNamespace(ctx, msg.Name) {
        return nil, types.ErrNamespaceTaken
    }

    namespace := types.Namespace{
        Name:      msg.Name,
        Owner:     msg.Owner,
        Metadata:  msg.Metadata,
        CreatedAt: ctx.BlockTime(),
    }
    k.SetNamespace(ctx, namespace)

    ctx.EventManager().EmitEvent(sdk.NewEvent(
        types.EventTypeRegister,
        sdk.NewAttribute(types.AttributeKeyName, msg.Name),
        sdk.NewAttribute(types.AttributeKeyOwner, msg.Owner),
    ))

    return &types.MsgRegisterNamespaceResponse{}, nil
}`}
            </pre>
          </div>

          {/* x/stablecoin */}
          <div className="mt-8 rounded-lg bg-surface p-6">
            <h3 className="text-xl font-semibold text-accent-light">
              x/stablecoin
            </h3>
            <p className="mt-2 text-muted">
              Collateral management, peg monitoring, and mint/burn mechanics.
              Stablecoins are collateral-backed and governance-adjustable.
            </p>

            <pre className="code-block mt-4 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`// MsgMintStablecoin — mints stablecoins against deposited collateral
type MsgMintStablecoin struct {
    Minter     string   \`protobuf:"bytes,1,opt,name=minter,proto3"     json:"minter,omitempty"\`
    Collateral sdk.Coin \`protobuf:"bytes,2,opt,name=collateral,proto3" json:"collateral"\`
    MintAmount sdk.Coin \`protobuf:"bytes,3,opt,name=mint_amount,proto3" json:"mint_amount"\`
}

func (k Keeper) MintStablecoin(
    ctx sdk.Context,
    msg *types.MsgMintStablecoin,
) (*types.MsgMintStablecoinResponse, error) {
    params := k.GetParams(ctx)

    // Verify collateral ratio meets minimum threshold
    ratio := msg.Collateral.Amount.ToDec().Quo(msg.MintAmount.Amount.ToDec())
    if ratio.LT(params.MinCollateralRatio) {
        return nil, types.ErrInsufficientCollateral
    }

    // Lock collateral in module account
    minter, _ := sdk.AccAddressFromBech32(msg.Minter)
    err := k.bankKeeper.SendCoinsFromAccountToModule(
        ctx, minter, types.ModuleName,
        sdk.NewCoins(msg.Collateral),
    )
    if err != nil {
        return nil, err
    }

    // Mint stablecoins to the minter
    mintCoins := sdk.NewCoins(msg.MintAmount)
    k.bankKeeper.MintCoins(ctx, types.ModuleName, mintCoins)
    k.bankKeeper.SendCoinsFromModuleToAccount(ctx, types.ModuleName, minter, mintCoins)

    return &types.MsgMintStablecoinResponse{}, nil
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Standard Modules */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Standard SDK Modules</h2>
          <p className="mt-2 text-muted">
            Etrenzik wires in the standard Cosmos SDK modules alongside its
            custom ones.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standardModules.map((mod) => (
              <div key={mod.name} className="rounded-lg bg-surface p-5">
                <h3 className="font-mono text-sm font-semibold text-accent-light">
                  x/{mod.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chain Binary */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">Chain Binary</h2>
          <p className="mt-2 text-muted">
            The <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">etrenzikd</code> binary
            is the single entry point for running a node, submitting transactions,
            and querying state.
          </p>

          <pre className="code-block mt-8 overflow-x-auto rounded-lg bg-surface p-4 text-sm">
{`# Start a full node
etrenzikd start

# Register a namespace
etrenzikd tx namespace register "alice" \\
  --metadata '{"display":"Alice"}' \\
  --from alice --chain-id etrenzik-1

# Query stablecoin params
etrenzikd query stablecoin params

# Query a namespace
etrenzikd query namespace resolve "alice"

# Submit a governance proposal
etrenzikd tx gov submit-proposal draft-proposal.json \\
  --from alice --chain-id etrenzik-1`}
          </pre>
        </div>
      </section>

      {/* IBC Integration */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold">IBC Integration</h2>
          <p className="mt-2 text-muted">
            Inter-Blockchain Communication enables Etrenzik to transfer tokens
            and data to any IBC-enabled chain in the Cosmos ecosystem.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold">Cross-Chain Transfers</h3>
              <pre className="code-block mt-3 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`# Transfer tokens to Osmosis
etrenzikd tx ibc-transfer transfer \\
  transfer channel-0 \\
  osmo1abc...xyz \\
  1000000uetz \\
  --from alice \\
  --chain-id etrenzik-1`}
              </pre>
            </div>

            <div className="rounded-lg bg-surface p-6">
              <h3 className="text-lg font-semibold">Relayer Setup</h3>
              <p className="mt-2 text-sm text-muted">
                IBC channels are maintained by relayer software that watches for
                packets on both chains. Etrenzik supports the standard Hermes
                and Go relayer implementations.
              </p>
              <pre className="code-block mt-3 overflow-x-auto rounded-lg bg-surface-2 p-4 text-sm">
{`# Create an IBC channel
hermes create channel \\
  --a-chain etrenzik-1 \\
  --b-chain osmosis-1 \\
  --a-port transfer \\
  --b-port transfer \\
  --new-client-connection`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <Link
            href="/learn/architecture"
            className="text-accent-light hover:underline"
          >
            ← Architecture
          </Link>
          <Link
            href="/learn/smart-contracts"
            className="text-accent-light hover:underline"
          >
            Smart Contracts →
          </Link>
        </div>
      </section>
    </main>
  );
}
