import type { FastifyInstance } from "fastify";
import { prisma } from "@l1-etrenzik/db";

export async function workflowRoutes(app: FastifyInstance) {
  // List workflow definitions
  app.get("/definitions", async () => {
    const workflows = await prisma.workflow.findMany({
      orderBy: { name: "asc" },
    });
    return { data: workflows };
  });

  // List workflow runs for a case
  app.get<{ Querystring: { caseId: string } }>("/runs", async (request) => {
    const runs = await prisma.workflowRun.findMany({
      where: { caseId: request.query.caseId },
      orderBy: { startedAt: "desc" },
    });
    return { data: runs };
  });

  // Trigger a workflow (Phase 2: full implementation)
  app.post<{ Body: { caseId: string; workflowId: string } }>("/trigger", async (request, reply) => {
    const { caseId, workflowId } = request.body;
    if (!caseId || !workflowId) {
      return reply.status(400).send({ error: "caseId and workflowId required" });
    }

    const run = await prisma.workflowRun.create({
      data: {
        caseId,
        workflowId,
        status: "queued",
      },
    });

    // TODO: Phase 2 — queue workflow execution via BullMQ
    return reply.status(201).send({ data: run });
  });
}
