# L1-ETRENZIK — Litigation Workspace

> **DRAFT WORK PRODUCT — NOT LEGAL ADVICE**
> This system is a research and document-preparation workspace. All outputs are drafts for attorney review. Nothing produced by this system constitutes legal advice or a legal opinion.

## Overview

MCP-based agentic RAG litigation workspace for **Etrenzik LLC v. Inergy Solutions LLC**. Built as a TypeScript Turborepo monorepo.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment config
cp .env.example .env
# Edit .env with your credentials

# 3. Start infrastructure (Postgres + Redis)
cd infra && docker compose up -d

# 4. Generate Prisma client & push schema
npm run db:generate
npm run db:push

# 5. Seed the database
npm run db:seed

# 6. Start development servers
npm run dev
```

## Architecture

```
l1-etrenzik/
├── apps/
│   ├── api/           # Fastify REST API (port 4000)
│   ├── web/           # Next.js dashboard (port 3000)
│   └── worker/        # BullMQ background workers
├── packages/
│   ├── core/          # Type system, guardrails, shared schemas
│   ├── db/            # Prisma ORM, schema, migrations, seed
│   ├── shared/        # API types, utilities, disclaimers
│   ├── mcp/           # MCP tool registry and tool implementations
│   ├── rag/           # Chunking, ingestion, citation-preserving retrieval
│   ├── workflows/     # Orchestrator engine + workflow definitions
│   ├── legal-drafting/# Complaint & demand letter draft engines
│   └── accounting/    # Invoice reconciliation, damages, tax analysis
├── infra/             # Docker Compose, Dockerfiles
├── docs/              # Project documentation
└── attorney_review_notes/  # Case-specific review notes
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | Turborepo + npm workspaces |
| Frontend | Next.js 16 + React 19 + Tailwind CSS 4 |
| API | Fastify 5 |
| Workers | BullMQ + IORedis |
| Database | PostgreSQL 16 + pgvector (via Prisma 6) |
| Cache/Queue | Redis 7 |
| Validation | Zod 3.23 |
| Runtime | Node.js 20+ |
| Infrastructure | Docker Compose |

## Key Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all packages and apps |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with case data |

## Case Context

**Etrenzik LLC v. Inergy Solutions LLC**

- **Plaintiff:** Etrenzik LLC (Troy Miller) — Georgia
- **Defendant:** Inergy Solutions LLC (Sami Ali) — Alabama
- **Core Issues:** Non-payment (~$50K), disputed 1099 (~$16K loan vs revenue), failure to produce P&L, alleged business interference at Gwinnett County Schools
- **Jurisdictions:** Georgia, Alabama, Federal (tax)

## Guardrails

This system enforces strict guardrails:

1. Every output labeled "DRAFT WORK PRODUCT — NOT LEGAL ADVICE"
2. Facts vs. allegations clearly separated (`confirmed` / `alleged` / `speculative`)
3. No legal conclusions without attorney review flag
4. All allegations require `attorneyReviewRequired: true`
5. Prohibited: predicting case outcomes, disparaging parties, fabricating evidence, providing legal advice

## Phases

- **Phase 1** ✓ — Scaffold: monorepo structure, Prisma schema, seed data, Docker infra
- **Phase 2** — Orchestrator implementation, MCP tools, ingestion pipeline, citation retrieval
- **Phase 3** — Legal drafting integration, workflow execution, exhibit binder
- **Phase 4** — Polish: search UI, red flag surfacing, attorney review workflows

## License

Private — Etrenzik LLC. All rights reserved.
