import { prisma } from "@etrenzik-case/db";
import type { RetrievalResult, IndexType } from "./types.js";

/**
 * Citation-preserving retriever — hybrid search (keyword + metadata filter).
 * Phase 2 will add vector similarity search via pgvector.
 * Every result includes a citation back to the source document.
 */
export class CitationPreservingRetriever {
  /**
   * Search across document chunks with keyword matching and metadata filtering.
   */
  async search(params: {
    caseId: string;
    query: string;
    indexType?: IndexType;
    limit?: number;
  }): Promise<RetrievalResult[]> {
    const { caseId, query, limit = 20 } = params;

    // Keyword search across chunks (Phase 2: add vector similarity)
    const chunks = await prisma.chunk.findMany({
      where: {
        document: { caseId },
        content: { contains: query, mode: "insensitive" },
      },
      take: limit,
      include: {
        document: { select: { id: true, filename: true } },
        citations: true,
      },
      orderBy: { chunkIndex: "asc" },
    });

    return chunks.map((chunk, index) => ({
      chunkId: chunk.id,
      content: chunk.content,
      documentId: chunk.documentId,
      documentName: chunk.document.filename,
      score: 1 - index * 0.01, // placeholder score
      indexType: "raw_documents" as IndexType,
      citation: {
        documentId: chunk.documentId,
        excerpt: chunk.content.substring(0, 200),
        pageNumber: (chunk.metadata as Record<string, number>)?.pageNumber,
        evidenceStatus: chunk.citations[0]?.evidenceStatus ?? "alleged",
      },
    }));
  }

  /**
   * Search specifically for contradictory evidence — find chunks that
   * appear to conflict with a given assertion.
   */
  async findContradictions(params: {
    caseId: string;
    assertion: string;
  }): Promise<RetrievalResult[]> {
    // TODO: Phase 2 — implement semantic contradiction detection
    // This requires embedding comparison and LLM-based analysis
    return [];
  }
}
