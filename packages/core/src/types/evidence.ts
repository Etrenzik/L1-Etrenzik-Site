import { z } from "zod";

// ── Evidence status classification ──
export const EvidenceStatusSchema = z.enum(["confirmed", "alleged", "disputed", "missing"]);
export type EvidenceStatus = z.infer<typeof EvidenceStatusSchema>;

// ── Jurisdiction tagging ──
export const JurisdictionTagSchema = z.enum(["AL", "GA", "FEDERAL", "UNKNOWN"]);
export type JurisdictionTag = z.infer<typeof JurisdictionTagSchema>;

// ── Case Event ──
export const CaseEventSchema = z.object({
  id: z.string().uuid(),
  date: z.string(),
  title: z.string().min(1),
  description: z.string(),
  participants: z.array(z.string()),
  sourceDocumentIds: z.array(z.string()),
  status: EvidenceStatusSchema,
  jurisdictions: z.array(JurisdictionTagSchema),
});
export type CaseEvent = z.infer<typeof CaseEventSchema>;

// ── Document metadata ──
export const DocumentMetadataSchema = z.object({
  id: z.string().uuid(),
  filename: z.string(),
  mimeType: z.string(),
  filePath: z.string(),
  uploadedAt: z.string(),
  status: z.enum(["uploaded", "parsing", "parsed", "indexed", "error"]),
  caseId: z.string().uuid(),
  provenanceChain: z.array(
    z.object({
      action: z.string(),
      timestamp: z.string(),
      actor: z.string(),
    })
  ),
});
export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;

// ── Chunk ──
export const ChunkSchema = z.object({
  id: z.string().uuid(),
  documentId: z.string().uuid(),
  content: z.string(),
  chunkIndex: z.number().int(),
  metadata: z.record(z.unknown()).optional(),
  embedding: z.array(z.number()).optional(),
});
export type Chunk = z.infer<typeof ChunkSchema>;

// ── Citation ──
export const CitationSchema = z.object({
  id: z.string().uuid(),
  documentId: z.string().uuid(),
  chunkId: z.string().uuid().optional(),
  pageNumber: z.number().int().optional(),
  lineRange: z.string().optional(),
  excerpt: z.string(),
  evidenceStatus: EvidenceStatusSchema,
});
export type Citation = z.infer<typeof CitationSchema>;
