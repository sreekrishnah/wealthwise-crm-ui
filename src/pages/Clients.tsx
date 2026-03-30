import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/data/mock-data";
import { useClients } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import type { ClientSegment, RiskLevel } from "@/types/wealth";

const riskColors: Record<RiskLevel, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

const kycColors: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  expired: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
};

const segments: ClientSegment[] = ["UHNI", "HNI", "Retail", "Corporate"];

export default function Clients() {
  const [search, setSearch] = useState("");
  const [segmentFilter, setSegmentFilter] = useState<ClientSegment | "all">("all");
  const { data: clientsResponse, isLoading } = useClients();
  const clients = clientsResponse?.data || [];

  const filtered = clients.filter((c: any) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchSegment = segmentFilter === "all" || c.segment === segmentFilter;
    return matchSearch && matchSegment;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Clients</h1>
        <p className="text-sm text-muted-foreground mt-1">{clients.length} clients managed across all segments</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 animate-reveal animate-reveal-delay-1">
        <div className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients…"
            className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={() => setSegmentFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95",
              segmentFilter === "all" ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
          >
            All
          </button>
          {segments.map((seg) => (
            <button
              key={seg}
              onClick={() => setSegmentFilter(seg)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors active:scale-95",
                segmentFilter === seg ? "bg-primary text-primary-foreground" : "bg-muted/60 text-muted-foreground hover:bg-muted"
              )}
            >
              {seg}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: "150ms" }}>
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading clients...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Client</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Segment</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3.5">AUM</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Risk</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">KYC</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">RM</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Next Review</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr key={client.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                        {client.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">{client.segment}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold text-foreground tab-nums">{formatCurrency(client.aum)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", riskColors[client.riskLevel])}>
                      {client.riskLevel}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", kycColors[client.kycStatus])}>
                      {client.kycStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground">{client.rmName}</td>
                  <td className="px-5 py-4 text-sm text-muted-foreground tab-nums">
                    {new Date(client.nextReview).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </td>
                  <td className="px-5 py-4">
                    <Link to={`/clients/${client.id}`} className="p-1.5 rounded-lg hover:bg-muted/60 transition-colors inline-flex">
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </Link>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">No clients match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
