import type { FastifyInstance } from "fastify";
import { prisma } from "@etrenzik-case/db";
import { z } from "zod";

const SearchSchema = z.object({
  caseId: z.string().uuid(),
  query: z.string().min(1),
  indexType: z
    .enum(["documents", "facts", "events", "entities", "accounting", "allegations"])
    .optional(),
  limit: z.number().int().positive().max(100).default(20),
});

export async function searchRoutes(app: FastifyInstance) {
  // Keyword search (Phase 2: add vector / hybrid search)
  app.post("/", async (request, reply) => {
    const parsed = SearchSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    // Basic keyword search across chunks
    const results = await prisma.chunk.findMany({
      where: {
        document: { caseId: parsed.data.caseId },
        content: { contains: parsed.data.query, mode: "insensitive" },
      },
      take: parsed.data.limit,
      include: {
        document: { select: { filename: true, id: true } },
        citations: true,
      },
    });

    return {
      data: {
        disclaimer: "DRAFT WORK PRODUCT — search results require verification",
        results: results.map((r) => ({
          chunkId: r.id,
          content: r.content,
          documentId: r.documentId,
          documentName: r.document.filename,
          citations: r.citations,
        })),
      },
    };
  });
}
