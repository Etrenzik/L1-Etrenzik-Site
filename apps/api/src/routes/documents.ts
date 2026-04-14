import type { FastifyInstance } from "fastify";
import { prisma } from "@l1-etrenzik/db";
import { config } from "../config.js";
import { randomUUID } from "crypto";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { join } from "path";

export async function documentRoutes(app: FastifyInstance) {
  // List documents for a case
  app.get<{ Querystring: { caseId: string } }>("/", async (request) => {
    const docs = await prisma.document.findMany({
      where: { caseId: request.query.caseId },
      orderBy: { uploadedAt: "desc" },
    });
    return { data: docs };
  });

  // Upload document
  app.post<{ Querystring: { caseId: string } }>("/upload", async (request, reply) => {
    const caseId = request.query.caseId;
    if (!caseId) return reply.status(400).send({ error: "caseId required" });

    const file = await request.file();
    if (!file) return reply.status(400).send({ error: "No file uploaded" });

    const docId = randomUUID();
    const uploadPath = join(config.uploadDir, caseId, docId);
    await mkdir(uploadPath, { recursive: true });

    const filePath = join(uploadPath, file.filename);
    await pipeline(file.file, createWriteStream(filePath));

    const doc = await prisma.document.create({
      data: {
        id: docId,
        caseId,
        filename: file.filename,
        mimeType: file.mimetype,
        filePath,
        status: "uploaded",
      },
    });

    // TODO: Queue document for ingestion pipeline (Phase 2)
    return reply.status(201).send({ data: doc });
  });

  // Get document by ID
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const doc = await prisma.document.findUnique({
      where: { id: request.params.id },
      include: { chunks: true, citations: true },
    });
    if (!doc) return reply.status(404).send({ error: "Document not found" });
    return { data: doc };
  });
}
