import type { WorkflowDefinition } from "@l1-etrenzik/core";

/**
 * Evidence Intake Workflow
 * Steps: upload → parse → chunk → embed → index → verify provenance
 */
export const evidenceIntakeWorkflow: WorkflowDefinition = {
  id: "evidence-intake",
  name: "Evidence Intake",
  description: "Process uploaded documents: parse, chunk, embed, and index with provenance tracking",
  version: "1.0.0",
  steps: [
    {
      id: "parse",
      name: "Parse Document",
      toolId: "document_ingest",
      onSuccess: "extract-metadata",
      onFailure: "parse-error",
    },
    {
      id: "extract-metadata",
      name: "Extract Metadata",
      toolId: "email_extract", // for email files; other parsers dispatched by mime type
      onSuccess: "chunk",
    },
    {
      id: "chunk",
      name: "Chunk Document",
      // Handled by ingestion pipeline
      onSuccess: "embed",
    },
    {
      id: "embed",
      name: "Generate Embeddings",
      // Handled by embedding worker
      onSuccess: "index",
    },
    {
      id: "index",
      name: "Index Chunks",
      onSuccess: "verify-provenance",
    },
    {
      id: "verify-provenance",
      name: "Verify Provenance Chain",
      requiresReview: false,
    },
    {
      id: "parse-error",
      name: "Handle Parse Error",
      requiresReview: true,
    },
  ],
};
