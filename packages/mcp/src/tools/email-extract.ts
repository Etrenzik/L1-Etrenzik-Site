import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  documentId: z.string().uuid(),
});

const OutputSchema = z.object({
  from: z.string(),
  to: z.array(z.string()),
  date: z.string(),
  subject: z.string(),
  body: z.string(),
  attachments: z.array(z.string()),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const emailExtractTool: MCPTool<Input, Output> = {
  id: "email_extract",
  name: "Email Extractor",
  description: "Extract structured data from email files (EML, MSG) including headers, body, and attachments",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:documents"],
  failureModes: ["unsupported_format", "parse_error", "corrupted_file"],

  async execute(_input: Input): Promise<MCPToolOutput<Output>> {
    // TODO: Phase 2 — implement EML/MSG parsing
    return {
      success: true,
      data: { from: "", to: [], date: "", subject: "", body: "", attachments: [] },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
