/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Invoice Reconciliation Page
 */

const SEED_INVOICES = [
  {
    id: "inv-001",
    issuer: "Etrenzik LLC",
    recipient: "Inergy Solutions, LLC",
    amount: 37725,
    relatedProject: "Gwinnett County Schools — PO product + labor",
    paymentStatus: "unpaid" as const,
    issueDate: "2025-08-01",
    notes: "INV-1268636: Product and labor paid by Etrenzik for GCS POs. Sent to Sami Ali / IS for reimbursement.",
    status: "confirmed",
  },
  {
    id: "inv-002",
    issuer: "Etrenzik LLC",
    recipient: "Inergy Solutions, LLC",
    amount: 16860.99,
    relatedProject: "Gwinnett County Schools — PO product + labor",
    paymentStatus: "unpaid" as const,
    issueDate: "2025-08-01",
    notes: "INV-1268637: Product and labor paid by Etrenzik for GCS POs. Sent to Sami Ali / IS for reimbursement.",
    status: "confirmed",
  },
  {
    id: "inv-003",
    issuer: "Etrenzik LLC",
    recipient: "Inergy Solutions, LLC",
    amount: 3270,
    relatedProject: "Final 2 weeks 1099 pay",
    paymentStatus: "unpaid" as const,
    issueDate: "2025-06-01",
    notes: "Last 2 weeks of 1099 pay not paid after termination on 6/1/2025.",
    status: "alleged",
  },
  {
    id: "inv-004",
    issuer: "Etrenzik LLC",
    recipient: "Inergy Solutions, LLC",
    amount: 0,
    relatedProject: "Revenue split — all GCS work",
    paymentStatus: "unpaid" as const,
    issueDate: "Various 2022-2025",
    notes: "Aggregate unpaid revenue split (~70/30 + $85K salary). Total unknown — IS refuses to provide accounting.",
    status: "alleged",
  },
];

const STATUS_COLORS = {
  paid: "bg-green-100 text-green-800",
  unpaid: "bg-red-100 text-red-800",
  partial: "bg-yellow-100 text-yellow-800",
  disputed: "bg-orange-100 text-orange-800",
};

export default function InvoicesPage() {
  const totalInvoiced = SEED_INVOICES.reduce((s, i) => s + i.amount, 0);
  const unpaidTotal = SEED_INVOICES.filter((i) => i.paymentStatus === "unpaid").reduce(
    (s, i) => s + i.amount,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ Invoice amounts are based on user-provided data. Independent verification required.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Invoice Reconciliation</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Invoiced</p>
          <p className="text-2xl font-bold">${totalInvoiced.toLocaleString()}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Unpaid Balance</p>
          <p className="text-2xl font-bold text-red-600">${unpaidTotal.toLocaleString()}</p>
        </div>
        <div className="bg-white border rounded-lg p-4">
          <p className="text-sm text-gray-500">Expected Split</p>
          <p className="text-2xl font-bold">70% / 30%</p>
          <p className="text-xs text-gray-400">Etrenzik / Inergy</p>
        </div>
      </div>

      {/* Invoice table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500 border-b">
              <th className="p-3">Issuer</th>
              <th className="p-3">Recipient</th>
              <th className="p-3">Project</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {SEED_INVOICES.map((inv) => (
              <tr key={inv.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-sm">{inv.issuer}</td>
                <td className="p-3 text-sm">{inv.recipient}</td>
                <td className="p-3 text-sm">{inv.relatedProject}</td>
                <td className="p-3 font-medium">${inv.amount.toLocaleString()}</td>
                <td className="p-3 text-sm text-gray-500">{inv.issueDate}</td>
                <td className="p-3">
                  <span
                    className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[inv.paymentStatus]}`}
                  >
                    {inv.paymentStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Notes */}
      <div className="mt-6 bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-2">Reconciliation Notes</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Gwinnett County Schools paid Inergy Solutions for work performed by Etrenzik</li>
          <li>Understanding was 70% to Etrenzik / 30% to Inergy Solutions</li>
          <li>Approximately $50,000 in unpaid invoices remain outstanding (user allegation)</li>
          <li className="text-red-600">⚠️ Attorney review required: verify allocation agreement documentation</li>
        </ul>
      </div>
    </div>
  );
}
