/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-bold text-lg">L1-Etrenzik</h1>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
              DRAFT WORK PRODUCT
            </span>
          </div>
          <nav className="hidden md:flex gap-4 text-sm">
            <a href="/dashboard" className="hover:text-blue-600">Overview</a>
            <a href="/dashboard/evidence" className="hover:text-blue-600">Evidence</a>
            <a href="/dashboard/timeline" className="hover:text-blue-600">Timeline</a>
            <a href="/dashboard/invoices" className="hover:text-blue-600">Invoices</a>
            <a href="/dashboard/legal-issues" className="hover:text-blue-600">Legal Issues</a>
            <a href="/dashboard/drafts" className="hover:text-blue-600">Drafts</a>
            <a href="/dashboard/witnesses" className="hover:text-blue-600">Witnesses</a>
            <a href="/dashboard/workflows" className="hover:text-blue-600">Workflows</a>
            <a href="/dashboard/red-flags" className="text-red-600 hover:text-red-800">Red Flags</a>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
