/**
 * @l1-etrenzik/mcp
 * MCP Tool Registry and base tool infrastructure
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 */
export { MCPRegistry } from "./registry.js";
export type { MCPTool, MCPToolInput, MCPToolOutput } from "./types.js";
// Tool stubs — Phase 2 will provide full implementations
export { documentIngestTool } from "./tools/document-ingest.js";
export { emailExtractTool } from "./tools/email-extract.js";
export { timelineBuilderTool } from "./tools/timeline-builder.js";
export { accountingReconcileTool } from "./tools/accounting-reconcile.js";
export { legalIssueSpotterTool } from "./tools/legal-issue-spotter.js";
export { complaintDrafterTool } from "./tools/complaint-drafter.js";
