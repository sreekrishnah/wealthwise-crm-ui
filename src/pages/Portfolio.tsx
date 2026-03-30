import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const holdings = [
  { id: "h1", name: "HDFC Mid-Cap Opportunities", type: "Mutual Fund", value: 2450000, allocation: 12.8, gainLoss: 345000, gainLossPercent: 16.4 },
  { id: "h2", name: "ICICI Prudential Bluechip", type: "Mutual Fund", value: 3200000, allocation: 16.7, gainLoss: 520000, gainLossPercent: 19.4 },
  { id: "h3", name: "Reliance Industries", type: "Equity", value: 1800000, allocation: 9.4, gainLoss: -120000, gainLossPercent: -6.3 },
  { id: "h4", name: "SBI Fixed Deposit", type: "FD", value: 5000000, allocation: 26.1, gainLoss: 350000, gainLossPercent: 7.5 },
  { id: "h5", name: "Sovereign Gold Bond", type: "Gold", value: 2100000, allocation: 11.0, gainLoss: 280000, gainLossPercent: 15.4 },
  { id: "h6", name: "Tata Digital India Fund", type: "Mutual Fund", value: 1400000, allocation: 7.3, gainLoss: -85000, gainLossPercent: -5.7 },
  { id: "h7", name: "LIC Jeevan Labh", type: "Insurance", value: 1200000, allocation: 6.3, gainLoss: 95000, gainLossPercent: 8.6 },
  { id: "h8", name: "PPFAS Flexi Cap", type: "Mutual Fund", value: 2000000, allocation: 10.4, gainLoss: 410000, gainLossPercent: 25.8 },
];

export default function Portfolio() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Portfolio</h1>
        <p className="text-sm text-muted-foreground mt-1">Aggregated holdings across all clients</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: "150ms" }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Holding</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3.5">Type</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3.5">Value</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3.5">Allocation</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3.5">Gain/Loss</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h) => (
                <tr key={h.id} className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-foreground">{h.name}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full">{h.type}</span>
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-foreground tab-nums">
                    ₹{(h.value / 100000).toFixed(1)}L
                  </td>
                  <td className="px-5 py-4 text-right text-sm text-muted-foreground tab-nums">{h.allocation}%</td>
                  <td className="px-5 py-4 text-right">
                    <span className={cn("text-sm font-semibold tab-nums", h.gainLoss >= 0 ? "text-emerald-600" : "text-red-500")}>
                      {h.gainLoss >= 0 ? "+" : ""}{h.gainLossPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
