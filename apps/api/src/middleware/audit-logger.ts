import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@etrenzik-case/db";

export async function auditLogger(request: FastifyRequest, _reply: FastifyReply) {
  if (request.url === "/health") return;

  try {
    await prisma.auditLog.create({
      data: {
        action: `${request.method} ${request.url}`,
        entityType: "api_request",
        entityId: null,
        userId: (request.headers["x-user-id"] as string) ?? "anonymous",
        metadata: {
          ip: request.ip,
          userAgent: request.headers["user-agent"] ?? "unknown",
        },
      },
    });
  } catch {
    request.log.warn("Failed to write audit log entry");
  }
}
