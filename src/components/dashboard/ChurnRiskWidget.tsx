import { AlertTriangle } from "lucide-react";
import { mockClients, formatCurrency } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const riskColors: Record<string, string> = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-amber-100 text-amber-700",
};

export function ChurnRiskWidget() {
  const atRisk = mockClients
    .filter((c) => c.riskLevel === "high" || c.riskLevel === "critical")
    .sort((a, b) => b.riskScore - a.riskScore);

  return (
    <div className="widget-card">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-warning" />
        <h3 className="text-sm font-semibold text-foreground">Churn Risk</h3>
        <span className="ml-auto text-xs text-muted-foreground">{atRisk.length} clients</span>
      </div>
      <div className="space-y-3">
        {atRisk.map((client) => (
          <div key={client.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/40 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
              {client.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{client.name}</p>
              <p className="text-xs text-muted-foreground tab-nums">{formatCurrency(client.aum)}</p>
            </div>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", riskColors[client.riskLevel])}>
              {client.riskLevel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
