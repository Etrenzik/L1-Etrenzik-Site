/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Case Dashboard Overview
 */
import Link from "next/link";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", description: "Case summary and status" },
  { href: "/dashboard/evidence", label: "Evidence", description: "Upload and manage documents" },
  { href: "/dashboard/timeline", label: "Timeline", description: "Chronological event viewer" },
  { href: "/dashboard/invoices", label: "Invoices", description: "Invoice reconciliation" },
  { href: "/dashboard/legal-issues", label: "Legal Issues", description: "Candidate claims and theories" },
  { href: "/dashboard/drafts", label: "Drafts", description: "Complaint and demand letter builder" },
  { href: "/dashboard/witnesses", label: "Witnesses", description: "Witness management" },
  { href: "/dashboard/workflows", label: "Workflows", description: "Task queue and workflow monitor" },
  { href: "/dashboard/red-flags", label: "Red Flags", description: "Contradictions and gaps" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 mb-6">
          <p className="text-amber-800 font-semibold text-sm">
            ⚠️ DRAFT WORK PRODUCT — NOT LEGAL ADVICE — ALL OUTPUTS REQUIRE ATTORNEY REVIEW BEFORE USE
          </p>
        </div>

        <h1 className="text-3xl font-bold mb-2">Litigation Workspace</h1>
        <p className="text-gray-600">
          Etrenzik LLC v. Inergy Solutions, LLC — Case Preparation Dashboard
        </p>
      </div>

      {/* Case Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Documents" value="—" />
        <StatCard label="Events" value="15" />
        <StatCard label="Confirmed Invoices" value="$54,586" status="disputed" />
        <StatCard label="Claims" value="10" />
      </div>

      {/* Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-lg mb-1">{item.label}</h3>
            <p className="text-gray-500 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      {/* Case Parties Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Plaintiff</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-gray-500">Company</dt><dd className="font-medium">Etrenzik LLC</dd></div>
            <div><dt className="text-gray-500">Principal</dt><dd className="font-medium">Troy Miller</dd></div>
            <div><dt className="text-gray-500">State</dt><dd className="font-medium">Georgia</dd></div>
          </dl>
        </div>
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">Defendant</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-gray-500">Company</dt><dd className="font-medium">Inergy Solutions, LLC</dd></div>
            <div><dt className="text-gray-500">Principal</dt><dd className="font-medium">Sami Ali</dd></div>
            <div><dt className="text-gray-500">State</dt><dd className="font-medium">Alabama (Huntsville)</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, status }: { label: string; value: string; status?: string }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <p className="text-gray-500 text-xs uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${status === "disputed" ? "text-red-600" : ""}`}>
        {value}
      </p>
      {status && <span className="text-xs text-red-500 uppercase">{status}</span>}
    </div>
  );
}
