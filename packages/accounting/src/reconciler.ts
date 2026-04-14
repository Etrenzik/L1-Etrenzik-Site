/**
 * Invoice Reconciliation Engine
 * Compares invoices issued, payments received, allocations expected vs paid.
 * DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED
 */

interface InvoiceData {
  id: string;
  issuer: string;
  recipient: string;
  amount: number;
  paymentStatus: string;
  relatedProject?: string;
}

interface PaymentData {
  id: string;
  invoiceId?: string;
  amount: number;
  payer: string;
  payee: string;
}

interface ReconciliationResult {
  disclaimer: string;
  totalInvoiced: number;
  totalPaid: number;
  unpaidBalance: number;
  expectedAllocation: { plaintiff: number; defendant: number };
  unpaidInvoices: InvoiceData[];
  disputedItems: Array<{ description: string; amount: number; reason: string }>;
  matchedPayments: Array<{ invoiceId: string; paymentId: string; amount: number }>;
  unmatchedPayments: PaymentData[];
}

export class InvoiceReconciler {
  reconcile(
    invoices: InvoiceData[],
    payments: PaymentData[],
    expectedSplit: { plaintiff: number; defendant: number }
  ): ReconciliationResult {
    const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0);

    // Match payments to invoices
    const matchedPayments: Array<{ invoiceId: string; paymentId: string; amount: number }> = [];
    const unmatchedPayments: PaymentData[] = [];

    for (const payment of payments) {
      if (payment.invoiceId) {
        matchedPayments.push({
          invoiceId: payment.invoiceId,
          paymentId: payment.id,
          amount: payment.amount,
        });
      } else {
        unmatchedPayments.push(payment);
      }
    }

    const totalPaid = matchedPayments.reduce((s, p) => s + p.amount, 0);
    const unpaidBalance = totalInvoiced - totalPaid;
    const unpaidInvoices = invoices.filter((i) => i.paymentStatus === "unpaid" || i.paymentStatus === "disputed");

    return {
      disclaimer: "DRAFT WORK PRODUCT — ATTORNEY REVIEW REQUIRED",
      totalInvoiced,
      totalPaid,
      unpaidBalance,
      expectedAllocation: expectedSplit,
      unpaidInvoices,
      disputedItems: [],
      matchedPayments,
      unmatchedPayments,
    };
  }
}
