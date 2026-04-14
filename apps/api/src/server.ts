/**
 * L1-ETRENZIK API Server
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * All outputs require attorney review before filing or use.
 */
import Fastify from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import { config } from "./config.js";
import { caseRoutes } from "./routes/cases.js";
import { documentRoutes } from "./routes/documents.js";
import { timelineRoutes } from "./routes/timeline.js";
import { invoiceRoutes } from "./routes/invoices.js";
import { workflowRoutes } from "./routes/workflows.js";
import { searchRoutes } from "./routes/search.js";
import { auditLogger } from "./middleware/audit-logger.js";

const app = Fastify({
  logger: {
    level: config.logLevel,
  },
});

async function start() {
  await app.register(cors, { origin: config.corsOrigin });
  await app.register(multipart, { limits: { fileSize: config.maxFileSizeMb * 1024 * 1024 } });

  // Audit logging middleware
  app.addHook("onRequest", auditLogger);

  // Health check
  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

  // Disclaimer header on all responses
  app.addHook("onSend", async (_request, reply, payload) => {
    reply.header("X-Legal-Disclaimer", "DRAFT WORK PRODUCT — NOT LEGAL ADVICE — ATTORNEY REVIEW REQUIRED");
    return payload;
  });

  // Register routes
  await app.register(caseRoutes, { prefix: "/api/cases" });
  await app.register(documentRoutes, { prefix: "/api/documents" });
  await app.register(timelineRoutes, { prefix: "/api/timeline" });
  await app.register(invoiceRoutes, { prefix: "/api/invoices" });
  await app.register(workflowRoutes, { prefix: "/api/workflows" });
  await app.register(searchRoutes, { prefix: "/api/search" });

  await app.listen({ port: config.port, host: config.host });
  app.log.info(`API server running on ${config.host}:${config.port}`);
}

start().catch((err) => {
  console.error("Failed to start API server:", err);
  process.exit(1);
});
