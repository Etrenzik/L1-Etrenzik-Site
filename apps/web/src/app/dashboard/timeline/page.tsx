/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Timeline Viewer Page
 */

// Seed timeline events for initial display
const SEED_EVENTS = [
  {
    id: "evt-000",
    date: "2022-02-01",
    title: "Business arrangement begins — Etrenzik / IS",
    description:
      "Troy Miller (Etrenzik) entered a business arrangement with IS to continue existing GA operations and merge LED lighting offerings, acting as CIO/COO. Agreed ~70/30 profit split + $85K salary, IS covering all expenses.",
    participants: ["Troy Miller", "Sami Ali"],
    status: "alleged" as const,
    jurisdictions: ["GA", "AL"],
    source: "User statement — written agreement needed",
  },
  {
    id: "evt-000b",
    date: "2022-08-01",
    title: "Troy becomes Insperity PEO employee for IS (~11 months)",
    description:
      "Troy Miller transitioned from 1099 to Insperity PEO employee for IS for approximately 11 months.",
    participants: ["Troy Miller", "Insperity", "Inergy Solutions, LLC"],
    status: "alleged" as const,
    jurisdictions: ["GA", "AL"],
    source: "User statement — Insperity records needed",
  },
  {
    id: "evt-000c",
    date: "2024-01-01",
    title: "~$50K LED products moved to IS warehouse (Huntsville, AL)",
    description:
      "Etrenzik moved approximately $50,000 of LED products into the IS warehouse. Never received consideration.",
    participants: ["Troy Miller", "Etrenzik LLC", "Inergy Solutions, LLC"],
    status: "alleged" as const,
    jurisdictions: ["AL"],
    source: "User statement — inventory records needed",
  },
  {
    id: "evt-000d",
    date: "2024-06-01",
    title: "Troy returns to 1099 (mid-2024) — IS still controls as employer",
    description:
      "Troy returned to 1099 status. Despite this, IS continued operating as if Troy was an employee — IS credit card for laptops, travel, vehicle maintenance, gas, etc.",
    participants: ["Troy Miller", "Sami Ali"],
    status: "alleged" as const,
    jurisdictions: ["GA", "AL"],
    source: "User statement — credit card records needed",
  },
  {
    id: "evt-001",
    date: "2025-06-01",
    title: "Sami Ali email: Atlanta office closure / termination",
    description:
      'Email from Sami Ali regarding Atlanta office closure: "submit invoices so books can be closed and amounts due paid." Acknowledged outstanding GCS projects. Last 2 weeks of 1099 pay (~$3,270) not paid.',
    participants: ["Sami Ali", "Troy Miller"],
    status: "confirmed" as const,
    jurisdictions: ["GA"],
    source: "Email — June 1, 2025",
  },
  {
    id: "evt-001b",
    date: "2025-06-02",
    title: "Troy works with GCS to set up Etrenzik as authorized vendor",
    description:
      "Per Ali's direction, Troy worked with GCS to set up Etrenzik as vendor. Several POs issued to IS for work not on Ali's list. PO transfer to Etrenzik complicated by GCS end-of-year and set-aside classification.",
    participants: ["Troy Miller", "Gwinnett County Schools"],
    status: "alleged" as const,
    jurisdictions: ["GA"],
    source: "User statement — GCS records needed",
  },
  {
    id: "evt-001c",
    date: "2025-06-15",
    title: "Troy continues 2 of 5-6 open POs, pays all product/labor",
    description:
      "Troy decided to continue installation on 2 POs outside Ali's stated list, paying for all product and labor as Etrenzik, anticipating POs would transfer or Ali would reimburse.",
    participants: ["Troy Miller", "Etrenzik LLC", "Gwinnett County Schools"],
    status: "alleged" as const,
    jurisdictions: ["GA"],
    source: "User statement — invoices INV-1268636 + INV-1268637 confirm payment",
  },
  {
    id: "evt-003",
    date: "2025-07-01",
    title: "Sami Ali/lawyer contacts GCS — defamation, negates closure",
    description:
      "Sami Ali and legal representation contacted GCS, negated any intent to close GA office, and accused Troy of stealing and misrepresenting the closing of GA operations. Constitutes slander per se (accusation of a crime) and tortious interference.",
    participants: ["Sami Ali", "Unknown attorney", "Gwinnett County Schools staff"],
    status: "alleged" as const,
    jurisdictions: ["GA"],
    source: "User allegation — requires GCS witness corroboration",
  },
  {
    id: "evt-004",
    date: "2025-07-02",
    title: "GCS cancels all Etrenzik POs + $4,000 check — business destroyed",
    description:
      "GCS immediately stopped all business with Etrenzik and Troy Miller: cancellation of all open POs, $4,000 canceled check for product sold, and loss of $750K–$1M in future 12-month revenue (averaging $400K–$600K annually).",
    participants: ["Gwinnett County Schools", "Etrenzik LLC"],
    status: "alleged" as const,
    jurisdictions: ["GA"],
    source: "User allegation — GCS PO records + check cancellation needed",
  },
  {
    id: "evt-005",
    date: "2025-08-01",
    title: "INV-1268636 ($37,725) + INV-1268637 ($16,860.99) sent to IS",
    description:
      "Two invoices totaling $54,585.99 sent to Sami Ali / IS for product and labor Etrenzik paid for on GCS POs.",
    participants: ["Troy Miller", "Sami Ali"],
    status: "confirmed" as const,
    jurisdictions: ["GA"],
    source: "Invoice records — INV-1268636 + INV-1268637 (8/1/2025)",
  },
];

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-800",
  alleged: "bg-yellow-100 text-yellow-800",
  disputed: "bg-red-100 text-red-800",
  missing: "bg-gray-100 text-gray-800",
};

export default function TimelinePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 mb-6">
        <p className="text-amber-800 text-sm font-medium">
          ⚠️ Timeline entries are categorized by evidence status. &quot;Alleged&quot; events require independent corroboration.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6">Case Timeline</h2>

      <div className="space-y-0">
        {SEED_EVENTS.map((event, i) => (
          <div key={event.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow" />
              {i < SEED_EVENTS.length - 1 && <div className="w-0.5 flex-1 bg-gray-200" />}
            </div>

            {/* Event card */}
            <div className="bg-white border rounded-lg p-4 mb-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <time className="text-sm font-mono text-gray-500">{event.date}</time>
                <span className={`text-xs px-2 py-0.5 rounded ${STATUS_STYLES[event.status]}`}>
                  {event.status}
                </span>
                {event.jurisdictions.map((j) => (
                  <span key={j} className="text-xs bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                    {j}
                  </span>
                ))}
              </div>
              <h3 className="font-semibold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{event.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                <span>Participants: {event.participants.join(", ")}</span>
                <span>| Source: {event.source}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
