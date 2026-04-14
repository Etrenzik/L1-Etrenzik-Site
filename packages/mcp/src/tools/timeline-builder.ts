import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  events: z.array(z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
    participants: z.array(z.string()),
    sourceDocumentIds: z.array(z.string()),
    status: z.enum(["confirmed", "alleged", "disputed", "missing"]),
  })),
});

const OutputSchema = z.object({
  timeline: z.array(z.object({
    date: z.string(),
    title: z.string(),
    status: z.string(),
    participants: z.array(z.string()),
  })),
  gaps: z.array(z.string()),
  contradictions: z.array(z.string()),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const timelineBuilderTool: MCPTool<Input, Output> = {
  id: "timeline_builder",
  name: "Timeline Builder",
  description: "Construct a chronological timeline from events, detect gaps and contradictions",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:events", "write:events"],
  failureModes: ["conflicting_dates", "missing_data"],

  async execute(input: Input): Promise<MCPToolOutput<Output>> {
    const sorted = [...input.events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    // TODO: Phase 2 — implement gap detection and contradiction analysis
    return {
      success: true,
      data: {
        timeline: sorted.map(e => ({ date: e.date, title: e.title, status: e.status, participants: e.participants })),
        gaps: [],
        contradictions: [],
      },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
