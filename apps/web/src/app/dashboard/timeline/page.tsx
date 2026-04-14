/**
 * DRAFT WORK PRODUCT — NOT LEGAL ADVICE
 * Timeline Viewer Page
 */

// Seed timeline events for initial display
const SEED_EVENTS = [
  {
    id: "evt-001",
    date: "2025-06-01",
    title: "Sami Ali email: Alpharetta office closure",
    description:
      "Email from Sami Ali stating closure of Alpharetta office, no more Georgia work, directing invoices to be submitted so books could be closed and amounts due paid.",
    participants: ["Sami Ali", "Troy Miller"],
    status: "confirmed" as const,
    jurisdictions: ["GA"],
    source: "Email — June 1, 2025",
  },
  {
    id: "evt-002",
    date: "2025-06-11",
    title: "Accidental Etrenzik invoice sent from IS email",
    description:
      "An Etrenzik invoice for approximately $19,987 was accidentally sent from an Inergy Solutions email account.",
    participants: ["Troy Miller"],
    status: "confirmed" as const,
    jurisdictions: ["GA"],
    source: "Invoice record / email logs",
  },
  {
    id: "evt-003",
    date: "2025-07-01",
    title: "Sami Ali appearance at Gwinnett County Schools",
    description:
      "Sami Ali allegedly appeared at Gwinnett County Schools with a lawyer and stated Troy was stealing from Inergy Solutions, allegedly in connection with the June 11 invoice.",
    participants: ["Sami Ali", "Unknown attorney", "Gwinnett County Schools staff"],
    status: "alleged" as const,
    jurisdictions: ["GA"],
    source: "User allegation — requires witness corroboration",
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
