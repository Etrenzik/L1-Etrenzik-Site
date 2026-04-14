import type { FastifyInstance } from "fastify";
import { prisma } from "@l1-etrenzik/db";
import { z } from "zod";

const CreateCaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  plaintiff: z.string().min(1),
  defendant: z.string().min(1),
  jurisdictions: z.array(z.enum(["AL", "GA", "FEDERAL", "UNKNOWN"])).default(["UNKNOWN"]),
});

export async function caseRoutes(app: FastifyInstance) {
  // List cases
  app.get("/", async () => {
    const cases = await prisma.case.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { data: cases };
  });

  // Get case by ID
  app.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    const caseRecord = await prisma.case.findUnique({
      where: { id: request.params.id },
      include: {
        documents: true,
        events: { orderBy: { date: "asc" } },
        invoices: true,
        allegations: true,
      },
    });
    if (!caseRecord) return reply.status(404).send({ error: "Case not found" });
    return { data: caseRecord };
  });

  // Create case
  app.post("/", async (request, reply) => {
    const parsed = CreateCaseSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const newCase = await prisma.case.create({ data: parsed.data });
    return reply.status(201).send({ data: newCase });
  });
}
