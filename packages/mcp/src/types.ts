import { z } from "zod";

export interface MCPTool<TInput = unknown, TOutput = unknown> {
  id: string;
  name: string;
  description: string;
  version: string;
  inputSchema: z.ZodType<TInput>;
  outputSchema: z.ZodType<TOutput>;
  permissions: string[];
  failureModes: string[];
  execute(input: TInput): Promise<MCPToolOutput<TOutput>>;
}

export interface MCPToolInput {
  caseId: string;
  [key: string]: unknown;
}

export interface MCPToolOutput<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  disclaimer: string;
  citations?: Array<{
    documentId: string;
    excerpt: string;
    pageNumber?: number;
  }>;
}
