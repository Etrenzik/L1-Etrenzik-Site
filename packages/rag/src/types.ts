/**
 * RAG index types — separate indices for different content categories
 * This separation prevents facts, arguments, and evidence from being mixed.
 */
export type IndexType =
  | "raw_documents"     // original document chunks
  | "extracted_facts"   // facts extracted from documents
  | "events"            // timeline events
  | "entities"          // people, companies, projects
  | "accounting"        // financial records, invoices, payments
  | "allegations";      // draft allegations and claims

export interface RetrievalResult {
  chunkId: string;
  content: string;
  documentId: string;
  documentName: string;
  score: number;
  indexType: IndexType;
  citation: {
    documentId: string;
    excerpt: string;
    pageNumber?: number;
    lineRange?: string;
    evidenceStatus: string;
  };
}

export interface ChunkWithCitation {
  id: string;
  content: string;
  documentId: string;
  chunkIndex: number;
  citation: {
    excerpt: string;
    pageNumber?: number;
    evidenceStatus: string;
  };
}
