import { z } from "zod";

// ── Workflow definition ──
export const WorkflowStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  toolId: z.string().optional(),
  agentId: z.string().optional(),
  inputSchema: z.record(z.unknown()).optional(),
  outputSchema: z.record(z.unknown()).optional(),
  onSuccess: z.string().optional(), // next step ID
  onFailure: z.string().optional(),
  requiresReview: z.boolean().default(false),
});
export type WorkflowStep = z.infer<typeof WorkflowStepSchema>;

export const WorkflowDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  steps: z.array(WorkflowStepSchema),
  version: z.string().default("1.0.0"),
});
export type WorkflowDefinition = z.infer<typeof WorkflowDefinitionSchema>;

// ── Workflow run states ──
export const WorkflowRunStatusSchema = z.enum([
  "queued",
  "intake",
  "ingest",
  "ocr_extraction",
  "normalization",
  "entity_resolution",
  "chronology_build",
  "contradiction_scan",
  "invoice_reconciliation",
  "damages_model",
  "legal_theory_memo",
  "draft_generation",
  "review",
  "completed",
  "failed",
  "cancelled",
]);
export type WorkflowRunStatus = z.infer<typeof WorkflowRunStatusSchema>;

// ── Workflow run event ──
export const WorkflowEventSchema = z.object({
  id: z.string().uuid(),
  workflowRunId: z.string().uuid(),
  stepId: z.string(),
  status: z.enum(["started", "completed", "failed", "skipped"]),
  timestamp: z.string(),
  input: z.record(z.unknown()).optional(),
  output: z.record(z.unknown()).optional(),
  error: z.string().optional(),
  durationMs: z.number().optional(),
});
export type WorkflowEvent = z.infer<typeof WorkflowEventSchema>;

// ── MCP Tool declaration ──
export const MCPToolDeclarationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  inputSchema: z.record(z.unknown()),
  outputSchema: z.record(z.unknown()),
  permissions: z.array(z.string()),
  failureModes: z.array(z.string()),
  version: z.string().default("1.0.0"),
});
export type MCPToolDeclaration = z.infer<typeof MCPToolDeclarationSchema>;
