import { Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/data/mock-data";
import type { Goal } from "@/types/wealth";

const mockGoals: Goal[] = [
  { id: "g1", clientId: "1", clientName: "Rajesh Mehta", name: "Retirement Corpus", targetAmount: 80000000, currentAmount: 45200000, status: "on_track", deadline: "2035-06-15" },
  { id: "g2", clientId: "2", clientName: "Ananya Iyer", name: "Child Education", targetAmount: 25000000, currentAmount: 12400000, status: "on_track", deadline: "2030-08-01" },
  { id: "g3", clientId: "6", clientName: "Meera Joshi", name: "Home Purchase", targetAmount: 30000000, currentAmount: 8500000, status: "at_risk", deadline: "2028-03-01" },
  { id: "g4", clientId: "4", clientName: "Deepa Reddy", name: "Wealth Preservation", targetAmount: 100000000, currentAmount: 67800000, status: "on_track", deadline: "2040-01-01" },
];

const statusColors: Record<string, { text: string; bg: string }> = {
  on_track: { text: "text-emerald-700", bg: "bg-emerald-100" },
  at_risk: { text: "text-red-600", bg: "bg-red-100" },
  achieved: { text: "text-primary", bg: "bg-primary/10" },
};

export default function Goals() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Goals</h1>
        <p className="text-sm text-muted-foreground mt-1">Track client financial goals and progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
        {mockGoals.map((goal) => {
          const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          const cfg = statusColors[goal.status];
          return (
            <div key={goal.id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{goal.name}</p>
                  <p className="text-xs text-muted-foreground">{goal.clientName}</p>
                </div>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize", cfg.bg, cfg.text)}>
                  {goal.status.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-end justify-between mb-2">
                <span className="text-lg font-bold text-foreground tab-nums">{formatCurrency(goal.currentAmount)}</span>
                <span className="text-xs text-muted-foreground tab-nums">/ {formatCurrency(goal.targetAmount)}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", goal.status === "at_risk" ? "bg-destructive" : "bg-primary")}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground tab-nums">{progress}% achieved</span>
                <span className="text-xs text-muted-foreground">
                  Target: {new Date(goal.deadline).getFullYear()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
