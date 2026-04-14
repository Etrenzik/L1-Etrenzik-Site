# Future Extensions

> DRAFT WORK PRODUCT — NOT LEGAL ADVICE

## Phase 2 — Orchestrator & MCP Implementation

- [ ] Wire MCP tool stubs to real implementations (document parsing, email extraction)
- [ ] Implement vector similarity search in retriever (cosine distance via pgvector)
- [ ] Connect BullMQ workers to MCP tool execution
- [ ] Add LLM integration for issue spotting (with guardrails)
- [ ] Implement workflow orchestrator DB persistence (WorkflowRun events)

## Phase 3 — Legal Drafting & Exhibit Management

- [ ] Wire ComplaintDraftEngine to actual LLM with citation injection
- [ ] Implement exhibit binder compilation (PDF assembly)
- [ ] Add discovery request generator (interrogatories, RFPs, RFAs)
- [ ] Deposition question bank expansion from evidence analysis
- [ ] Implement attorney review/approval workflow

## Phase 4 — UI & UX Polish

- [ ] Real-time search across all indexed chunks with highlighted citations
- [ ] Drag-and-drop evidence upload with progress tracking
- [ ] Red flag dashboard with severity-based prioritization
- [ ] Timeline visualization with interactive filtering
- [ ] Side-by-side document comparison view
- [ ] Attorney review queue with approve/reject/annotate

## Infrastructure Improvements

- [ ] Add Kubernetes manifests for production deployment
- [ ] Implement proper authentication (OAuth2 / JWT)
- [ ] Add rate limiting and request throttling
- [ ] Set up monitoring (Prometheus + Grafana)
- [ ] Implement backup/restore for case data
- [ ] Add E2E tests with Playwright

## Advanced Features

- [ ] Multi-case support (currently single-case focused)
- [ ] Collaborative editing with conflict resolution
- [ ] Email integration (auto-ingest from case email accounts)
- [ ] Court filing format generation (jurisdiction-specific)
- [ ] Statute of limitations tracker
- [ ] Opposing counsel document analysis
- [ ] Settlement value modeling (attorney-supervised)
