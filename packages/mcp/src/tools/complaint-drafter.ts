import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  plaintiff: z.string(),
  defendant: z.string(),
  chronology: z.array(z.object({
    date: z.string(),
    description: z.string(),
    status: z.string(),
    citations: z.array(z.string()),
  })),
  candidateClaims: z.array(z.object({
    theory: z.string(),
    claimType: z.string(),
  })),
  damages: z.array(z.object({
    description: z.string(),
    amount: z.number().optional(),
  })),
});

const OutputSchema = z.object({
  sections: z.object({
    caseCaption: z.string(),
    parties: z.string(),
    jurisdictionVenue: z.string(),
    factualBackground: z.string(),
    counts: z.array(z.object({
      title: z.string(),
      body: z.string(),
      label: z.literal("candidate claim for attorney review"),
    })),
    damagesSummary: z.string(),
    prayerForRelief: z.string(),
    juryDemand: z.string(),
    exhibitList: z.array(z.string()),
    openIssues: z.array(z.string()),
  }),
  disclaimer: z.string(),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const complaintDrafterTool: MCPTool<Input, Output> = {
  id: "complaint_drafter",
  name: "Complaint Drafter",
  description: "Generate a complaint skeleton with citations, candidate claims, and attorney review flags",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:cases", "read:events", "read:allegations", "read:damages"],
  failureModes: ["insufficient_evidence", "missing_parties", "no_claims_identified"],

  async execute(_input: Input): Promise<MCPToolOutput<Output>> {
    // TODO: Phase 3 — implement LLM-based complaint drafting with guardrails
    return {
      success: true,
      data: {
        sections: {
          caseCaption: "[CASE CAPTION — TO BE COMPLETED BY ATTORNEY]",
          parties: "[PARTIES SECTION — TO BE COMPLETED]",
          jurisdictionVenue: "[JURISDICTION AND VENUE — ATTORNEY REVIEW REQUIRED — AL / GA / Federal TBD]",
          factualBackground: "[FACTUAL BACKGROUND — TO BE GENERATED FROM CHRONOLOGY]",
          counts: [],
          damagesSummary: "[DAMAGES — TO BE COMPUTED FROM EVIDENCE]",
          prayerForRelief: "[PRAYER FOR RELIEF — ATTORNEY REVIEW REQUIRED]",
          juryDemand: "[JURY DEMAND PLACEHOLDER — ATTORNEY TO DETERMINE]",
          exhibitList: [],
          openIssues: [
            "Venue determination: Alabama vs. Georgia vs. Federal",
            "Written agreement for 70/30 split — document or oral?",
            "1099 classification — tax counsel review needed",
            "Business interference witnesses — identification pending",
          ],
        },
        disclaimer: "DRAFT WORK PRODUCT ONLY — NOT FOR FILING — ATTORNEY REVIEW REQUIRED",
      },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
