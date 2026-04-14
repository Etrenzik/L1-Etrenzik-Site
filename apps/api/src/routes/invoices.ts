import type { FastifyInstance } from "fastify";
import { prisma } from "@l1-etrenzik/db";
import { z } from "zod";

const CreateInvoiceSchema = z.object({
  caseId: z.string().uuid(),
  invoiceNumber: z.string().optional(),
  issuer: z.string().min(1),
  recipient: z.string().min(1),
  amount: z.number().positive(),
  issueDate: z.string(),
  dueDate: z.string().optional(),
  relatedProject: z.string().optional(),
  paymentStatus: z.enum(["paid", "unpaid", "partial", "disputed"]).default("unpaid"),
  sourceDocumentIds: z.array(z.string()).default([]),
});

export async function invoiceRoutes(app: FastifyInstance) {
  // List invoices for case
  app.get<{ Querystring: { caseId: string } }>("/", async (request) => {
    const invoices = await prisma.invoice.findMany({
      where: { caseId: request.query.caseId },
      orderBy: { issueDate: "asc" },
      include: { payments: true },
    });
    return { data: invoices };
  });

  // Add invoice
  app.post("/", async (request, reply) => {
    const parsed = CreateInvoiceSchema.safeParse(request.body);
    if (!parsed.success) return reply.status(400).send({ error: parsed.error.flatten() });

    const invoice = await prisma.invoice.create({
      data: {
        caseId: parsed.data.caseId,
        invoiceNumber: parsed.data.invoiceNumber,
        issuer: parsed.data.issuer,
        recipient: parsed.data.recipient,
        amount: parsed.data.amount,
        issueDate: new Date(parsed.data.issueDate),
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        relatedProject: parsed.data.relatedProject,
        paymentStatus: parsed.data.paymentStatus,
      },
    });

    return reply.status(201).send({ data: invoice });
  });

  // Reconciliation summary
  app.get<{ Querystring: { caseId: string } }>("/reconciliation", async (request) => {
    const invoices = await prisma.invoice.findMany({
      where: { caseId: request.query.caseId },
      include: { payments: true },
    });

    const totalInvoiced = invoices.reduce((s, i) => s + i.amount.toNumber(), 0);
    const totalPaid = invoices.reduce(
      (s, i) => s + i.payments.reduce((ps, p) => ps + p.amount.toNumber(), 0),
      0
    );
    const unpaidBalance = totalInvoiced - totalPaid;

    return {
      data: {
        disclaimer: "DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED",
        totalInvoiced,
        totalPaid,
        unpaidBalance,
        invoiceCount: invoices.length,
        unpaidInvoices: invoices.filter((i) => i.paymentStatus === "unpaid"),
        disputedInvoices: invoices.filter((i) => i.paymentStatus === "disputed"),
      },
    };
  });
}
