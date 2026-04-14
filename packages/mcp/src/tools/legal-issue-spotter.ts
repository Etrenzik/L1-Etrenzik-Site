import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  facts: z.array(z.object({
    description: z.string(),
    status: z.enum(["confirmed", "alleged", "disputed", "missing"]),
    citations: z.array(z.string()),
  })),
});

const OutputSchema = z.object({
  candidateClaims: z.array(z.object({
    theory: z.string(),
    claimType: z.string(),
    evidenceSupport: z.enum(["strong", "moderate", "weak", "missing"]),
    keyFacts: z.array(z.string()),
    missingProof: z.array(z.string()),
    label: z.literal("candidate claim for attorney review"),
  })),
  disclaimer: z.string(),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const legalIssueSpotterTool: MCPTool<Input, Output> = {
  id: "legal_issue_spotter",
  name: "Legal Issue Spotter",
  description: "Identify candidate legal theories from facts. Labels all as candidates for attorney review only.",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:facts", "read:allegations"],
  failureModes: ["insufficient_facts", "ambiguous_jurisdiction"],

  async execute(_input: Input): Promise<MCPToolOutput<Output>> {
    // TODO: Phase 2 — implement LLM-based issue spotting with guardrails
    return {
      success: true,
      data: {
        candidateClaims: [],
        disclaimer: "DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED — These are candidate theories only",
      },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
