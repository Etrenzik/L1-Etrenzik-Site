import type { FastifyInstance } from "fastify";
import { prisma } from "@etrenzik-case/db";
import { z } from "zod";

const CreateEventSchema = z.object({
  caseId: z.string().uuid(),
  date: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  participants: z.array(z.string()).default([]),
  status: z.enum(["confirmed", "alleged", "disputed", "missing"]).default("alleged"),
  jurisdictions: z.array(z.enum(["AL", "GA", "FEDERAL", "UNKNOWN"])).default(["UNKNOWN"]),
  sourceDocumentIds: z.array(z.string()).default([]),
});

export async function timelineRoutes(app: FastifyInstance) {
  // Get timeline for case
  app.get<{ Querystring: { caseId: string } }>("/", async (request) => {
    const events = await prisma.event.findMany({
      where: { caseId: request.query.caseId },
      orderBy: { date: "asc" },
      include: { citations: true },
    });
    return { data: events };
  });

  // Add event
  app.post("/", async (request, reply) => {
    const parsed = CreateEventSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const event = await prisma.event.create({
      data: {
        caseId: parsed.data.caseId,
        date: new Date(parsed.data.date),
        title: parsed.data.title,
        description: parsed.data.description,
        participants: parsed.data.participants,
        status: parsed.data.status,
        jurisdictions: parsed.data.jurisdictions,
      },
    });

    return reply.status(201).send({ data: event });
  });
}
