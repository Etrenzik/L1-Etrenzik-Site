# Architecture Decision Records

> DRAFT WORK PRODUCT — NOT LEGAL ADVICE

## ADR-001: Turborepo Monorepo

**Status:** Accepted
**Date:** 2025-07-01

**Context:** Need a modular, scalable workspace for litigation preparation that separates concerns (API, UI, workers, shared libraries) while allowing easy cross-package imports.

**Decision:** Use Turborepo with npm workspaces.

**Consequences:**
- All packages share a single `node_modules` tree
- Builds are cached and incremental
- Each package can be developed and tested independently
- Deployment can target individual apps

---

## ADR-002: PostgreSQL + pgvector for Embeddings

**Status:** Accepted
**Date:** 2025-07-01

**Context:** RAG retrieval requires vector similarity search. Options: Pinecone, Weaviate, pgvector, Chroma.

**Decision:** Use pgvector extension on PostgreSQL 16.

**Consequences:**
- Single database for relational + vector data
- No separate vector DB infrastructure
- Prisma supports pgvector via `Unsupported("vector(1536)")`
- Scales to hundreds of thousands of chunks for this use case
- Raw SQL needed for vector similarity queries

---

## ADR-003: MCP Tool Registry Pattern

**Status:** Accepted
**Date:** 2025-07-01

**Context:** Need extensible tool system for agentic workflows. Tools should be discoverable, validated, and executable.

**Decision:** Central MCPRegistry class with typed tool registration using Zod schemas for input/output validation.

**Consequences:**
- Tools are self-describing (name, description, input/output schemas)
- Input validation happens at registration boundary
- New tools can be added without modifying orchestrator
- Tool outputs always include citation arrays

---

## ADR-004: Citation-Preserving RAG

**Status:** Accepted
**Date:** 2025-07-01

**Context:** Legal research requires provenance — every fact assertion must trace back to a source document, page, and chunk.

**Decision:** Every chunk and retrieval result carries a citation chain (documentId → chunkId → excerpt → evidenceStatus).

**Consequences:**
- Slower ingestion (citation tracking overhead)
- Larger storage per chunk
- Enables audit trail for every assertion
- Attorney can verify any claim against source material

---

## ADR-005: Evidence Status Classification

**Status:** Accepted
**Date:** 2025-07-01

**Context:** Litigation requires strict separation of confirmed facts, unverified allegations, and speculative theories.

**Decision:** Three-tier evidence status: `confirmed`, `alleged`, `speculative`. Applied to events, allegations, damages, and citations.

**Consequences:**
- UI displays status badges on all assertions
- Guardrails enforce status tagging at data entry
- Attorney can filter/sort by evidence strength
- Prevents system from presenting allegations as facts

---

## ADR-006: Guardrail System

**Status:** Accepted
**Date:** 2025-07-01

**Context:** System must never provide legal advice, predict outcomes, or present drafts as final.

**Decision:** Centralized guardrails module with:
- System rules constants
- `assertDisclaimer()` check on all outputs
- `classifyFact()` for evidence tiering
- `checkProhibitedContent()` for blocking disallowed patterns
- API middleware appending disclaimer headers

**Consequences:**
- Every API response includes `X-Disclaimer` header
- Every generated document includes disclaimer text
- Build-time checks can verify guardrail compliance
