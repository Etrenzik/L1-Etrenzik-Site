import { z } from "zod";

// ── Invoice Record ──
export const InvoiceRecordSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  invoiceNumber: z.string().optional(),
  issuer: z.string().min(1),
  recipient: z.string().min(1),
  amount: z.number().positive(),
  issueDate: z.string(),
  dueDate: z.string().optional(),
  relatedProject: z.string().optional(),
  paidTo: z.string().optional(),
  paymentStatus: z.enum(["paid", "unpaid", "partial", "disputed"]),
  sourceDocumentIds: z.array(z.string()),
});
export type InvoiceRecord = z.infer<typeof InvoiceRecordSchema>;

// ── Payment Record ──
export const PaymentRecordSchema = z.object({
  id: z.string().uuid(),
  invoiceId: z.string().uuid(),
  amount: z.number(),
  date: z.string(),
  method: z.string().optional(),
  payer: z.string(),
  payee: z.string(),
  sourceDocumentIds: z.array(z.string()),
});
export type PaymentRecord = z.infer<typeof PaymentRecordSchema>;

// ── Loan Record ──
export const LoanRecordSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  borrower: z.string(),
  lender: z.string(),
  amount: z.number(),
  date: z.string(),
  repaid: z.boolean(),
  repaymentDate: z.string().optional(),
  repaymentEvidence: z.array(z.string()),
  notes: z.string().optional(),
});
export type LoanRecord = z.infer<typeof LoanRecordSchema>;

// ── Tax Dispute Record ──
export const TaxDisputeRecordSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  taxYear: z.number().int(),
  formType: z.literal("1099"),
  amount: z.number(),
  classification: z.enum(["revenue", "loan", "disputed"]),
  reportedBy: z.string(),
  reportedTo: z.string(),
  repaymentEvidenceDocIds: z.array(z.string()),
  notes: z.string(),
});
export type TaxDisputeRecord = z.infer<typeof TaxDisputeRecordSchema>;

// ── Accounting Request ──
export const AccountingRequestSchema = z.object({
  id: z.string().uuid(),
  caseId: z.string().uuid(),
  requestedBy: z.string(),
  requestedFrom: z.string(),
  requestType: z.enum(["pnl", "books", "reconciliation", "split_accounting", "other"]),
  date: z.string(),
  response: z.enum(["provided", "not_provided", "partial", "unknown"]),
  sourceDocumentIds: z.array(z.string()),
});
export type AccountingRequest = z.infer<typeof AccountingRequestSchema>;

// ── Reconciliation Summary ──
export const ReconciliationSummarySchema = z.object({
  totalInvoiced: z.number(),
  totalPaid: z.number(),
  unpaidBalance: z.number(),
  expectedAllocation: z.object({
    plaintiff: z.number(), // percentage
    defendant: z.number(),
  }),
  disputedAmounts: z.array(
    z.object({
      description: z.string(),
      amount: z.number(),
      reason: z.string(),
    })
  ),
  disclaimer: z.literal("DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED"),
});
export type ReconciliationSummary = z.infer<typeof ReconciliationSummarySchema>;
