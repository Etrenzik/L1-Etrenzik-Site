import { z } from "zod";
import { EvidenceStatusSchema, JurisdictionTagSchema } from "./evidence.js";

// ── Allegation ──
export const AllegationSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  claim: z.string(),
  description: z.string(),
  evidenceStatus: EvidenceStatusSchema,
  supportingCitationIds: z.array(z.string()),
  missingProof: z.array(z.string()),
  jurisdictions: z.array(JurisdictionTagSchema),
  // CRITICAL GUARDRAIL: every allegation must be flagged for review
  attorneyReviewRequired: z.literal(true).default(true),
  reviewStatus: z.enum(["needs_review", "reviewed", "approved", "rejected"]).default("needs_review"),
});
export type Allegation = z.infer<typeof AllegationSchema>;

// ── Legal Issue / Candidate Claim ──
export const LegalIssueSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  theory: z.string(),
  description: z.string(),
  claimType: z.enum([
    "breach_of_contract",
    "account_stated",
    "unjust_enrichment",
    "conversion",
    "tortious_interference",
    "defamation",
    "business_disparagement",
    "accounting",
    "declaratory_relief",
    "other",
  ]),
  evidenceSupport: z.enum(["strong", "moderate", "weak", "missing"]),
  jurisdictions: z.array(JurisdictionTagSchema),
  keyFacts: z.array(z.string()),
  missingProof: z.array(z.string()),
  // ALWAYS a candidate — never presented as established
  label: z.literal("candidate claim for attorney review"),
  attorneyReviewRequired: z.literal(true),
});
export type LegalIssue = z.infer<typeof LegalIssueSchema>;

// ── Damage Item ──
export const DamageItemSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  category: z.enum(["direct", "consequential", "punitive", "declaratory", "other"]),
  description: z.string(),
  amount: z.number().optional(),
  amountRange: z.object({ min: z.number(), max: z.number() }).optional(),
  basis: z.string(),
  supportLevel: z.enum(["supported", "potential_requires_proof", "speculative"]),
  sourceCitationIds: z.array(z.string()),
});
export type DamageItem = z.infer<typeof DamageItemSchema>;

// ── Evidence classification types ──
export const FactClassificationSchema = z.enum([
  "supported_fact",
  "user_allegation",
  "inferred_claim",
  "missing_evidence",
  "legal_conclusion_requires_review",
]);
export type FactClassification = z.infer<typeof FactClassificationSchema>;
