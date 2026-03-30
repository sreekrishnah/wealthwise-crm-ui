import { useCompliance } from "@/hooks/use-data";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock, Loader2 } from "lucide-react";

const statusConfig: Record<string, { color: string; bg: string }> = {
  overdue: { color: "text-red-600", bg: "bg-red-100" },
  pending: { color: "text-amber-600", bg: "bg-amber-100" },
  completed: { color: "text-emerald-600", bg: "bg-emerald-100" },
};

const typeLabel: Record<string, string> = {
  kyc_renewal: "KYC Renewal",
  risk_profile: "Risk Profile",
  nomination: "Nomination",
};

export default function Compliance() {
  const { data: compliance, isLoading } = useCompliance();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  const sorted = [...(compliance || [])].sort((a: any, b: any) => {
    const order: any = { overdue: 0, pending: 1, completed: 2 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="animate-reveal">
        <h1 className="text-2xl font-bold text-foreground">Compliance</h1>
        <p className="text-sm text-muted-foreground mt-1">Track KYC, risk profiles, and nominations</p>
      </div>

      <div className="space-y-3 animate-slide-up" style={{ animationDelay: "150ms" }}>
        {sorted.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground glass-card rounded-2xl">
            No compliance tasks found.
          </div>
        ) : (
          sorted.map((task) => {
            const status = task.status || "pending";
            const cfg = statusConfig[status] || statusConfig.pending;
            return (
              <div key={task.id || task._id} className="glass-card rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cfg.bg)}>
                  {status === "overdue" ? <AlertCircle className={cn("w-5 h-5", cfg.color)} /> :
                   status === "completed" ? <CheckCircle2 className={cn("w-5 h-5", cfg.color)} /> :
                   <Clock className={cn("w-5 h-5", cfg.color)} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{task.clientName}</p>
                  <p className="text-xs text-muted-foreground">{typeLabel[task.type] || task.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground tab-nums border-b border-dashed border-muted pb-1">
                    Due {new Date(task.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </p>
                  <p className={cn("text-[10px] font-semibold mt-1 uppercase tracking-wider", cfg.color)}>{status}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
