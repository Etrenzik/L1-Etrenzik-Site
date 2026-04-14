import { z } from "zod";

// ── Person ──
export const PersonSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  role: z.string().optional(),
  company: z.string().optional(),
  contactInfo: z.record(z.string()).optional(),
});
export type Person = z.infer<typeof PersonSchema>;

// ── Company ──
export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  state: z.string().optional(),
  entityType: z.string().optional(), // LLC, Corp, etc.
  principals: z.array(z.string()),
});
export type Company = z.infer<typeof CompanySchema>;

// ── Project ──
export const ProjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  client: z.string(),
  description: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

// ── Communication ──
export const CommunicationSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["email", "text", "letter", "phone", "meeting", "other"]),
  date: z.string(),
  from: z.string(),
  to: z.array(z.string()),
  subject: z.string().optional(),
  summary: z.string(),
  sourceDocumentId: z.string().uuid().optional(),
});
export type Communication = z.infer<typeof CommunicationSchema>;

// ── Witness ──
export const WitnessSchema = z.object({
  id: z.string().uuid(),
  personId: z.string().uuid(),
  relevantEvents: z.array(z.string()),
  testimony: z.string().optional(),
  credibility: z.enum(["high", "medium", "low", "unknown"]).default("unknown"),
  deposed: z.boolean().default(false),
});
export type Witness = z.infer<typeof WitnessSchema>;

// ── RelationshipAgreement ──
export const RelationshipAgreementSchema = z.object({
  id: z.string().uuid(),
  parties: z.array(z.string()),
  agreementType: z.enum(["partnership", "contractor", "subcontractor", "joint_venture", "other"]),
  terms: z.string(),
  documented: z.boolean(),
  sourceDocumentIds: z.array(z.string()),
});
export type RelationshipAgreement = z.infer<typeof RelationshipAgreementSchema>;
