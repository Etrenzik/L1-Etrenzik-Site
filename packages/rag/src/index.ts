/**
 * @etrenzik-case/rag
 * RAG subsystem — document ingestion, chunking, retrieval
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 */
export { DocumentIngestionPipeline } from "./ingestion.js";
export { CitationPreservingRetriever } from "./retriever.js";
export { Chunker } from "./chunker.js";
export type { IndexType, RetrievalResult, ChunkWithCitation } from "./types.js";
