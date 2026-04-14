import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  documentId: z.string().uuid(),
  filePath: z.string(),
  mimeType: z.string(),
});

const OutputSchema = z.object({
  chunkCount: z.number(),
  metadata: z.record(z.unknown()),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const documentIngestTool: MCPTool<Input, Output> = {
  id: "document_ingest",
  name: "Document Ingest",
  description: "Parse and chunk documents (PDF, DOCX, XLSX, EML, MSG, CSV, TXT, images) for RAG indexing",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:documents", "write:chunks"],
  failureModes: ["unsupported_format", "parse_error", "file_not_found", "ocr_failure"],

  async execute(input: Input): Promise<MCPToolOutput<Output>> {
    // TODO: Phase 2 — full implementation with parser dispatch
    return {
      success: true,
      data: { chunkCount: 0, metadata: { filePath: input.filePath, mimeType: input.mimeType } },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
