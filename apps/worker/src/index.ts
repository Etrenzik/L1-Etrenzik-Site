/**
 * ETRENZIK-CASE Background Worker
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Processes document ingestion, embeddings, reconciliation, and draft generation.
 */
import "dotenv/config";
import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import pino from "pino";

const logger = pino({ level: process.env.LOG_LEVEL ?? "info" });

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const QUEUE_PREFIX = process.env.WORKER_QUEUE_PREFIX ?? "ETRENZIK-CASE";
const CONCURRENCY = parseInt(process.env.WORKER_CONCURRENCY ?? "5", 10);

// Queue definitions
export const documentIngestionQueue = new Queue(`${QUEUE_PREFIX}:document-ingestion`, { connection });
export const embeddingQueue = new Queue(`${QUEUE_PREFIX}:embedding`, { connection });
export const workflowQueue = new Queue(`${QUEUE_PREFIX}:workflow`, { connection });

// Document ingestion worker
const documentWorker = new Worker(
  `${QUEUE_PREFIX}:document-ingestion`,
  async (job) => {
    logger.info({ jobId: job.id, docId: job.data.documentId }, "Processing document ingestion");
    // TODO: Phase 2 — implement full ingestion pipeline
    // 1. Parse document (PDF, DOCX, XLSX, EML, etc.)
    // 2. Extract text and metadata
    // 3. Chunk with document-aware logic
    // 4. Store chunks in DB
    // 5. Queue for embedding generation
    return { status: "stub", documentId: job.data.documentId };
  },
  { connection, concurrency: CONCURRENCY }
);

// Embedding worker
const embeddingWorker = new Worker(
  `${QUEUE_PREFIX}:embedding`,
  async (job) => {
    logger.info({ jobId: job.id, chunkId: job.data.chunkId }, "Generating embeddings");
    // TODO: Phase 2 — generate vector embeddings via OpenAI-compatible API
    return { status: "stub", chunkId: job.data.chunkId };
  },
  { connection, concurrency: CONCURRENCY }
);

// Workflow worker
const workflowWorker = new Worker(
  `${QUEUE_PREFIX}:workflow`,
  async (job) => {
    logger.info({ jobId: job.id, workflowRunId: job.data.workflowRunId }, "Executing workflow");
    // TODO: Phase 2 — orchestrator execution
    return { status: "stub", workflowRunId: job.data.workflowRunId };
  },
  { connection, concurrency: 2 }
);

// Graceful shutdown
async function shutdown() {
  logger.info("Shutting down workers...");
  await Promise.all([
    documentWorker.close(),
    embeddingWorker.close(),
    workflowWorker.close(),
  ]);
  await connection.quit();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

logger.info("Worker started — listening for jobs");
