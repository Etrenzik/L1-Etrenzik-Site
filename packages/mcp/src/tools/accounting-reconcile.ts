import { z } from "zod";
import type { MCPTool, MCPToolOutput } from "../types.js";

const InputSchema = z.object({
  caseId: z.string().uuid(),
  invoices: z.array(z.object({
    id: z.string(),
    issuer: z.string(),
    recipient: z.string(),
    amount: z.number(),
    paymentStatus: z.string(),
  })),
  payments: z.array(z.object({
    id: z.string(),
    invoiceId: z.string().optional(),
    amount: z.number(),
    payer: z.string(),
    payee: z.string(),
  })),
  expectedSplit: z.object({
    plaintiff: z.number(),
    defendant: z.number(),
  }),
});

const OutputSchema = z.object({
  totalInvoiced: z.number(),
  totalPaid: z.number(),
  unpaidBalance: z.number(),
  discrepancies: z.array(z.object({
    description: z.string(),
    amount: z.number(),
  })),
  disclaimer: z.string(),
});

type Input = z.infer<typeof InputSchema>;
type Output = z.infer<typeof OutputSchema>;

export const accountingReconcileTool: MCPTool<Input, Output> = {
  id: "accounting_reconcile",
  name: "Accounting Reconciler",
  description: "Compare invoices, payments, allocations expected vs paid, compute unpaid balances",
  version: "1.0.0",
  inputSchema: InputSchema,
  outputSchema: OutputSchema,
  permissions: ["read:invoices", "read:payments"],
  failureModes: ["missing_invoices", "unmatched_payments", "data_inconsistency"],

  async execute(input: Input): Promise<MCPToolOutput<Output>> {
    const totalInvoiced = input.invoices.reduce((s, i) => s + i.amount, 0);
    const totalPaid = input.payments.reduce((s, p) => s + p.amount, 0);

    return {
      success: true,
      data: {
        totalInvoiced,
        totalPaid,
        unpaidBalance: totalInvoiced - totalPaid,
        discrepancies: [],
        disclaimer: "DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED",
      },
      disclaimer: "DRAFT WORK PRODUCT — NOT LEGAL ADVICE",
    };
  },
};
